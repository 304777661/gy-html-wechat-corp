import Vue from 'vue'
import Router from 'vue-router'
import setWechatTitle from './utils/setWechatTitle'

function view (path) {
  return () => import(`./views/${path}.vue`)
}

function teacherView (path) {
  return () => import(`./views/teacher/${path}.vue`)
}

function parentView (path) {
  return () => import(`./views/parent/${path}.vue`)
}

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Entry',
    component: view('Entry'),
    meta: {title: '首页'}
  }, {
    path: '/teacher',
    name: 'Teacher',
    component: view('Home'),
    meta: {title: '教师端'},
    children: [{
      path: 'notice',
      name: 'Notice',
      component: teacherView('notice/List'),
      meta: {title: '通知公告'}
    }, {
      path: 'notice/detail',
      name: 'NoticeDetail',
      component: teacherView('notice/Detail'),
      meta: {title: '公告详情'}
    }, {
      path: 'info',
      name: 'Info',
      component: teacherView('info/Index'),
      meta: {title: '教师信息'}
    }, {
      path: 'info/edit/basic',
      name: 'InfoEditBasic',
      component: teacherView('info/InfoEdit'),
      meta: {title: '编辑教师信息'}
    }, {
      path: 'info/edit/child',
      name: 'InfoEditChild',
      component: teacherView('info/ChildEdit'),
      meta: {title: '编辑家庭信息'}
    }, {
      path: 'info/resume/edit',
      name: 'InfoResumeEdit',
      component: teacherView('info/ResumeEdit'),
      meta: {title: '编辑工作经历'}
    }, {
      path: 'info/prize/add',
      name: 'InfoPrizeAdd',
      component: teacherView('info/PrizeAdd'),
      meta: {title: '增加获奖情况'}
    }, {
      path: 'students',
      name: 'Students',
      component: teacherView('student/List'),
      meta: {title: '学生信息'}
    }, {
      path: 'student/detail',
      name: 'StudentDetail',
      component: teacherView('student/Detail'),
      meta: {title: '学生详情'}
    }, {
      path: 'salary',
      name: 'Salary',
      component: teacherView('salary/Index'),
      meta: {title: '我的工资条'}
    }, {
      path: 'timetable',
      name: 'TimeTable',
      component: teacherView('timetable/Index'),
      meta: {title: '教师课表'}
    }, {
      path: 'timetable/class',
      name: 'ClassTimeTable',
      component: teacherView('timetable/All'),
      meta: {title: '班级课表'}
    }, {
      path: 'mailbox',
      name: 'Mailbox',
      component: teacherView('mailbox/List'),
      meta: {title: '家长意见'}
    }, {
      path: 'mailbox/detail',
      name: 'MailBoxDetail',
      component: teacherView('mailbox/Detail'),
      meta: {title: '意见详情'}
    }, {
      path: 'group',
      name: 'Group',
      component: teacherView('group/Index'),
      meta: {title: '教研团队'}
    }, {
      path: 'group/detail',
      name: 'TeamDetail',
      component: teacherView('group/Detail'),
      meta: {title: '教研团队详情'}
    }, {
      path: 'research',
      name: 'ResearchList',
      component: teacherView('research/List'),
      meta: {title: '科研奥赛'}
    }, {
      path: 'research/detail',
      name: 'ResearchDetail',
      component: teacherView('research/Detail'),
      meta: {title: '详情'}
    }, {
      path: 'activity',
      name: 'ActivityList',
      component: teacherView('activity/List'),
      meta: {title: '集体备课'}
    }, {
      path: 'activity/detail',
      name: 'ActivityDetail',
      component: teacherView('activity/Detail'),
      meta: {title: '集体备课'}
    }, {
      path: 'activity/add',
      name: 'AddActivity',
      component: teacherView('activity/Add'),
      meta: {title: '添加活动'}
    }, {
      path: 'activity/member',
      name: 'ActivityMember',
      component: teacherView('activity/Member'),
      meta: {title: '选择参与人员'}
    }, {
      path: 'visit',
      name: 'Visit',
      component: teacherView('visit/List'),
      meta: {title: '学生家访'}
    }, {
      path: 'visit/students',
      name: 'VisitStudents',
      component: teacherView('visit/Students'),
      meta: {title: '选择学生'}
    }, {
      path: 'visit/detail',
      name: 'visitDetail',
      component: teacherView('visit/Detail'),
      meta: {title: '家访详情'}
    }, {
      path: 'visit/add',
      name: 'AddVisit',
      component: teacherView('visit/Add'),
      meta: {title: '添加家访记录'}
    }, {
      path: 'meeting',
      name: 'Meeting',
      component: teacherView('meeting/Index'),
      meta: {title: '会议室预约'}
    }, {
      path: 'meeting/detail',
      name: 'MeetingDetail',
      component: teacherView('meeting/Detail'),
      meta: {title: '会议详情'}
    }, {
      path: 'meeting/book',
      name: 'MeetingBook',
      component: teacherView('meeting/Book'),
      meta: {title: '会议室预约'}
    }, {
      path: 'meeting/member',
      name: 'MeetingMember',
      component: teacherView('meeting/Member'),
      meta: {title: '选择参会人员'}
    }, {
      path: 'meeting/time',
      name: 'MeetingTimeAdd',
      component: teacherView('meeting/Time'),
      meta: {title: '选择会议时间'}
    }, {
      path: 'assess',
      name: 'Assess',
      component: teacherView('assess/Index'),
      meta: {title: '班级考评'}
    }, {
      path: 'performance',
      name: 'Performance',
      component: teacherView('performance/Index'),
      meta: {title: '绩效考核'}
    }, {
      path: 'job',
      name: 'Job',
      component: teacherView('job/Index'),
      meta: {title: '招聘'}
    }]
  }, {
    path: '/parent',
    name: 'Parent',
    component: view('Home'),
    meta: {title: '家长端'},
    children: [{
      path: 'notice',
      name: 'ParentNotice',
      component: parentView('notice/Index'),
      meta: {title: '学校通知'}
    }, {
      path: 'notice/detail',
      name: 'ParentNoticeDetail',
      component: parentView('notice/Detail'),
      meta: {title: '通知详情'}
    }, {
      path: 'score',
      component: parentView('score/Index'),
      meta: {title: '成绩查询'}
    }, {
      path: 'timetable',
      name: 'ParentTimeTable',
      component: parentView('timetable/Index'),
      meta: {title: '学生课表'}
    }, {
      path: 'mailbox',
      component: parentView('mailbox/Index'),
      meta: {title: '意见反馈'}
    }, {
      path: 'mailbox/detail',
      component: parentView('mailbox/Detail'),
      meta: {title: '意见详情'}
    }, {
      path: 'mailbox/add',
      component: parentView('mailbox/Add'),
      meta: {title: '新增反馈'}
    }, {
      path: 'survey',
      name: 'Survey',
      component: parentView('survey/Index'),
      meta: {title: '问卷调查'}
    }, {
      path: 'survey/detail',
      name: 'SurveyDetail',
      component: parentView('survey/Detail'),
      meta: {title: '问卷调查'}
    }, {
      path: 'children',
      component: parentView('children/Index'),
      meta: {title: '子女档案'}
    }, {
      path: 'children/setting',
      component: parentView('children/Setting'),
      meta: {title: '子女档案'}
    }, {
      path: 'children/info/edit',
      component: parentView('children/InfoEdit'),
      meta: {title: '编辑基本信息'}
    }, {
      path: 'children/detail',
      name: 'ChildrenDetail',
      component: parentView('children/Detail'),
      meta: {title: '子女详情'}
    }, {
      path: 'children/prize/edit',
      name: 'ChildrenEditPrize',
      component: parentView('children/PrizeEdit'),
      meta: {title: '编辑获奖情况'}
    }, {
      path: 'audit/detail',
      component: parentView('audit/Index'),
      meta: {title: '子女信息审核'}
    }]
  }]
})

router.beforeEach((to, from, next) => {
  setWechatTitle(to.meta.title || '')
  next()
})

export default router
