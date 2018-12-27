<template>
  <div class="meeting-detail">
    <van-cell-group :border="false">
      <van-cell title="会议主题" :value="meeting.subject || '--'"></van-cell>
      <van-cell title="会议室" :value="meeting.meetingRoomName || '--'"></van-cell>
      <van-cell title="所在校区" :value="meeting.campusName || '--'"></van-cell>
      <van-cell title="会议时间" :value="meeting.meetingTime || '--'"></van-cell>
      <van-cell title="参会人员">
        <span>{{meeting.memberCount}}人</span>
      </van-cell>
    </van-cell-group>
    <select-member :canAdd="false" :canDelete="false" :memberList="meeting.memberList"></select-member>
  </div>
</template>

<script>
  export default {
    name: 'MeetingDetail',
    data () {
      return {
        id: this.$route.query.id,
        meeting: {
          memberList: [],
          memberCount: 0
        }
      }
    },
    methods: {},
    async created () {
      this.meeting = await this.$api.teacher.getMeetingOrderDetail({'id': this.id})
      this.meeting.memberCount = this.meeting.memberList.length
    }
  }
</script>
<style scoped lang="sass">
  .meeting-detail
    &-member
      display: flex
      flex-direction: row
      flex-wrap: wrap
      padding: 9px
      background: white
      &-person
        margin: 4px
        img
          @include circle(40px)
        p
          font-size: 14px
          text-align: center
          line-height: 18px
          margin-top: 4px

</style>
