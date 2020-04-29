import fetch from './fetch'

const API_URL = '/jy365/api'
const Mobile = API_URL + '/mobile'
const Wechat = API_URL + '/wechat'

export const Api = {
	Login: {
		url: API_URL + '/Login',
		data: {}
	},
	GetLink: {
		url: Mobile + '/GetLink',
		data: {
			page: 1,
			rows: 10
		}
	},
	GetCourseInfoList: {
		url: Mobile + '/GetCourseInfoList',
		data: {
			ChannelId: -3,
			Keyword: '',
			Order: 'desc',
			Page: 1,
			Rows: 10,
			Sort: 'Id',
			TeacherName: ''
		}
	},
	GetUserInfo: {
		url: Mobile + '/GetUserInfo',
		data: {}
	},
	GetChannelInfoList: {
		url: Mobile + '/GetChannelInfoList',
		data: {
			ParentId: 0
		}
	},
	GetExamType: {
		url: Mobile + '/GetExamType',
		data: {
			ParentId: 0
		}
	},
	GetExamList: {
		url: Mobile + '/GetExamList',
		data: {
			ExamType: 'All',
			Keyword: '',
			Page: 1,
			Rows: 10,
			TypeId: 0
		}
	},
	DelBind: {
		url: Mobile + '/DelBind',
		data: {
			Mac: ''
		}
	},
	LoginOut: {
		url: Mobile + '/LoginOut',
		data: {
			Mac: ''
		}
	},
	// 热门课程
	WeekCourse: {
		url: Mobile + '/WeekCourse',
		data: {
			TeacherName: '',
			ChannelId: '',
			Keyword: '',
			Sort: 'Id',
			Order: 'desc',
			Page: '1',
			Rows: '10'
		}
	},
	// 获取评论 0:文章，1：课程，2：电子书，3：学习圈，4：成果展示
	GetCommentList: {
		url: Mobile + '/GetCommentList',
		data: {
			objType: '',
			objId: ''
		}
	},
	// 获取考试题
	GetExam: {
		url: Mobile + '/GetExam',
		data: {
			Id: ''
		}
	},
	// 提交考试题
	UpdateUserExam: {
		url: Mobile + '/UpdateUserExam',
		data: {
			ExamId: '',
			Data: null
		}
	},
	// 消息中心
	GetMessageCenter: {
		url: Mobile + '/GetMessageCenter',
		data: {
			Page: 1,
			Rows: 10,
			Keyword: ''
		}
	},
	// 通知内容
	GetNoticeInfoContent: {
		url: Mobile + '/GetNoticeInfoContent',
		data: {}
	},
	// 课程详情
	GetCourseDetail: {
		url: Mobile + '/GetCourseDetail',
		data: {
			Id: ''
		}
	},
	// 历史记录 Type => All:表示所有， Today:表示今天记录，Earlier:表示更早
	GetHistoryCourse: {
		url: Mobile + '/GetHistoryCourse',
		data: {
			Type: '',
			Keyword: '',
			Sort: 'sort',
			Order: 'desc',
			Page: 1,
			Rows: 20
		}
	},
	// 用户课程列表 Finish => 1：完成课程，0：未完成课程 ,2：表示全部
	GetUserCourseInfoList: {
		url: Mobile + '/GetUserCourseInfoList',
		data: {
			Finish: '2',
			Keyword: '',
			Page: 1,
			Rows: 10
		}
	},
	// 文章频道
	GetArticleChannelInfoList: {
		url: Mobile + '/GetArticleChannelInfoList',
		data: {
			ParentId: ''
		}
	},
	// 文章列表
	GetArticleInfoList: {
		url: Mobile + '/GetArticleInfoList',
		data: {
			CategoryId: '',
			Keyword: '',
			CategoryCode: '',
			Page: '1',
			Rows: '10'
		}
	},
	// 文章详情
	GetArticleDetail: {
		url: Mobile + '/GetArticleDetail',
		data: {
			Id: ''
		}
	},
	// 文章详情
	ArticleDetail: {
		url: Wechat + '/ArticleDetail',
		data: {
			Id: ''
		}
	},
	// 通知公告
	GetNoticeInfoList: {
		url: Mobile + '/GetNoticeInfoList',
		data: {
			Keyword: '',
			Page: '1',
			Rows: '10'
		}
	},
	// 排行榜 RankType => 1：学时， 2：课程，3：单位
	GetRankInfoList: {
		url: Mobile + '/GetRankInfoList',
		data: {
			RankType: '',
			TotalCount: '20'
		}
	},
	// 培训班分类
	GetTrainingTypeList: {
		url: Mobile + '/GetTrainingTypeList',
		data: {}
	},
	// 培训班列表 JoinStatus => Join：参加； UnJoin：未参加 ；UnAudit：审核中；
	GetTrainingClass: {
		url: Mobile + '/GetTrainingClass',
		data: {
			TypeId: '',
			TrainName: '',
			JoinStatus: '',
			Page: '1',
			Rows: '20'
		}
	},
	// 培训班详情
	GetTrainingDetail: {
		url: Mobile + '/GetTrainingDetail',
		data: {
			Id: ''
		}
	},
	// 签到列表
	GetClassUserSignList: {
		url: Mobile + '/GetClassUserSignList',
		data: {
			TrainingId: '',
			TodayFlag: '',
			Order: 'desc',
			Page: '1',
			Rows: '20'
		}
	},
	// 获取微信签名
	GetWechatWxAuthModel: {
		url: Mobile + '/GetWechatWxAuthModel',
		data: {
			Url: ''
		}
	},
	// 签到或签退
	TrainingSignIn: {
		url: Mobile + '/TrainingSignIn',
		data: {
			TrainingId: '',
			SignType: '',
			Longitude: '',
			Latitude: '',
			Position: ''
		}
	},
	// 取消报名培训班
	UpdateTrainingStudentdown: {
		url: Mobile + '/UpdateTrainingStudentdown',
		data: {
			Id: ''
		}
	},
	// 报名培训班
	UpdateTrainingStudentup: {
		url: Mobile + '/UpdateTrainingStudentup',
		data: {
			Id: ''
		}
	},
	// 电子书
	GetBookInfoList: {
		url: Mobile + '/GetBookInfoList',
		data: {
			Keyword: '',
			BookTypeId: '',
			BookTypeCode: '',
			Page: '1',
			Rows: '10'
		}
	},
	// 电子书章节
	GetBookChapterInfoList: {
		url: Mobile + '/GetBookChapterInfoList',
		data: {
			BookId: '',
			Page: '1',
			Rows: '30'
		}
	},
	// 电子书章节内容
	GetBookChapterContent: {
		url: Mobile + '/GetBookChapterContent',
		data: {
			Id: ''
		}
	},
	// 留言类型
	CommentType: {
		url: Mobile + '/CommentType',
		data: {}
	},
	// 添加留言
	AddMessage: {
		url: Mobile + '/AddMessage',
		data: {
			MainId: '',
			ParentId: '',
			Title: '',
			Content: '',
			ClassCode: ''
		}
	},
	// 修改用户信息
	/*
	* {
	*   "Account": "sample string 1",
	    "Name": "sample string 2",
	    "DepartmentName": "sample string 3",
	    "GroupId": 4,
	    "IdCard": "sample string 5",
	    "Email": "sample string 6",
	    "Grade": 7,
	    "Business": "sample string 8",
	    "Sex": "sample string 9",
	    "Nation": "sample string 10",
	    "Degree": 11,
	    "Party": "sample string 12",
	    "Birthday": "2017-12-07 14:11:25",
	    "Tel": "sample string 14",
	    "Mobile": "sample string 15",
	    "SmgCode": "sample string 16"
	* }
	* */
	UpdateUserInfo: {
		url: Mobile + '/UpdateUserInfo',
		data: {}
	},
	// 获取职级列表
	GetGradeList: {
		url: Mobile + '/GetGradeList',
		data: {}
	},
	// 获取学历列表
	GetDegreeList: {
		url: Mobile + '/GetDegreeList',
		data: {}
	},
	// 修改手机号
	UpdateMobile: {
		url: Mobile + '/UpdateMobile',
		data: {
			OldMobile: '',
			NewMobile: '',
			SmgCode: ''
		}
	},
	// 发送验证码
	SendMsg: {
		url: Mobile + '/SendMsg',
		data: {
			MobileNo: ''
		}
	},
	// 修改密码
	SetUserPassword: {
		url: Mobile + '/SetUserPassword',
		data: {
			OldPassword: '',
			Password: ''
		}
	},
	// 单位列表
	GetGroupList: {
		url: Mobile + '/GetGroupList',
		data: {
			ParentId: '1'
		}
	},
	// 注册
	Register: {
		url: Mobile + '/Register',
		data: {
			Account: '',
			Password: '',
			Name: '',
			GroupId: '',
			IdCard: '',
			Grade: '',
			Mobile: '',
			SmgCode: '',
			PortalId: 1
		}
	},
	// 讨论列表
	DiscussList: {
		url: Mobile + '/DiscussList',
		data: {
			MainId: '0',
			Sort: 'CreateDate',
			Order: 'desc',
			Page: '1',
			Rows: '10'
		}
	},
	// 添加讨论
	AddDiscuss: {
		url: Mobile + '/AddDiscuss',
		data: {
			MainId: '0',
			ParentId: '0',
			Content: ''
		}
	},
	// 课程评论
	GetCourseCommentList: {
		url: Mobile + '/GetCourseCommentList',
		data: {
			CourseId: '',
			Keyword: '',
			Page: '1',
			Rows: '10'
		}
	},
	// 添加课程评论
	AddCourseComment: {
		url: Mobile + '/AddCourseComment',
		data: {
			CourseId: '',
			Content: '',
			Score: ''
		}
	},
	// 添加评论 objType 0：文章、1：课程、2：电子书、3：学习圈
	AddComment: {
		url: Mobile + '/AddComment',
		data: {
			ObjType: 1,
			ObjId: 2,
			Content: '',
			Star: ''
		}
	},
	// 提交精品课程进度
	SyncUserStudyData: {
		url: Mobile + '/SyncUserStudyData',
		data: {
			CourseId: '',
			Data: {
				NodeId: '',
				Time: '',
				Status: ''
			}
		}
	},
	// 提交Mp4课程进度
	UploadTimeNode: {
		url: Mobile + '/UploadTimeNode',
		data: {
			CourseId: '',
			TimeNode: ''
		}
	},
	// 相关课程
	RelatedCourse: {
		url: Mobile + '/RelatedCourse',
		data: {
			CourseId: '',
			Page: 1,
			Rows: 10
		}
	},
	// 成果展示分类
	GetProductionTypeInfoList: {
		url: Mobile + '/GetProductionTypeInfoList',
		data: {
			ParentId: '',
			ParentCode: ''
		}
	},
	// 成果展示列表
	GetProductionInfoList: {
		url: Mobile + '/GetProductionInfoList',
		data: {
			CategoryId: '',
			CategoryCode: '0',
			Keyword: '',
			Page: 1,
			Rows: 10
		}
	},
	// 成果展示详情
	GetProductionInfo: {
		url: Mobile + '/GetProductionInfo',
		data: {
			Id: ''
		}
	},
	// 学习档案
	GetUserRecordList: {
		url: Mobile + '/GetUserRecordList',
		data: {
			Page: 1,
			Rows: 10,
			OrderType: '1',
			OrderDesc: 'desc'
		}
	},
	// 收藏列表
	GetCollectionList: {
		url: Mobile + '/GetCollectionList',
		data: {
			startTime: '',
			endTime: ''
		}
	},
	// 添加收藏 objType 0：文章、1：课程、2：电子书、3：学习圈
	AddCollectionList: {
		url: Mobile + '/AddCollectionList',
		data: {
			CollectionName: '',
			Remark: '',
			ObjId: '',
			ObjType: 0
		}
	},
	// 删除收藏
	DeleteCollectionList: {
		url: Mobile + '/DeleteCollectionList',
		data: {
			IdItem: []
		}
	},
	// 考试记录
	GetPaperList: {
		url: Mobile + '/GetPaperList',
		data: {}
	},
	// 课程笔记列表
	GetExperience: {
		url: Mobile + '/GetExperience',
		data: {
			CourseId: ''
		}
	},
	// 添加课程笔记
	AddExperience: {
		url: Mobile + '/AddExperience',
		data: {
			CourseId: '',
			ExperienceContent: '',
			ExperienceTitle: ''
		}
	},
	// 课程笔记详情
	GetExperienceById: {
		url: Mobile + '/GetExperienceById  ',
		data: {
			ExperienceId: ''
		}
	},
	// 获取收件箱，发件箱  0：收件、1：发件
	GetUserMessage: {
		url: Mobile + '/GetUserMessage',
		data: {
			MessageType: ''
		}
	},
	// 根据用户名查询用户
	GetUserByName: {
		url: Mobile + '/GetUserByName',
		data: {
			UserName: ''
		}
	},
	// 发送站内信
	AddUserMessage: {
		url: Mobile + '/AddUserMessage',
		data: {
			ToUser: '',
			MessageContent: '',
			MessageTitle: ''
		}
	},
	// 站内信详情
	GetMessage: {
		url: Mobile + '/GetMessage',
		data: {
			MessageId: ''
		}
	},
	// 获取微信签名code
	Auth: {
		url: Mobile + '/Auth',
		data: null
	},
	// 点赞 0：文章 1：课程 2：电子书 3：学习圈 4：成果展示
	AddUserAiss: {
		url: Mobile + '/AddUserAiss',
		data: {
			ObjId: '',
			ObjType: 4
		}
	},
	GetTrainingPhoto: {
		url: Mobile + '/GetTrainingPhoto',
		data: {}
	}
}

