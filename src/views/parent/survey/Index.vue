<!--问卷调查-->
<template>
  <div class="survey">
    <no-data v-show="!loading && !surveyList.length"/>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <div class="survey-item"
           v-for="item in surveyList"
           :key="item.id"
           @click="goDetail(item.id)">
        <div class="survey-item-header">
          <span class="survey-item-header__title">{{item.title}}</span>
          <div class="survey-item-header__tag">
            <van-tag v-if="item.isParticipated === 'YES'" color="#24A197">已参与
            </van-tag>
            <van-tag v-else-if="item.isFinish === 'YES'" color="#9B9B9B" plain>已结束
            </van-tag>
            <van-tag v-else color="#24A197" plain>进行中
            </van-tag>
          </div>
        </div>
        <div class="survey-item-body">
          {{item.content.length > 42? item.content.substr(0,42)+'......' : item.content}}
        </div>
        <div class="van-hairline--bottom"></div>
        <div class="survey-item-footer">
          <span class="mailbox-item-footer__date">{{item.participatedNum}}人已参与</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    name: 'SurveyIndex',
    data () {
      return {
        keywords: null,
        pageNo: 1,
        loading: false,
        finished: true,
        surveyList: []
      }
    },
    methods: {
      onLoad () {
        this.loadData()
      },
      goDetail (id) {
        this.$router.push(`/parent/survey/detail?id=${id}`)
      },
      getQuery () {
        return {
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      },
      async loadData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.surveyList = []
          this.pageNo = 1
        }
        let data = await this.$api.parent.querySurveyPage(this.getQuery())
        if (resetList) {
          this.surveyList = data.list
        } else {
          this.surveyList = this.surveyList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.pageNo++
      },
    },
    async created () {
      await this.loadData(true)
    }
  }
</script>

<style scoped lang="sass">
  .survey
    height: 100vh
    &-item
      padding: 8px 14px 8px
      background: $white
      border-bottom: 1px solid $gray-light
      &-header
        position: relative
        line-height: 1
        @include hor-start-center
        &__title
          flex: 1
          font-size: 17px
          line-height: 21px
          color: $black
          @include text-overflow
          font-weight: bold
        &__tag
          font-size: 12px
          margin-left: 10px
          margin-top: 2px
          .van-tag
            padding: 3px 8px
      &-body
        padding: 8px 0 8px
        font-size: 14px
        color: $gray
        line-height: 1.5
      &-footer
        font-size: 13px
        line-height: 18px
        color: #ccc
        margin-top: 8px
        &__line
          margin: 0 8px
</style>
