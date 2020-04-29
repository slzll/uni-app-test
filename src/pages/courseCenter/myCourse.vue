/** * 我的课程 */
<template>
	<div class="my_course container_top">
		<view class="top-tabbar fixed tab-bar">
			<view class="uni-tab-item" :class="tabIndex === 0 ? 'uni-tab-item-active' : ''" @click="ontabtap(0)"><text class="uni-tab-item-title">未完成</text></view>
			<view class="uni-tab-item" :class="tabIndex === 1 ? 'uni-tab-item-active' : ''" @click="ontabtap(1)"><text class="uni-tab-item-title">已完成</text></view>
		</view>
		<swiper class="swiper-box" :current="tabIndex" style="flex: 1;" :duration="300" @change="ontabchange">
			<swiper-item class="swiper-item">
				<scroll-view class="course_list_container" v-if="!noUfDataBg" scroll-y="true" lower-threshold="0" @scrolltolower="loadMore">
					<course-list :course-data="courseUnFinishData" :my-course="true"></course-list>
					<uni-load-more :status="ufLoadingStatus"></uni-load-more>
				</scroll-view>
				<view class="no-data" v-if="noUfDataBg"></view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<scroll-view class="course_list_container" v-if="!noFDataBg" scroll-y="true" lower-threshold="0" @scrolltolower="loadMore">
					<course-list :course-data="courseFinishData" :my-course="true"></course-list>
					<uni-load-more :status="fLoadingStatus"></uni-load-more>
				</scroll-view>
				<view class="no-data" v-if="noFDataBg"></view>
			</swiper-item>
		</swiper>
	</div>
</template>
<script>
import { GetUserCourseInfoList } from '@/common/utils/api';

export default {
	data() {
		return {
			tabIndex: 0,
			courseFinishData: [],
			courseUnFinishData: [],
			noFDataBg: false,
			noFData: false,
			noUfDataBg: false,
			noUfData: false,
			loading: false,
			immediate: false,
			unFinishPage: 1,
			finishPage: 1
		};
	},
	computed: {
		ufLoadingStatus() {
			return this.noUfData ? 'noMore' : this.loading ? 'loading' : 'more';
		},
		fLoadingStatus() {
			return this.noFData ? 'noMore' : this.loading ? 'loading' : 'more';
		}
	},
	mounted() {
		this.getMyFinishCourse();
		this.getMyUnFinishCourse();
	},
	methods: {
		//已完成课程
		async getMyFinishCourse() {
			if (this.noFData) return;
			this.loading = true;
			let data = await GetUserCourseInfoList({ Finish: '1', Page: this.finishPage });
			this.loading = false;
			if (data.Type == 1) {
				let list = data.Data.List;

				if (list.length == 0 && this.finishPage > 1) {
					this.noFData = true;
					return;
				}
				if (list.length == 0 && this.finishPage == 1) {
					this.noFDataBg = true;
					return;
				}
				this.courseFinishData = this.courseFinishData.concat(list);
				this.finishPage += 1;
				if (list.length < 10) {
					this.noFData = true;
					return;
				}
			}
		},
		//未完成课程
		async getMyUnFinishCourse() {
			if (this.noUfData) return;
			this.loading = true;
			let data = await GetUserCourseInfoList({ Finish: '0', Page: this.unFinishPage });
			this.loading = false;
			if (data.Type == 1) {
				let list = data.Data.List;
				if (list.length == 0 && this.unFinishPage > 1) {
					this.noUfData = true;
					return;
				}
				if (list.length == 0 && this.unFinishPage == 1) {
					this.noUfDataBg = true;
					return;
				}
				this.courseUnFinishData = this.courseUnFinishData.concat(list);
				this.unFinishPage += 1;
				if (list.length < 10) {
					this.noUfData = true;
					return;
				}
			}
		},
		ontabtap(index) {
			this.tabIndex = index;
		},
		ontabchange(e) {
			let index = e.target.current || e.detail.current;
			this.tabIndex = index;
		},
		loadMore() {
			if (this.tabIndex === 0) {
				this.getMyUnFinishCourse();
			} else {
				this.getMyFinishCourse();
			}
		}
	},
	onReachBottom() {
		if (this.tabIndex === 0) {
			this.getMyUnFinishCourse();
		} else {
			this.getMyFinishCourse();
		}
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../common/styles/mixins';

.top-tabbar {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: toRpx(92px);
	@include flex(flex-start);
	align-items: center;
	border-bottom: toRpx(2px) solid $uni-border-color;
	.uni-tab-item {
		width: 50%;
		flex-wrap: nowrap;
		text-align: center;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: toRpx(30px);
		@include ht-lineHt(92px);
		flex-wrap: nowrap;
	}

	.uni-tab-item-active {
		.uni-tab-item-title {
			color: #007aff;
		}
	}
}

.my_course {
	height: 100vh;
	.swiper-box {
		height: 100%;
		.course_list_container {
			height: 100%;
		}
	}
}
</style>
