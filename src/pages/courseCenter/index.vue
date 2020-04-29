<template>
	<view id="app_courseCenter" class="app_courseCenter">
		<uni-nav-bar class="custom_uni_navbar" left-icon="bars" :title="title" color="white" background-color="#ec4747" fixed="true" @clickLeft="toggleLeft"></uni-nav-bar>
		<view class="container">
			<i-drawer i-class="drawer_container" mode="left" :visible="showLeft" @close="toggleLeft">
				<scroll-view scroll-y>
					<view class="channel_list_container">
						<ul class="channel_list">
							<li class="channel_list_item" v-for="(item, i) in channelData" :key="item.ChannelId">
								<view class="parent_tree_container" @click="changeChannel(item)">
									<view class="channel_list_link common_title ellipsis">
										<img class="common_title_icon" src="/static/images/red_ico.png" alt="" />
										<text>{{ item.ChannelName }}</text>
									</view>
									<view v-if="item.Nodes && item.Nodes.length > 0" @click="item.showNodes = !item.showNodes" class="list_expand">
										<img v-show="!item.showNodes" src="/static/images/dropdown.png" alt="" />
										<img v-show="item.showNodes" src="/static/images/pullup.png" alt="" />
									</view>
								</view>
								<ul v-show="item.showNodes" class="channel_list">
									<li class="channel_list_item" v-for="nodeItem in item.Nodes" :key="nodeItem.ChannelId">
										<view class="ellipsis common_title" @click="getCourseInfo(nodeItem.ChannelId)">
											<img class="common_title_circle" src="/static/images/red_cicle.png" alt="" />
											<text>{{ nodeItem.ChannelName }}</text>
										</view>
									</li>
								</ul>
							</li>
						</ul>
					</view>
				</scroll-view>
			</i-drawer>
			<scroll-view class="course_list_container" v-if="!noData" scroll-y="true" lower-threshold="0">
				<course-list :course-data="courseData"></course-list>
				<uni-load-more :status="loadingStatus"></uni-load-more>
			</scroll-view>
			<img class="no_data_img" v-if="noData" src="/static/images/no_data.png" alt="" />
		</view>
	</view>
</template>

<script>
import { GetChannelInfoList, GetCourseInfoList } from '@/common/utils/api';
import checkLogin from '@/common/mixins/checkLogin';

export default {
	mixins: [checkLogin],
	data() {
		return {
			title: '课程中心',
			navigationBarHeight: '',
			leftDrawerHeight: '',
			courseData: [],
			channelData: [],
			showLeft: false,
			noData: false,
			loading: false,
			noDataLoading: false,
			activeId: null,
			page: 1
		};
	},
	computed: {
		loadingStatus() {
			return this.noDataLoading ? 'noMore' : this.loading ? 'loading' : 'more';
		}
	},
	methods: {
		toggleLeft() {
			this.showLeft = !this.showLeft;
		},
		async getChannelList() {
			let res = await GetChannelInfoList();
			this.channelData = res.Data.List.map(item => {
				item.showNodes = false;
				return item;
			});
			this.getCourseInfo(this.channelData[0].Id);
		},
		async getCourseInfo(ChannelId) {
			this.noData = false;
			if (ChannelId && this.activeId !== ChannelId) {
				this.noDataLoading = false;
				this.activeId = ChannelId;
				this.page = 1;
				this.courseData = [];
			}
			let res = await GetCourseInfoList({ ChannelId: this.activeId, Page: this.page });
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
			this.courseData = [...this.courseData, ...list];
			if (list.length < 10) {
				this.noDataLoading = true;
			}
		},
		changeChannel(item) {
			this.title = item.ChannelName;
			this.getCourseInfo(item.ChannelId);
		}
	},
	onReady() {
		this.getChannelList();
	},
	onReachBottom() {
		if (this.noDataLoading) return;
		this.loading = true;
		this.page++;
		this.getCourseInfo();
	},
	onPullDownRefresh() {
		this.loading = true;
		this.page = 1;
		this.courseList = [];
		this.getCourseInfo();
	}
};
</script>

<style lang="scss">
@import '../../common/styles/mixins';

/*-------左上角按钮-------*/
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

.course_list_container {
	width: 100vw;
	padding-top: var(--status-bar-height);
}
</style>
