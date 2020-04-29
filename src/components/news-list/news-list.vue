/** * 新闻列表 */
<template>
	<div class="news_list">
		<div class="news_item" v-for="item in newsData" :key="item.ArticleId" @click="goArticleDetail(item.ArticleId)">
			<div class="news_img"><error-img :src="item.ArticleImg" :err-src="noNews"></error-img></div>
			<div class="news_desc">
				<div class="news_name">{{ item.ArticleTitle }}</div>
				<div class="news_time">{{ item.ArticleCreateDate | dateFilter('yyyy.MM.dd') }}</div>
			</div>
		</div>
	</div>
</template>
<script>
import play from '@/common/mixins/play';

export default {
	mixins: [play],
	data() {
		return {
			noNews: 'http://cdn.slzll.com/mini/latestNews.png'
		};
	},
	props: {
		newsData: Array
	},
	methods: {
		goArticleDetail(id) {
			uni.navigateTo({
				url: '/pages/newsCenter/newsDetails?id=' + id
			});
		}
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../common/styles/mixins';

.news_list {
	.news_item {
		padding: toRpx(30px);
		@extend %clearFix;
		background-color: $fill-base;
		border-bottom: 1px solid $border-color-base;
	}

	.news_img {
		@extend %pull-left;
		position: relative;
		width: toRpx(204px);

		image {
			width: 100%;
			height: toRpx(150px);
		}

		.tip {
			position: absolute;
			right: toRpx(5px);
			top: toRpx(5px);
			@include wh(50px, 27px);
		}
	}

	.news_desc {
		@extend %pull-left;
		width: toRpx(480px);
		padding-left: toRpx(15px);
	}

	.news_name {
		@include ellipsis_two(2);
		font-size: toRpx(30px);
		font-weight: 500;
		height: toRpx(90px);
		padding-top: toRpx(10px);
	}

	.news_time {
		color: $color-text-thirdly;
		margin-top: toRpx(20px);
	}
}
</style>
