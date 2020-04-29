/** * 个人中心 */
<template>
	<div class="personalCenter container_bottom">
		<div class="person_top">
			<img src="http://cdn.slzll.com/mini/person_cener_avatar.png" alt="" />
			<div class="my_info">
				<h4>{{ userInfo.Username }}</h4>
				<p>学时：{{ userInfo.TotalCredit }}</p>
			</div>
		</div>
		<uni-list>
			<uni-list-item title="我的学时" thumb="http://cdn.slzll.com/mini/credit.png"></uni-list-item>
			<uni-list-item title="我的课程" thumb="http://cdn.slzll.com/mini/course.png"></uni-list-item>
			<uni-list-item title="我的考试" thumb="http://cdn.slzll.com/mini/exam.png"></uni-list-item>
			<uni-list-item title="设置" thumb="http://cdn.slzll.com/mini/setting.png"></uni-list-item>
		</uni-list>
		<view class="exit"><button class="btn" type="warn" @click="exit">安全退出</button></view>
	</div>
</template>
<script>
import Vue from 'vue';
import { LoginOut, DelBind } from '@/common/utils/api';

export default {
	data() {
		return {
			userInfo: {}
		};
	},
	created() {
		const app = getApp();
		this.userInfo = app.globalData.userInfo;
	},
	methods: {
		async exit() {
			let res = await LoginOut();
			if (res.Type == 1) {
				uni.removeStorageSync('ASPXAUTH');
				uni.redirectTo({
					url: '/pages/login/index'
				});
			}
		},
		async delBind() {
			let data = await DelBind();
			if (data.Type == 1) {
				uni.removeStorageSync('ASPXAUTH');
				uni.redirectTo({
					url: '/pages/login/index'
				});
			}
		}
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../common/styles/mixins';

.personalCenter {
	background-color: $fill-body;

	.person_top {
		width: toRpx(750px);
		height: toRpx(390px);
		padding: 0 toRpx(36px);
		background: url('http://cdn.slzll.com/mini/person_center_bg.png') no-repeat center;
		background-size: toRpx(750px) toRpx(390px);
		@include flex(flex-start);
		align-items: center;

		img {
			@include square(128px);
			margin-top: toRpx(65px);
		}

		.my_info {
			padding-left: toRpx(20px);
			color: $color-text-reverse;
			margin-top: toRpx(65px);

			h4 {
				font-size: toRpx(32px);
				color: $color-text-reverse;
				margin-bottom: toRpx(30px);
			}

			p {
				font-size: toRpx(28px);
			}

			.shuxian {
				margin: 0 toRpx(15px);
			}
		}
	}

	.exit {
		box-sizing: border-box;
		padding: toRpx(50px) toRpx(30px) toRpx(10px) toRpx(30px);
		.btn {
			@include ht-lineHt(80px);
		}
	}
}
</style>
