import Axios from 'axios'

export default {

  // 家长端 - 家长信箱新增
  async addPatriarchMailbox (query) {
    return await Axios.post('/mailboxParent/addPatriarchMailbox.do', query)
  },

  // 家长端 - 家长信箱详情查询
  async getPatriarchMailbox (query) {
    return await Axios.post('/mailboxParent/getPatriarchMailbox.do', query)
  },

  // 家长端 - 家长信箱列表分页查询
  async queryPatriarchMailPage (query) {
    return await Axios.post('/mailboxParent/queryPatriarchMailPage.do', query)
  },

  // 家长端 - 家长信箱回复列表分页查询
  async queryPatriarchMailboxReplyPage (query) {
    return await Axios.post('/mailboxParent/queryPatriarchMailboxReplyPage.do', query)
  },

  // 家长端 - 设置当前子女
  async setCurrentChild (query) {
    return await Axios.post('/studentParent/setCurrentChild.do', query)
  },

  // 家长端 - 学生信息列表查询（子女信息）
  async queryStudentList (query) {
    return await Axios.post('/studentParent/queryStudentList.do', query)
  },

  // 家长端 - 学生详情查询
  async getStudent (query) {
    return await Axios.post('/studentParent/getStudent.do', query)
  },

  // 家长端 - 学生获奖信息列表查询
  async queryStudentPrizeList (query) {
    return await Axios.post('/studentParent/queryStudentPrizeList.do', query)
  },

  // 家长端 - 学生获奖信息新增
  async addStudentPrize (query) {
    return await Axios.post('/studentParent/addStudentPrize.do', query)
  },

  // 家长端 - 学生获奖信息编辑
  async updateStudentPrize (query) {
    return await Axios.post('/studentParent/updateStudentPrize.do', query)
  },

  // 家长端 - 学生信息变更新增
  async addStudentChange (query) {
    return await Axios.post('/studentParent/addStudentChange.do', query)
  },

  // 问卷调查列表分页查询 - 家长
  async querySurveyPage (query) {
    return await Axios.post('/survey/querySurveyPage.do', query)
  },

  // 问卷调查详情查询
  async getSurvey (query) {
    return await Axios.post('/survey/getSurvey.do', query)
  },

  // 问卷调查记录新增
  async addSurveyRecord (query) {
    return await Axios.post('/survey/addSurveyRecord.do', query)
  },

  // 家长端-成绩查询
  async queryStudentScore (query) {
    return await Axios.post('/studentScore/queryStudentScore.do', query)
  },

  // 家长端 - 通知公告列表分页查询
  async queryNoticePage (query) {
    return await Axios.post('/noticeParent/queryNoticePage.do', query)
  },

  /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */


  // 查询年级班级列表
  async queryGradeClassList (query) {
    return await Axios.post('/class/queryGradeClassList.do', query)
  },

  // 查询课程信息列表
  async queryCourseInfoList (query) {
    return await Axios.post('/course/queryCourseInfoList.do', query)
  },

  // 家长端学生课表信息查询
  async queryClassTimetable (query) {
    return await Axios.post('/courseParent/queryClassTimetable.do', query)
  },

  // 课节设置列表查询
  async querySectionSetList (query) {
    return await Axios.post('/courseTeacher/querySectionSetList.do', query)
  },

  // 查询年级列表
  async queryGradeList (query) {
    return await Axios.post('/grade/queryGradeList.do', query)
  },

  // 家长端课堂互动记录详情列表查询
  async queryInteractRecordList (classDate) {
    return await Axios.post('/interactParent/queryInteractRecordList.do', {classDate})
  },

  // 家长端课堂点评列表查询
  async queryInteractTagRecordList (query) {
    return await Axios.post('/interactParent/queryInteractTagRecordList.do', query)
  },

  // 家长端课堂互动教案列表查询
  async queryInteractMatList (query) {
    return await Axios.post('/interactParent/queryInteractMatList.do', query)
  },

  // 新增请假记录
  async addLeaveRecord (query) {
    return await Axios.post('/leaveParent/addLeaveRecord.do', query)
  },

  // 请假记录列表查询
  async queryLeaveRecordPage (query) {
    return await Axios.post('/leaveParent/queryLeaveRecordPage.do', query)
  },

  // 教案文件文件夹列表查询
  async queryTeachMatList (query) {
    return await Axios.post('/teachMat/queryTeachMatList.do', query)
  },

  // 新增教案文件文件夹
  async addTeachMat (query) {
    return await Axios.post('/teachMat/addTeachMat.do', query)
  },

  // 删除教案文件文件夹
  async deleteTeachMat (query) {
    return await Axios.post('/teachMat/deleteTeachMat.do', query)
  },

  // 移动教案文件文件夹
  async moveTeachMat (query) {
    return await Axios.post('/teachMat/moveTeachMat.do', query)
  },

  // 复制教案文件文件夹
  async copyTeachMat (query) {
    return await Axios.post('/teachMat/copyTeachMat.do', query)
  },

  // 重命名教案文件文件夹
  async renameTeachMat (query) {
    return await Axios.post('/teachMat/renameTeachMat.do', query)
  },

  // 新增校园风采评论收藏点赞
  async addMienComment (query) {
    return await Axios.post('/mien/addMienComment.do', query)
  },

  // 取消校园风采收藏点赞
  async cancelMienComment (query) {
    return await Axios.post('/mien/cancelMienComment.do', query)
  },

  // 校园风采评论列表分页查询
  async queryMienCommentPage (query) {
    return await Axios.post('/mien/queryMienCommentPage.do', query)
  },

  // 获取校园风采详情
  async getMienInfo (query) {
    return await Axios.post('/mien/getMienInfo.do', query)
  },

  // 新增班级圈 - 家长
  async addMienInfoClass (query) {
    return await Axios.post('/mienParent/addMienInfoClass.do', query)
  },

  // 校园风采班级圈列表分页查询 - 家长
  async queryMienInfoPage (query) {
    return await Axios.post('/mienParent/queryMienInfoPage.do', query)
  },

  // 我发布的校园风采列表分页查询 - 家长
  async queryMyPublishMienInfoPage (query) {
    return await Axios.post('/mienParent/queryMyPublishMienInfoPage.do', query)
  },

  // 我收藏评论点赞的校园风采列表分页查询 - 家长
  async queryMyCommentMienInfoPage (query) {
    return await Axios.post('/mienParent/queryMyCommentMienInfoPage.do', query)
  },

  // 查询通知公告列表分页-家长端
  async queryNoticeInfoList (query) {
    return await Axios.post('/noticeParent/queryNoticeInfoList.do', query)
  },

  // 获取通知公告详情-家长端
  async getNoticeInfoDetail (query) {
    return await Axios.post('/noticeParent/getNoticeInfoDetail.do', query)
  },

  // 获取活动通知详情-家长端
  async getActivityInfoDetail (query) {
    return await Axios.post('/noticeParent/getActivityInfoDetail.do', query)
  },

  // 活动报名-家长端
  async addActivityApply (query) {
    return await Axios.post('/noticeParent/addActivityApply.do', query)
  },

  // 取消活动报名-家长端
  async cancelActivityApply (query) {
    return await Axios.post('/noticeParent/cancelActivityApply.do', query)
  },

  // OSS图片文件上传（base64）
  async uploadBase64 (query) {
    return await Axios.post('/oss/uploadBase64.do', query)
  },

  // OSS图片文件上传（MultipartFile）
  async upload (query) {
    return await Axios.post('/oss/upload.do', query)
  },

  // 查询成绩信息列表
  async queryScoreInfoList (termId) {
    return await Axios.post('/score/queryScoreInfoList.do', {termId})
  },

  // 学生信息详情查询
  async getStudentInfoDetail (query) {
    return await Axios.post('/student/getStudentInfoDetail.do', query)
  },

  // 查询班级学生列表
  async queryClassStudentList (query) {
    return await Axios.post('/student/queryClassStudentList.do', query)
  },

  // 问卷调查详情查询 - 投票信息
  async getSurveyInfoVote (query) {
    return await Axios.post('/survey/getSurveyInfoVote.do', query)
  },

  // 问卷调查详情查询 - 签字证明信息
  async getSurveyInfoCertify (query) {
    return await Axios.post('/survey/getSurveyInfoCertify.do', query)
  },

  // 新增问卷调查记录 - 家长
  // async addSurveyRecord (query) {
  //   return await Axios.post('/surveyParent/addSurveyRecord.do', query)
  // },

  // 问卷调查信息查询 - 家长
  async getSurveyInfo (query) {
    return await Axios.post('/surveyParent/getSurveyInfo.do', query)
  },

  // 问卷调查试卷查询 - 家长
  async getSurveyInfoDocument (query) {
    return await Axios.post('/surveyParent/getSurveyInfoDocument.do', query)
  },

  // 问卷调查详情查询 - 问卷调查 - 家长
  async getSurveyInfoPsq (query) {
    return await Axios.post('/surveyParent/getSurveyInfoPsq.do', query)
  },

  // 查询每日作业信息列表-家长端
  async queryTaskInfoDateList (issueDate) {
    return await Axios.post('/taskParent/queryTaskInfoDateList.do', {issueDate})
  },

  // 发布作业
  async addTaskInfo (query) {
    return await Axios.post('/taskTeacher/addTaskInfo.do', query)
  },

  // 获取作业详情
  async getTaskInfoDetail (query) {
    return await Axios.post('/taskTeacher/getTaskInfoDetail.do', query)
  },

  // 编辑作业
  async updateTaskInfo (query) {
    return await Axios.post('/taskTeacher/updateTaskInfo.do', query)
  },

  // 查询作业历史记录列表
  async queryTaskInfoHistoryList (query) {
    return await Axios.post('/taskTeacher/queryTaskInfoHistoryList.do', query)
  },

  // 查询学期列表
  async querySchoolTermList (query) {
    return await Axios.post('/term/querySchoolTermList.do', query)
  },

  // 查询子女档案列表
  async queryChildRecordList (query) {
    return await Axios.post('/parent/queryChildRecordList.do', query)
  },

  // 切换子女档案（设置主查询）
  async switchChildRecord (query) {
    return await Axios.post('/parent/switchChildRecord.do', query)
  },

  // 校长信箱列表分页查询
  async queryRectorMailPage (query) {
    return await Axios.post('/rector/queryRectorMailPage.do', query)
  },

  // 校长信箱新增
  async addRectorMail (query) {
    return await Axios.post('/rector/addRectorMail.do', query)
  },

  // 校长信箱详情查询
  async getRectorMail (query) {
    return await Axios.post('/rector/getRectorMail.do', query)
  },

  // 校长信箱回复列表分页查询
  async queryRectorReplyPage (query) {
    return await Axios.post('/rector/queryRectorReplyPage.do', query)
  },
  ////////////////////////////////////////////////////////////////////

}
