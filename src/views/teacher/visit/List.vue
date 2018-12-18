<template>
  <div class="visit">
    <div class="wrapper">
      <div class="visit-search">
        <search v-model="query.studentName" @search="loadData"></search>
      </div>
      <no-data v-show=" !loading && !visitList.length"/>
      <div ref="wrapper" class="visit-wrapper">
        <van-list
          :loading="loading"
          :finished="true"
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
    <my-button :content="addVisitBtnTitle" @btnClick="handleAddVisitClick"></my-button>
  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'
  import BScroll from 'better-scroll'

  export default {
    name: 'List',
    computed: {
      query () {
        return {
          studentName: null
        }
      }
    },
    data () {
      return {
        addVisitBtnTitle: '增加家访记录',
        loading: false,
        finished: true,
        visitList: [],
      }
    },
    methods: {
      async loadData () {
        this.visitList = await this.$api.teacher.queryHomeVisitingWXList(this.query)
      },
      onSearch () {},
      goToDetail (id) {
        this.$router.push(`/teacher/visit/${id}`)
      },
      handleAddVisitClick () {
        this.$router.push(`/teacher/visitadd`)
      }
    },
    async created () {
      this.loading = false
      this.loadData()
      this.loading = true
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.wrapper, {click: true})
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
    &-search
      padding: $default-gap
      background: $white
      margin-bottom: 10px
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