export const Login = (data) => fetch.post(Api.Login.url, { ...Api.Login.data,
	...data
})
// 首页轮播图
export const GetLink = (data) => fetch.post(Api.GetLink.url, { ...Api.GetLink.data,
	...data
})
// 课程列表
export const GetCourseInfoList = (data) => fetch.post(Api.GetCourseInfoList.url, { ...Api.GetCourseInfoList.data,
	...data
})
// 用户信息
export const GetUserInfo = (data) => fetch.post(Api.GetUserInfo.url, { ...Api.GetUserInfo.data,
	...data
})
// 课程频道
export const GetChannelInfoList = (data) => fetch.post(Api.GetChannelInfoList.url, { ...Api.GetChannelInfoList.data,
	...data
})
// 考试类型
export const GetExamType = (data) => fetch.post(Api.GetExamType.url, { ...Api.GetExamType.data,
	...data
})
// 考试列表
export const GetExamList = (data) => fetch.post(Api.GetExamList.url, { ...Api.GetExamList.data,
	...data
})
// 退出登录
export const LoginOut = (data) => fetch.post(Api.LoginOut.url, { ...Api.LoginOut.data,
	...data
})
// 解除微信绑定
export const DelBind = (data) => fetch.post(Api.DelBind.url, { ...Api.DelBind.data,
	...data
})


