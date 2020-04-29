import Fly from 'flyio/dist/npm/wx'

const request = new Fly()

request.config.baseURL = 'https://www.slzll.com'
request.config.timeout = 10000
request.config.headers['Content-Type'] = 'application/json; charset=utf-8'

request.interceptors.request.use((request) => {
	uni.showLoading({
		title: '拼命加载中...'
	})
	let auth = wx.getStorageSync('ASPXAUTH')
	if (auth) {
		request.headers.ASPXAUTH = auth
	}
	return request
})

request.interceptors.response.use(
	(response) => {
		uni.hideLoading()
		// 存储aspxauth身份验证
		let auth = response.headers.aspxauth || response.headers.ASPXAUTH
		if (auth) {
			uni.setStorageSync('ASPXAUTH', auth[0] || auth)
		}
		if (response.data.Type === 401) {
			console.log("跳转页面")
			uni.redirectTo({
				url: '/pages/login/index'
			})
			return
		}
		return response.data
	},
	(err) => {
		uni.hideLoading()
		uni.showToast({
			title: err.message,
			icon: 'none'
		})
		return err
	}
)

export default {
	get(url, data) {
		return request.get(url, data)
	},
	post(url, data) {
		return request.post(url, data)
	}
}
