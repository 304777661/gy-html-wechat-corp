<template>
  <div class="week">
    <week-picker @changeDay="doChangeDay"
                 @changeWeek="doChangeWeek"/>

    <my-loading v-model="loading"/>

    <no-data v-show="!loading && !items.length"/>

    <div class="card-group">
      <card v-for="item in items"
            :key="item.classId"
            sharpen
            :tag="item.courseName"
            @click="goAdd(item.classId)">

        <div class="card-cell">
          <span>{{item.className}}</span>
          <van-icon name="arrow"/>
          <span class="card-sharpen__issue"
                :class="[item.isIssue === 'YES' ? 'blue' : 'orange']">{{item.isIssue === 'YES' ? '已发布' : '未发布'}}</span>
        </div>
        <div class="card-cell new">
          <p class="gray">
            <img src="~IMAGE/publish-time.png" class="icon-publish-time">
            最新发布时间: {{item.classDate | ymd}}</p>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        date: new Date(),
        items: [],
        loading: true
      }
    },
    created () {
      this.initData(this.date)
    },
    methods: {
      async initData (date) {
        this.items = []
        this.loading = true
        if (date instanceof Date) {
          date = date.Format('yyyy-MM-dd 00:00:00')
        }
        this.items = await this.$api.teacher.queryInteractRecordList(date)
        this.loading = false
      },
      doChangeDay (curDate) {
        this.initData(curDate)
      },
      doChangeWeek (weekLists, curIdx) {
        this.initData(weekLists[curIdx].date)
      },
      goAdd (id) {
        this.$router.push(`interactive/${id}`)
      }
    }
  }
</script>

<style lang="sass">
  .week
    .card-group
      padding: 0 $default-gap
    .card
      margin: $default-gap auto
      & + .card
        margin: 22px auto
</style>
