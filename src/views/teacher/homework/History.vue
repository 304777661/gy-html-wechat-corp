<template>
  <div class="history">
    <div class="history-head">
      <select-picker :columns="columns"
                     :default-index="7"
            @confirm="onMonthConfirm"/>
    </div>

    <my-loading v-model="loading"/>
    <no-data v-show="!loading && !historyList.length"/>

    <div v-show="!loading">
      <card sharpen
            v-for="item in historyList"
            :key="item.interactRecordId"
            :tag="item.courseName"
            @click="goDetail(item.taskId)">
        <div class="card-cell">
          <span>{{item.className}}</span>
          <van-icon name="arrow"/>
          <!--<span class="gray">2018-09-02</span>-->
        </div>
        <div class="card-cell">
          <p class="gray">
            <img src="~IMAGE/publish-time.png" class="icon-publish-time">
            {{item.issueDate | ymd}}
          </p>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      let date = new Date()
      let columns = []
      for (let i = 1; i < 13; i++) {
        columns.push({
          label: `${i}月`,
          id: i
        })
      }
      return {
        loading: true,
        date,
        historyList: [],
        columns
      }
    },
    computed: {
      queryTime () {
        return this.date.Format('yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      async initData () {
        this.loading = true
        this.historyList = []
        this.historyList = await this.$api.teacher.queryTaskInfoHistoryList(this.queryTime)
        this.loading = false
      },
      onMonthConfirm (val) {
        if (val && val.id) {
          this.date = new Date(this.date.setMonth(val.id - 1))
        }
        this.initData()
      },
      goDetail (id) {
        this.$router.push(`homework/${id}`)
      }
    }
  }
</script>

<style lang="sass">
  .history
    &-head
      height: 60px
      background: #fff
      box-shadow: 0 0 8px 4px $default-shadow-color
      @include hor-around-center
      .select
        width: 108px
    .card
      width: 92%
      margin: $default-gap auto
</style>
