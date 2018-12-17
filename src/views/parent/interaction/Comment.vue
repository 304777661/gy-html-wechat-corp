<template>
  <div class="comment">
    <no-data v-show=" !loading && !recordList.length"/>
    <van-list v-model="loading"
              :finished="finished"
              @load="onLoad">
      <div class="card-group" v-for="item in recordList" :key="item.id" @click="goDetail(item.classDate)">
        <span class="card-group__date">{{item.classDate | yyyymmdd}}</span>
        <div class="card-group__right">
          <span  v-for="tagTypes in item.commentTagTypes" :class="['dot',{'praise':tagTypes === 'PRAISE'},{'criticism':tagTypes === 'CRITICISM'}]"  v-show="tagTypes.length > 0" :key="tagTypes"></span>
          <span>提到{{item.studentName}}</span>
          <van-icon name="arrow"/>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    data () {
      return {
        query: {
          pageNo: 1,
          pageSize: config.pageSize
        },
        recordList: [],
        loading: false,
        finished: false
      }
    },
    created () {
      this.initData()
    },
    methods: {
      async initData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.recordList = []
          this.pageNo = 1
        }
        let data = await this.$api.parent.queryInteractTagRecordList(this.query)
        if (resetList) {
          this.recordList = data.list
        } else {
          this.recordList = this.recordList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.query.pageNo++
      },
      onLoad () {
        this.initData()
      },
      goDetail (date) {
        this.$router.push(`interaction/${date}`)
      }
    }
  }
</script>

<style lang="sass">
  .comment
    padding: $default-gap $default-gap 0
    .card-group
      padding: 0 $default-gap
      width: 100%
      height: 40px
      @include hor-between-center
      background: white
      border-radius: 5px
      box-shadow: $default-shadow
      margin-bottom: 10px
      &__right
        font-size: $font-small
        color: $gray
        @include hor-center-center
        .dot
          $dot-wh: 8px
          width: $dot-wh
          height: $dot-wh
          border-radius: 50%
          margin-right: 5px
        .praise
          background: $green
        .criticism
          background: $red
</style>
