<template>
  <div class="visit">
    <div class="wrapper">
      <search v-model="studentName" @search="onSearch"></search>
      <no-data v-show="!loading && !visitList.length"/>
      <my-loading v-model="loading"/>
      <div ref="wrapper" class="visit-wrapper" v-if="visitList && visitList.length>0">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="loadData">
          <div class="visit-wrapper-item van-hairline--bottom"
               v-for="(item,index) in visitList"
               :key="index"
               @click="goToDetail(item.id)">
            <img :src="item.avatar | defaultAvatar" class="visit-wrapper-item__avatar">
            <span class="visit-wrapper-item-name">{{item.studentName}}</span>
            <span class="visit-wrapper-item-date">最近家访时间：{{item.visitDate | ymd}}</span>
          </div>
        </van-list>
      </div>
    </div>
    <my-button :content="'增加家访记录'" @btnClick="handleAddVisitClick"></my-button>
  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'
  // import BScroll from 'better-scroll'

  export default {
    name: 'VisitList',
    data () {
      return {
        finished: true,
        loading: false,
        visitList: [],
        studentName: ''
      }
    },
    watch: {
      studentName (newVal) {
        if (!newVal) {
          this.loadData()
        }
      }
    },
    methods: {
      async loadData () {
        this.loading = true
        this.visitList = await this.$api.teacher.queryHomeVisitingWXList({
          'studentName': (this.studentName.length === 0) ? null : this.studentName
        })
        this.loading = false
      },
      onSearch () {
        this.loadData()
      },
      goToDetail (id) {
        this.$router.push(`/teacher/visit/detail?id=${id}`)
      },
      handleAddVisitClick () {
        this.$router.push(`/teacher/visit/add`)
      }
    },
    async activated () {
      this.loadData()
    },
    mounted () {
      // this.scroll = new BScroll(this.$refs.wrapper, {click: true})
    }
  }
</script>

<style scoped lang="sass">
  .visit
    height: 100vh
    .wrapper
      height: calc(100vh - 70px)
    /deep/ .van-hairline--bottom
      &:after
        left: 12px
    &-btn
      position: absolute
      left: 50%
      bottom: -15px
      transform: translate(-50%, 0)
    &-wrapper
      position: absolute
      left: 0
      right: 0
      bottom: 60px
      top: 64px
      height: calc(100vh - 72px - 64px)
      overflow: hidden
      &-item
        height: 59px
        line-height: 59px
        padding: 0 12px
        background: $white
        @include hor
        align-items: center
        &__avatar
          @include circle(40px)
        &-name
          color: $black
          margin-left: 14px
          font-size: 17px
        &-date
          color: #9B9B9B
          font-size: 12px
          position: absolute
          right: 0
          padding-right: 14px

</style>
