<template>

  <div class="team">

    <div class="team-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>

    <my-tabs :tabs="tabs" @tabChanged="handleTabChange" :swipeable="true"/>

    <div class="team-list" v-if="teachGroupList.length">
      <no-data v-show="!loading && !teachGroupList[curTabIndex].articleList.length"/>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="team-list-item van-hairline--bottom"
             v-for="(item,index) in teachGroupList[curTabIndex].articleList"
             :key="index"
             @click="handleItemClick(item.id)">
          <div class="team-list-item__header">
            <p>{{item.title}}</p>
          </div>
          <div class="team-list-item__content">
            {{item.content.length > 60? item.content.substr(0,60)+'......' : item.content}}
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
        finished: true,
        keywords: null,
        curTabIndex: 0,
        teachGroupList: [],
        tabs: [],
      }
    },
    methods: {
      onSearch () {
      },
      onLoad () {},
      handleTabChange (tabIndex) {
        this.curTabIndex = tabIndex
        // 请求
        this.loadData()
      },
      query () {
        return {
          teachGroupId: this.teachGroupList[this.curTabIndex].id,
          keywords: this.keywords,
          pageNo: this.teachGroupList[this.curTabIndex].pageNo,
          pageSize: config.pageSize
        }
      },
      handleItemClick (id) {
        this.$router.push(`/teacher/team/${id}`)
      },
      async loadData () {
        let resp = await this.$api.teacher.queryTeachGroupPage(this.query())
        this.teachGroupList[this.curTabIndex].articleList = resp.list
        console.log(this.teachGroupList[this.curTabIndex].articleList)
      }
    },
    async created () {
      this.loading = true
      let teachGroupList = await this.$api.teacher.queryTeachGroupList({})
      if (teachGroupList && teachGroupList.length > 0) {
        // 初始化tabs
        this.tabs = teachGroupList.map(item => {
          return {
            id: item.id,
            label: item.name
          }
        })
        for (let i = 0; i < teachGroupList.length; i++) {
          // 每页单独记录分页信息
          teachGroupList[i].pageNo = 1
          teachGroupList[i].articleList = []
        }
        this.teachGroupList = teachGroupList
        this.handleTabChange(0)
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
