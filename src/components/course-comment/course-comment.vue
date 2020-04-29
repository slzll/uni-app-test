<template>
  <div class="evaluate">
    <div class="course_judge_tag" @click="openEvaluateModel">
      <p class="title">评价该课程</p>
      <p class="judge"><uni-rate class="judge_rate" :value="commentCredit" disabled></uni-rate></p>
    </div>
    <div class="split"></div>
    <div class="course_comment">
      <view>
        评价详情
        <span class="course_comment_count">（{{ commentCount }}个评价）</span>
      </view>
      <div class="course_comment_item" v-for="item in commentList" :key="item.CommentId">
        <div class="left_avatar"><error-img :src="item.HeadImg" :error-src="male"></error-img></div>
        <div class="right_content">
          <p class="name">
            <span>{{ item.UserName }}</span>
            <star v-model="item.Star" size="small" disabled></star>
          </p>
          <p class="date">{{ item.Createtime }}</p>
          <p class="content">{{ item.CommentComtent }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { GetCourseCommentList, AddCourseComment } from "@/common/utils/api";

  export default {
    data() {
      return {
        male: "http://cdn.slzll.com/mini/male.png",
        isShowModel: false,
        noData: false,
        immediate: false,
        loading: false,
        page: 1,
        commentList: [],
        commentCount: 0,
        addCourseData: {
          CourseId: this.courseId,
          Content: "",
          Score: 5,
        },
      };
    },
    props: ["courseId", "commentCredit"],
    mounted() {
      this.getCommentList();
    },
    methods: {
      //课程评论列表
      async getCommentList() {
        this.noData = false;
        this.loading = true;
        let data = await GetCourseCommentList({ CourseId: this.courseId, Page: 1, Rows: 10 });
        if (data.Type == 1) {
          let list = data.Data.List;
          this.commentCount = data.Data.TotalCount;
          if (list.length == 0) {
            this.noData = true;
            return;
          }
          this.commentList = list;
          this.loading = false;
          this.page += 1;
        }
      },

      openEvaluateModel() {
        this.$emit("togglePopup", "open");
      },
    },
  };
</script>

<style lang="scss">
  @import "../../common/styles/mixins";

  .evaluate {
    background-color: $fill-base;
    // min-height: calc(100vh-225px);
    min-height: toRpx(700px);

    .course_judge_tag {
      .title {
        @include ht-lineHt(112px);
        text-align: center;
        font-size: 15px;
      }

      .judge {
        height: toRpx(30px);
        margin: 0 auto toRpx(30px);
      }
      .judge_rate {
        @include flex(center);
      }
    }

    .course_comment {
      padding: toRpx(20px) toRpx(30px);

      h1 {
        font-size: 14px;
        line-height: toRpx(60px);
      }

      .course_comment_count {
        color: $color-text-thirdly;
      }
    }

    .course_comment_item {
      @extend %clearFix;
      padding: toRpx(20px) 0 toRpx(30px);
      border-bottom: 1px solid $border-color-light;

      .left_avatar {
        @extend %pull-left;
        width: toRpx(80px);

        img {
          width: toRpx(65px);
        }
      }

      .right_content {
        @extend %pull-left;
        width: toRpx(600px);

        .name {
          font-size: 14px;
          font-weight: 600;
        }

        .star_grade {
          @extend %pull-right;
        }

        .date {
          color: $color-text-thirdly;
          padding: toRpx(10px) 0;
        }

        .content {
          color: $color-text-secondary;
        }
      }
    }

    .split {
      display: block;
      height: toRpx(20px);
      background-color: $fill-body;
    }

    .mb-model_content {
      z-index: 9999;
    }
  }
</style>
