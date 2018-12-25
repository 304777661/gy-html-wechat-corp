<template>
  <div class="assess">
    <div class="assess-header">
      <div class="assess-header__item" @click="handleTermClick">
        <span>{{curTerm.label || '--'}}</span>
        <van-icon name="arrow-down"></van-icon>
      </div>
      <div class="assess-header__line"></div>
      <div class="assess-header__item" @click="handleWeekClick">
        <span>{{curWeek.label || '--'}}</span>
        <van-icon name="arrow-down"></van-icon>
      </div>
    </div>
    <my-tabs :tabs="tabs" @tabChanged="handleTabChanged"></my-tabs>
    <my-loading v-model="loading"></my-loading>
    <div v-show="curTabIndex === 0" v-if="routerCheck">
      <van-cell-group>
        <van-cell title="班级" :value="routerCheck.className || '--'"></van-cell>
        <van-cell title="姓名" :value="routerCheck.teacherName || '--'"></van-cell>
        <van-cell title="总排名" :value="routerCheck.rank || '--'"></van-cell>
        <van-cell title="总得分" :value="routerCheck.totalScore || '--'"></van-cell>
        <van-cell title="文明班级">
          <span :class="routerCheck.yesNoStatus === 'YES' ? 'active':'inactive'">
            {{routerCheck.yesNoStatus === 'YES' ? '获得':'未获得'}}
          </span>
        </van-cell>
      </van-cell-group>

      <van-collapse v-model="routeActiveNames">
        <van-collapse-item title="年级常规检查" name="1" class="assess-sticky">
          <van-cell-group>
            <van-cell title="升旗" :value="routerCheck.gradeRaiseFlag || '--'"></van-cell>
            <van-cell title="早自习" :value="routerCheck.gradeMorningLesson || '--'"></van-cell>
            <van-cell title="音乐教唱" :value="routerCheck.gradeMusicTeach || '--'"></van-cell>
            <van-cell title="课间操" :value="routerCheck.gradeBreakExercise || '--'"></van-cell>
            <van-cell title="眼保健操" :value="routerCheck.gradeEyeExercise || '--'"></van-cell>
            <van-cell title="午休" :value="routerCheck.gradeNoonRest || '--'"></van-cell>
            <van-cell title="新闻收视" :value="routerCheck.gradeNewsView || '--'"></van-cell>
            <van-cell title="晚自习" :value="routerCheck.gradeEveningLesson || '--'"></van-cell>
            <van-cell title="课堂日志" :value="routerCheck.gradeLessonRecord || '--'"></van-cell>
            <van-cell title="中队日志" :value="routerCheck.gradeJuniorRecord || '--'"></van-cell>
            <van-cell title="安检抽查" :value="routerCheck.gradeSecurityCheck || '--'"></van-cell>
            <van-cell title="仪表检查" :value="routerCheck.gradeAppearanceCheck || '--'"></van-cell>
            <van-cell title="(小扫)大扫除" :value="routerCheck.gradeSweepup || '--'"></van-cell>
            <van-cell title="值勤" :value="routerCheck.gradeDuty || '--'"></van-cell>
            <van-cell title="黑板报" :value="routerCheck.gradeBlackboard || '--'"></van-cell>
            <van-cell title="班会" :value="routerCheck.gradeClassMeeting || '--'"></van-cell>
            <van-cell title="生活楼" :value="routerCheck.gradeLivingBuilding || '--'"></van-cell>
            <van-cell title="备用" :value="routerCheck.gradeBackup || '--'"></van-cell>
            <van-cell title="总分" class="assess-total" :value="routerCheck.gradeTotalScore || '--'"></van-cell>
          </van-cell-group>
        </van-collapse-item>

        <van-collapse-item title="学工处检评" name="2" class="assess-sticky">
          <van-cell-group>
            <van-cell title="课堂" :value="routerCheck.studentCourse || '--'"></van-cell>
            <van-cell title="违纪" :value="routerCheck.studentRuleBreak || '--'"></van-cell>
            <van-cell title="午休巡查" :value="routerCheck.studentNoonRest || '--'"></van-cell>
            <van-cell title="工具房" :value="routerCheck.studentToolHouse || '--'"></van-cell>
            <van-cell title="安检" :value="routerCheck.studentSecurityCheck || '--'"></van-cell>
            <van-cell title="班会" :value="routerCheck.studentClassMeeting || '--'"></van-cell>
            <van-cell title="表扬加分" :value="routerCheck.studentAddScore || '--'"></van-cell>
            <van-cell title="总分" class="assess-total" :value="routerCheck.studentTotalScore || '--'"></van-cell>
          </van-cell-group>
        </van-collapse-item>

        <van-collapse-item title="校学生会检评" name="3" class="assess-sticky">
          <van-cell-group>
            <van-cell title="早自习" :value="routerCheck.unionMorningLesson || '--'"></van-cell>
            <van-cell title="晚自习" :value="routerCheck.unionEveningLesson || '--'"></van-cell>
            <van-cell title="仪容仪表" :value="routerCheck.unionAppearanceCheck || '--'"></van-cell>
            <van-cell title="课间操安检" :value="routerCheck.unionBreakExerciseSecurity || '--'"></van-cell>
            <van-cell title="午休安检" :value="routerCheck.unionNoonRestSecurity || '--'"></van-cell>
            <van-cell title="音乐教唱" :value="routerCheck.unionMusicTeach || '--'"></van-cell>
            <van-cell title="班级日志" :value="routerCheck.unionClassRecord || '--'"></van-cell>
            <van-cell title="班会" :value="routerCheck.unionClassMeeting || '--'"></van-cell>
            <van-cell title="晚自习登记本" :value="routerCheck.unionEveningExerciseMark || '--'"></van-cell>
            <van-cell title="卫生" :value="routerCheck.unionSweepup || '--'"></van-cell>
            <van-cell title="课间操" :value="routerCheck.unionBreakExercise || '--'"></van-cell>
            <van-cell title="眼保健操" :value="routerCheck.unionEyeExercise || '--'"></van-cell>
            <van-cell title="寝室纪律" :value="routerCheck.unionDomitoryDiscipline || '--'"></van-cell>
            <van-cell title="午托" :value="routerCheck.unionNoonMandate || '--'"></van-cell>
            <van-cell title="团徽" :value="routerCheck.unionLeagueBadge || '--'"></van-cell>
            <van-cell title="团务日志" :value="routerCheck.unionLeagueRecord || '--'"></van-cell>
            <van-cell title="总分" class="assess-total" :value="routerCheck.unionTotalScore || '--'"></van-cell>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div v-show="curTabIndex ===1" v-if="healthCheck">
      <van-cell-group>
        <van-cell title="班级" :value="healthCheck.className || '--'"></van-cell>
        <van-cell title="姓名" :value="healthCheck.teacherName || '--'"></van-cell>
        <van-cell title="总排名" :value="healthCheck.rank || '--'"></van-cell>
        <van-cell title="总得分" :value="healthCheck.totalScore || '--'"></van-cell>
        <van-cell title="文明班级">
          <span :class="healthCheck.yesNoStatus === 'YES' ? 'active':'inactive'">
            {{healthCheck.yesNoStatus === 'YES' ? '获得':'未获得'}}
          </span>
        </van-cell>
      </van-cell-group>

      <van-collapse v-model="healthActiveNames">
        <van-collapse-item title="校学生会检评" name="1" class="assess-sticky">
          <van-cell-group>
            <van-cell title="走廊" :value="healthCheck.unionCorridor || '--'"></van-cell>
            <van-cell title="花坛" :value="healthCheck.unionParterre || '--'"></van-cell>
            <van-cell title="桌椅摆放" :value="healthCheck.unionDesk || '--'"></van-cell>
            <van-cell title="教室地面" :value="healthCheck.unionFloor || '--'"></van-cell>
            <van-cell title="天花板" :value="healthCheck.unionCeiling || '--'"></van-cell>
            <van-cell title="窗台" :value="healthCheck.unionSill || '--'"></van-cell>
            <van-cell title="垃圾桶" :value="healthCheck.unionGarbage || '--'"></van-cell>
            <van-cell title="饮水机" :value="healthCheck.unionWaterDispenser || '--'"></van-cell>
            <van-cell title="黑板" :value="healthCheck.unionBackboard || '--'"></van-cell>
            <van-cell title="书柜台面" :value="healthCheck.unionDesktop || '--'"></van-cell>
            <van-cell title="讲台" :value="healthCheck.unionTeachDesk || '--'"></van-cell>
            <van-cell title="教室外墙" :value="healthCheck.unionOuterWall || '--'"></van-cell>
            <van-cell title="工具摆放" :value="healthCheck.unionToolPlace || '--'"></van-cell>
            <van-cell title="公共区卫生" :value="healthCheck.unionCommonSanitation || '--'"></van-cell>
            <van-cell title="空调挡板" :value="healthCheck.unionConditionerBaffle || '--'"></van-cell>
            <van-cell title="整体情况" :value="healthCheck.unionOverallSituation || '--'"></van-cell>
            <van-cell title="总分" class="assess-total" :value="healthCheck.unionTotalScore || '--'"></van-cell>
          </van-cell-group>
        </van-collapse-item>

        <van-collapse-item title="学工处检评" name="2" class="assess-sticky">
          <van-cell-group>
            <van-cell title="前坪" :value="healthCheck.studentFrontLawn || '--'"></van-cell>
            <van-cell title="水槽" :value="healthCheck.studentSink || '--'"></van-cell>
            <van-cell title="地面" :value="healthCheck.studentGround || '--'"></van-cell>
            <van-cell title="墙壁" :value="healthCheck.studentWall || '--'"></van-cell>
            <van-cell title="扫把摆放" :value="healthCheck.studentBroom || '--'"></van-cell>
            <van-cell title="撮箕摆放" :value="healthCheck.studentDustpan || '--'"></van-cell>
            <van-cell title="撮箕内垃圾" :value="healthCheck.studentRubbish || '--'"></van-cell>
            <van-cell title="拖把挂、立" :value="healthCheck.studentSwob || '--'"></van-cell>
            <van-cell title="公共区域卫生" :value="healthCheck.studentCommonSanitation || '--'"></van-cell>
            <van-cell title="逗留" :value="healthCheck.studentLinger || '--'"></van-cell>
            <van-cell title="午休巡查" :value="healthCheck.studentNoonRest || '--'"></van-cell>
            <van-cell title="日常巡查" :value="healthCheck.studentDailyPatrol || '--'"></van-cell>
            <van-cell title="总分" class="assess-total" :value="healthCheck.studentTotalScore || '--'"></van-cell>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
    </div>

    <van-popup v-model="showTermPicker" position="bottom">
      <van-picker show-toolbar
                  :columns="termColumns"
                  value-key="label"
                  @cancel="handleTermPickerCancelClick"
                  @confirm="handleTermPickerConfirmClick"></van-picker>
    </van-popup>

    <van-popup v-model="showWeekPicker" position="bottom">
      <van-picker show-toolbar
                  :columns="weekColumns"
                  value-key="label"
                  @cancel="handleWeekPickerCancelClick"
                  @confirm="handleWeekPickerConfirmClick"></van-picker>
    </van-popup>
  </div>

