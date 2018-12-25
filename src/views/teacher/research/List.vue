<template>
  <div class="research">
    <my-tabs :tabs="tabs" @tabChanged="handleTabChange"></my-tabs>
    <no-data v-show="!loading && !articleList.length"/>
    <my-loading v-model="loading"/>
    <div class="research-list" v-if="articleList && articleList.length>0">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="research-list-item van-hairline--bottom"
             v-for="(item,index) in articleList"
             :key="index"
             @click="handleItemClick(item.id)">
          <div class="research-list-item__header">
            <p>{{item.title}}</p>
          </div>
          <div class="research-list-item__content">
            {{item.content | summary(42)}}
          </div>
          <div class="research-list-item__additional">
            <p>{{item.createdTime | ymd}}</p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>

  import config from '@/config'

  export default {
    name: 'List',
    data () {
      return {
        loading: false,
        finished: false,
        articleList: [],
        pageNo: 1,
        curTabIndex: 0,
        tabs: [{
          id: 0,
          label: '课题研究'
        }, {
          id: 1,
          label: '教师培训'
        }, {
          id: 2,
          label: '奥赛培训'
        }]
      }
    },
    methods: {
      onLoad () {
        this.loadData()
      },
      getQuery () {
        let type = ''
        if (this.curTabIndex === 0) {
          // 课题研究
          type = 'SUBJECT_STUDY'
        } else if (this.curTabIndex === 1) {
          // 教师培训
          type = 'TEACHER_TRAIN'
        } else {
          // 奥赛培训
          type = 'OLYMPICS_TRAIN'
        }
        return {
          noticeType: type,
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      },
      handleTabChange (tabIndex) {
        if (this.curTabIndex === tabIndex) {
          return
        }
        this.curTabIndex = tabIndex
        this.loadData(true)
      },
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
        this.pageNo++
        this.loading = false
      },
      handleItemClick (id) {
        this.$router.push(`/teacher/research/detail?id=${id}`)
      }
    },
    async created () {
      this.loading = true
      await this.loadData()
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">

  .research
    padding-bottom: $default-gap
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
