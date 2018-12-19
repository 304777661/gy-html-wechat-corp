import Axios from 'axios'

export default {

  // 教师端 - 学生详情查询
  async getStudent (query) {
    return await Axios.post('/studentTeacher/getStudent.do', query)
  },

  // 查询学期列表
  async querySchoolTermList (query) {
    return await Axios.post('/schoolTerm/querySchoolTermList.do', query)
  },

  // 考试批次列表
  async queryExamBatchList (query) {
    return await Axios.post('/examBatch/queryExamBatchList.do', query)
  },

  // 教师课表查询
  async queryTeacherTimetableList (query) {
    return await Axios.post('/timetable/queryTeacherTimetableList.do', query)
  },

  // 通知公告列表分页查询
  async queryNoticePage (query) {
    return await Axios.post('/noticeTeacher/queryNoticePage.do', query)
  },

  // 家访详情
  async getHomeVisitingWX (query) {
    return await Axios.post('/homevisitingWX/getHomeVisitingWX.do', query)
  },

  // 家访记录列表
  async queryHomeVisitingWXList (query) {
    return await Axios.post('/homevisitingWX/queryHomeVisitingWXList.do', query)
  },

  // 家访记录增加
  async addHomeVisitingWX (query) {
    return await Axios.post('/homevisitingWX/addHomeVisitingWX.do', query)
  },

  // 教师端 - 学生信息列表查询 - 班主任
  async queryStudentListByAdviser (query) {
    return await Axios.post('/studentTeacher/queryStudentListByAdviser.do', query)
  },

  // 工资日期列表查询（使用自然月 -- 作废）
  async querySalaryMonthList (query) {
    return await Axios.post('/salary/querySalaryMonthList.do', query)
  },

  // 工资详情查询 - 个人的工资信息可能查询不到
  async getSalary (query) {
    return await Axios.post('/salary/getSalary.do', query)
  },

  // 教师端 - 家长信箱回复新增
  async addPatriarchMailboxReply (query) {
    return await Axios.post('/mailboxTeacher/addPatriarchMailboxReply.do', query)
  },

  // 教师端 - 家长信箱详情查询
  async getPatriarchMailbox (query) {
    return await Axios.post('/mailboxTeacher/getPatriarchMailbox.do', query)
  },

  // 教师端 - 家长信箱列表分页查询
  async queryPatriarchMailPage (query) {
    return await Axios.post('/mailboxTeacher/queryPatriarchMailPage.do', query)
  },

  // 教师端 - 家长信箱回复列表分页查询
  async queryPatriarchMailboxReplyPage (query) {
    return await Axios.post('/mailboxTeacher/queryPatriarchMailboxReplyPage.do', query)
  },

  // 教师端 - 学生信息列表分页查询
  async queryStudentPage (query) {
    return await Axios.post('/studentTeacher/queryStudentPage.do', query)
  },

  // 教师端 - 学生详情查询
  async getStudent (query) {
    return await Axios.post('/studentTeacher/getStudent.do', query)
  },

  // 查询年级、班级列表
  async queryClassCascadeList (query) {
    return await Axios.post('/dict/queryClassCascadeList.do', query)
  },

  // 会议预订信息列表分页查询
  async queryMeetingPage (query) {
    return await Axios.post('/meetingOrder/queryPage.do', query)
  },

  // 新增会议室预订
  async addMeetingOrder (query) {
    return await Axios.post('/meetingOrder/addOrder.do', query)
  },

  // 获取登录用户信息
  async getSessionUserDetail (query) {
    return await Axios.post('/auth/getSessionUserDetail.do', query)
  },

  // 指定部门下的通讯录列表查询(不包含家长)
  async queryAddressBookItemListByOrgId (query) {
    return await Axios.post('/addressBook/queryAddressBookItemListByOrgId.do', query)
  },

  // 会议室时段使用情况查询
  async queryTimeIntervalUsageList (query) {
    return await Axios.post('/meetingOrder/queryTimeIntervalUsageList.do', query)
  },

  // 会议室列表查询
  async queryMeetingRoomList (query) {
    return await Axios.post('/meetingRoom/queryMeetingRoomList.do', query)
  },

  // 教师端 - 通知公告列表分页查询 - 教研团队
  async queryTeachGroupPage (query) {
    return await Axios.post('/noticeTeacher/queryTeachGroupPage.do', query)
  },

  // 教研活动列表分页查询
  async queryTeachGroupActivityPage (query) {
    return await Axios.post('/teachGroupActivity/queryTeachGroupActivityPage.do', query)
  },

  // 教研活动删除
  async deleteTeachGroupActivity (query) {
    return await Axios.post('/teachGroupActivity/deleteTeachGroupActivity.do', query)
  },

  // 教研活动详情查询
  async getTeachGroupActivity (query) {
    return await Axios.post('/teachGroupActivity/getTeachGroupActivity.do', query)
  },

  // 查询教研组列表
  async queryTeachGroupList (query) {
    return await Axios.post('/teachGroupActivity/queryTeachGroupList.do', query)
  },

  // 教师端 - 通知公告详情查询
  async getNotice (query) {
    return await Axios.post('/noticeTeacher/getNotice.do', query)
  },

  /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   */

  // 查询年级班级列表
  async queryGradeClassList (gradeId) {
    return await Axios.post('/class/queryGradeClassList.do', {gradeId})
  },

  // 查询课程信息列表
  async queryCourseInfoList () {
    return await Axios.post('/course/queryCourseInfoList.do', {})
  },

  // 教师个人课表信息查询-教师端
  async queryPersonalTimetable () {
    return await Axios.post('/courseTeacher/queryPersonalTimetable.do', {})
  },

  // 班级课表信息查询-教师端
  async queryClassTimetable (classId) {
    return await Axios.post('/courseTeacher/queryClassTimetable.do', {classId})
  },

  // 课节设置列表查询
  async queryCourseSectionSetList () {
    return await Axios.post('/courseTeacher/queryCourseSectionSetList.do', {})
  },

  // 查询年级列表
  async queryGradeList () {
    return await Axios.post('/grade/queryGradeList.do', {})
  },

  // 课堂互动记录列表查询-教师端
  async queryInteractRecordList (classDate) {
    return await Axios.post('/interactTeacher/queryInteractRecordList.do', {classDate})
  },

  // 课堂互动记录列详情查询-教师端
  async getInteractDetail (interactRecordId) {
    return await Axios.post('/interactTeacher/getInteractDetail.do', {interactRecordId})
  },

  // 课堂互动记录保存-教师端
  async saveInteract (query) {
    return await Axios.post('/interactTeacher/saveInteract.do', query)
  },

  // 课堂点评标签列表查询-教师端
  async queryInteractTagList () {
    return await Axios.post('/interactTeacher/queryInteractTagList.do', {})
  },

  // 课堂互动历史列表查询-教师端
  async queryInteractHistoryList (query) {
    return await Axios.post('/interactTeacher/queryInteractHistoryList.do', query)
  },

  // 请假记录列表查询 - 教师
  async queryLeaveList (query) {
    return await Axios.post('/leaveTeacher/queryLeaveRecordPage.do', query)
  },

  // 请假记录确认 - 教师
  async verifyLeave (leaveRecordId) {
    return await Axios.post('/leaveTeacher/verifyLeaveRecord.do', {leaveRecordId})
  },

  // 教案文件文件夹列表查询
  async queryTeachMatList (query) {
    return await Axios.post('/teachMat/queryTeachMatList.do', query)
  },

  // 教案文件夹列表查询
  async queryTeachMatDirectoryList (fileId) {
    return await Axios.post('/teachMat/queryTeachMatDirectoryList.do', {fileId})
  },

  // 新增教案文件文件夹
  async addTeachMat (query) {
    return await Axios.post('/teachMat/addTeachMat.do', query)
  },

  // 删除教案文件文件夹
  async deleteTeachMat (fileId) {
    return await Axios.post('/teachMat/deleteTeachMat.do', {fileId})
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
  async getMienInfo (mienId) {
    return await Axios.post('/mien/getMienInfo.do', {mienId})
  },

  // 新增校园风采 - 教师
  async addMienInfoSchool (query) {
    return await Axios.post('/mienTeacher/addMienInfoSchool.do', query)
  },

  // 新增班级圈 - 教师
  async addMienInfoClass (query) {
    return await Axios.post('/mienTeacher/addMienInfoClass.do', query)
  },

  // 校园风采班级圈列表分页查询 - 教师
  async queryMienInfoPage (query) {
    return await Axios.post('/mienTeacher/queryMienInfoPage.do', query)
  },

  // 我发布的校园风采列表分页查询 - 教师
  async queryMyPublishMienInfoPage (query) {
    return await Axios.post('/mienTeacher/queryMyPublishMienInfoPage.do', query)
  },

  // 我收藏评论点赞的校园风采列表分页查询 - 教师
  async queryMyCommentMienInfoPage (query) {
    return await Axios.post('/mienTeacher/queryMyCommentMienInfoPage.do', query)
  },

  // 查询通知公告列表-教师端
  async queryNoticeInfoList (query) {
    return await Axios.post('/noticeTeacher/queryNoticeInfoList.do', query)
  },

  // 获取通知公告详情-教师端
  async getNoticeInfoDetail (noticeId) {
    return await Axios.post('/noticeTeacher/getNoticeInfoDetail.do', {noticeId})
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
  async queryScoreInfoList (query) {
    return await Axios.post('/score/queryScoreInfoList.do', query)
  },

  // 学生信息查询-教师端
  async queryStudentInfoList () {
    return await Axios.post('/student/queryStudentInfoList.do', {})
  },

  // 学生信息详情查询
  async getStudentInfoDetail (studentId) {
    return await Axios.post('/student/getStudentInfoDetail.do', {studentId})
  },

  // 查询班级学生列表
  async queryClassStudentList (classId) {
    return await Axios.post('/student/queryClassStudentList.do', {classId})
  },

  // 问卷调查详情查询 - 投票信息
  async getSurveyInfoVote (surveyId) {
    return await Axios.post('/survey/getSurveyInfoVote.do', {surveyId})
  },

  // 问卷调查详情查询 - 签字证明信息
  async getSurveyInfoCertify (query) {
    return await Axios.post('/survey/getSurveyInfoCertify.do', query)
  },

  // 新增问卷调查 - 投票 - 教师
  async addSurveyVote (query) {
    return await Axios.post('/surveyTeacher/addSurveyVote.do', query)
  },

  // 新增问卷调查 - 问卷调查 - 教师
  async addSurveyPsq (query) {
    return await Axios.post('/surveyTeacher/addSurveyPsq.do', query)
  },

  // 新增问卷调查 - 签字证明 - 教师
  async addSurveyCertify (query) {
    return await Axios.post('/surveyTeacher/addSurveyCertify.do', query)
  },

  // 问卷调查列表分页查询 - 教师
  async querySurveyPage (query) {
    return await Axios.post('/surveyTeacher/querySurveyPage.do', query)
  },

  // 问卷调查信息查询 - 教师
  async getSurveyInfo (surveyId) {
    return await Axios.post('/surveyTeacher/getSurveyInfo.do', {surveyId})
  },

  // 问卷调查详情查询 - 问卷调查 - 教师
  async getSurveyInfoPsq (query) {
    return await Axios.post('/surveyTeacher/getSurveyInfoPsq.do', query)
  },

  // 问卷调查记录列表查询 - 教师
  async querySurveyRecordPage (query) {
    return await Axios.post('/surveyTeacher/querySurveyRecordPage.do', query)
  },

  // 查询作业信息列表-教师端
  async queryTaskInfoList (issueDate) {
    return await Axios.post('/taskTeacher/queryTaskInfoList.do', {issueDate})
  },

  // 发布作业
  async addTaskInfo (query) {
    return await Axios.post('/taskTeacher/addTaskInfo.do', query)
  },

  // 获取作业详情
  async getTaskInfoDetail (taskId) {
    return await Axios.post('/taskTeacher/getTaskInfoDetail.do', {taskId})
  },

  // 编辑作业
  async updateTaskInfo (query) {
    return await Axios.post('/taskTeacher/updateTaskInfo.do', query)
  },

  // 查询作业历史记录列表
  async queryTaskInfoHistoryList (queryTime) {
    return await Axios.post('/taskTeacher/queryTaskInfoHistoryList.do', {queryTime})
  },

  // 查询教师任教班级列表
  async queryTeachingClassList () {
    return await Axios.post('/teacher/queryTeachingClassList.do', {})
  },

  // 查询教师授课信息列表
  async queryLectureInfoList () {
    return await Axios.post('/courseTeacher/queryLectureInfoList.do', {})
  },

  ////////////////////////////////////////////////////////////////

}
