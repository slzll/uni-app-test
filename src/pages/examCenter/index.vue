<template>
	<div class="app_examCenter">
		<uni-nav-bar class="custom_uni_navbar" left-icon="bars" title="考试中心" color="white" background-color="#ec4747" fixed="true" @clickLeft="toggleLeft"></uni-nav-bar>
		<div class="container">
			<i-drawer i-class="drawer_container" mode="left" :visible="showLeft" @close="toggleLeft">
				<scroll-view scroll-y>
					<div class="channel_list_container" :style="{ paddingTop: navigationBarHeight }">
						<ul class="channel_list">
							<li class="channel_list_item" v-for="(item, i) in examTypes" :key="item.TypeId">
								<div class="parent_tree_container" @click="GetExamList(item.TypeId)">
									<div class="channel_list_link common_title ellipsis">
										<img class="common_title_icon" src="/static/images/red_ico.png" alt="" />
										<span>{{ item.TypeName }}</span>
									</div>
									<div v-if="item.Nodes && item.Nodes.length > 0" @click="item.showNodes = !item.showNodes" class="list_expand">
										<img v-show="!item.showNodes" src="/static/images/dropdown.png" alt="" />
										<img v-show="item.showNodes" src="/static/images/pullup.png" alt="" />
									</div>
								</div>
								<ul v-show="item.showNodes" class="channel_list">
									<li class="channel_list_item" v-for="nodeItem in item.Nodes" :key="nodeItem.TypeId">
										<div class="ellipsis common_title" @click="GetExamList(nodeItem.TypeId)">
											<img class="common_title_circle" src="/static/images/red_cicle.png" alt="" />
											<span>{{ nodeItem.TypeName }}</span>
										</div>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</scroll-view>
			</i-drawer>
			<scroll-view class="exam_list_container" v-if="!noData" scroll-y="true" lower-threshold="0">
				<div class="exam_list">
					<div class="exam_item" v-for="item in examData" :key="item.ExamId" @click.stop="checkAttempt(item.ExamId, item.TriesLimit, item.LattemptNumber, item.EndTime)">
						<div class="exam_img"><img src="/static/images/exam_ico.png" alt="" /></div>
						<div class="exam_desc">
							<div class="exam_name">{{ item.ExamTitle }}</div>
							<div class="exam_date">考试截止时间：{{ item.EndTime | dateFilter('yyyy.MM.dd') }}</div>
							<div class="exam_num">
								<text class="exam_tip_num">题数：{{ item.ThemeCount }}题</text>
								<text class="highlight">{{ item.ExamCredit.toFixed(1) }}学时</text>
							</div>
							<div class="bottom">
								<text class="exam_time" v-if="item.TimeLimit > 0">考试时间：{{ item.TimeLimit }}分钟</text>
								<text class="exam_time" v-else>考试时间：不限时</text>
								<text class="pull-right" v-if="item.Status == 'Finish'">
									最好成绩：
									<text class="green">{{ item.HighScore.toFixed(1) }}</text>
								</text>
								<text class="below pull-right" v-if="item.Status == 'UnFinish'">不合格</text>
								<text class="pull-right" v-if="item.Status == 'UnJoin'">未考</text>
							</div>
						</div>
					</div>
					<div class="noDataBg" v-if="noDataBg"></div>
					<div class="no-data" v-if="noData">没有更多内容了...</div>
				</div>
				<i-load-more v-if="loading" :loading="loading"></i-load-more>
				<i-load-more v-if="noDataLoading" tip="暂无数据" :loading="false"></i-load-more>
			</scroll-view>
			<img class="no_data_img" v-if="noData" src="/static/images/no_data.png" alt="" />
		</div>
		<tab-bar current="examCenter" />
	</div>
</template>

<script>
import { GetExamType, GetExamList } from '@/common/utils/api';
import checkLogin from '@/common/mixins/checkLogin';