/**
 * 获取考试题
 */
export const GetExam = (data) => fetch.post(Api.GetExam.url, { ...Api.GetExam.data,
	...data
})

/**
 * 提交考试题
 */
export const UpdateUserExam = (data) => fetch.post(Api.UpdateUserExam.url, { ...Api.UpdateUserExam.data,
	...data
})

/**
 * 消息中心
 */
export const GetMessageCenter = (data) => fetch.post(Api.GetMessageCenter.url, { ...Api.GetMessageCenter.data,
	...data
})

/**
 * 通知内容
 */
export const GetNoticeInfoContent = (data) => fetch.get(Api.GetNoticeInfoContent.url + '/' + data.Id, { ...Api.GetNoticeInfoContent
	.data,
	...data
})

/**
 * 课程详情
 */
export const GetCourseDetail = (data) => fetch.post(Api.GetCourseDetail.url, { ...Api.GetCourseDetail.data,
	...data
})

/**
 *  历史记录 Type => All:表示所有， Today:表示今天记录，Earlier:表示更早
 */
export const GetHistoryCourse = (data) => fetch.post(Api.GetHistoryCourse.url, { ...Api.GetHistoryCourse.data,
	...data
})

/**
 *  用户课程列表 Finish => 1：完成课程，0：未完成课程 ,2：表示全部
 */
