/** * 课程介绍 */
<template>
  <div class="course_introduce">
    <div class="course_detail_name">
      <p class="title">{{ courseDetails.CourseName }}</p>
      <div class="clearFix">
        <uni-rate class="pull-left course_rate" :value="courseDetails.CommentCredit" size="14" disabled="true"></uni-rate>
        <span class="pull-left userCount">{{ courseDetails.UserCount }}人学过</span>
        <span class="pull-right">主讲人：{{ courseDetails.TeacherName || "无" }}</span>
      </div>
    </div>
    <div class="course_detail_list">
      <div class="detail_item">
        <p class="detail_item_left">
          <span class="label">课程分类：</span>
          {{ courseDetails.ChannelName }}
        </p>
        <p class="detail_item_right">
          <span class="label">学&emsp;&emsp;时：</span>
          {{ courseDetails.Credit }}
        </p>
      </div>
      <div class="detail_item">
        <p class="detail_item_left">
          <span class="label">时&emsp;&emsp;长：</span>
          {{ courseDetails.Duration }}分钟
        </p>
        <p class="detail_item_right">
          <span class="label">进&emsp;&emsp;度：</span>
          {{ courseDetails.BrowseScore }}
        </p>
      </div>
    </div>
    <div class="split"></div>
    <div class="course_detail_desc">
      <h4>
        <span class="primary_line"></span>
        <span>课程介绍</span>
      </h4>
      <p>{{ courseDetails.Description }}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      courseDetails: {
        type: Object,
        required: true,
      },
    },
    methods: {},
    watch: {},
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/styles/mixins";

  .course_introduce {
    background-color: $fill-base;

    .course_detail_name {
      margin: 0 toRpx(30px);
      border-bottom: 1px solid $border-color-base;
      line-height: toRpx(40px);
      font-size: 14px;

      .title {
        font-size: 15px;
        line-height: toRpx(84px);
      }

      .userCount {
        margin-left: toRpx(30px);
        font-size: 12px;
        color: $color-text-thirdly;
      }

      .clearFix {
        padding: toRpx(20px) 0;
      }
    }

    .course_rate {
      position: relative;
      top: toRpx(18px);
    }
    .course_detail_list {
      .detail_item {
        line-height: toRpx(60px);
        padding: 0 toRpx(30px);
        font-size: 14px;
        @extend %clearFix;

        .label {
          color: $color-text-thirdly;
          margin-right: toRpx(20px);
        }
      }

      .detail_item_left {
        @extend %pull-left;
        @extend %ellipsis;
        width: 55%;
      }

      .detail_item_right {
        @extend %pull-left;
        @extend %ellipsis;
        width: 45%;
        padding-left: toRpx(40px);
      }
    }

    .course_detail_desc {
      padding: toRpx(30px);

      h4 {
        font-size: 14px;
      }
    }

    .split {
      display: block;
      height: toRpx(20px);
      background-color: $fill-body;
    }
  }
</style>
