import Vue from 'vue'
import {
	formatDate,
	replaceTime
} from '../utils/index'

Vue.filter('wordLimit', function(value, num) {
	if (!value) {
		return ''
	}
	let des = ''
	if (value.length > num) {
		des = value.substring(0, num) + '...'
		return des
	} else {
		return value
	}
})
Vue.filter('dateFilter', function(value, formate) {
	if (!value) {
		return
	}
	if (!formate) {
		formate = 'yyyy.MM.dd'
	}
	if (typeof value === 'string') {
		let timeNum = replaceTime(value)
		let date = new Date(timeNum)
		return formatDate(date, formate)
	} else if (value instanceof Date) {
		return formatDate(value, formate)
	}
})
Vue.filter('dateFilter2', function(value, formate) {
	if (!value) {
		return ''
	}
	let timeNum = value.replace(/[^0-9-]/ig, '')
	let date = new Date(Number(timeNum))
	// console.log(date,formate);
	return formatDate(date, formate)
})
Vue.filter('formatTime', function(a) {
	var mm = parseInt(a / 60)
	if (mm < 10) mm = '0' + mm
	var ss = parseInt((a - mm * 60) % 60)
	if (ss < 10) ss = '0' + ss
	var length = mm + ':' + ss
	if (a > 0) {
		return length
	} else {
		return 'NaN'
	}
})
