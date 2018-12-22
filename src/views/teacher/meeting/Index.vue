<template>
  <div class="meeting">
    <div class="wrapper">
      <my-tabs :tabs="tabs" @tabChanged="handleTabChange"/>
      <no-data v-show="!loading && !meetingList.length"/>
      <div v-if="meetingList && meetingList.length>0">
        <van-list
          :loading="loading"
          :finished="finished"
          @load="onLoad">
          <div class="meeting-item van-hairline--bottom"
               v-for="(meeting, index) in meetingList"
               :key="index"
               @click="goDetail(meeting.id)">
            <div class="meeting-item-header">
              <p class="meeting-item-header__title">{{meeting.subject}}</p>
              <van-tag class="meeting-item-header__tag" plain>{{$enums.MeetingStatus.getName(meeting.meetingStatus)}}
              </van-tag>
            </div>
            <p class="meeting-item-info">会议时间：{{meeting.meetingTime}}</p>
            <p class="meeting-item-info">会议地点：{{meeting.meetingRoomName}}</p>
            <p class="meeting-item-info">所在校区：{{meeting.campusName}}</p>
          </div>
        </van-list>
      </div>
    </div>
    <my-button :content="'预定会议室'" @btnClick="handleBookMeeting"></my-button>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    name: 'Meeting',
    data () {
      return {
        meetingList: [],
        keywords: null,
        allMeetingPageNo: 1,
        selfMeetingPageNo: 1,
        loading: false,
        finished: false,
        curTabIndex: 0,
        tabs: [{
          id: 0,
          label: '所有会议'
        }, {
          id: 1,
          label: '我的会议'
        }]
      }
    },
    methods: {
      handleTabChange (curTabIndex) {
        if (this.curTabIndex === curTabIndex) {
          return
        }
        this.curTabIndex = curTabIndex
        this.loadData(true)
      },
      onLoad () {
        this.loadData()
      },
      handleBookMeeting () {
        this.$router.push(`meeting/book`)
      },
      goDetail (id) {
        this.$router.push(`meeting/detail/${id}`)
      },
      getQuery (isSelf) {
        return {
          keywords: null,
          orderDate: null,
          selfOnly: isSelf ? 'NO' : 'YES',
          pageNo: isSelf ? this.allMeetingPageNo : this.selfMeetingPageNo,
          pageSize: config.pageSize
        }
      },
      async loadData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.meetingList = []
          this.pageNo = 1
        }
        let data = await this.$api.teacher.queryMeetingPage(this.getQuery(this.curTabIndex === 1))
        if (resetList) {
          this.meetingList = data.list
        } else {
          this.meetingList = this.meetingList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
      }
    },
    async activated () {
      await this.loadData(true)
    }
  }
</script>

<style scoped lang="sass">
  .meeting
    .wrapper
      height: calc(100vh - 70px)
    &-item
      background: $white
      padding: 10px 14px
      &-header
        @include hor-between-center
        &__title
          flex: 1
          line-height: 23px
          font-size: 17px
          @include text-overflow
          margin-bottom: 2px
      &-info
        color: #9B9B9B
        padding: 2px 0
        font-size: 14px
        line-height: 18px

</style>
