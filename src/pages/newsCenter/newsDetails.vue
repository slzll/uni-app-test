/** * 文章内容 */
<template>
	<view class="article_container">
		<!--头部-->
		<view class="article_details_title">
			<view class="title">{{ articleDetails.Name }}</view>
			<view class="article_details_desc clearFix">
				<text class="article_details_resource">{{ articleDetails.Source }}</text>
				<text>{{ articleDetails.CreatedDate | dateFilter }}</text>
				<text class="pull-right article_details_author">作者：{{ articleDetails.Author }}</text>
			</view>
		</view>
		<scroll-view><rich-text class="article_details_content" :nodes="nodes"></rich-text></scroll-view>
	</view>
</template>
<script>
import { ArticleDetail } from '@/common/utils/api';
import parseHtml from '@/common/utils/html-parser';

export default {
	data() {
		return {
			articleId: '',
			articleDetails: {
				ArticleName: '',
				AuthorName: '',
				Click: 0,
				Content: '',
				CreateDate: '',
				Source: '',
				IsCollection: 0
			},
			nodes: [],
			showShare: false
		};
	},
	onLoad(option) {
		this.articleId = option.id || '';
	},
	mounted() {
		this.getArticleDetail();
	},
	methods: {
		//文章内容
		async getArticleDetail() {
			let data = await ArticleDetail({ Id: this.articleId });
			this.articleDetails = data.Data;
			this.content = data.Data.Content.replace(/<div([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, '<div')
				.replace(/<div>/gi, '<div style="width: 100%; font-size: 15px; line-height: 25px;">')
			.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, '<p')
				.replace(/<p>/gi, '<p style="width: 100%; font-size: 15px; line-height: 25px;">')
				.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
				.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
				.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
				.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
				.replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img$1 style="max-width: 100%;"');
			this.nodes = parseHtml(this.content);
		}
	}
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../../common/styles/mixins';

.article_container {
	padding: toRpx(30px);
	background-color: $fill-base;

	.article_details_title {
		color: $color-text-secondary;
		border-bottom: toRpx(2px) dashed $border-color-base;
		padding-top: toRpx(10px);

		.title {
			font-weight: 600;
			font-size: toRpx(36px);
			color: $color-text-base;
		}
		.article_details_desc {
			padding: toRpx(20px) 0;
			color: $color-text-thirdly;
			> text {
				margin-right: toRpx(25px);
			}
		}
	}

	.article_details_content {
		padding-top: toRpx(20px);

		img {
			max-width: 100%;
		}
	}
}
</style>