export const GetUserCourseInfoList = (data) => fetch.post(Api.GetUserCourseInfoList.url, { ...Api.GetUserCourseInfoList
	.data,
	...data
})

/**
 *  文章频道
 */
export const GetArticleChannelInfoList = (data) => fetch.post(Api.GetArticleChannelInfoList.url, { ...Api.GetArticleChannelInfoList
	.data,
	...data
})

/**
 *  文章列表
 */
export const GetArticleInfoList = (data) => fetch.post(Api.GetArticleInfoList.url, { ...Api.GetArticleInfoList.data,
	...data
})

/**
 *  文章详情
 */
export const GetArticleDetail = (data) => fetch.post(Api.GetArticleDetail.url + '?Id=' + data.Id)

/**
 *  文章详情
 */
export const ArticleDetail = (data) => fetch.post(Api.ArticleDetail.url, data)

/**
 *  通知公告
 */
export const GetNoticeInfoList = (data) => fetch.post(Api.GetNoticeInfoList.url, { ...Api.GetNoticeInfoList.data,
	...data
})

/**
 *  排行榜 RankType => 1：学时， 2：课程，3：单位
 */
export const GetRankInfoList = (data) => fetch.post(Api.GetRankInfoList.url, { ...Api.GetRankInfoList.data,
	...data
})

