<template>
  <div class="score">
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
    <no-data v-show="!loading && !scoreList.length"/>

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
    <my-loading v-model="loading"/>
    <!--选择学期-->
    <van-popup
      v-model="showTermPicker"
      position="bottom"
      :overlay="true">

      <van-picker :columns="termColumns"
                  show-toolbar
                  :loading="termLoading"
                  value-key="label"
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
        termColumns: [],
        examColumns: [],
        curExamBatch: {},
        passScore: 60,
        loading: false,
        scoreList: [],
        termList: [],
        examBatchList: []
      }
    },
    async created () {
      this.loading = true
      // 查询学期列表
      this.termList = await this.$api.teacher.querySchoolTermList({})
      if (this.termList && this.termList.length > 0) {
        let index = this.termList.findIndex(item => item.isDefault === 'YES')
        if (index < 0) {
          this.curTerm = {
            id: this.termList[this.termList.length - 1].schoolTermId,
            name: this.termList[this.termList.length - 1].termName
          }
        } else {
          this.curTerm = {
            id: this.termList[index].schoolTermId,
            name: this.termList[index].termName
          }
        }
        this.termColumns = this.termList.map(item => {
          return {
            label: item.termName,
            value: item.schoolTermId,
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
        this.examColumns = this.examBatchList.map(item => {
          return {
            label: item.examDesc,
            value: item.id
          }
        })
        await this.loadData()
      }
      this.loading = false
    },
    methods: {
      async loadData () {
        this.loading = true
        this.scoreList = await this.$api.parent.queryStudentScore(this.query)
        this.loading = false
      },
      onTermCancel () {
        this.showTermPicker = false
      },
      onTermConfirm (item) {
        this.curTerm.id = item.value
        this.curTerm.name = item.label
        this.showTermPicker = false
        this.loading = true
        this.loadData()
        this.loading = false
      },
      onExamCancel () {
        this.showExamPicker = false
      },
      onExamConfirm (item) {
        this.curExamBatch.id = item.value
        this.curExamBatch.examDesc = item.label
        this.showExamPicker = false
        this.loading = true
        this.loadData()
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
      height: 40px
      @include hor-center-center
      &__item
        color: $white
        flex: 1
        @include hor-center-center
        text-align: center
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
          padding-bottom: 8px
        td
          font-size: $font-large
          color: #333333
          line-height: 25px
          border-bottom: 1px solid $gray-light
          &.course
            color: #999
            font-size: $font-normal
          &.red
            color: red
</style>
