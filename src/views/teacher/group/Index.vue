<template>
  <div class="group">
    <search v-model="keywords" @search="onSearch"></search>
    <my-tabs :tabs="tabs" @tabChanged="handleTabChange" :swipeable="true" v-if="tabs && tabs.length>0"/>
    <no-data v-show="!loading && !articleList.length"/>
    <my-loading v-model="loading"/>
    <div v-if="articleList && articleList.length>0">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="group-item van-hairline--bottom"
             v-for="(item,index) in articleList"
             :key="index"
             @click="handleItemClick(item.id)">
          <div class="group-item-thumbnail">
            <img v-if="item.bannerImage" :src="item.bannerImage">
            <img v-else src="../../../assets/images/group_thumb.png">
          </div>
          <div class="group-item-content">
            <p class="group-item-content__title">{{item.title}}</p>
            <p class="group-item-content__summary">{{item.content | summary(32)}}</p>
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
  .group
    padding-bottom: $default-gap
    &-item
      padding: 10px 14px
      background: $white
      @include hor-start-center
      $imgWidth: 70px
      &-thumbnail
        border: .5px solid $gray-light
        width: $imgWidth
        height: $imgWidth
        margin-right: 8px
        @include hor-center-center
        border-radius: 4px
      &-content
        flex: 1
        min-width: 0
        &__title
          font-weight: bold
          font-size: 16px
          color: $black
          line-height: 22px
          @include text-overflow
        &__summary
          font-size: 15px
          line-height: 1.3
          margin-top: 6px
          color: #9B9B9B
</style>
