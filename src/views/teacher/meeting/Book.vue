<template>
  <div class="meeting-book">
    <van-cell-group>
      <van-field v-model="query.subject" label="会议主题" placeholder="请输入" input-align="right"></van-field>
      <van-cell title="会议室" is-link @click="handleAddressClick" :value="address"></van-cell>
      <van-cell title="所在校区" :value="campusName"></van-cell>
      <van-cell title="会议时间" is-link @click="handleSelectTimeClick" :value="meetingDate"></van-cell>
      <van-cell title="参会人员"><span>{{memberList.length}}人</span></van-cell>
    </van-cell-group>

    <div class="meeting-book-member">
      <div class="meeting-book-member-person" v-for="(person,index) in memberList" :key="index">
        <img :src="person.avatar | defaultAvatar">
        <p>{{person.name}}</p>
      </div>
      <van-icon name="add-o" size="120px" color="#ccc" @click="handleAddMemberClick"></van-icon>
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
                  :item-height="itemHeight"
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
        query: {
          orderDate: '2018-12-17 03:24:14',
          subject: '',
          meetingRoomId: 1,
          timeIntervalIdList: [],
          memberIdList: [1]
        },
        myself: {
          'userId': 1 /*用户Id*/,
          'name': 'name' /*姓名*/,
          'empNo': 'empNo' /*工号*/,
          'phone': '13487317051' /*手机号码*/,
          'avatar': 'avatar' /*头像*/,
          'isTeacher': 'NO' /*是否教师：ALL|YES|NO*/,
          'isParent': 'NO' /*是否家长：ALL|YES|NO*/
        },
      }
    },
    methods: {
      handleTimeEvent () {
        this.$eventBus.$on('meetingTime', ({orderDate, timeIntervalIdList, startEndTime}) => {
          this.query.orderDate = orderDate.Format('yyyy-MM-dd hh:mm:ss')
          this.meetingDate = orderDate.Format('yyyy-MM-dd') + ' ' + startEndTime
          this.query.timeIntervalIdList = timeIntervalIdList
        })
      },
      handleAddMemberClick () {
        this.$router.push(`/teacher/meeting/member`)
      },
      handleSelectTimeClick () {
        // 必须先选择会议室
        if (this.address.length === 0) {
          this.$toast.fail('请选择会议室')
          return
        }
        sessionStorage.setItem('MEETING_ROOM', JSON.stringify({
          id: this.query.meetingRoomId,
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
        this.query.meetingRoomId = columns[0].value
        this.showAddressPicker = false
      },
      onAddressCancel () {
        this.showAddressPicker = false
      },
      async handleSubmitClick () {
        // 数据校验
        if (this.query.subject.length === 0) {
          this.$toast.fail('请输入会议主题')
          return
        }
        if (this.query.meetingRoomId <= 0) {
          this.$toast.fail('请选择会议室')
          return
        }
        if (this.meetingDate.length === 0) {
          this.$toast.fail('请选择会议时间')
          return
        }
        this.loading = true
        await this.$api.teacher.addMeetingOrder(this.query)
        this.loading = false
        this.$toast.success('提交成功')
        this.$router.back()
      }
    },
    async created () {
      this.myself = await
        this.$api.teacher.getSessionUserDetail({})
      this.meetingRoomList = await
        this.$api.teacher.queryMeetingRoomList()
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
    }
  }
</script>

<style scoped lang="sass">
  .meeting-book
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
