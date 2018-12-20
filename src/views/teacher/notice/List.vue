<template>
  <div class="notice">
    <div class="notice-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <my-tabs :tabs="tabs" @tabChanged="handleTabChange"></my-tabs>
    <no-data v-show="!loading && !articleList.length"/>
    <div class="notice-list" v-if="articleList.length">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="notice-list-item van-hairline--bottom"
             v-for="(item,index) in articleList"
             :key="index"
             @click="goDetail(item.id)">
          <div class="notice-list-item__header">
            <p>{{item.title}}</p>
          </div>
          <div class="notice-list-item__content">
            {{item.content.length > 60? item.content.substr(0,60)+'......' : item.content}}
          </div>
          <div class="notice-list-item__additional">
            <p>{{item.createdTime | ymd}}</p>
          </div>
        </div>
      </van-list>
    </div>
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
    async created () {
      this.loadData(true)
    },
    watch: {
      keywords (newVal) {
        if (!newVal) {
          this.loadData(true)
        }
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
        this.$router.push(`/teacher/notice/detail/${id}`)
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
          keywords: this.keywords,
          pageSize: config.pageSize
        }
      }
    },
  }
</script>

<style scoped lang="sass">

  .notice
    padding-bottom: $default-gap
    &-search
      padding: $default-gap
      background: $white
      margin-bottom: 10px
    &-list
      &-item
        padding: 14px
        background: $white
        &__header
          font-weight: bold
          font-size: 18px
          color: $black
          line-height: 25px
          p
            @include text-overflow
        &__content
          font-size: 15px
          margin-top: 6px
          color: #9B9B9B
        &__additional
          margin-top: 8px
          color: #9B9B9B
</style>
