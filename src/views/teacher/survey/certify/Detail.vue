<template>
  <div class="certify-detail">
    <survey-info-card/>
    <!--<card v-for="item in participantList"-->
    <!--:key="item.id">-->

    <van-list :loading="loading"
              :finished="finished"
              @load="onLoad">
      <card class="participant"
            v-for="item in participantList"
            :key="item.id">
        <div class="header">
          <img :src="item.avatar | defaultAvatar" class="avatar">
          <div class="info">
            <p class="name">{{item.userName}}</p>
            <p class="class">初一(1)班</p>
          </div>
          <span class="time">{{item.updatedTime | publishTime}}</span>
        </div>
        <picture-map class="my15" :pictures="item.imageList"/>
      </card>
    </van-list>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    data () {
      const id = this.$route.params.id
      return {
        id,
        query: {
          surveyId: id,
          pageNo: 1,
          pageSize: config.pageSize
        },
        participantList: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      async onLoad () {
        let data = await this.$api.teacher.querySurveyRecordPage(this.query)
        this.participantList = data.list
        this.query.pageNo++
        this.loading = false
        this.finished = !data.hasNextPage
      }
    }
  }
</script>

<style lang="sass">
  .certify-detail
    padding: 0 $default-gap $default-gap

    .card
      margin-top: $default-gap
      &.participant
        padding: 0 $default-gap
      .header
        height: 65px
        border-bottom: 1.5px dashed $gray-light
        @include hor-between-center
        .avatar
          $w: 44px
          flex: 1
          @include circle($w)
          @include fixed-width($w)
        .info
          flex: 2
          margin-left: $default-gap
          .name
            font-weight: bold
          .class
            margin-top: 6px
            font-size: $font-small
        .time
          color: $gray
</style>
