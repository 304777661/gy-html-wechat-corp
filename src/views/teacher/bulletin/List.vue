<template>
  <div class="bulletin">
    <div class="bulletin-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <no-data v-show="!loading && !articleList.length"/>
    <my-tabs :tabs="tabs" @tabChanged="handleTabChange"/>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <div class="bulletin-item van-hairline--bottom"
           v-for="item in articleList"
           :key="item.id"
           @click="goDetail(item.id)">
        <p class="bulletin-item-title">
          {{item.title}}
        </p>
        <p class="bulletin-item-summary">
          {{item.content}}
        </p>
        <p class="bulletin-item-date">{{item.createdTime | ymd}}</p>
      </div>
    </van-list>
  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'
  import MyTabs from 'COMPONENT/MyTabs'
  import config from '@/config'

  export default {
    components: {
      Search,
      MyTabs
    },
    data () {
      return {
        keywords: null,
        pageNo: 1,
        articleList: [],
        loading: false,
        finished: false,
        curTabIndex: 0,
        tabs: [{
          id: 0,
          label: '通知公告'
        }, {
          id: 1,
          label: '学校规章'
        }]
      }
    },
    methods: {
      async loadData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.articleList = []
          this.pageNo = 1
        }
        let data = await this.$api.teacher.queryNoticePage(this.getQuery())
        if (resetList) {
          this.articleList = data.list
        } else {
          this.articleList = this.articleList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.pageNo++
      },
      onSearch () {
        this.loadData(true)
      },
      onLoad () {
        this.loadData()
      },
      goDetail (id) {
        this.$router.push(`bulletin/${id}`)
      },
      handleTabChange (tabIndex) {
        if (this.curTabIndex === tabIndex) {
          return
        }
        this.curTabIndex = tabIndex
        this.loadData(true)
      },
      getQuery () {
        return {
          noticeType: this.curTabIndex === 0 ? 'NOTICE' : 'SCHOOL_RULE',
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      }
    },
  }
</script>

<style lang="sass" scoped>
  .bulletin
    padding-bottom: $default-gap
    display: flex
    flex-direction: column
    height: 100vh
    &-search
      padding: 9px $default-gap
      background: $white
      margin-bottom: 10px
    /deep/ .van-list
      /*position: absolute*/
      /*left: 0*/
      /*bottom: 0*/
      /*top: 194px*/
      /*right: 0*/
      max-height: calc(100vh - 48px)
      flex: 1
      overflow: auto
    &-item
      height: 137px
      background: $white
      padding: 14px
      &-title
        font-size: 17px
        color: $black
        line-height: 22px
      &-summary
        margin-top: 8px
        color: $normal-text-color
        font-size: 14px
        line-height: 20px
        @include text-overflow-line(3)
      &-date
        margin-top: 10px
        color: #ccc
        font-size: 13px
        line-height: 18px
</style>
