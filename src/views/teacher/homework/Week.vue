<template>
  <div class="homework">
    <week-picker @changeDay="doChangeDay"
                 @changeWeek="doChangeWeek"/>

    <my-loading v-model="loading" />
    <no-data v-show="!loading && !homeworkList.length"/>

    <div class="card-group">
      <card sharpen
            v-for="(item, idx) in homeworkList"
            :key="idx"
            :tag="item.courseName || '其他'"
            @click="goDetail(item.taskId)">
        <div class="card-cell">
          <span>{{item.className}}</span>
          <!--<span>-->
          <van-icon name="arrow"/>
          <!--</span>-->
        </div>
      </card>
    </div>

    <span class="icon icon-add" @click="goAdd"></span>
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
        this.homeworkList = await this.$api.teacher.queryTaskInfoList(day.Format('yyyy-MM-dd hh:mm:ss'))
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
      },
      goDetail (id) {
        this.$router.push(`homework/${id}`)
      }
    }
  }
</script>

<style lang="sass">
  .homework
    .card-group
      padding: 0 $default-gap
    .card
      margin: $default-gap auto
      & + .card
        margin: 22px auto
    .icon-add
      position: fixed
      bottom: 80px
      right: $default-gap
      $w: 40px
      @include circle(40px)
      line-height: $w
      text-align: center
      font-size: $font-large
      font-weight: bold
      color: #fff
      background: $blue
</style>
