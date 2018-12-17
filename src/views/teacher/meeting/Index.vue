<template>
  <div class="meeting">
    <div class="wrapper">


      <my-tabs :tabs="tabs" @tabChanged="handleTabChange" :swipeable="false"/>

      <div v-show="curTabIndex === 0">
        <no-data v-show="!allMeetingLoading && !allMeetingList.length"/>

        <van-list
          :loading="allMeetingLoading"
          :finished="allMeetingFinished"
          @load="onLoadAllMeeting">
          <div class="meeting-item van-hairline--bottom"
               v-for="(meeting, index) in allMeetingList"
               :key="index"
               @click="goDetail(meeting)">
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

      <div v-show="curTabIndex === 1">
        <no-data v-show="!selfMeetingLoading && !selfMeetingList.length"/>

        <van-list
          :loading="selfMeetingLoading"
          :finished="selfMeetingFinished"
          @load="onLoadSelfMeeting">
          <div class="meeting-item van-hairline--bottom"
               v-for="(meeting, index) in selfMeetingList"
               :key="index"
               @click="goDetail(meeting)">
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
    <my-button :content="bookBtnTitle" @btnClick="handleBookMeeting"></my-button>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    name: 'Meeting',
    data () {
      return {
        allMeetingLoading: false,
        selfMeetingLoading: false,
        allMeetingFinished: true,
        selfMeetingFinished: true,
        bookBtnTitle: '预定会议室',
        meetingList: [],
        keywords: null,
        allMeetingPageNo: 1,
        selfMeetingPageNo: 1,
        loading: false,
        finished: false,
        curTabIndex: 0,
        allMeetingList: [
          {
            'meetingTime': 'meetingTime' /*会议时间*/,
            'subject': 'subject' /*会议主题*/,
            'meetingRoomName': 'meetingRoomName' /*会议室名称*/,
            'meetingStatus': 'CANCELED' /*会议状态：ALL|NOT_STARTED|STARTED|CANCELED*/,
            'memberList': [
              {
                'userId': 1 /*用户Id*/,
                'name': 'name' /*姓名*/,
                'avatar': 'avatar' /*头像*/
              }
            ]
          }
        ],
        selfMeetingList: [
          {
            'meetingTime': 'meetingTime' /*会议时间*/,
            'subject': 'subject' /*会议主题*/,
            'meetingRoomName': 'meetingRoomName' /*会议室名称*/,
            'meetingStatus': 'CANCELED' /*会议状态：ALL|NOT_STARTED|STARTED|CANCELED*/,
            'memberList': [
              {
                'userId': 1 /*用户Id*/,
                'name': 'name' /*姓名*/,
                'avatar': 'avatar' /*头像*/
              }
            ]
          }
        ],
        tabs: [{
          id: 1,
          label: '所有会议'
        }, {
          id: 2,
          label: '我的会议'
        }]
      }
    },
    methods: {
      handleTabChange (curTabIndex) {
        this.curTabIndex = curTabIndex
      },
      onLoadAllMeeting () {

      },
      onLoadSelfMeeting () {

      },
      handleBookMeeting () {
        console.log(222)
        this.$router.push(`meeting/book`)
      },
      goDetail (meeting) {
        sessionStorage.setItem('CURRENT_MEETING', JSON.stringify(meeting))
        this.$router.push(`meeting/detail`)
      },
      query (isSelf) {
        return {
          keywords: null,
          orderDate: null,
          selfOnly: isSelf ? 'NO' : 'YES',
          pageNo: isSelf ? this.allMeetingPageNo : this.selfMeetingPageNo,
          pageSize: config.pageSize
        }
      }
    },
    async created () {
      this.loading = true
      let allMeetingResp = await this.$api.teacher.queryMeetingPage(this.query(false))
      let selfMeetingResp = await this.$api.teacher.queryMeetingPage(this.query(true))
      this.allMeetingList = allMeetingResp.list
      this.selfMeetingList = selfMeetingResp.list
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .meeting
    $mb: 70px
    .wrapper
      height: calc (100vh - #{$mb})
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
