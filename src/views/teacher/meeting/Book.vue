<template>
  <div class="meeting-book">
    <van-cell-group>
      <van-field v-model="submit.subject" label="会议主题" placeholder="请输入" input-align="right"></van-field>
      <van-cell title="会议室" is-link @click="handleAddressClick" :value="address"></van-cell>
      <van-cell title="所在校区" :value="campusName"></van-cell>
      <van-cell title="会议时间" is-link @click="handleSelectTimeClick" :value="meetingDate"></van-cell>
    </van-cell-group>

    <div class="meeting-book-sticky">
      <van-cell title="参会人员" :value="memberList.length + '人'"></van-cell>
      <select-member :canAdd="true"
                     :canDelete="true"
                     :memberList="memberList"
                     @addClick="handleAddMemberClick">
      </select-member>
    </div>

    <!--选择考试批次-->
    <van-popup v-model="showAddressPicker"
               position="bottom"
               :overlay="true"
               :loading="pickerLoading">
      <van-picker :columns="columns"
                  @confirm="onAddressConfirm"
                  @cancel="onAddressCancel"
                  show-toolbar
                  value-key="label"
                  ref="picker">
      </van-picker>
    </van-popup>

    <my-button :content="submitBtnTitle" @btnClick="handleSubmitClick"></my-button>
  </div>
</template>

<script>
  export default {
    name: 'MeetingBook',
    data () {
      return {
        showAddressPicker: false,
        pickerLoading: false,
        submitBtnTitle: '提交',
        columns: [{
          values: []
        }],
        meetingRoomList: [],
        meetingDate: '',
        itemHeight: 70,
        campusName: '',
        address: '',
        memberList: [],
        submit: {
          orderDate: '',
          subject: '',
          meetingRoomId: 0,
          timeIntervalIdList: [],
          memberIdList: []
        },
        myself: {},
      }
    },
    methods: {
      handleTimeEvent () {
        this.$eventBus.$on('meetingTime', ({orderDate, timeIntervalIdList, startEndTime}) => {
          this.submit.orderDate = orderDate.Format('yyyy-MM-dd hh:mm:ss')
          this.meetingDate = orderDate.Format('yyyy-MM-dd') + ' ' + startEndTime
          this.submit.timeIntervalIdList = timeIntervalIdList
        })
      },
      handleMemberSelectedEvent () {
        this.$eventBus.$on('memberSelectedEvent', (memberSelectedList) => {
          this.memberList = memberSelectedList
        })
      },
      handleAddMemberClick () {
        sessionStorage.setItem('MEETING_MEMBER', JSON.stringify(this.memberList))
        this.$router.push(`/teacher/meeting/member`)
      },
      handleSelectTimeClick () {
        // 必须先选择会议室
        if (this.address.length === 0) {
          this.$toast.fail('请选择会议室')
          return
        }
        sessionStorage.setItem('MEETING_ROOM', JSON.stringify({
          id: this.submit.meetingRoomId,
          name: this.address,
          campus: this.campusName
        }))
        this.$router.push(`/teacher/meeting/time`)
      },
      handleAddressClick () {
        this.showAddressPicker = true
      },
      onAddressConfirm (columns) {
        this.campusName = columns[0].campus
        this.address = columns[0].address
        this.submit.meetingRoomId = columns[0].value
        this.showAddressPicker = false
      },
      onAddressCancel () {
        this.showAddressPicker = false
      },
      async handleSubmitClick () {
        // 数据校验
        if (this.submit.subject.length === 0) {
          this.$toast.fail('请输入会议主题')
          return
        }
        if (this.submit.meetingRoomId <= 0) {
          this.$toast.fail('请选择会议室')
          return
        }
        if (this.meetingDate.length === 0) {
          this.$toast.fail('请选择会议时间')
          return
        }
        if (this.memberList.length === 0) {
          this.$toast.fail('请选择参会人员')
          return
        }
        this.memberList.map(item => {
          this.submit.memberIdList.push(item.id)
        })
        this.loading = true
        await this.$api.teacher.addMeetingOrder(this.submit)
        this.loading = false
        this.$toast.success('提交成功')
        this.$router.back()
      },

    },
    async created () {
      let myself = await this.$api.teacher.getSessionUserDetail({})
      myself.id = myself.userId
      this.myself = myself
      this.meetingRoomList = await this.$api.teacher.queryMeetingRoomList()
      if (this.meetingRoomList && this.meetingRoomList.length > 0) {
        this.columns[0].values = this.meetingRoomList.map(item => {
          return {
            label: item.name + ' - ' + item.campusName,
            value: item.id,
            address: item.name,
            campus: item.campusName
          }
        })
      }
      this.memberList.push(this.myself)
    },
    mounted () {
      this.handleTimeEvent()
      this.handleMemberSelectedEvent()
    }
  }
</script>

<style scoped lang="sass">
  .meeting-book
    &-sticky
      margin-top: 10px
    &-member
      background: white
      display: flex
      flex-direction: row
      flex-wrap: wrap
      padding: 12px 14px
      img
        @include circle(60px)
        margin: 8px
      p
        font-size: 14px
        line-height: 18px
        margin-top: 4px
        text-align: center
        @include text-overflow
      .van-icon
        margin: 8px 8px

</style>
