<template>
  <div class="container">
    <div class="item-detail van-hairline--bottom van-hairline--right"
         v-for="item in entries"
         @click="goTo(item.link)">
      <div class="item-detail-desc">{{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Entry',
    data () {
      return {
        entries: [{
          'name': '通知公告',
          'link': 'teacher/notice'
        }, {
          'name': '教师信息',
          'link': 'teacher/info'
        }, {
          'name': '学生信息',
          'link': 'teacher/students'
        }, {
          'name': '工资条',
          'link': 'teacher/salary'
        }, {
          'name': '课表查询',
          'link': 'teacher/timetable'
        }, {
          'name': '家长意见',
          'link': 'teacher/mailbox'
        }, {
          'name': '班级考评',
          'link': 'teacher/assess'
        }, {
          'name': '绩效考核',
          'link': 'teacher/performance'
        }, {
          'name': '教研团队',
          'link': 'teacher/group'
        }, {
          'name': '科研奥赛',
          'link': 'teacher/research'
        }, {
          'name': '集体备课',
          'link': 'teacher/activity'
        }, {
          'name': '学生家访',
          'link': 'teacher/visit'
        }, {
          'name': '会议室预约',
          'link': 'teacher/meeting'
        }, {
          'name': '家-通知',
          'link': 'parent/notice'
        }, {
          'name': '家-成绩',
          'link': 'parent/score'
        }, {
          'name': '家-课表',
          'link': 'parent/timetable'
        }, {
          'name': '家-子女',
          'link': 'parent/children'
        }, {
          'name': '家-意见',
          'link': 'parent/mailbox'
        }, {
          'name': '家-问卷',
          'link': 'parent/survey'
        }, {
          'name': '家-审核',
          'link': 'parent/audit/detail/11'
        }]
      }
    },
    methods: {
      goTo (router) {
        this.$router.push(router)
      }
    },
  }
</script>

<style scoped lang="sass">
  .container
    background: #f9f9f9
    display: flex
    flex-wrap: wrap
    .item-detail
      background: #fff
      line-height: 80px
      flex: 0 0 25%
      &-desc
        color: #333
        text-align: center

</style>
