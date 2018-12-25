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

  // 家长端学生课表查询
  async parentTimetable (query) {
    return await Axios.post('/timetable/parentTimetable.do', query)
  },

  // OSS图片文件上传（MultipartFile）
  async upload (query) {
    return await Axios.post('/oss/upload.do', query)
  },

  // 家长端 - 通知公告详情查询
  async getNotice (query) {
    return await Axios.post('/noticeParent/getNotice.do', query)
  },

  // 家长端 - 通知公告参与 - 活动
  async participationNotice (query) {
    return await Axios.post('/noticeParent/participationNotice.do', query)
  },

  // 家长端 - 学生获奖信息详情查询
  async getStudentPrize (query) {
    return await Axios.post('/studentParent/getStudentPrize.do', query)
  },

  // 家长端 - 学生信息变更新增
  async addStudentChange (query) {
    return await Axios.post('/studentParent/addStudentChange.do', query)
  },

}
