<template>
  <div class="psq">
    <survey-info-card class="psq-detail-card"/>
    <p class="psq__total">{{surveyInfo.total}}已人参与</p>

    <van-list v-model="loading"
              :finished="finished"
              @load="onLoad">
      <card>
        <p class="no-body" v-if="!participantList.length">暂时无人参与</p>
        <div class="psq-item"
             v-for="item in participantList"
             :key="item.id">
          <img :src="item.avatar | defaultAvatar" class="psq-item__avatar">
          <span class="psq-item__name">{{item.userName}}</span>
          <span class="psq-item__btn" @click="goDetail(item)">详情</span>
        </div>
      </card>
    </van-list>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    data () {
      const surveyId = this.$route.params.surveyId
      return {
        surveyId,
        surveyInfo: {},
        participantList: [],
        query: {
          surveyId,
          pageNo: 1,
          pageSize: config.pageSize
        },
        loading: false,
        finished: false
      }
    },
    async created () {
      this.surveyInfo = await this.$api.teacher.getSurveyInfo(this.surveyId)
    },
    methods: {
      async onLoad () {
        let data = await this.$api.teacher.querySurveyRecordPage(this.query)
        this.participantList = this.participantList.concat(data.list)
        this.query.pageNo++
        this.loading = false
        this.finished = !data.hasNextPage
      },
      goDetail (item) {
        this.$router.push(`${this.$route.path}/${item.id}?avatar=${item.avatar}&name=${item.userName}`)
      }
    }
  }
</script>

<style lang="sass">
  .psq
    padding: $default-gap
    .psq-detail-card
      padding: 0
    &__total
      margin: $default-gap 0
      color: $gray
    .psq-item
      @include hor-between-center
      padding: 7px 0
      border-bottom: 1.5px dashed $gray-light
      &:first-child
        padding-top: 0
      &:last-child
        padding-bottom: 0
        border-bottom: none
      &__avatar
        flex: 1
        @include fixed-width(45px)
        border-radius: 50%
      &__name
        flex: 4
        margin-left: 18px
      &__btn
        padding: 5px $default-gap
        color: $blue
        border: 1px solid $blue
        border-radius: $default-gap
    .no-body
      text-align: center
      color: $gray
</style>
