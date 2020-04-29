<template>
  <view class="play_mp4_page">
    <view class="player">
      <video
        class="video_player"
        :src="courseDetails.OnlineUrl"
        :poster="courseDetails.CourseImg"
        :controls="true"
        autoplay
        :enable-play-gesture="true"
        :show-fullscreen-btn="true"
        page-gesture
        object-fit="fill"
      ></video>
    </view>
    <view class="course_detail">
      <view class="tab-bar">
        <view class="uni-tab-item" :class="tabIndex === 0 ? 'uni-tab-item-active' : ''" @click="ontabtap(0)"><text class="uni-tab-item-title">介绍</text></view>
        <view class="uni-tab-item" :class="tabIndex === 1 ? 'uni-tab-item-active' : ''" @click="ontabtap(1)"><text class="uni-tab-item-title">评价</text></view>
      </view>
      <swiper class="swiper-box" :current="tabIndex" style="flex: 1;" :duration="300" @change="ontabchange">
        <swiper-item class="swiper-item"><course-introduce :course-details="courseDetails"></course-introduce></swiper-item>
        <swiper-item class="swiper-item"><course-comment :course-id="courseId" :comment-credit="courseDetails.CommentCredit" @togglePopup="togglePopup"/></swiper-item>
      </swiper>
    </view>
    <!--添加评论-->
    <uni-popup class="comment_popup" type="center" ref="popup">
      <div class="addEvaluate">
        <view class="rate_container">
          <uni-rate :value="addCourseData.Score" @change="handleRateChange"></uni-rate>
          <view class="rate_text">{{ rateText }}</view>
        </view>
        <textarea v-model="addCourseData.Content" type="text" placeholder="评论，100以内"></textarea>
        <text @click.prevent="addComment" class="submit">提交</text>
      </div>
    </uni-popup>
  </view>
</template>

<script>
  import { GetCourseDetail, UploadTimeNode, RelatedCourse, AddCourseComment } from "@/common/utils/api";
  import { timeFormat } from "@/common/utils/index";

  export default {
    data() {
      return {
        tabIndex: 0,
        courseId: "", //课程id
        courseDetails: {
          //课程详情信息
          CourseName: "视频播放",
          OnlineUrl: "",
          CommentCredit: "",
        },
        readyState: 0, //视频是否准备就绪
        duration: 0, //视频时长
        browseScore: 0, //百分比进度
        myVideo: null, //video对象
        lastLocation: 0, //记录上次播放的位置
        progressTime: 0, //记录视频完成进度位置
        updateTimer: 0, //提交进度定时器
        /*相关课程*/
        courseData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
        notesData: [],
        showAddNotes: false, //是否显示添加笔记
        addCourseData: {
          CourseId: this.courseId,
          Content: "",
          Score: 5,
        },
      };
    },
    computed: {
      rateText() {
        const texts = ["较差", "一般", "良好", "推荐", "极好"];
        return texts[this.addCourseData.Score - 1];
      },
    },
    onLoad(options) {
      this.courseId = options.id;
      this.addCourseData.CourseId = this.courseId;
    },
    mounted() {
      this.getCourseDetail();
    },
    methods: {
      //课程详情
      async getCourseDetail(cb) {
        let res = await GetCourseDetail({ Id: this.courseId });
        if (res.Type == 1) {
          this.courseDetails = res.Data;
          this.lastLocation = res.Data.LastLocation;
          this.browseScore = res.Data.BrowseScore;
          if (typeof cb === "function") {
            cb();
          }
        } else {
          uni.showModal({
            title: "提示",
            content: res.Message,
            showCancel: false,
            success(e) {
              uni.navigateBack({
                delta: 1,
              });
            },
          });
        }
      },
      ontabtap(index) {
        this.tabIndex = index;
      },
      ontabchange(e) {
        let index = e.target.current || e.detail.current;
        this.tabIndex = index;
      },
      togglePopup(operate) {
        this.$refs.popup[operate].call();
      },
      handleRateChange({ value }) {
        this.addCourseData.Score = value;
      },
      //添加课程评论
      async addComment() {
        if (this.addCourseData.Content.length > 0 && this.addCourseData.Content.length <= 100) {
          let data = await AddCourseComment(this.addCourseData);
          if (data.Type == 1) {
            this.getCommentList();
            uni.showToast({ title: data.Message, position: "bottom" });
          } else if (data.Type != 401) {
            uni.showModal({
              title: "温馨提示",
              content: data.Message,
              showCancel: false,
            });
          }
          this.$refs.popup.close();
        } else if (this.addCourseData.Content.length == 0) {
          uni.showToast({ title: "请填写评论内容！", position: "bottom" });
        } else {
          uni.showToast({ title: "评论内容不能超过100字！", position: "bottom" });
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "../../common/styles/mixins";
  .play_mp4_page {
    .player {
      .video_player {
        @include wh(750px, 450px);
      }
    }

    .tab-bar {
      width: 100vw;
      height: toRpx(72px);
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
        @include ht-lineHt(72px);
        flex-wrap: nowrap;
      }

      .uni-tab-item-active {
        border-bottom: 1px solid $brand-primary;
        .uni-tab-item-title {
          color: $brand-primary;
        }
      }
    }

    .uni-popup__wrapper-box {
      width: toRpx(600px);
      padding: toRpx(30px);
      background: #fff;
      border-radius: toRpx(10px);
    }
    .addEvaluate {
      padding: toRpx(20px) toRpx(20px) 0 toRpx(20px);
      text-align: center;

      .rate_container {
        text-align: center;
        margin-bottom: toRpx(30px);
        .uni-rate {
          display: inline-block;
          @include flex(center);
        }
        .rate_text {
          margin: toRpx(20px) 0;
          text-align: center;
        }
      }

      textarea {
        display: block;
        resize: none;
        width: 100%;
        height: toRpx(225px);
        font-size: roRpx(24px);
        background: #f7f9fc;
        padding: toRpx(10px);
        text-align: left;
      }

      .submit {
        display: block;
        width: 100%;
        @include ht-lineHt(105px);
        text-align: center;
        background: #fff;
        color: $brand-primary;
        font-size: toRpx(26px);
      }
    }
  }
</style>
