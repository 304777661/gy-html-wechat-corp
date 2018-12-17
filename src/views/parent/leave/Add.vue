<template>
  <div class="leave-add">
    <van-cell-group :border="false">
      <van-cell title="请假类型"
                :value="curLeaveType.label || '请选择'"
                is-link
                @click="leaveTypeShow = true"/>
      <van-popup v-model="leaveTypeShow"
                 position="bottom"
                 :lazy-render="false">
        <van-picker ref="picker"
                    show-toolbar
                    :item-height="itemHeight"
                    :columns="leaveTypeColumns"
                    value-key="label"
                    @confirm="onLeaveTypeConfirm"/>
      </van-popup>

      <divide-date-picker title="开始时间"
                          @confirm="onStartDateConfirm"/>
      <!--<van-cell title="开始时间" :value="query.startDate" is-link @click="showStartDate = true" />-->
      <divide-date-picker title="结束时间"
                          @confirm="onEndDateConfirm"/>
      <!--<van-cell title="结束时间" :value="query.endDate" is-link @click="showEndDate = true" />-->
      <van-cell title="请假时长" :value="duration"/>
      <van-cell title="请假说明" :border="false"/>
      <van-field v-model="query.reason"
                 placeholder="请输入..."
                 type="textarea"/>

    </van-cell-group>

    <van-cell-group :border="false" class="headmaster">
      <van-cell title="班主任" value="张三"/>
    </van-cell-group>

    <van-button type="primary" class="btn-primary" @click="doSubmit">提交</van-button>
  </div>
</template>

<script>
  export default {
    data () {
      let date = new Date()
      return {
        leaveTypeShow: false,
        leaveTypeColumns: this.$enums.LeaveType.list,
        curLeaveType: {},
        currentDate: date,
        minStartDate: date,
        maxStartDate: new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
        minEndDate: date,
        showStartDate: false,
        showEndDate: false,
        itemHeight: null,
        query: {
          leaveType: null,
          startDate: null,
          periodStart: null,
          endDate: null,
          periodEnd: null,
          reason: null
        }
      }
    },
    computed: {
      duration () {
        // console.log(this.query.startDate, this.query.endDate)
        if (this.query.startDate && this.query.endDate && this.query.startDate instanceof Date && this.query.endDate instanceof Date) {
          let day = (Math.abs(this.query.endDate.getTime() - this.query.startDate.getTime()) / (1000 * 60 * 60 * 24))
          if (this.query.periodStart === this.query.periodEnd) {
            day += 0.5
          } else {
            day += 1
          }
          return day + '天'
        }
      }
    },
    watch: {
      leaveTypeShow () {
        if (this.itemHeight) return
        this.$nextTick(() => {
          this.itemHeight = this.$refs.picker.$el.children[0].clientHeight
        })
      }
    },
    methods: {
      onLeaveTypeConfirm (value) {
        this.leaveTypeShow = false
        this.query.leaveType = value.value
        this.curLeaveType = value
      },
      onStartDateConfirm (value) {
        this.query.startDate = value[0].date
        this.query.periodStart = value[1] === '上午' ? 'AM' : 'PM'
      },
      onEndDateConfirm (value) {
        console.log(value)
        this.query.endDate = value[0].date
        this.query.periodEnd = value[1] === '上午' ? 'AM' : 'PM'
      },
      async doSubmit () {
        this.query.startDate = this.query.startDate.Format('yyyy-MM-dd 00:00:00')
        this.query.endDate = this.query.endDate.Format('yyyy-MM-dd 00:00:00')
        await this.$api.parent.addLeaveRecord(this.query)
        this.$toast.success('发布成功')
      }
    }
  }
</script>

<style lang="sass">
  .leave-add
    .headmaster
      margin-top: 10px
</style>
