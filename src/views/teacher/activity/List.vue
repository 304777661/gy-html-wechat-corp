<template>
  <div class="activity">
    <my-tabs :tabs="tabs" @tabChanged="handleTabChanged" v-if="isTeachGroupLeader && isPrepareLeader"></my-tabs>

    <no-data v-show="!loading && !activityList.length"></no-data>
    <my-loading v-model="loading"/>
    <div v-if="activityList && activityList.length>0">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <van-swipe-cell v-for="item in activityList"
                        :key="item.id"
                        :right-width="cellRightWidth"
                        :on-close="handleSwipeCellClose">
          <div class="activity-item" @click="goDetail(item.id)">
            <div class="activity-item-header">
              <span class="activity-item-header__title">{{item.activityName}}</span>
            </div>
            <div class="activity-item-body">
              {{item.activityContent | summary(42)}}
            </div>
            <div class="van-hairline--bottom"></div>
            <div class="activity-item-footer">
              <span class="activity-item-footer__date">{{item.activityDate | ymd}}</span>
            </div>
          </div>
          <span slot="right" class="activity-item-right" @click="handleDeleteClick(item.id)">删除</span>
        </van-swipe-cell>
      </van-list>
    </div>
    <my-button v-if="isTeachGroupLeader || isPrepareLeader"
               :content="addActivityBtnTitle"
               @btnClick="handleAddActivityClick"></my-button>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    name: 'ActivityList',
    computed: {},
    data () {
      return {
        curTabIndex: 0,
        loading: false,
        finished: false,
        pageNo: 1,
        addActivityBtnTitle: '新增教研活动',
        isTeachGroupLeader: false,
        isPrepareLeader: false,
        showDeleteDialog: false,
        cellRightWidth: 160,
        activityList: [],
        myself: {},
        tabs: [{
          id: 0,
          label: '教研活动'
        }, {
          id: 1,
          label: '集体备课'
        }],
        btnTitle: ['新增教研活动', '新增集体备课']
      }
    },
    methods: {
      async handleTabChanged (tabIndex) {
        if (this.curTabIndex === tabIndex) {
          return
        }
        this.curTabIndex = tabIndex
        this.changeAddBtnTitle()
        this.loading = true
        await this.loadData(this.curTabIndex === 0, true)
        this.loading = false
      },
      changeAddBtnTitle () {
        this.addActivityBtnTitle = this.btnTitle[this.curTabIndex % 2]
      },
      getQuery (type) {
        return {
          activityType: type,
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      },
      // 删除教研活动
      handleDeleteClick (id) {
        this.$dialog.confirm({
          title: `是否删除当前教研活动？`
        }).then(async () => {
          await this.$api.teacher.deleteTeachGroupActivity(id)
          this.teachGroupList.splice(this.teachGroupList.findIndex(item => item.id === id), 1)
          this.$toast.success('删除成功')
        }, () => {
          console.log('用户取消')
        })
      },
      handleSwipeCellClose (clickPosition, instance) {
        switch (clickPosition) {
          case 'right':
            instance && instance.close()
            break
        }
      },
      onLoad () {
        this.loadData(this.curTabIndex === 0)
      },
      goDetail (id) {
        this.$router.push(`/teacher/activity/detail?id=${id}`)
      },
      handleAddActivityClick () {
        this.$router.push(`/teacher/activity/add?typeId=${this.curTabIndex}`)
      },
      async loadData (isTeachGroup, resetList = false) {
        this.loading = true
        if (resetList) {
          this.activityList = []
          this.pageNo = 1
        }
        let data = isTeachGroup ?
          await this.$api.teacher.queryTeachGroupActivityPage(this.getQuery('ACTIVITY_TEACH_GROUP')) :
          await this.$api.teacher.queryTeachGroupActivityPage(this.getQuery('ACTIVITY_PREPARE_LESSONS'))
        if (resetList) {
          this.activityList = data.list
        } else {
          this.activityList = this.activityList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.pageNo++
        this.loading = false
      },
    },
    async activated () {
      this.loading = true
      this.myself = await this.$api.teacher.getSessionUserDetail({})
      if (this.myself && this.myself.isTeachGroupLeader === 'YES') {
        // 教研组组长
        this.isTeachGroupLeader = true
      }
      if (this.myself && this.myself.isPrepareLeader === 'YES') {
        // 备课组组长
        this.isPrepareLeader = true
      }
      if (!this.isTeachGroupLeader && !this.isPrepareLeader) {
        this.$toast.fail('您没有访问权限')
        this.$router.back()
        return
      }
      if (this.isTeachGroupLeader) {
        this.curTabIndex = 0
        await this.loadData(true, true)
      } else {
        this.curTabIndex = 1
        await this.loadData(false, true)
      }
      this.loading = false
    },
  }
</script>

<style scoped lang="sass">
  .activity
    &-item
      padding: 8px 14px 8px
      background: $white
      border-bottom: 1px solid $gray-light
      &-right
        background: $red
        text-align: center
        width: 80px
        height: 100%
        color: white
        @include hor-center-center
      &-header
        position: relative
        line-height: 1
        @include hor-start-center
        &__title
          flex: 1
          font-size: 17px
          line-height: 21px
          color: $black
          @include text-overflow
        // font-weight: bold
        &__tag
          background: #24A197
          padding: 2px 8px
          font-size: 12px
          margin-left: 10px
          margin-top: 2px
      &-body
        padding: 8px 0 8px
        font-size: 14px
        color: $gray
        line-height: 1.5
      &-footer
        font-size: 13px
        line-height: 18px
        color: #ccc
        margin-top: 8px
        &__line
          margin: 0 8px
</style>