/**
 *  培训班分类
 */
export const GetTrainingTypeList = (data) => fetch.post(Api.GetTrainingTypeList.url, { ...Api.GetTrainingTypeList.data,
	...data
})

/**
 *  培训班列表 JoinStatus => Join：参加； UnJoin：未参加 ；UnAudit：审核中；
 */
export const GetTrainingClass = (data) => fetch.post(Api.GetTrainingClass.url, { ...Api.GetTrainingClass.data,
	...data
})

/**
 *  培训班详情
 */
export const GetTrainingDetail = (data) => fetch.post(Api.GetTrainingDetail.url, { ...Api.GetTrainingDetail.data,
	...data
})

/**
 *  签到列表
 */
export const GetClassUserSignList = (data) => fetch.post(Api.GetClassUserSignList.url, { ...Api.GetClassUserSignList.data,
	...data
})

/**
 *  获取微信签名
 */
export const GetWechatWxAuthModel = (data) => fetch.post(Api.GetWechatWxAuthModel.url, { ...Api.GetWechatWxAuthModel.data,
	...data
})

/**
 *  签到或签退
 */
export const TrainingSignIn = (data) => fetch.post(Api.TrainingSignIn.url, { ...Api.TrainingSignIn.data,
	...data
})

/**
 *  取消报名
 */
export const UpdateTrainingStudentdown = (data) => fetch.post(Api.UpdateTrainingStudentdown.url, { ...Api.UpdateTrainingStudentdown
	.data,
	...data
})

/**
 *  报名培训班
 */
export const UpdateTrainingStudentup = (data) => fetch.post(Api.UpdateTrainingStudentup.url, { ...Api.UpdateTrainingStudentup
	.data,
	...data
})

/**
 *  电子书
 */
export const GetBookInfoList = (data) => fetch.post(Api.GetBookInfoList.url, { ...Api.GetBookInfoList.data,
	...data
})

/**
 *  电子书章节
 */
export const GetBookChapterInfoList = (data) => fetch.post(Api.GetBookChapterInfoList.url, { ...Api.GetBookChapterInfoList
	.data,
	...data
})

/**
 *  电子书章节内容
 */
export const GetBookChapterContent = (data) => fetch.post(Api.GetBookChapterContent.url, { ...Api.GetBookChapterContent
	.data,
	...data
})

/**
 *  留言类型
 */
export const CommentType = (data) => fetch.post(Api.CommentType.url, { ...Api.CommentType.data,
	...data
})

/**
 *  添加留言
 */
export const AddMessage = (data) => fetch.post(Api.AddMessage.url, { ...Api.AddMessage.data,
	...data
})

/**
 *  修改用户信息
 */
export const UpdateUserInfo = (data) => fetch.post(Api.UpdateUserInfo.url, { ...Api.UpdateUserInfo.data,
	...data
})

/**
 *  获取职级列表
 */
export const GetGradeList = (data) => fetch.post(Api.GetGradeList.url, { ...Api.GetGradeList.data,
	...data
})

/**
 *  获取学历列表
 */
export const GetDegreeList = (data) => fetch.post(Api.GetDegreeList.url, { ...Api.GetDegreeList.data,
	...data
})

/**
 *  修改手机号
 */
export const UpdateMobile = (data) => fetch.post(Api.UpdateMobile.url, { ...Api.UpdateMobile.data,
	...data
})

/**
 *  发送验证码
 */
export const SendMsg = (data) => fetch.post(Api.SendMsg.url, { ...Api.SendMsg.data,
	...data
})

/**
 *  修改密码
 */
export const SetUserPassword = (data) => fetch.post(Api.SetUserPassword.url, { ...Api.SetUserPassword.data,
	...data
})

/**
 *  单位列表
 */
export const GetGroupList = (data) => fetch.post(Api.GetGroupList.url, { ...Api.GetGroupList.data,
	...data
})

/**
 *  注册
 */
export const Register = (data) => fetch.post(Api.Register.url, { ...Api.Register.data,
	...data
})

/**
 *  讨论列表
 */
export const DiscussList = (data) => fetch.post(Api.DiscussList.url, { ...Api.DiscussList.data,
	...data
})

/**
 *  添加讨论
 */
export const AddDiscuss = (data) => fetch.post(Api.AddDiscuss.url, { ...Api.AddDiscuss.data,
	...data
})

/**
 *  课程评论
 */
