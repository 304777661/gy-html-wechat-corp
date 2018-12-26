<template>
  <div class="info">
    <div :class="(curTabIndex ===1 || curTabIndex ===2) ? 'wrapper':''">
      <my-tabs :tabs="tabs" @tabChanged="handleTabChanged"></my-tabs>
      <div class="info-basic" v-show="curTabIndex === 0">
        <!--基本信息-->
        <van-cell-group>
          <van-cell title="基本信息" class="info-sticky">
          <span @click="handleInfoClick()">
            <img src="../../../assets/images/edit.png"/>
            编辑
          </span>
          </van-cell>
          <van-cell title="姓名" :value="teacher.name || '--'"></van-cell>
          <van-cell title="性别" :value="teacher.sex | sexLabel"></van-cell>
          <van-cell title="当前状态" :value="$enums.JobStatus.getName(teacher.jobStatus) || '--'"></van-cell>
          <van-cell-group v-for="(course,index) in teacher.courseList" :key="'course'+index">
            <van-cell :title="(teacher.courseList.length === 1) ? '教授科目' : ('教授科目'+(index +1))"
                      :value="course.name || '--'">
            </van-cell>
          </van-cell-group>
          <van-cell-group v-for="(organ,index) in teacher.orgList" :key="'organ'+index">
            <van-cell :title="(teacher.orgList.length === 1) ? '所属部门':('所属部门'+(index+1))"
                      :value="organ.name || '--'">
            </van-cell>
          </van-cell-group>
          <van-cell title="年级" :value="teacher.grade || '--'"></van-cell>
          <van-cell title="身份证号" :value="teacher.idCard || '--'"></van-cell>
          <van-cell title="联系电话" :value="teacher.phone || '--'"></van-cell>
          <van-cell title="出生年月" :value="teacher.birthday | ymd"></van-cell>
          <van-cell title="年龄" :value="(getAge(teacher.birthday) || '--')+'岁'"></van-cell>
          <van-cell title="民族" :value="teacher.folk || '--'"></van-cell>
          <van-cell title="籍贯" :value="teacher.residence || '--'"></van-cell>
          <van-cell title="政治面貌" :value="$enums.PoliticsType.getName(teacher.politicsStatus) || '--'"></van-cell>
          <van-cell title="加入时间" :value="teacher.joinPartyTime | ymd"></van-cell>
          <van-cell title="第一学历" :value="$enums.EducationType.getName(teacher.firstEducation) || '--'"></van-cell>
          <van-cell title="最高学历" :value="$enums.HighestEducation.getName(teacher.highestEducation) || '--'"></van-cell>
          <van-cell title="毕业时间" :value="teacher.graduateTime | ymd"></van-cell>
          <van-cell title="毕业学校" :value="teacher.graduateSchool || '--'"></van-cell>
          <van-cell title="参加工作时间" :value="teacher.joinWorkTime | ymd"></van-cell>
          <van-cell title="工龄" :value="(teacher.workYears  || '--') +'年'"></van-cell>
          <van-cell title="来校时间" :value="teacher.joinSchoolTime | ymd"></van-cell>
          <van-cell title="原工作单位" :value="teacher.lastWorkUnit || '--'"></van-cell>
          <div v-for="(position,index) in teacher.teacherTitleList" :key="'position'+index">
            <van-cell :title="(teacher.teacherTitleList.length ===1) ? '职称':('职称'+(index+1))"
                      :value="$enums.TeacherTitleType.getName(position.title) || '--'">
            </van-cell>
            <van-cell title="评定时间" :value="position.acquireTime | ymd">
            </van-cell>
          </div>
        </van-cell-group>

        <!--家庭信息-->
        <van-cell-group>
          <van-cell title="家庭信息" class="info-sticky">
           <span @click="handleChildrenClick()">
            <img src="../../../assets/images/edit.png"/>
            编辑
          </span>
          </van-cell>
          <van-cell title="家庭电话" :value="teacher.homeTel || '--'"></van-cell>
          <div class="info-basic-children" v-for="(child,index) in teacher.teacherChildList" :key="'child'+index">
            <van-cell :title="'子女信息'+(index+1)" class="info-basic-children-title"></van-cell>
            <van-cell title="姓名" :value="child.name || '--'"></van-cell>
            <van-cell title="性别" :value="child.sex | sexLabel"></van-cell>
            <van-cell title="年龄" :value="(child.age || '--')+'岁'"></van-cell>
            <van-cell title="学校或单位" :value="child.unit || '--'"></van-cell>
            <van-cell title="备注" :value="child.remark || '--'"></van-cell>
          </div>
        </van-cell-group>
      </div>
      <div class="info-work" v-show="curTabIndex === 1">
        <no-data v-show="!loading && !resumeList.length"/>
        <!--工作经历-->
        <van-cell-group>
          <div v-for="(resume,index) in resumeList" :key="'resume'+index">
            <van-cell :title="resumeList.length === 1 ? '工作经历':('工作经历'+(index+1))"
                      class="info-sticky">
           <span @click="handleResumeClick(index)">
            <img src="../../../assets/images/edit.png"/>
            编辑
          </span>
            </van-cell>
            <van-cell title="开始时间" :value="resume.startTernName || '--'"></van-cell>
            <van-cell title="结束时间" :value="resume.endTermName || '--'"></van-cell>
            <van-cell title="教授科目" :value="resume.courseName || '--'"></van-cell>
            <van-cell title="年级" :value="resume.gradeName || '--'"></van-cell>
            <van-cell title="班级" :value="resume.className || '--'"></van-cell>
            <van-cell title="是否班主任" :value="resume.isAdviser === 'YES' ? '是':'否'"></van-cell>
          </div>
        </van-cell-group>
      </div>
      <div class="info-awards" v-show="curTabIndex === 2">
        <no-data v-show="!loading && !researchList.length"/>
        <!--获奖情况-->
        <div v-for="(research,index) in researchList" :key="'research'+index">
          <van-cell :title="researchList.length === 1 ? '获奖情况':('获奖情况'+(index+1))" class="info-sticky">
          </van-cell>
          <van-cell-group>
            <van-cell title="项目名称" :value="research.entryName || '--'"></van-cell>
            <van-cell title="类型" :value="$enums.ProjectType.getName(research.entryType) || '--'"></van-cell>
            <van-cell title="颁奖单位" :value="research.awardUnit || '--'"></van-cell>
            <van-cell title="获奖等级或获得的成绩" :value="research.achievement || '--'"></van-cell>
            <van-cell title="获奖时间" :value="research.obtainTime || ymd"></van-cell>
            <van-cell title="证明材料"
                      :value="(research.attachments && research.attachments.length>0)? '已上传':'未上传'">
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>
    <my-button :content="getAddBtnTitle()" @btnClick="handleAddClick"
               v-show="curTabIndex ===1 || curTabIndex ===2">
    </my-button>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data () {
      return {
        curTabIndex: 0,
        loading: false,
        tabs: [{
          id: 0,
          label: '基本情况',
        }, {
          id: 1,
          label: '工作经历',
        }, {
          id: 2,
          label: '获奖情况',
        }],
        teacher: {},
        resumeList: [],
        researchList: [],
      }
    },
    methods: {
      getAddBtnTitle () {
        if (this.curTabIndex === 1) {
          return '增加工作经历'
        } else if (this.curTabIndex === 2) {
          return '增加获奖情况'
        }
      },
      handleAddClick () {
        if (this.curTabIndex === 1) {
          this.$router.push(`/teacher/info/resume/edit/-1`)
        } else if (this.curTabIndex === 2) {
          this.$router.push(`/teacher/info/prize/add`)
        }
      },
      async handleTabChanged (tabIndex) {
        if (this.curTabIndex === tabIndex) {
          return
        }
        this.curTabIndex = tabIndex
        await this.loadData()
      },
      getAge (strBirthday) {
        if (!strBirthday) {
          return '--'
        }
        strBirthday = new Date(strBirthday).Format('yyyy-MM-dd')
        let returnAge
        // 根据生日计算年龄（"1995-09-25"）
        // 以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
        let strBirthdayArr = strBirthday.split('-')
        let birthYear = strBirthdayArr[0]
        let birthMonth = strBirthdayArr[1]
        let birthDay = strBirthdayArr[2]

        let d = new Date()
        let nowYear = d.getFullYear()
        let nowMonth = d.getMonth() + 1
        let nowDay = d.getDate()

        if (nowYear == birthYear) {
          returnAge = '0'
        } else {
          let ageDiff = nowYear - birthYear //年之差
          if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
              let dayDiff = nowDay - birthDay//日之差
              if (dayDiff < 0) {
                returnAge = ageDiff - 1
              }
              else {
                returnAge = ageDiff
              }
            }
            else {
              let monthDiff = nowMonth - birthMonth//月之差
              if (monthDiff < 0) {
                returnAge = ageDiff - 1
              }
              else {
                returnAge = ageDiff
              }
            }
          }
          else {
            returnAge = '--'// 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge // 返回周岁年龄
      },
      handleInfoClick () {
        this.$router.push(`/teacher/info/edit/basic`)
      },
      handleChildrenClick () {
        this.$router.push(`/teacher/info/edit/child`)
      },
      handleResumeClick (index) {
        this.$router.push(`/teacher/info/resume/edit?index=${index}`)
      },
      async loadData () {
        if (this.curTabIndex === 0) {
          this.teacher = await this.$api.teacher.getTeacherDetail({})
        } else if (this.curTabIndex === 1) {
          this.resumeList = await this.$api.teacher.queryTeacherResumeList({})
        } else if (this.curTabIndex === 2) {
          this.researchList = await this.$api.teacher.queryTeachingResearchList({})
        }
      }
    },
    async created () {
      await this.loadData()
    }
  }
