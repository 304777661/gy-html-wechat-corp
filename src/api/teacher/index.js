import Axios from 'axios'

export default {

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
    return await Axios.post('/teachGroup/queryTeachGroupList.do', query)
  },

  // 教师端 - 通知公告详情查询
  async getNotice (query) {
    return await Axios.post('/noticeTeacher/getNotice.do', query)
  },

  // 查看教师信息
  async getTeacherDetail (query) {
    return await Axios.post('/teacher/getTeacherDetail.do', query)
  },

  // 查询教师工作经历列表
  async queryTeacherResumeList (query) {
    return await Axios.post('/teacher/queryTeacherResumeList.do', query)
  },

  // 获奖情况列表
  async queryTeachingResearchList (query) {
    return await Axios.post('/teacher/queryTeachingResearchList.do', query)
  },

  // 教研活动新增
  async addTeachGroupActivity (query) {
    return await Axios.post('/teachGroupActivity/addTeachGroupActivity.do', query)
  },

  // 会议订单详情查询
  async getMeetingOrderDetail (query) {
    return await Axios.post('/meetingOrder/getMeetingOrderDetail.do', query)
  },

  // 编辑教师
  async updateTeacher (query) {
    return await Axios.post('/teacher/updateTeacher.do', query)
  },

  // 班级课表查询
  async queryClassTimetable (query) {
    return await Axios.post('/timetable/queryClassTimetable.do', query)
  },

  // 班级考评-常规检查
  async queryAssessRoutine (query) {
    return await Axios.post('/assess/queryAssessRoutine.do', query)
  },

  // 班级考评-卫生检查
  async queryAssessSanitation (query) {
    return await Axios.post('/assess/queryAssessSanitation.do', query)
  },

  // 通过学期查询周次
  async querySchoolTermWeekList (query) {
    return await Axios.post('/assess/querySchoolTermWeekList.do', query)
  },

  // 教师绩效考核详情查询
  async getAssessTeacherPerformance (query) {
    return await Axios.post('/assessTeacherPerformance/getAssessTeacherPerformance.do', query)
  },

  // 家长端 - 学生信息变更详情查询
  async getStudentChangeRecord (query) {
    return await Axios.post('/studentParent/getStudentChangeRecord.do', query)
  },

  // 学工各线考核
  async queryAssessStaff (query) {
    return await Axios.post('/assessStaff/queryAssessStaff.do', query)
  },

  // 教师考核详情查询
  async getAssessTeacher (query) {
    return await Axios.post('/assessTeacher/getAssessTeacher.do', query)
  },

  // OSS图片文件上传（MultipartFile）
  async upload (query) {
    return await Axios.post('/oss/upload.do', query)
  },

  // 查询教研组 - 年级级联列表
  async queryTeachGroupListWithUser (query) {
    return await Axios.post('/teachGroup/queryTeachGroupListWithUser.do', query)
  },

  // 查询备课组年级列表
  async queryGradeList (query) {
    return await Axios.post('/teachGroup/queryGradeList.do', query)
  },

  // 查询课程列表
  async queryCourseList (query) {
    return await Axios.post('/teacher/queryCourseList.do', query)
  },

  // 增加教师工作经历
  async addTeacherResume (query) {
    return await Axios.post('/teacher/addTeacherResume.do', query)
  },

  // 更新教师工作经历
  async updateTeacherResume (query) {
    return await Axios.post('/teacher/updateTeacherResume.do', query)
  },

}
