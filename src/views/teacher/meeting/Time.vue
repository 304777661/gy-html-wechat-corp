<template>
  <div class="time">
    <div class="time-wrapper">
      <div class="time-header">
        <p class="time-header-address">{{address.name}}</p>
        <p class="time-header-date">{{meetingDate | ymd}}</p>
        <p class="time-header-modify" @click="handleModifyDate">修改预约时间</p>
      </div>

      <div class="time-table">
        <div class="time-table-td"
             v-for="(item,index) in timeList"
             :key="item.id"
             :class="{'time-table-td__active':(item.isUsed === 'YES' || item.isSelected === 'YES')}"
             @click="handleTimeClick(item,index)">
          {{item.label}}
        </div>
      </div>
    </div>
    <my-button :content="okBtnTitle" @btnClick="handleOkClick"></my-button>

    <van-popup v-model="showDatePicker" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="meetingDate"
        type="date"
        show-toolbar
        :item-height="itemHeight"
        @confirm="handleDatePickerConfirm"
        @cancel="handleDatePickerCancel"
        :min-date="minDate">
      </van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'MeetingTime',
    computed: {
      query () {
        return {
          orderDate: this.formatMeetingTime(),
          meetingRoomId: this.meetingRoomId
        }
      },
    },
    data () {
      return {
        showDatePicker: false,
        minDate: new Date(),
        okBtnTitle: '确定',
        meetingRoomId: 0,
        meetingDate: new Date(),
        address: {},
        itemHeight: 70,
        selectTimeIndexList: [],
        timeList: [{'id': 1, 'label': '08:00-08:30', 'isUsed': 'YES'}, {
          'id': 2,
          'label': '08:30-09:00',
          'isUsed': 'NO'
        }, {'id': 3, 'label': '09:00-09:30', 'isUsed': 'NO'}, {
          'id': 4,
          'label': '09:30-10:00',
          'isUsed': 'NO'
        }, {'id': 5, 'label': '10:00-10:30', 'isUsed': 'NO'}, {
          'id': 6,
          'label': '10:30-11:00',
          'isUsed': 'NO'
        }, {'id': 7, 'label': '11:00-11:30', 'isUsed': 'NO'}, {
          'id': 8,
          'label': '11:30-12:00',
          'isUsed': 'NO'
        }, {'id': 9, 'label': '12:00-12:30', 'isUsed': 'NO'}, {
          'id': 10,
          'label': '12:30-13:00',
          'isUsed': 'NO'
        }, {'id': 11, 'label': '13:00-13:30', 'isUsed': 'NO'}, {
          'id': 12,
          'label': '13:30-14:00',
          'isUsed': 'NO'
        }, {'id': 13, 'label': '14:00-14:30', 'isUsed': 'NO'}, {
          'id': 14,
          'label': '14:30-15:00',
          'isUsed': 'NO'
        }, {'id': 15, 'label': '15:00-15:30', 'isUsed': 'YES'}, {
          'id': 16,
          'label': '15:30-16:00',
          'isUsed': 'NO'
        }, {'id': 17, 'label': '16:00-16:30', 'isUsed': 'NO'}, {
          'id': 18,
          'label': '16:30-17:00',
          'isUsed': 'NO'
        }, {'id': 19, 'label': '17:00-17:30', 'isUsed': 'NO'}, {
          'id': 20,
          'label': '17:30-18:00',
          'isUsed': 'NO'
        }, {'id': 21, 'label': '18:00-18:30', 'isUsed': 'NO'}, {
          'id': 22,
          'label': '18:30-19:00',
          'isUsed': 'NO'
        }, {'id': 23, 'label': '19:00-19:30', 'isUsed': 'NO'}, {
          'id': 24,
          'label': '19:30-20:00',
          'isUsed': 'NO'
        }, {'id': 25, 'label': '20:00-20:30', 'isUsed': 'NO'}, {
          'id': 26,
          'label': '20:30-21:00',
          'isUsed': 'NO'
        }, {'id': 27, 'label': '21:00-21:30', 'isUsed': 'NO'}, {'id': 28, 'label': '21:30-22:00', 'isUsed': 'NO'}]
      }
    },
    methods: {
      handleOkClick () {
        let selectTimeList = []
        let selectTimeIndexList = []
        for (let i = 0; i < this.timeList.length; i++) {
          let item = this.timeList[i]
          if (item.isSelected === 'YES') {
            selectTimeList.push(item.id)
            selectTimeIndexList.push(i)
          }
        }
        if (selectTimeList.length === 0) {
          this.$toast.fail('请选择时间段')
          return
        }
        // 判断数据是否连
        let isContinuity = false
        if (selectTimeIndexList.length === 1) {
          isContinuity = true
        } else if (selectTimeIndexList.length === 2) {
          if (selectTimeIndexList[1] === selectTimeIndexList[0] + 1) {
            isContinuity = true
          } else {
            isContinuity = false
          }
        } else {
          isContinuity = this.judgeContinuityArr(selectTimeIndexList)
        }
        if (!isContinuity) {
          this.$toast.fail('请选择连续时间段')
          return
        }
        let startEndTime = ''
        if (selectTimeIndexList.length === 1) {
          startEndTime = this.timeList[selectTimeIndexList[0]].label
        } else {
          let splitIndex = this.timeList[selectTimeIndexList[0]].label.indexOf('-')
          let startTime = this.timeList[selectTimeIndexList[0]].label.substr(0, splitIndex)
          let endTime = this.timeList[selectTimeIndexList[selectTimeIndexList.length - 1]].label.substr(splitIndex)
          startEndTime = startTime + endTime
        }
        console.log(startEndTime)
        this.$eventBus.$emit('meetingTime', {
          orderDate: this.meetingDate,
          timeIntervalIdList: selectTimeList,
          startEndTime: startEndTime
        })
        this.$router.back()
      },
      judgeContinuityArr (arr) {
        if (arr.length < 3) {
          return false
        }
        let result = false
        for (let i = 1; i < arr.length - 1; i++) {
          if (arr[i] * 2 !== arr[i - 1] + arr[i + 1]) {
            result = false
            break
          }
          if (Math.abs(arr[i + 1] - arr[i]) !== 1) {
            result = false
            break
          }
          if ((arr[i + 1] - arr[i]) !== (arr[i] - arr[i - 1])) {
            result = false
            break
          }
          result = true
        }
        return result
      },
      handleModifyDate () {
        this.showDatePicker = true
      },
      handleDatePickerCancel () {
        this.showDatePicker = false
      },
      handleDatePickerConfirm (val) {
        this.showDatePicker = false
        this.loadData()
      },
      handleTimeClick (item, index) {
        if (item.isUsed === 'YES') {
          this.$toast.fail('该时间段已被预约')
          return
        }
        item.isSelected = (item.isSelected === 'YES') ? 'NO' : 'YES'
        this.$set(this.timeList, index, item)
      },
      formatMeetingTime () {
        return this.meetingDate.Format('yyyy-MM-dd hh:mm:ss')
      },
      async loadData () {
        this.loading = false
        this.timeList = await this.$api.teacher.queryTimeIntervalUsageList(this.query)
        this.timeList.map((item) => {
          item.isSelected = 'NO'
        })
        this.loading = true
      }
    },
    async created () {
      const params = sessionStorage.getItem('MEETING_ROOM')
      this.address = JSON.parse(params)
      this.meetingRoomId = this.address.id
      this.loadData()
    }
  }
</script>

<style scoped lang="sass">
  .time
    .time-wrapper
      height: calc(100vh - 70px)
    &-header
      height: 95px
      background: $white
      &-address
        color: $black
        text-align: center
        font-size: 17px
        line-height: 21px
        padding-top: 14px
        @include text-overflow
      &-date
        color: #ccc
        font-size: 15px
        line-height: 18px
        margin-top: 8px
        text-align: center
      &-modify
        color: $blue
        font-size: 14px
        margin-top: 8px
        line-height: 18px
        text-align: center
    &-table
      display: flex
      flex-direction: row
      flex-wrap: wrap
      margin-top: 10px
      padding: 12px 14px
      background: $white
      &-td
        text-align: center
        line-height: 40px
        font-size: 16px
        width: calc(33vw - 20px)
        margin: 4px 5px
        border-radius: 6px
        border: 1px solid $gray-light
        background: $white
        color: #ccc
        &__active
          background: $dark-blue
          color: $white

</style>
