/** * 新闻中心 */
<template>
	<div class="newsCenter">
		<uni-nav-bar class="custom_uni_navbar" color="white" background-color="#ec4747" fixed="true">
			<view class="custom_uni_navbar_title">{{ articleTitle }}</view>
			<view class="custom_uni_navbar_left" slot="left">
				<uni-icons type="arrowleft" size="20" color="white" @click="goBack"></uni-icons>
				<uni-icons type="bars" size="26" color="white" @click="toggleNav"></uni-icons>
			</view>
		</uni-nav-bar>
		<view class="container">
			<i-drawer i-class="drawer_container" mode="left" :visible="showSlide" @close="toggleNav">
				<scroll-view scroll-y>
					<view class="channel_list_container">
						<ul class="channel_list">
							<li class="channel_list_item" v-for="(item, i) in articleCategory" :key="item.Id">
								<view class="parent_tree_container" @click="searchArticle(item)">
									<view class="channel_list_link common_title ellipsis">
										<img class="common_title_icon" src="/static/images/red_ico.png" alt="" />
										<text>{{ item.Name }}</text>
									</view>
									<view v-if="item.Nodes && item.Nodes.length > 0" @click="item.showNodes = !item.showNodes" class="list_expand">
										<img v-show="!item.showNodes" src="/static/images/dropdown.png" alt="" />
										<img v-show="item.showNodes" src="/static/images/pullup.png" alt="" />
									</view>
								</view>
								<ul v-show="item.showNodes" class="channel_list">
									<li class="channel_list_item" v-for="nodeItem in item.Nodes" :key="nodeItem.Id">
										<view class="ellipsis common_title" @click="searchArticle(nodeItem)">
											<img class="common_title_circle" src="/static/images/red_cicle.png" alt="" />
											<text>{{ nodeItem.Name }}</text>
										</view>
									</li>
								</ul>
							</li>
						</ul>
					</view>
				</scroll-view>
			</i-drawer>
			<scroll-view class="course_list_container" v-if="!noDataBg" scroll-y="true" lower-threshold="0">
				<news-list :news-data="articleData"></news-list>
				<i-load-more v-if="loading" :loading="loading"></i-load-more>
				<i-load-more v-if="noData" tip="暂无数据" :loading="false"></i-load-more>
			</scroll-view>
			<img class="no_data_img" v-if="noDataBg" src="/static/images/no_data.png" alt="" />
		</view>
	</div>
</template>
<script>
import Vue from 'vue';
import { GetArticleChannelInfoList, GetArticleInfoList } from '@/common/utils/api';

export default {
	data() {
		return {
			articleTitle: '资讯中心',
			showSlide: false,
			articleCategory: [],
			categoryId: 0,
			categoryCode: '',
			articleData: [],
			loading: false,
			noDataLoading: false,
			page: 1,
			noData: false,
			noDataBg: false
		};
	},
	onLoad(option) {
		this.categoryId = option.id;
		this.categoryCode = option.categoryCode;
		this.articleTitle = option.title;
	},
	mounted() {
		this.getArticleCategory();
		this.getArticleList();
	},
	methods: {
		goBack() {
			uni.navigateBack({
				delta: 1
			});
		},
		toggleNav() {
			this.showSlide = !this.showSlide;
		},
		showChange(val) {
			this.showSlide = val;
		},
		//文章分类
		async getArticleCategory() {
			let data = await GetArticleChannelInfoList({ ParentId: 0 });
			if (data.Type == 1) {
				this.articleCategory = data.Data.List;
			}
		},
		//文章列表
		async getArticleList() {
			this.noDataBg = false;
			this.loading = true;
			let params = this.categoryId
				? {
						CategoryId: this.categoryId,
						Page: this.page
				  }
				: {
						CategoryCode: this.categoryCode,
						Page: this.page
				  };
			let data = await GetArticleInfoList(params);
			this.loading = false;
			if (data.Type == 1) {
				let list = data.Data.List;
				if (list.length == 0 && this.page > 1) {
					this.noData = true;
					return;
				}
				if (list.length == 0 && this.page == 1) {
					this.noDataBg = true;
					return;
				}
				this.articleData = this.articleData.concat(list);

				this.page += 1;
			}
		},
		searchArticle(data) {
			this.page = 1;
			this.categoryId = data.Id;
			this.articleTitle = data.Name;
			this.showSlide = false;
			this.articleData = [];
			this.getArticleList();
		}
	},
	onReachBottom() {
		if (this.noData) return;
		this.loading = true;
		this.getArticleList();
	},
	onPullDownRefresh() {
		this.loading = true;
		this.page = 1;
		this.articleData = [];
		this.getArticleList();
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../common/styles/mixins';

.newsCenter {
	width: 100vw;
	height: 100vh;

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

	.custom_uni_navbar_title {
		width: 100%;
		text-align: center;
	}

	.custom_uni_navbar_left {
		@include flex(flex-start);
		align-items: center;
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

	.category_icon {
		margin-left: toRpx(10px);
	}
}
</style>
