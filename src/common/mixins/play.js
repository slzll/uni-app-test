export default {
	methods: {
		toPlay(type, id) {
			if (!type) {
				uni.showModal({
					title: "提示",
					content: "课程类型错误,请联系管理员",
					showCancel: false
				})
				return
			}
			if (type === 'Mp4') {
				uni.navigateTo({
					url: '/pages/courseCenter/playMp4?id=' + id
				})
			} else if (type === 'JYAicc') {
				uni.navigateTo({
					url: '/pages/courseCenter/playJYAicc?id=' + id
				})

			} else if (type === 'h5') {
				uni.navigateTo({
					url: '/pages/courseCenter/playH5?id=' + id
				})
			}
		}
	}
}
