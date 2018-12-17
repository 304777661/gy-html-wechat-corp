<template>
  <div class="questionnaire">
    <no-data v-show="!loading && !surveyList.length"/>
    <van-list v-model="loading"
              :finished="finished"
              @load="onLoad">
      <card v-for="item in surveyList"
            :key="item.id"
            @click="goDetail(item.surveyType, item.id)">
        <div class="card-header"
             :class="{'card-header--gray': item.isFinish === 'YES'}">
          <span class="card-header__title">{{item.title}}</span>
          <span class="card-header__status">{{item.isFinish === 'YES' ? '已结束' : '进行中'}}</span>
        </div>
        <div class="card-body">
          {{item.content || '暂无说明'}}
        </div>
        <div class="card-footer">
          <span class="card-footer__time">{{item.endDate | ymd}}</span>
          <span class="card-footer__name">{{item.userName}}</span>
          <span class="card-footer__count">{{item.total}}人已参与</span>
        </div>
      </card>
    </van-list>

    <van-button class="btn" type="primary" @click="show = true">新增</van-button>

    <van-actionsheet v-model="show" cancel-text="取消" :actions="actions"/>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    data () {
      return {
        show: false,
        actions: [{
          name: '新增投票',
          callback: this.onActionSheetClick
        }, {
          name: '新增问卷调查',
          callback: this.onActionSheetClick
        }, {
          name: '新增签字证明',
          callback: this.onActionSheetClick
        }],
        query: {
          pageNo: 1,
          pageSize: config.pageSize
        },
        surveyList: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      async initData (resetList = false) {
        if (resetList) {
          this.query.pageNo = 1
        }
        let data = await this.$api.teacher.querySurveyPage(this.query)
        if (resetList) {
          this.surveyList = data.list
        } else {
          this.surveyList = this.surveyList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.query.pageNo++
      },
      onLoad () {
        this.initData()
      },
      goDetail (type, id) {
        this.$router.push(`survey/${type.toLowerCase()}/${id}`)
      },
      go (t) {
        this.$router.push(`/teacher/survey/${t}`)
      },
      onActionSheetClick (e) {
        switch (e.name) {
          case '新增投票':
            this.go('vote')
            break
          case '新增问卷调查':
            this.go('psq')
            break
          case '新增签字证明':
            this.go('certify')
            break
        }
      }
    }
  }
</script>

<style lang="sass">
  .questionnaire
    $btn-width: 200px
    $btn-height: 35px
    padding: 0 $default-gap $default-gap + $btn-height + $default-gap
    .btn
      position: fixed
      left: 50%
      bottom: $default-gap
      width: $btn-width
      height: $btn-height
      line-height: $btn-height
      margin-left: -$btn-width / 2
      border-radius: $btn-height / 2
    .card
      margin-top: $default-gap
      padding: 0
      overflow: hidden
      &-header
        padding: 12px $default-gap
        color: #fff
        background: linear-gradient(36deg, #8081FF 0%, #23BAFF 100%)
        @include hor-start-center
        &--gray
          background: #ccc
        &__title
          font-size: $font-normal + 1px
          font-weight: bold
          flex: 4
          @include text-overflow
        &__status
          text-align: right
          font-size: $font-smaller
          white-space: nowrap
      &-body
        padding: $default-gap
        line-height: 1.2
        font-size: $font-normal - 1px
        border-bottom: 1px solid $gray-light
      // padding: $default-gap
      &-footer
        padding: 10px $default-gap
        font-size: $font-small
        color: $gray
        @include hor-start-center
        &__time
          flex: 1
          white-space: nowrap
        &__name
          flex: 1
          white-space: nowrap
        &__count
          flex: 2
          text-align: right
</style>
