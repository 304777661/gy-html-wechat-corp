<template>
  <div class="score">

    <!--<my-loading v-model="loading"/>-->
    <!--<no-data v-show="!loading && !scoreList.length"/>-->

    <div class="score-header">
      <div class="score-header__item" @click="handleTermClick">
        <span>{{curTerm.name || '--'}}</span>
        <van-icon name="arrow-down"></van-icon>
      </div>
      <div class="score-header__line"></div>
      <div class="score-header__item" @click="handleExamClick">
        <span>{{curExamBatch.examDesc || '--'}}</span>
        <van-icon name="arrow-down"></van-icon>
      </div>
    </div>

    <div class="score-table">
      <table>
        <tr class="score-table_th">
          <th>科目</th>
          <th>成绩</th>
          <th>班级排名</th>
        </tr>
        <tr class="score-table_tr" v-for="(item, index) in scoreList" :key="index">
          <td class="course">{{item.courseName}}</td>
          <td class="course">{{item.score}}</td>
          <td class="course">{{item.classRank}}</td>
        </tr>
      </table>
    </div>

    <!--选择学期-->
    <van-popup
      v-model="showTermPicker"
      position="bottom"
      :overlay="true">

      <van-picker :columns="termColumns"
                  show-toolbar
                  :loading="termLoading"
                  value-key="label"
                  :item-height="itemHeight"
                  ref="termPicker"
                  @cancel="onTermCancel"
                  @confirm="onTermConfirm">
      </van-picker>
    </van-popup>

    <!--选择考试批次-->
    <van-popup v-model="showExamPicker"
               position="bottom"
               :overlay="true"
               :loading="examLoading">
      <van-picker :columns="examColumns"
                  @confirm="onExamConfirm"
                  @cancel="onExamCancel"
                  show-toolbar
                  :loading="termLoading"
                  value-key="label"
                  :item-height="itemHeight"
                  ref="examPicker">

      </van-picker>
    </van-popup>
  </div>
</template>

<script>
  export default {
    computed: {
      query () {
        return {
          termId: this.curTerm.id,
          examBatchId: this.curExamBatch.id
        }
      }
    },
    data () {
      return {
        showTermPicker: false,
        showExamPicker: false,
        termLoading: false,
        examLoading: false,
        defaultTermTitle: '学期',
        defaultExamTitle: '考试批次',
        curTerm: {},
        itemHeight: 70,
        termColumns: [{
          values: [],
        }],
        examColumns: [{
          values: [],
        }],
        curExamBatch: {},
        passScore: 60,
        loading: false,
        scoreList: [
          {
            'courseId': 1 /*科目Id*/,
            'courseName': 'courseName' /*科目名称*/,
            'score': 1.0 /*成绩*/,
            'classRank': 1 /*班级排名*/
          }
        ],
        termList: [
          {
            'id': 1 /**/,
            'schoolYearId': 1 /*学年Id*/,
            'name': 'name' /*学期名*/,
            'startDate': '2018-12-14 10:41:57' /*学期开始日期*/,
            'endDate': '2018-12-14 10:41:57' /*学期结束日期*/,
            'firstWeekStartDate': '2018-12-14 10:41:57' /*第一周开始日期*/,
            'createdTime': '2018-12-14 10:41:57' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-14 10:41:57' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }
        ],
        examBatchList: [
          {
            'id': 1 /**/,
            'gradeId': 1 /**/,
            'termId': 1 /*学期Id*/,
            'examDate': '2018-12-14 10:41:57' /*考试日期*/,
            'examDesc': 'examDesc' /*考试描述*/,
            'examType': 'UNIFIED_EXAM' /*考试类型1统考2段考：ALL|UNITED_EXAM|MID_TERM_EXAM|END_TERM_EXAM|MONTHLY_EXAM|UNIFIED_EXAM*/,
            'createdTime': '2018-12-14 10:41:57' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-14 10:41:57' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }
        ]
      }
    },
    async created () {
      this.loading = true
      // 查询学期列表
      this.termList = await this.$api.teacher.querySchoolTermList({})
      if (this.termList && this.termList.length > 0) {
        this.curTerm = {
          id: this.termList[0].id,
          name: this.termList[0].name
        }
        this.termColumns[0].values = this.termList.map(item => {
          return {
            label: item.name,
            value: item.id,
          }
        })
      }

      // 查询考试批次列表
      this.examBatchList = await this.$api.teacher.queryExamBatchList({})
      if (this.examBatchList && this.examBatchList.length > 0) {
        this.curExamBatch = {
          id: this.examBatchList[0].id,
          examDesc: this.examBatchList[0].examDesc
        }
        this.examColumns[0].values = this.examBatchList.map(item => {
          return {
            label: item.examDesc,
            value: item.id
          }
        })
      }
      this.queryData()
      this.loading = false
    },
    methods: {
      async queryData () {
        this.scoreList = await this.$api.parent.queryStudentScore(this.query)
      },
      onTermCancel () {
        this.showTermPicker = false
      },
      onTermConfirm (columns) {
        this.curTerm.id = columns[0].value
        this.curTerm.name = columns[0].label
        this.showTermPicker = false
        this.loading = true
        this.queryData()
        this.loading = false
      },
      onExamCancel () {
        this.showExamPicker = false
      },
      onExamConfirm (columns) {
        this.curExamBatch.id = columns[0].value
        this.curExamBatch.examDesc = columns[0].label
        this.showExamPicker = false
        this.loading = true
        this.queryData()
        this.loading = false
      },
      handleTermClick () {
        this.showTermPicker = true
      },
      handleExamClick () {
        this.showExamPicker = true
      },
    }
  }
</script>

<style lang="sass">

  .score
    &-header
      background: $dark-blue
      height: 36px
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
    &-table
      width: 100%
      padding: $default-gap $default-gap 30px
      table
        position: relative
        width: 100%
        text-align: center
        vertical-align: middle
        $shadow-color: #bccaec
        z-index: 2
        overflow: hidden
        th
          width: 25%
          border-style: none
        td
          font-size: $font-large
          color: #333333
          border: 1px solid $gray
          &.course
            color: #999
            font-size: $font-normal
          &.red
            color: red
</style>
