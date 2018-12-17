<template>
  <div class="leave">
    <no-data v-show=" !loading && !leaveList.length"/>
    <van-list class="leave__cardGroup"
              v-model="loading"
              :finished="finished"
              @load="onLoad">
      <card v-for="item in leaveList"
            :key="item.id">
        <div class="card-header">
          <span class="card-header__title">{{item.studentName}}的请假</span>
          <span class="card-header__time">{{item.createdTime | md}}</span>
          <van-button size="mini"
                      type="primary"
                      :disabled="item.isConfirm !== 'NO'">
            {{item.isConfirm === 'YES' ? '已确认' : '待确认'}}
          </van-button>
        </div>

        <ul class="card-body">
          <li class="card-body__li">
            <span>请假类型: </span>
            <span>{{$enums.LeaveType.getName(item.leaveType)}}</span>
          </li>
          <li class="card-body__li">
            <span>开始时间: </span>
            <span>{{item.startDate | ymd}} {{item.periodStart | timeSlot}}</span>
          </li>
          <li class="card-body__li">
            <span>结束时间: </span>
            <span>{{item.endDate | ymd}} {{item.periodEnd | timeSlot}}</span>
          </li>
          <li class="card-body__li">
            <span>请假时长: </span>
            <span>{{item.leaveDays}}天</span>
          </li>
          <li class="card-body__li">
            <span>请假说明: </span>
            <span>{{item.reason}}</span>
          </li>
        </ul>
      </card>
    </van-list>

    <van-button class="btn"
                type="primary"
                @click="go()">请假
    </van-button>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    data () {
      return {
        query: {
          pageNo: 1,
          pageSize: config.pageSize
        },
        leaveList: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      async initData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.leaveList = []
          this.pageNo = 1
        }
        let data = await this.$api.parent.queryLeaveRecordPage(this.query)
        if (resetList) {
          this.leaveList = data.list
        } else {
          this.leaveList = this.leaveList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.query.pageNo++
      },
      onLoad () {
        this.initData()
      },
      go () {
        this.$router.push(`/parent/leave/add`)
      }
    }
  }
</script>

<style lang="sass">
  .leave
    $btn-width: 200px
    $btn-height: 35px
    &__cardGroup
      padding: 0 $default-gap $default-gap
      .card
        margin-top: $default-gap
        overflow: hidden
        &-header
          position: relative
          padding-bottom: 10px
          border-bottom: 2px dashed $gray-light
          @include hor-between-center
          &__title
            flex: 1
            font-weight: bold
            font-size: $font-large
            white-space: nowrap
          &__time
            flex: 2
            margin-left: 10px
            color: $gray
            font-size: $font-small
        &-body
          // font-size: $font-small
          &__li
            margin-top: 10px
            @include hor-between-center
            span:first-child
              white-space: nowrap
              margin-right: 100px
    .btn
      position: fixed
      left: 50%
      bottom: $default-gap
      width: $btn-width
      height: $btn-height
      line-height: $btn-height
      margin-left: -$btn-width / 2
      border-radius: $btn-height / 2
</style>
