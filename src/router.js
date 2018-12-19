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
      path: 'bulletin',
      name: 'Bulletin',
      component: teacherView('bulletin/List'),
      meta: {title: '通知公告'}
    }, {
      path: 'bulletin/:id',
      name: 'BulletinDetail',
      component: teacherView('bulletin/Detail'),
      meta: {title: '公告详情'}
    }, {
      path: 'info',
      name: 'Info',
      component: teacherView('info/Index'),
      meta: {title: '教师信息'}
    }, {
      path: 'salary',
      name: 'Salary',
      component: teacherView('salary/Index'),
      meta: {title: '我的工资条'}
    }, {
      path: 'team',
      name: 'Team',
      component: teacherView('team/Index'),
      meta: {title: '教研团队'}
    }, {
      path: 'team/:id',
      name: 'TeamDetail',
      component: teacherView('team/Detail'),
      meta: {title: '教研活动详情'}
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
      path: 'visit/:id',
      name: 'visitDetail',
      component: teacherView('visit/Detail'),
      meta: {title: '家访详情'}
    }, {
      path: 'visitadd',
      name: 'AddVisit',
      component: teacherView('visit/Add'),
      meta: {title: '添加家访记录'}
    }, {
      path: 'moments',
      name: 'Moments',
      component: teacherView('moments/List'),
      meta: {title: '校园风采'}
    }, {
      path: 'mailbox',
      name: 'Mailbox',
      component: teacherView('mailbox/List'),
      meta: {title: '家长意见'}
    }, {
      path: 'mailbox/:id',
      name: 'MailBoxDetail',
      component: teacherView('mailbox/Detail'),
      meta: {title: '查看'}
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
      path: 'activity',
      name: 'ActivityList',
      component: teacherView('activity/List'),
      meta: {title: '集体备课'}
    }, {
      path: 'research',
      name: 'ResearchList',
      component: teacherView('research/List'),
      meta: {title: '科研奥赛'}
    }, {
      path: 'research/:id',
      name: 'ResearchDetail',
      component: teacherView('research/Detail'),
      meta: {title: '详情'}
    }, {
      path: 'activity/:id',
      name: 'ActivityDetail',
      component: teacherView('activity/Detail'),
      meta: {title: '集体备课'}
    }, {
      path: 'activity/add/:typeId',
      name: 'AddActivity',
      component: teacherView('activity/Add'),
      meta: {title: '添加活动'}
    }, {
      path: 'meeting/time',
      name: 'MeetingTimeAdd',
      component: teacherView('meeting/Time'),
      meta: {title: '选择会议时间'}
    }, {
      path: 'filter',
      component: teacherView('moments/Filter')
    }, {
      path: 'moments/add',
      component: teacherView('moments/Add'),
      meta: {title: '发布风采'}
    }, {
      path: 'moments/:id',
      component: teacherView('moments/Detail'),
      meta: {title: '风采详情'}
    }, {
      path: 'leave',
      name: 'Leave',
      component: teacherView('leave/List'),
      meta: {title: '请假管理'}
    }, {
      path: 'students',
      name: 'Students',
      component: teacherView('student/List'),
      meta: {title: '学生列表'}
    }, {
      path: 'student/:id',
      name: 'StudentDetail',
      component: teacherView('student/Detail'),
      meta: {title: '学生详情'}
    }, {
      path: 'interactive',
      component: teacherView('interaction/Index'),
      meta: {title: '课堂互动'}
    }, {
      path: 'interactive/:id',
      component: teacherView('interaction/Add'),
      meta: {title: '互动填写'}
    }, {
      path: 'homework',
      component: teacherView('homework/Index'),
      meta: {title: '作业管理'}
    }, {
      path: 'homework/add',
      component: teacherView('homework/Add'),
      meta: {title: '新增作业'}
    }, {
      path: 'homework/:id',
      component: teacherView('homework/Add'),
      meta: {title: '作业详情'}
    }, {
      path: 'course',
      component: teacherView('course/Index'),
      meta: {title: '班级课表'}
    }, {
      path: 'course/all',
      component: teacherView('course/All'),
      meta: {title: '班级课表'}
    }, {
      path: 'survey',
      component: teacherView('survey/List'),
      meta: {title: '问卷调查'}
    }, {
      path: 'survey/vote',
      component: teacherView('survey/vote/Add'),
      meta: {title: '新增投票'}
    }, {
      path: 'survey/vote/:id',
      component: teacherView('survey/vote/Detail'),
      meta: {title: '投票详情'}
    }, {
      path: 'survey/certify',
      component: teacherView('survey/vote/Add'),
      meta: {title: '新增签字证明'}
    }, {
      path: 'survey/certify/:id',
      component: teacherView('survey/certify/Detail'),
      meta: {title: '签字证明详情'}
    }, {
      path: 'survey/psq',
      component: teacherView('survey/vote/Add'),
      meta: {title: '新增问卷调查'}
    }, {
      path: 'survey/psq/next',
      component: teacherView('survey/psq/Add'),
      meta: {title: '添加问题'}
    }, {
      path: 'survey/psq/:surveyId',
      component: teacherView('survey/psq/List'),
      meta: {title: '问卷详情'}
    }, {
      path: 'survey/psq/:surveyId/:surveyRecordId',
      component: teacherView('survey/psq/Detail'),
      meta: {title: '查看问卷结果'}
    }, {
      path: 'file',
      component: teacherView('file/List'),
      meta: {title: '教案管理'}
    }]
  }, {
    path: '/parent',
    name: 'Parent',
    component: view('Home'),
    meta: {title: '家长端'},
    children: [{
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
      path: 'bulletin',
      component: parentView('bulletin/Index'),
      meta: {title: '学校通知'}
    }, {
      path: 'bulletin/:id/:type',
      // name: 'BulletinDetail',
      component: parentView('bulletin/Detail'),
      meta: {title: '通知详情'}
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

// let data = {}
//
// console.log(data)
//
// let s = ''
// let arr = []
// data.data.forEach((item, idx) => {
//   let t = item.url.split('/')
//   let funcName = t[t.length - 1].replace('.do', '')
//   if (arr.indexOf(funcName) > -1) {
//     funcName += 1
//     // console.log('存在相同名的函数了: ', item.name, funcName)
//   }
//
//   if (item.name.indexOf('家长端') === -1 && item.name.indexOf('家长') === -1) {
//     arr.push(funcName)
//     let comma = idx === data.data.length - 1 ? '' : ','
//
//     s += `
//   // ${item.name}
//   async ${funcName} (query) {
//     return await Axios.post('${item.url}', query)
//   }${comma} \n`
//   }
// })
//
// console.log(s)

export default router
