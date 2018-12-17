<template>
  <div class="leave">
    <div class="leave__search">
      <search v-model="query.keywords"
              placeholder="请输入人名进行搜索"
              @search="doSearch"></search>
    </div>

    <no-data v-show="!loading && !(leaveList && leaveList.length)" />

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
                      :disabled="item.isConfirm !== 'NO'"
                      @click="doVerify(item.id)">
            {{item.isConfirm === 'YES' ? '已确认' : '确认'}}
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
  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'
  import config from '@/config'

  export default {
    components: {
      Search
    },
    data () {
      return {
        query: {
          keywords: null,
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
          this.query.pageNo = 1
        }
        let data = await this.$api.teacher.queryLeaveList(this.query)
        if (resetList) {
          this.leaveList = data.list
        } else {
          this.leaveList = this.leaveList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.query.pageNo++
      },
      async doSearch () {
        // console.log(`调用搜索接口, 关键词为: ${this.keywords}`)
        this.initData(true)
      },
      async onLoad () {
        this.initData()
      },
      async doVerify (leaveRecordId) {
        await this.$api.teacher.verifyLeave(leaveRecordId)
        this.$toast.success('确认成功')
        let leave = this.leaveList.find(item => {
          return item.id === leaveRecordId
        })
        leave.isConfirm = 'YES'
      }
    }
  }
</script>

<style lang="sass">
  .leave
    &__search
      padding: $default-gap
      background: #fff
      box-shadow: $default-shadow
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
          //&:before, &:after
          //  $w: 20px
          //  content: ''
          //  position: absolute
          //  bottom: 0
          //  @include circle($w)
          //  background: $default-shadow-color
          //  filter: blur(1.2px)
            // box-shadow: 0 0 5px 10px $default-shadow-color inset
            // background: radial-gradient(center center, circle cover, $default-shadow-color, $body-background 50%)
          //&:before
          //  left: -$default-gap
          //  transform: translate(-50%, 50%)
          //&:after
          //  right: -$default-gap
          //  transform: translate(50%, 50%)
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
</style>
