<template>
  <div class="performance">
    <section-picker :content="sectionContent"
                    @previousClick="handlePreviousClick()"
                    @nextClick="handleNextClick()">
    </section-picker>
    <my-tabs :tabs="tabs" @tabChanged="handleTabChanged"></my-tabs>
    <!--<no-data v-show="!loading && !articleList.length"/>-->
    <my-loading v-model="loading"></my-loading>
    <div class="performance-container" v-show="curTabIndex === 0">
      <van-cell-group>
        <van-cell title="教研组" :value="teacherPerformance.teachGroupName || '--'"></van-cell>
        <van-cell title="姓名" :value="teacherPerformance.teacherName || '--'"></van-cell>
        <van-cell title="出勤" :value="teacherPerformance.roster || '--'"></van-cell>
        <van-cell title="业绩" :value="teacherPerformance.performance || '--'"></van-cell>
        <van-cell title="德育" :value="teacherPerformance.education || '--'"></van-cell>
        <van-cell title="荣誉加分(党务)" :value="teacherPerformance.honorPartyWork || '--'"></van-cell>
        <van-cell title="荣誉加分(工会)" :value="teacherPerformance.honorSociety || '--'"></van-cell>
        <van-cell title="荣誉加分(教研)" :value="teacherPerformance.honorResearch || '--'"></van-cell>
        <van-cell title="加分总计" :value="teacherPerformance.addTotal || '--'"></van-cell>
        <van-cell title="否决项" :value="teacherPerformance.vetoItem || '--'"></van-cell>
        <van-cell title="总计" :value="teacherPerformance.total || '--'"></van-cell>
        <van-cell title="备注" :value="teacherPerformance.remark || '--'"></van-cell>
      </van-cell-group>
    </div>
    <div class="performance-container" v-show="curTabIndex === 1">
      <van-cell-group>
        <van-cell title="基本信息" class="performance-container-sticky"></van-cell>
        <van-cell title="学科" :value="teacherAssess.courseName || '--'"></van-cell>
        <van-cell title="姓名" :value="teacherAssess.teacherName || '--'"></van-cell>
        <van-cell title="职务" :value="teacherAssess.position || '--'"></van-cell>
        <van-cell title="年级" :value="teacherAssess.gradeName || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="合计" class="performance-container-sticky"></van-cell>
        <van-cell title="总得分" :value="teacherAssess.scoreTotal || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="工作量" class="performance-container-sticky"></van-cell>
        <van-cell title="等级" :value="$enums.AssessLevel.getName(teacherAssess.workloadLevel) || '--'"></van-cell>
        <van-cell title="得分" :value="teacherAssess.workloadScore || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="晨读" class="performance-container-sticky"></van-cell>
        <van-cell title="等级" :value="$enums.AssessLevel.getName(teacherAssess.morningLevel) || '--'"></van-cell>
        <van-cell title="得分" :value="teacherAssess.morningScore || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="备课" class="performance-container-sticky"></van-cell>
        <van-cell title="个人备课等级" :value="$enums.AssessLevel.getName(teacherAssess.prepareLevel)|| '--'"></van-cell>
        <van-cell title="得分" :value="teacherAssess.prepareScore || '--'"></van-cell>
        <van-cell title="集体备课等级" :value="$enums.AssessLevel.getName(teacherAssess.activityLevel) || '--'"></van-cell>
        <van-cell title="得分" :value="teacherAssess.activityScore || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="课堂" class="performance-container-sticky"></van-cell>
        <van-cell title="等级" :value="$enums.AssessLevel.getName(teacherAssess.classroomLevel) || '--'"></van-cell>
        <van-cell title="得分" :value="teacherAssess.classroomScore || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="作业" class="performance-container-sticky"></van-cell>
        <van-cell title="等级" :value="$enums.AssessLevel.getName(teacherAssess.homeworkLevel) || '--'"></van-cell>
        <van-cell title="得分" :value="teacherAssess.homeworkScore || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="教学成绩" class="performance-container-sticky"></van-cell>
        <van-cell title="成绩" :value="teacherAssess.scoreAvg || '--'"></van-cell>
        <van-cell title="等级" :value="$enums.AssessLevel.getName(teacherAssess.scoreLevel) || '--'"></van-cell>
        <van-cell title="得分" :value="teacherAssess.scoreScore || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="论文" class="performance-container-sticky"></van-cell>
        <van-cell title="得分" :value="teacherAssess.scorePaper || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="赛课及指导学生" class="performance-container-sticky"></van-cell>
        <van-cell title="得分" :value="teacherAssess.scoreCompetition || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="课题、课程" class="performance-container-sticky"></van-cell>
        <van-cell title="得分" :value="teacherAssess.scoreTopics || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="经验交流及学术报告" class="performance-container-sticky"></van-cell>
        <van-cell title="得分" :value="teacherAssess.scoreAcademic || '--'"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="教研合计" class="performance-container-sticky"></van-cell>
        <van-cell title="得分" :value="teacherAssess.researchScore || '--'"></van-cell>
      </van-cell-group>
    </div>
    <div class="performance-container" v-show="curTabIndex === 2">
      <van-cell-group>
        <van-cell title="姓名" :value="staffPerformance.teacherName || '--'"></van-cell>
        <van-cell title="考核时间" :value="staffPerformance.assessDate | ymd"></van-cell>
        <van-cell title="绩效等级分数" :value="staffPerformance.performanceScore || '--'"></van-cell>
        <van-cell title="绩效金额" :value="staffPerformance.performanceBonus | rmb"></van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="考核扣分原因" class="performance-container-title"></van-cell>
        <van-field v-model="staffPerformance.deductionReason" readonly disabled type="textarea">
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PerformanceIndex',
    data () {
      return {
        curTabIndex: 0,
        loading: false,
        sectionContent: '',
        curTerm: {},
        curDate: new Date(),
        teacherPerformance: {},
        teacherAssess: {},
        staffPerformance: {},
        tabs: [{
          id: 0,
          label: '校办绩效考核'
        }, {
          id: 1,
          label: '教务绩效考核'
        }, {
          id: 2,
          label: '学工各线考核'
        }],
      }
    },
    methods: {
      async handleTabChanged (tabIndex) {
        if (this.curTabIndex === tabIndex) {
          return
        }
        this.curTabIndex = tabIndex
        this.updateSectionContent()
        await this.loadData()
      },
      updateSectionContent () {
        if (this.isStaff()) {
          this.sectionContent = this.curDate.Format('yyyy年MM月')
        } else {
          this.sectionContent = this.curTerm.name
        }
      },
      async handlePreviousClick () {
        if (this.isStaff()) {
          this.curDate = new Date(this.curDate.setMonth(this.curDate.getMonth() - 1))
          this.updateSectionContent()
        } else {
          // 上个学期
          const index = this.termList.findIndex(term => term.id === this.curTerm.id)
          const preIndex = index - 1
          if (preIndex < 0) {
            this.$toast.fail('没有更多数据')
            return
          }
          this.curTerm = this.termList[preIndex]
          this.updateSectionContent()
        }
        await this.loadData()
      },
      async handleNextClick () {
        if (this.isStaff()) {
          let now = new Date()
          if (this.curDate.getFullYear() > now.getFullYear() || this.curDate.getMonth() >= now.getMonth()) {
            this.$toast.fail('没有更多数据')
            return
          }
          this.curDate = new Date(this.curDate.setMonth(this.curDate.getMonth() + 1))
          this.updateSectionContent()
        } else {
          // 下个学期
          const index = this.termList.findIndex(term => term.id === this.curTerm.id)
          const nextIndex = index + 1
          if (nextIndex >= this.termList.length) {
            this.$toast.fail('没有更多数据')
            return
          }
          this.curTerm = this.termList[nextIndex]
          this.updateSectionContent()
        }
        await this.loadData()
      },
      isStaff () {
        return this.curTabIndex === 2
      },
      async loadData () {
        this.loading = true
        if (this.curTabIndex === 0) {
          this.teacherPerformance = await this.$api.teacher.getAssessTeacherPerformance({'termId': this.curTerm.id})
        } else if (this.curTabIndex === 1) {
          this.teacherAssess = await this.$api.teacher.getAssessTeacher({'termId': this.curTerm.id})
        } else if (this.curTabIndex === 2) {
          this.staffPerformance = await this.$api.teacher.queryAssessStaff({'month': this.curDate.Format('yyyy-MM-dd 00:00:00')})
        }
        this.loading = false
      }
    },
    async created () {
      this.loading = true
      this.termList = await this.$api.teacher.querySchoolTermList({})
      if (this.termList && this.termList.length > 0) {
        this.curTerm = this.termList[0]
        this.sectionContent = this.curTerm.name
      }
      await this.loadData()
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .performance
    padding-bottom: $default-gap
    &-container
      margin-top: 10px
      &-sticky
        color: #24A197
        margin-top: 10px
      &-title
        margin-top: 10px

</style>
