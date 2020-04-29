<template>
	<i-tab-bar i-class="custom_tab_bar" fixed color="#ec4747" :current="current" @change="handleChange">
		<i-tab-bar-item key="home" img="/static/tabs/home.png" current-img="/static/tabs/home-active.png" title="首页" />
		<i-tab-bar-item key="courseCenter" img="/static/tabs/course.png" current-img="/static/tabs/course-active.png" title="课程" />
		<i-tab-bar-item key="examCenter" img="/static/tabs/exam.png" current-img="/static/tabs/exam-active.png" title="考试" />
		<i-tab-bar-item key="personalCenter" img="/static/tabs/person.png" current-img="/static/tabs/person-active.png" title="我的" />
	</i-tab-bar>
</template>

<script>
import tabBar from '@/wxcomponents/iView/tab-bar/index';
import tabBarItem from '@/wxcomponents/iView/tab-bar-item/index';
export default {
	name: 'customTabBar',
	props: ['current'],
	components: {
		'i-tab-bar': tabBar,
		'i-tab-bar-item': tabBarItem
	},
	data() {
		return {
			tabBar: {
				home: '../index/index',
				courseCenter: '../courseCenter/index',
				examCenter: '../examCenter/index',
				personalCenter: '../personalCenter/index'
			}
		};
	},
	methods: {
		handleChange({ mp }) {
			const url = this.tabBar[key];
			uni.switchTab({
				url
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../common/styles/mixins';
.custom_tab_bar {
	height: toRpx(100px);
}
</style>
