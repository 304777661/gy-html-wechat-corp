<template>
  <div class="moments">
    <div class="moments-search">
      <van-icon name="wap-nav" @click="actionShow = true"/>
      <search v-if="isSchool"
              v-model="query.keywords"
              @search="initData(true)"
              placeholder="搜索"/>
      <select-picker type="class"
                     @confirm="onClassConfirm"
                     v-if="!isSchool"/>
      <span class="null" v-if="!isSchool"></span>
    </div>

    <van-actionsheet v-model="actionShow"
                     :actions="actions"
                     cancelText="取消" />
    <no-data v-show="!loading && !momentList.length"/>

    <van-list :loading="loading"
              :finished="finished"
              @load="onLoad">
      <moments-item v-for="(moment, idx) in momentList"
                    :key="idx"
                    :moment="moment"/>
    </van-list>

    <span class="moments-add icon icon-add" @click="goAdd"></span>
  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'
  import MomentsItem from 'COMPONENT/MomentsItem'
  import config from '@/config'

  export default {
    components: {
      Search, MomentsItem
    },
    data () {
      let type = this.$route.query.type || 'school'
      return {
        type,
        query: {
          mienType: '',
          classId: '',
          keywords: null,
          pageNo: 1,
          pageSize: config.pageSize
        },
        momentList: [],
        loading: false,
        finished: false,
        actionShow: false,
        actions: [{
          name: '我发布的',
          callback: this.onActionSheetClick,
          className: 'icon icon-publish',
          type: 'PUBLISH'
        }, {
          name: '我收藏的',
          callback: this.onActionSheetClick,
          className: 'icon icon-collection',
          type: 'FAVORITE'
        }, {
          name: '我点评的',
          callback: this.onActionSheetClick,
          className: 'icon icon-comment',
          type: 'COMMENT'
        }, {
          name: '我点赞的',
          callback: this.onActionSheetClick,
          className: 'icon icon-thumb-up',
          type: 'PRAISE'
        }]
      }
    },
    computed: {
      // 是否是校园风采页面
      isSchool () {
        return this.type === 'school'
      }
    },
    // TODO 从详情页返回时需要更新状态
    beforeRouteEnter (to, from, next) {
      next(vm => {
        console.log(vm.query.pageNo)
        // if (from.meta.title === '风采详情') {
        //   vm.initData()
        // }
      })
    },
    methods: {
      async initData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.query.pageNo = 1
        }
        this.query.mienType = this.type.toUpperCase()
        let data = await this.$api.teacher.queryMienInfoPage(this.query)
        if (resetList) {
          this.momentList = data.list
        } else {
          this.momentList = this.momentList.concat(data.list)
        }
        this.loading = false
        this.finished = !data.hasNextPage
        this.query.pageNo++
      },
      onClassConfirm (val) {
        this.query.classId = val.id
        this.initData()
        // console.log(val)
      },
      async onActionSheetClick (e) {
        this.$router.push(`filter?type=${e.type}`)
      },
      onLoad () {
        if (this.type === 'class' && !this.query.classId) return
        this.initData()
      },
      goAdd () {
        this.$router.push(`moments/add?type=${this.type}`)
      }
    }
  }
</script>

<style lang="sass">
  .moments
    &-search
      @include hor-between-center
      padding: $default-gap
      background: #fff
      .search
        flex: 1
        margin-left: $default-gap
    .moments-item
      margin-top: 10px
    .van-actionsheet
      .icon:before
        font-size: 17px
        margin-right: 10px
        vertical-align: middle
      .icon-publish:before
        font-size: 15.5px
    &-add
      position: fixed
      bottom: 80px
      right: $default-gap
      $w: 40px
      @include circle(40px)
      line-height: $w
      text-align: center
      font-size: $font-large
      font-weight: bold
      color: #fff
      background: $blue
</style>