export const GetCourseCommentList = (data) => fetch.post(Api.GetCourseCommentList.url, { ...Api.GetCourseCommentList.data,
	...data
})

/**
 *  添加课程评论
 */
export const AddCourseComment = (data) => fetch.post(Api.AddCourseComment.url, { ...Api.AddCourseComment.data,
	...data
})

/**
 *  添加评论 objType 0：文章、1：课程、2：电子书、3：学习圈
 */
export const AddComment = (data) => fetch.post(Api.AddComment.url, { ...Api.AddComment.data,
	...data
})

/**
 *  提交精品课程进度
 */
export const SyncUserStudyData = (data) => fetch.post(Api.SyncUserStudyData.url, { ...Api.SyncUserStudyData.data,
	...data
})

/**
 *  提交Mp4课程进度
 */
export const UploadTimeNode = (data) => fetch.post(Api.UploadTimeNode.url, { ...Api.UploadTimeNode.data,
	...data
})

/**
 *  相关课程
 */
export const RelatedCourse = (data) => fetch.post(Api.RelatedCourse.url, { ...Api.RelatedCourse.data,
	...data
})

/**
 *  成果展示分类
 */
export const GetProductionTypeInfoList = (data) => fetch.post(Api.GetProductionTypeInfoList.url, { ...Api.GetProductionTypeInfoList
	.data,
	...data
})

/**
 *  成果展示列表
 */
export const GetProductionInfoList = (data) => fetch.post(Api.GetProductionInfoList.url, { ...Api.GetProductionInfoList
	.data,
	...data
})

/**
 *  成果展示详情
 */
export const GetProductionInfo = (data) => fetch.post(Api.GetProductionInfo.url, { ...Api.GetProductionInfo.data,
	...data
})

/**
 *  学习档案
 */
export const GetUserRecordList = (data) => fetch.post(Api.GetUserRecordList.url, { ...Api.GetUserRecordList.data,
	...data
})

/**
 *  收藏列表
 */
export const GetCollectionList = (data) => fetch.post(Api.GetCollectionList.url, { ...Api.GetCollectionList.data,
	...data
})

/**
 *  添加收藏 objType 0：文章、1：课程、2：电子书、3：学习圈
 */
export const AddCollectionList = (data) => fetch.post(Api.AddCollectionList.url, { ...Api.AddCollectionList.data,
	...data
})

/**
 *  删除收藏
 */
export const DeleteCollectionList = (data) => fetch.post(Api.DeleteCollectionList.url, { ...Api.DeleteCollectionList.data,
	...data
})

/**
 *  考试记录
 */
export const GetPaperList = (data) => fetch.post(Api.GetPaperList.url, { ...Api.GetPaperList.data,
	...data
})

/**
 *  课程笔记列表
 */
export const GetExperience = (data) => fetch.post(Api.GetExperience.url, { ...Api.GetExperience.data,
	...data
})

/**
 *  添加课程笔记
 */
export const AddExperience = (data) => fetch.post(Api.AddExperience.url, { ...Api.AddExperience.data,
	...data
})

/**
 *  课程笔记详情
 */
export const GetExperienceById = (data) => fetch.post(Api.GetExperienceById.url, { ...Api.GetExperienceById.data,
	...data
})

/**
 *  获取收件箱，发件箱  0：收件、1：发件
 */
export const GetUserMessage = (data) => fetch.post(Api.GetUserMessage.url, { ...Api.GetUserMessage.data,
	...data
})

/**
 *  根据用户名查询用户
 */
export const GetUserByName = (data) => fetch.post(Api.GetUserByName.url, { ...Api.GetUserByName.data,
	...data
})

/**
 *  发送站内信
 */
export const AddUserMessage = (data) => fetch.post(Api.AddUserMessage.url, { ...Api.AddUserMessage.data,
	...data
})

/**
 *  站内信详情
 */
export const GetMessage = (data) => fetch.post(Api.GetMessage.url, { ...Api.GetMessage.data,
	...data
})

/**
 *  获取微信签名code
 */
export const Auth = (data) => fetch.post(Api.Auth.url, { ...Api.Auth.data,
	...data
})

/**
 *  点赞 0：文章 1：课程 2：电子书 3：学习圈 4：成果展示
 */
export const AddUserAiss = (data) => fetch.post(Api.AddUserAiss.url, { ...Api.AddUserAiss.data,
	...data
})

export const GetTrainingPhoto = (data) => fetch.post(Api.GetTrainingPhoto.url, data)
