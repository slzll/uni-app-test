function formatNumber(n) {
	const str = n.toString()
	return str[1] ? str : `0${str}`
}

export function formatTime(date) {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	const t1 = [year, month, day].map(formatNumber).join('/')
	const t2 = [hour, minute, second].map(formatNumber).join(':')

	return `${t1} ${t2}`
}

/**
 * @desc 日期格式化
 * @date 2018-02-10 16:15:03
 * @param {*} date 要格式化的日期
 * @param {string} fmt 'yyyy/MM/dd hh:mm:ss'
 * @return {string} x string return.
 */
export function formatDate(date, fmt = 'yyyy/MM/dd hh:mm:ss') {
	if (!date) return ''
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	let padLeftZero = function(str) {
		return ('00' + str).substr(str.length)
	}

	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
		}
	}
	return fmt
}

/**
 * @desc 时间格式修改，（Safari浏览器，手机中的IE）
 */
export const replaceTime = (time) => time.replace(/-/ig, '/')

/**
 * @desc 秒转换为hh:mm:ss
 * @date 2018-02-10 16:08:56
 * @param {number|string} a 秒
 * @return {string} 返回hh:mm:ss时间
 */
export const timeFormat = (a) => {
	let length = ''
	if (a && a > 0) {
		let hh = parseInt(a / 3600)
		if (hh < 10) hh = '0' + hh
		let mm = parseInt((a - hh * 3600) / 60)
		if (mm < 10) mm = '0' + mm
		let ss = parseInt((a - hh * 3600) % 60)
		if (ss < 10) ss = '0' + ss
		length = hh.toString() + mm.toString() + ss.toString()
	}
	return length
}

export default {
	formatNumber,
	formatTime
}