</script>

<style scoped lang="sass">

  .info
    padding-bottom: $default-gap
    &-basic
      padding-bottom: 10px
      &-children
        background: $white
        padding: 5px 14px
        &-title
          color: #24A197
          font-size: 13px
        .van-cell
          background: #F7F8FA
          &:first-child
            border-top-left-radius: 4px
            border-top-right-radius: 4px
          &:last-child
            border-bottom-left-radius: 4px
            border-bottom-right-radius: 4px
    .wrapper
      height: calc(100vh - 80px)
    &-sticky
      margin-top: 10px
      color: #24A197
      font-size: 13px
      img
        width: 15px
        height: 15px
        margin-right: 8px
      span
        color: #24A197
        font-size: 13px
    &-tabs
      $h: 50px
      position: relative
      width: 100%
      height: $h
      line-height: $h
      color: #ccc
      background: $white
      font-size: 16px
      @include hor-start-center
      &__li
        flex: 1
        text-align: center
        transition: color $transition-duration ease
        &--active
          font-weight: bold
          color: $black
      &__line
        $w: 18px
        position: absolute
        left: 0
        bottom: 6px
        width: 100%
        height: 4px
        transition: transform $transition-duration ease
        transform: translateX((33.333% / 2))
        &:after
          content: ''
          display: block
          width: $w
          height: 4px
          background: $black
          transform: translateX(-50%)

</style>
