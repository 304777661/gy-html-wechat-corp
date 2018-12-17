<template>
  <div class="history">
    <div class="history-head">
      <span class="select" @click="dateTimePickerShow = true">
        <span class="select__label">{{currentDate | ym}}</span>
        <van-icon class="select__icon" name="arrow"/>
      </span>
      <select-picker type="class"
                     show-all
                     @confirm="onClassConfirm"/>
      <select-picker type="course"
                     show-all
                     @confirm="onCourseConfirm"/>
    </div>

    <van-popup
      v-model="dateTimePickerShow"
      position="bottom"
      :lazy-render="false">
      <van-datetime-picker
        ref="picker"
        v-model="currentDate"
        type="year-month"
        :item-height="itemHeight"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onDateConfirm"
        @cancel="onDateCancel"/>
    </van-popup>

    <my-loading v-model="loading"/>
    <no-data v-show="!loading && !historyList.length"/>

    <div v-show="!loading">
      <card sharpen
            v-for="item in historyList"
            :key="item.interactRecordId"
            :tag="item.courseName"
            @click="goDetail(item.interactRecordId)">
        <div class="card-cell">
          <span>{{item.className}}</span>
          <van-icon name="arrow"/>
          <!--<span class="gray">2018-09-02</span>-->
        </div>
        <div class="card-cell">
          <p class="gray">
            <img src="~IMAGE/publish-time.png" class="icon-publish-time">
            {{item.classDate | ymd}}
          </p>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      let date = new Date()
      return {
        loading: true,
        dateTimePickerShow: false,
        currentDate: date,
        itemHeight: null,
        minDate: new Date(date.getFullYear() - 2, 0, 1),
        maxDate: date,
        query: {
          queryTime: date.Format('yyyy-MM-dd hh:mm:ss'),
          classId: null,
          courseId: null
        },
        historyList: []
      }
    },
    watch: {
      dateTimePickerShow (newVal) {
        if (!newVal) return
        this.$nextTick(() => {
          this.itemHeight = this.$refs.picker.$el.children[0].clientHeight
        })
      }
    },
    methods: {
      async initData () {
        this.loading = true
        this.historyList = []
        this.historyList = await this.$api.teacher.queryInteractHistoryList(this.query)
        this.loading = false
      },
      formatter (type, value) {
        let suffix = ''
        switch (type) {
          case 'year':
            suffix = '年'
            break
          case 'month':
            suffix = '月'
            break
        }
        return value + suffix
      },
      onClassConfirm (Class) {
        this.query.classId = Class.id
        this.initData()
      },
      onCourseConfirm (course) {
        this.query.courseId = course.id
        this.initData()
      },
      onDateConfirm (value) {
        this.query.queryTime = value.Format('yyyy-MM-dd hh:mm:ss')
        this.initData()
        this.dateTimePickerShow = false
      },
      onDateCancel () {
        this.dateTimePickerShow = false
      },
      goDetail (id) {
        this.$router.push(`interactive/${id}`)
      }
    }
  }
</script>

<style lang="sass">
  .history
    &-head
      height: 60px
      background: #fff
      box-shadow: 0 0 8px 4px $default-shadow-color
      @include hor-around-center
      .select
        width: 108px
    .card
      width: 92%
      margin: $default-gap auto
</style>
