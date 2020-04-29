import Vue from 'vue'
import App from './App'
import './common/filters/index'
import customTabBar from './components/custom-tab-bar/custom-tab-bar'
import navBar from './components/nav-bar/nav-bar'
import errorImg from './components/error-img/error-img'
import newsList from './components/news-list/news-list'
import courseList from './components/course-list/course-list'
import courseIntroduce from './components/course-introduce/course-introduce'
import courseComment from './components/course-comment/course-comment'

Vue.config.productionTip = false

Vue.component('custom-tab-bar', customTabBar)
Vue.component('nav-bar', navBar)
Vue.component('error-img', errorImg)
Vue.component('news-list', newsList)
Vue.component('course-list', courseList)
Vue.component('course-introduce', courseIntroduce)
Vue.component('course-comment', courseComment)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
