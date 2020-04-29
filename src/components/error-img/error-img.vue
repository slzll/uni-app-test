<template>
	<image class="error-img-component" :class="className" :src="imgSrc" @error="handleError" />
</template>

<script>
export default {
	props: {
		className: {
			type: String
		},
		src: {
			type: String
		},
		errSrc: {
			type: String,
			default: '/static/images/newlyCourse.png'
		}
	},
	data() {
		return {
			imgSrc: this.src ? this.src : this.errSrc
		};
	},
	methods: {
		handleError() {
			this.imgSrc = this.errSrc;
		}
	},
	watch: {
		src(val) {
			this.imgSrc = val;
		}
	}
};
</script>

<style lang="scss">
.error-img-component {
	width: 100%;
	height: 100%;
}
</style>