export default {
	mixins: [checkLogin],
	data() {
		return {
			navigationBarHeight: '',
			leftDrawerHeight: '',
			examData: [],
			examTypes: [],
			showLeft: false,
			noData: false,
			loading: false,
			noDataLoading: false,
			activeId: null,
			page: 1
		};
	},
	watch: {},
	methods: {
		toggleLeft() {
			this.showLeft = !this.showLeft;
		},
		async GetExamType() {
			let res = await GetExamType();
			this.examTypes = res.Data.List.map(item => {
				item.showNodes = false;
				return item;
			});
			this.GetExamList(this.examTypes[0].TypeId);
		},
		async GetExamList(TypeId) {
			this.noData = false;
			if (TypeId && this.activeId !== TypeId) {
				this.noDataLoading = false;
				this.activeId = TypeId;
				this.page = 1;
				this.examData = [];
			}
			let res = await GetExamList({ TypeId: this.activeId, Page: this.page });
			if (res.Type === 1) {
				this.loading = false;
				this.showLeft = false;
			} else {
				return;
			}
			let list = res.Data.List;
			if (list.length === 0 && this.page === 1) {
				this.noData = true;
				return;
			}
			if (list.length === 0 && this.page > 1) {
				this.noDataLoading = true;
				return;
			}
			this.examData = [...this.examData, ...list];
		},
		checkAttempt(id, total, current, endTime) {
			var dateEnd = new Date(endTime).getTime();
			var dateNow = new Date().getTime();
			if (total > 0) {
				if (dateNow < dateEnd) {
					if (current < total) {
						let count = total - current;
						this.$MessageBox.confirm(`当前考试剩余${count}次考试机会，是否继续考试`).then(action => {
							this.$router.push({ path: '/exam', query: { id } });
						});
					} else {
						this.message = '考试次数已用完';
						Toast({ message: this.message, position: 'bottom' });
					}
				} else {
					this.message = '考试截止时间已过';
					Toast({ message: this.message, position: 'bottom' });
				}
			} else {
				this.$MessageBox.confirm(`是否进入考试`).then(action => {
					this.$router.push({ path: '/exam', query: { id } });
				});
			}
		}
	},
	onReady() {
		this.GetExamType();
	},
	onLoad() {
		const _this = this;
		uni.getSystemInfo({
			success(res) {
				console.log(res);
				_this.navigationBarHeight = res.statusBarHeight + 44 + 'px';
				_this.leftDrawerHeight = res.windowHeight - res.statusBarHeight - 44 + 'px';
			}
		});
	},
	onReachBottom() {
		if (this.noDataLoading) return;
		this.loading = true;
		this.page++;
		this.GetExamList();
	},
	onPullDownRefresh() {
		this.loading = true;
		this.page = 1;
		this.examData = [];
		this.GetExamList();
	}
};
</script>

<style lang="scss">
@import '../../common/styles/mixins';
.uni-navbar {
	.uni-navbar__content {
		background-color: $brand-primary;
		padding-top: var(--status-bar-height);
	}
	.uni-navbar__header {
		width: 100vw;
	}
	.uni-nav-bar-text {
		@extend %ellipsis;
	}
}

.no_data_img {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
	@include wh(255px, 402px);
}

.channel_list_container {
	box-sizing: border-box;
	width: 75vw;
	height: 100vh;
	background: #fff;
	padding-top: calc(var(--status-bar-height) + 44px);
}

.channel_list {
	background: #fff;

	.channel_list_item {
		font-size: toRpx(28px);
		line-height: toRpx(90px);
		padding: 0 toRpx(40px);
		border-bottom: toRpx(1px) solid #eee;

		.parent_tree_container {
			@include flex();

			.list_expand {
				img {
					width: toRpx(40px);
					height: toRpx(22.5px);
				}
			}
		}

		.common_title_icon {
			margin-right: toRpx(10px);
			@include wh(5px, 28px);
		}
	}
}

.exam_list_container {
	width: 100vw;
	padding-top: var(--status-bar-height);
}

.exam_list {
	.exam_item {
		box-sizing: border-box;
		width: 100%;
		@include flex(flex-start);
		background-color: $fill-base;
		padding: toRpx(20px) toRpx(30px);
		border-bottom: 1px solid $border-color-base;
		.exam_img {
			width: toRpx(90px);

			img {
				@include square(56px);
			}
		}

		.exam_desc {
			width: toRpx(590px);
		}
	}

	.exam_name {
		@include ellipsis_two(2);
		font-size: toRpx(28px);
		font-weight: 500;
		color: $color-text-base;
	}

	.exam_date {
		color: $color-text-secondary;
		line-height: toRpx(64px);
	}

	.exam_num {
		@include flex();
		color: $color-text-secondary;
		line-height: toRpx(44px);
	}

	.bottom {
		@include flex();
		color: $color-text-thirdly;
		line-height: toRpx(44px);
		font-size: toRpx(24px);
		margin-top: toRpx(10px);

		.below {
			color: $brand-error;
		}

		.green {
			color: $brand-success;
		}
	}
}
</style>