</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        curTabIndex: 0,
        loading: false,
        showTermPicker: false,
        showWeekPicker: false,
        termColumns: [],
        weekColumns: [],
        itemHeight: 60,
        tabs: [{
          id: 0,
          label: '常规检查'
        }, {
          id: 1,
          label: '卫生检查'
        }],
        curTerm: {
          label: 0,
          value: ''
        },
        curWeek: {
          label: 0,
          value: ''
        },
        routerCheck: {},
        healthCheck: {},
        routeActiveNames: ['1', '2', '3'],
        healthActiveNames: ['1', '2']
      }
    },
    methods: {
      async handleTabChanged (tabIndex) {
        if (this.curTabIndex === tabIndex) {
          return
        }
        this.curTabIndex = tabIndex
        await this.loadData()
      },
      getQuery () {
        return {
          termId: this.curTerm.value,
          weekId: this.curWeek.value
        }
      },
      handleTermClick () {
        this.showTermPicker = true
      },
      handleTermPickerCancelClick () {
        this.showTermPicker = false
      },

      async handleTermPickerConfirmClick (item) {
        this.curTerm = item
        this.showTermPicker = false
        await this.loadData()
      },
      handleWeekClick () {
        this.showWeekPicker = true
      },
      handleWeekPickerCancelClick () {
        this.showWeekPicker = false
      },

      async handleWeekPickerConfirmClick (item) {
        this.curWeek = item
        this.showWeekPicker = false
        await this.loadData()
      },
      async loadData () {
        this.loading = true
        if (this.curTabIndex === 0) {
          // 常规检查
          this.routerCheck = await this.$api.teacher.queryAssessRoutine(this.getQuery())
        } else {
          // 卫生检查
          this.healthCheck = await this.$api.teacher.queryAssessSanitation(this.getQuery())
        }
        this.loading = false
      }
    },
    async created () {
      // 学期
      this.termList = await this.$api.teacher.querySchoolTermList({})
      if (this.termList && this.termList.length > 0) {
        this.curTerm.label = this.termList[0].name
        this.curTerm.value = this.termList[0].id
        this.termColumns = this.termList.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        // 周次
        this.weekList = await this.$api.teacher.querySchoolTermWeekList({'id': this.curTerm.id})
        if (this.weekList && this.weekList.length > 0) {
          this.curWeek.label = this.weekList[0].weekDesc
          this.curWeek.value = this.weekList[0].id
          this.weekColumns = this.weekList.map(item => {
            return {
              label: item.weekDesc,
              value: item.id
            }
          })
          await this.loadData()
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  .assess
    padding-bottom: $default-gap
    &-sticky
      margin-top: 10px
      /deep/ .van-collapse-item__title
        color: #24A197
    .active
      color: $green
    .inactive
      color: $red
    &-total
      font-weight: bold
      color: $black
    &-header
      background: $dark-blue
      height: 40px
      @include hor-center-center
      &__item
        color: $white
        flex: 1
        @include hor-center-center
        span
          &:first-child
            margin-right: 6px
      &__line
        background: $white
        height: 14px
        width: 1px

</style>
