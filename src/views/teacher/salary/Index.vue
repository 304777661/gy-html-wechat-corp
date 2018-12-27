<template>
  <div class="salary">
    <!--月份切换-->
    <div class="salary-header">
      <div class="salary-header-content">
        <span class="salary-header-content__arrow" @click="handlePreviousClick">
          <van-icon name="arrow-left"></van-icon>
        </span>
        <div class="salary-header-content-date">
          <span class="salary-header-content-date-year">{{selectDate.getFullYear()}}年</span>
          <span class="salary-header-content-date-month">{{selectDate.getMonth() + 1}}月</span>
        </div>
        <span class="salary-header-content__arrow" @click="handleNextClick">
          <van-icon name="arrow"></van-icon>
        </span>
      </div>
    </div>
    <my-loading v-model="loading"/>
    <no-data v-show="!loading && !salary"></no-data>
    <div v-if="salary !== null">
      <van-cell title="基本工资" :value="salary.salaryBase | rmb"></van-cell>
      <van-cell title="其中" class="salary-include"></van-cell>
      <div class="salary-detail">
        <van-cell title="基本工资1" :value="salary.salaryBase1 | rmb"></van-cell>
        <van-cell title="之前浮动4%" :value="salary.salaryFloat4 | rmb"></van-cell>
        <van-cell title="浮动5%" :value="salary.salaryFloat5 | rmb"></van-cell>
        <van-cell title="浮动10%" :value="salary.salaryFloat10 | rmb"></van-cell>
        <van-cell title="校龄" :value="salary.schoolAge | rmb"></van-cell>
        <van-cell title="校龄" :value="salary.salaryWorkAge | rmb"></van-cell>
      </div>
      <div v-for="(item,index) in salary.otherSalaryList" :key="index">
        <van-cell :title="item.salaryTemplateName" :value="item.salaryValue | rmb"></van-cell>
      </div>
      <div class="van-hairline--bottom"></div>
      <van-cell title="应发数" :value="salary.salaryShould | rmb" class="salary-should"></van-cell>
      <van-cell title="实发数" :value="salary.salaryReality | rmb" class="salary-reality"></van-cell>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data () {
      // 默认当月1日
      let selectDate = new Date()
      selectDate.setDate(1)
      return {
        loading: false,
        selectDate,
        salary: null,
      }
    },
    methods: {
      async handlePreviousClick () {
        this.selectDate = new Date(this.selectDate.setMonth(this.selectDate.getMonth() - 1))
        this.loadData()
      },
      async handleNextClick () {
        let now = new Date()
        if (this.selectDate.getFullYear() > now.getFullYear() || this.selectDate.getMonth() >= now.getMonth()) {
          this.$toast.fail('没有更多数据')
          return
        }
        this.selectDate = new Date(this.selectDate.setMonth(this.selectDate.getMonth() + 1))
        this.loadData()
      },
      getQuery () {
        return {
          salaryMonth: this.selectDate.Format('yyyy-MM-dd 00:00:00')
        }
      },
      async loadData () {
        this.loading = true
        this.salary = await this.$api.teacher.getSalary(this.getQuery())
        this.loading = false
      }
    },
    async created () {
      await this.loadData()
    }
  }
</script>

<style scoped lang="sass">
  .salary
    position: relative
    /deep/ .van-hairline
      &:after
        border: none
    /deep/ .van-cell__value
      color: $black
    &-include
      color: $dark-blue
      line-height: 16px
      font-size: 13px
    &-detail
      background: $white
      padding: 5px 14px
      .van-cell
        background: #F7F8FA
        &:first-child
          border-top-left-radius: 4px
          border-top-right-radius: 4px
        &:last-child
          border-bottom-left-radius: 4px
          border-bottom-right-radius: 4px
    &-should
      margin-top: 10px
    &-reality
      color: #24A197
    &-header
      height: 100px
      background: $dark-blue
      color: $white
      @include hor-center-center
      &-content
        width: 190px
        height: 140px
        @include hor-between-center
        &__arrow
          @include fixed-width(24px)
          font-size: 24px
        &-date
          text-align: center
          margin-left: 15px
          &-year
            font-size: 15px
            display: block
            line-height: 20px
          &-month
            font-size: 24px
            line-height: 40px
</style>
