<template>
  <div class="homework">
    <week-picker @changeDay="doChangeDay"
                 @changeWeek="doChangeWeek"/>
    <my-loading v-model="loading" />
    <no-data v-show="!loading && !homeworkList.length"/>
    <div class="card-group">
      <card sharpen v-for="(item, idx) in homeworkList"
                                   :key="idx"
                                   :tag="item.courseName || '其他'">
        <div class="card-group__body">
          <span>{{item.content}}</span>
        </div>

        <div class="card-cell">
          <div>
            <span class="icon icon-teacher"></span>
            <span class="cell-span-left">授课老师</span>
          </div>
          <span class="cell-span-right">{{item.teacherName}}</span>
        </div>
        <div class="card-cell">
          <div>
            <span class="icon icon-endDate"></span>
            <span class="cell-span-left">截止时间</span>
          </div>
          <span class="cell-span-right">{{item.deadline | parentHomeWorkCardTime}}</span>
        </div>
      </card>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        homeworkList: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      async initData (day = new Date()) {
        this.loading = true
        this.homeworkList = []
        this.homeworkList = await this.$api.parent.queryTaskInfoDateList(day.Format('yyyy-MM-dd hh:mm:ss'))
        console.log(this.homeworkList)
        this.loading = false
      },
      doChangeDay (day) {
        this.initData(day)
      },
      doChangeWeek (weekLists, idx) {
        this.initData(weekLists[idx].date)
      },
      goAdd () {
        this.$router.push('homework/add')
      }
    }
  }
</script>

<style lang="sass">
  .homework
    .card-group
      padding: 0 $default-gap
      margin-bottom: 30px
      &__body
        padding: 10px 10px 10px $default-gap*2
        border-top: 1px solid $gray-light
        span
          font-size: $font-normal
          line-height: 1.2
    .card
      margin: $default-gap auto
      & + .card
        margin: 22px auto
    .cell-span-right
      text-align: right
      color: $gray
    .cell-span-left
      color: $gray
</style>
