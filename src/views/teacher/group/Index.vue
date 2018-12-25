<template>
  <div class="team">
    <div class="team-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <my-tabs :tabs="tabs" @tabChanged="handleTabChange" :swipeable="true" v-if="tabs && tabs.length>0"/>
    <no-data v-show="!loading && !articleList.length"/>
    <my-loading v-model="loading"/>
    <div class="team-list" v-if="articleList.length">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="team-list-item van-hairline--bottom"
             v-for="(item,index) in articleList"
             :key="index"
             @click="handleItemClick(item.id)">
          <div class="team-list-item__header">
            <p>{{item.title}}</p>
          </div>
          <div class="team-list-item__content">
            {{item.content.length > 42? item.content.substr(0,42)+'......' : item.content}}
          </div>
          <div class="team-list-item__additional" v-show="item.bannerImage">
            <img :src="item.bannerImage">
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import MyTabs from 'COMPONENT/MyTabs'
  import config from '@/config'

  export default {
    components: {
      MyTabs
    },
    name: 'Index',
    data () {
      return {
        loading: false,
        finished: false,
        keywords: null,
        curTabIndex: 0,
        teachGroupList: [],
        tabs: [],
        pageNo: 1,
        articleList: []
      }
    },
    watch: {
      keywords (newVal) {
        if (!newVal) {
          this.loadData(true)
        }
      }
    },
    methods: {
      onSearch () {
        this.loadData(true)
      },
      onLoad () {
        this.loadData()
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
          teachGroupId: this.teachGroupList[this.curTabIndex].id,
          keywords: this.keywords,
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      },
      handleItemClick (id) {
        this.$router.push(`/teacher/group/detail?id=${id}`)
      },
      async loadData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.articleList = []
          this.pageNo = 1
        }
        let data = await this.$api.teacher.queryTeachGroupPage(this.getQuery())
        if (resetList) {
          this.articleList = data.list
        } else {
          this.articleList = this.articleList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.pageNo++
      }
    },
    async created () {
      this.loading = true
      let teachGroupList = await this.$api.teacher.queryTeachGroupList({})
      if (teachGroupList && teachGroupList.length > 0) {
        this.tabs = teachGroupList.map(item => {
          return {
            id: item.id,
            label: item.name
          }
        })
        this.teachGroupList = teachGroupList
        this.loadData()
      }
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">

  .team
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
          width: 100%
</style>
