<template>
	<view class="app_index">
		<view class="header">
			<swiper class="swiper-container" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<view v-for="(item, index) in swiperData" :key="index">
					<swiper-item><error-img :src="item.Icon" class-name="slide-image" /></swiper-item>
				</view>
			</swiper>
		</view>
		<view class="scroll-view-container">
			<scroll-view class="icons_list_container" scroll-x="true">
				<view class="icons_list">
					<view class="icons_list_item">
						<navigator class="icons_list_item_link" hover-class="none" url="/pages/courseCenter/myCourse">
							<img class="icons_list_item_img" src="/static/images/my_course.png" alt />
							<p class="icons_list_item_title">我的课程</p>
						</navigator>
					</view>
					<view class="icons_list_item">
						<a class="icons_list_item_link" hover-class="none" href="pages/notice.html">
							<img class="icons_list_item_img" src="/static/images/notice_ico.png" alt />
							<p class="icons_list_item_title">通知公告</p>
						</a>
					</view>
					<view class="icons_list_item">
						<navigator class="icons_list_item_link" hover-class="none" url="/pages/newsCenter/index">
							<img class="icons_list_item_img" src="/static/images/news_ico.png" alt />
							<p class="icons_list_item_title">资讯中心</p>
						</navigator>
					</view>
					<view class="icons_list_item">
						<a class="icons_list_item_link" hover-class="none" href="pages/rankList.html">
							<img class="icons_list_item_img" src="/static/images/rank_ico.png" alt />
							<p class="icons_list_item_title">排行榜</p>
						</a>
					</view>
					<view class="icons_list_item">
						<a class="icons_list_item_link" hover-class="none" href="pages/classGarden.html">
							<img class="icons_list_item_img" src="/static/images/class_ico.png" alt />
							<p class="icons_list_item_title">班级园地</p>
						</a>
					</view>
					<view class="icons_list_item">
						<a class="icons_list_item_link" hover-class="none" href="pages/ebookList.html">
							<img class="icons_list_item_img" src="/static/images/ebook_ico.png" alt />
							<p class="icons_list_item_title">电子书</p>
						</a>
					</view>
					<view class="icons_list_item">
						<a class="icons_list_item_link" hover-class="none" href="pages/communication.html">
							<img class="icons_list_item_img" src="/static/images/communication_ico.png" alt />
							<p class="icons_list_item_title">交流评论</p>
						</a>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="boundary"></view>
		<view class="recommend_course">
			<view class="common_title">
				<img class="common_title_icon" src="/static/images/red_ico.png" alt />
				<span>课程推荐</span>
			</view>
			<ul class="recommend_course_list">
				<li v-for="item in courseList" :key="item.CourseId" @click="chooseCourse(item.CourseId, item.CourseType, item.OnlineUrl)">
					<a hover-class="none" class="" href="javascript:;">
						<error-img class-name="recommend_course_img" :src="item.CourseImg" />
						<h4>{{ item.CourseName }}</h4>
						<span class="name">讲师：{{ item.TeacherName || '无' }}</span>
						<span class="credit red">{{ item.Credit }}学分</span>
					</a>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
import { GetLink, Login, GetCourseInfoList } from '@/common/utils/api';
import checkLogin from '@/common/mixins/checkLogin';

export default {
	mixins: [checkLogin],
	data() {
		return {
			userInfo: {},
			courseList: [],
			swiperData: [],
			indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 1000,
			username: 'zll',
			password: '123456',
			code: ''
		};
	},
	methods: {
		async login() {
			let res = await Login({
				Code: this.code,
				Account: this.username,
				Password: this.password,
				Mac: this.username
			});
			console.log(res);
		},
		getUserInfo() {
			// 调用登录接口
			uni.login({
				success: () => {
					uni.getUserInfo({
						success: res => {
							this.userInfo = res.userInfo;
							console.log(this.userInfo);
						}
					});
				}
			});
		},
		async getSwipeLink() {
			try {
				let res = await GetLink({ page: 1, rows: 10 });
				this.swiperData = res.Data;
			} catch (e) {
				console.log(e);
			}
		},
		async getCourseList() {
			let res = await GetCourseInfoList();
			this.courseList = res.Data.List;
		}
	},
	onLoad() {
		this.getSwipeLink();
		this.getCourseList();
	}
};
</script>

<style lang="scss">
@import '../../common/styles/mixins';

.header {
	width: 100%;

	.swiper-container {
		width: 100%;
		height: toRpx(360px);

		.slide-image {
			width: 100%;
			height: 100%;
		}
	}
}

.scroll-view-container {
	width: 100%;

	.icons_list_container {
		width: 100%;

		.icons_list {
			@include flex();
			width: 100%;
			white-space: nowrap;

			.icons_list_item {
				padding-top: toRpx(40px);

				.icons_list_item_link {
					@include wh(150px, 162px);
					text-align: center;
				}

				.icons_list_item_img {
					width: toRpx(84px);
					height: toRpx(83px);
				}

				.icons_list_item_title {
					font-size: toRpx(28px);
				}
			}
		}
	}
}

.boundary {
	width: 100%;
	height: toRpx(20px);
	background: $bg-color;
}

.common_title {
	@include flex(flex-start);
	align-items: center;

	.common_title_icon {
		@include wh(5px, 28px);
		margin-right: toRpx(15px);
	}
}

.recommend_course {
	width: 100%;
	padding: toRpx(30px);

	.recommend_course_list {
		@include flex(flex-start);
		flex-wrap: wrap;

		li {
			margin-top: toRpx(20px);
			float: left;
			width: toRpx(330px);

			&:nth-child(even) {
				margin-left: toRpx(30px);
			}

			a {
				width: 100%;

				.recommend_course_img {
					width: 100%;
					height: toRpx(178px);
				}

				h4 {
					font-size: toRpx(28px);
					line-height: 2;
					@extend %ellipsis;
				}

				span {
					font-size: toRpx(24px);
					line-height: 1.5;

					&.name {
						float: left;
						color: #999;
					}

					&.credit {
						float: right;
						color: $brand-primary;
					}
				}
			}
		}
	}
}
</style>
