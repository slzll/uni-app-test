<template>
	<div class="course_list">
		<div class="course_item" v-for="(item, index) in courseData" :key="index" @click="toPlay(item.CourseType, item.CourseId)">
			<div class="course_img">
				<error-img class="img" :src="item.CourseImg"></error-img>
				<img v-if="item.CourseType == 'JYAicc'" class="tip" src="/static/images/jingpin.png" alt="" />
				<img v-if="item.CourseType == 'Mp4'" class="tip" src="/static/images/MP4.png" alt="" />
				<img v-if="item.CourseType == 'h5'" class="tip" src="/static/images/H5.png" alt="" />
			</div>
			<div class="course_desc">
				<div class="course_name">{{ item.CourseName }}</div>
				<div class="course_teacher">主讲人：{{ item.TeacherName || '无' }}</div>
				<div class="course_bottom">
					<span class="highlight">{{ item.Credit }}学时</span>
					<span v-if="!myCourse" class="choose_status" :class="item.SelectFlag == '已选' && 'course_selected'">{{ item.SelectFlag }}</span>
					<span v-if="myCourse" class="progress">进度：{{ parseInt(item.BrowseScore) }}%</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import play from '@/common/mixins/play';

export default {
	mixins: [play],
	data() {
		return {};
	},
	props: {
		courseData: Array,
		myCourse: Boolean
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../common/styles/mixins';

.course_list {
	.course_item {
		padding: toRpx(20px) toRpx(30px);
		@extend %clearFix;
		background-color: $fill-base;
		border-bottom: 1px solid $border-color-base;
	}

	.course_img {
		@extend %pull-left;
		position: relative;
		@include wh(258px, 146px);

		.img {
			width: 100%;
			height: toRpx(146px);
		}

		.tip {
			position: absolute;
			right: toRpx(5px);
			top: toRpx(5px);
			@include wh(57px, 27px);
			@include borderRadius(5px);
		}
	}

	.course_desc {
		@extend %pull-left;
		width: toRpx(415px);
		padding-left: toRpx(15px);
	}

	.course_name {
		@include ellipsis_two(2);
		height: toRpx(72px);
		font-weight: 500;
		color: $color-text-base;
	}

	.course_teacher {
		color: $color-text-secondary;
		line-height: toRpx(40px);
	}

	.choose_status {
		@extend %pull-right;
		@include wh(64px, 36px);
		background-color: $color-icon-base;
		color: $color-text-reverse;
		text-align: center;
		@include borderRadius(5px);
	}

	.course_selected {
		background-color: $brand-success;
	}

	.progress {
		@extend %pull-right;
		color: $color-text-base;
	}
}
</style>
