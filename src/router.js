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
      path: 'notice/detail/:id',
      name: 'NoticeDetail',
      component: teacherView('notice/Detail'),
      meta: {title: '公告详情'}
    }, {
      path: 'info',
      name: 'Info',
      component: teacherView('info/Index'),
      meta: {title: '教师信息'}
    }, {
      path: 'info/edit/:type',
      name: 'InfoEdit',
      component: teacherView('info/InfoEdit'),
      meta: {title: '编辑教师信息编辑'}
    }, {
      path: 'info/resume/edit/:index',
      name: 'InfoResumeEdit',
      component: teacherView('info/ResumeEdit'),
      meta: {title: '编辑工作经历'}
    }, {
      path: 'info/prize/add',
      name: 'InfoPrizeAdd',
      component: teacherView('info/PrizeAdd'),
      meta: {title: '增加获奖经历'}
    }, {
      path: 'students',
      name: 'Students',
      component: teacherView('student/List'),
      meta: {title: '学生信息'}
    }, {
      path: 'student/detail/:id',
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
      path: 'mailbox/detail/:id',
      name: 'MailBoxDetail',
      component: teacherView('mailbox/Detail'),
      meta: {title: '意见详情'}
    }, {
      path: 'group',
      name: 'Group',
      component: teacherView('group/Index'),
      meta: {title: '教研团队'}
    }, {
      path: 'group/detail/:id',
      name: 'TeamDetail',
      component: teacherView('group/Detail'),
      meta: {title: '教研活动详情'}
    }, {
      path: 'research',
      name: 'ResearchList',
      component: teacherView('research/List'),
      meta: {title: '科研奥赛'}
    }, {
      path: 'research/detail/:id',
      name: 'ResearchDetail',
      component: teacherView('research/Detail'),
      meta: {title: '详情'}
    }, {
      path: 'activity',
      name: 'ActivityList',
      component: teacherView('activity/List'),
      meta: {title: '集体备课'}
    }, {
      path: 'activity/detail/:id',
      name: 'ActivityDetail',
      component: teacherView('activity/Detail'),
      meta: {title: '集体备课'}
    }, {
      path: 'activity/add/:typeId',
      name: 'AddActivity',
      component: teacherView('activity/Add'),
      meta: {title: '添加活动'}
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
      path: 'visit/detail/:id',
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
      path: 'meeting/detail/:id',
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
    }
      //
      //   , {
      //   path: 'moments',
      //   name: 'Moments',
      //   component: teacherView('moments/List'),
      //   meta: {title: '校园风采'}
      // }, {
      //   path: 'filter',
      //   component: teacherView('moments/Filter')
      // }, {
      //   path: 'moments/add',
      //   component: teacherView('moments/Add'),
      //   meta: {title: '发布风采'}
      // }, {
      //   path: 'moments/:id',
      //   component: teacherView('moments/Detail'),
      //   meta: {title: '风采详情'}
      // }, {
      //   path: 'leave',
      //   name: 'Leave',
      //   component: teacherView('leave/List'),
      //   meta: {title: '请假管理'}
      // }, {
      //   path: 'interactive',
      //   component: teacherView('interaction/Index'),
      //   meta: {title: '课堂互动'}
      // }, {
      //   path: 'interactive/:id',
      //   component: teacherView('interaction/Add'),
      //   meta: {title: '互动填写'}
      // }, {
      //   path: 'homework',
      //   component: teacherView('homework/Index'),
      //   meta: {title: '作业管理'}
      // }, {
      //   path: 'homework/add',
      //   component: teacherView('homework/Add'),
      //   meta: {title: '新增作业'}
      // }, {
      //   path: 'homework/:id',
      //   component: teacherView('homework/Add'),
      //   meta: {title: '作业详情'}
      // }, {
      //   path: 'course',
      //   component: teacherView('course/Index'),
      //   meta: {title: '班级课表'}
      // }, {
      //   path: 'course/all',
      //   component: teacherView('course/All'),
      //   meta: {title: '班级课表'}
      // }, {
      //   path: 'survey',
      //   component: teacherView('survey/List'),
      //   meta: {title: '问卷调查'}
      // }, {
      //   path: 'survey/vote',
      //   component: teacherView('survey/vote/Add'),
      //   meta: {title: '新增投票'}
      // }, {
      //   path: 'survey/vote/:id',
      //   component: teacherView('survey/vote/Detail'),
      //   meta: {title: '投票详情'}
      // }, {
      //   path: 'survey/certify',
      //   component: teacherView('survey/vote/Add'),
      //   meta: {title: '新增签字证明'}
      // }, {
      //   path: 'survey/certify/:id',
      //   component: teacherView('survey/certify/Detail'),
      //   meta: {title: '签字证明详情'}
      // }, {
      //   path: 'survey/psq',
      //   component: teacherView('survey/vote/Add'),
      //   meta: {title: '新增问卷调查'}
      // }, {
      //   path: 'survey/psq/next',
      //   component: teacherView('survey/psq/Add'),
      //   meta: {title: '添加问题'}
      // }, {
      //   path: 'survey/psq/:surveyId',
      //   component: teacherView('survey/psq/List'),
      //   meta: {title: '问卷详情'}
      // }, {
      //   path: 'survey/psq/:surveyId/:surveyRecordId',
      //   component: teacherView('survey/psq/Detail'),
      //   meta: {title: '查看问卷结果'}
      // }, {
      //   path: 'file',
      //   component: teacherView('file/List'),
      //   meta: {title: '教案管理'}
      // }
    ]
  }, {
    path: '/parent',
    name: 'Parent',
    component: view('Home'),
    meta: {title: '家长端'},
    children: [{
      path: 'notice',
      name: 'Notice',
      component: parentView('notice/Index'),
      meta: {title: '学校通知'}
    }, {
      path: 'notice/detail/:id',
      name: 'NoticeDetail',
      component: parentView('bulletin/Detail'),
      meta: {title: '通知详情'}
    }, {
      path: 'survey',
      name: 'Survey',
      component: parentView('survey/Index'),
      meta: {title: '问卷调查'}
    }, {
      path: 'survey/:id',
      name: 'SurveyDetail',
      component: parentView('survey/Detail'),
      meta: {title: '问卷调查'}
    }, {
      path: 'mailbox',
      component: parentView('mailbox/Index'),
      meta: {title: '校长信箱'}
    }, {
      path: 'children',
      component: parentView('children/Index'),
      meta: {title: '子女档案'}
    }, {
      path: 'children/:id',
      name: 'ChildrenDetail',
      component: parentView('children/Detail'),
      meta: {title: '子女详情'}
    }, {
      path: 'children/prize/add',
      name: 'ChildrenAddPrize',
      component: parentView('children/AddPrize'),
      meta: {title: '增加获奖情况'}
    }, {
      path: 'mailbox/add',
      component: parentView('mailbox/Add'),
      meta: {title: '新增信箱'}
    }, {
      path: 'mailbox/:id',
      component: parentView('mailbox/Detail'),
      meta: {title: '信箱详情'}
    }, {
      path: 'curriculum',
      component: parentView('curriculum/Index'),
      meta: {title: '学生课表'}
    }, {
      path: 'interaction',
      component: parentView('interaction/Index'),
      meta: {title: '课堂互动'}
    }, {
      path: 'interaction/:date',
      component: parentView('interaction/CommentDetail'),
      meta: {title: '课堂互动'}
    }, {
      path: 'score',
      component: parentView('score/Index'),
      meta: {title: '成绩查询'}
    }, {
      path: 'leave',
      component: parentView('leave/Index'),
      meta: {title: '请假'}
    }, {
      path: 'leave/add',
      component: parentView('leave/Add'),
      meta: {title: '新增请假'}
    }, {
      path: 'homework',
      component: parentView('homework/Index'),
      meta: {title: '作业管理'}
    }]
  }]
})

router.beforeEach((to, from, next) => {
  setWechatTitle(to.meta.title || '')
  next()
})

export default router
