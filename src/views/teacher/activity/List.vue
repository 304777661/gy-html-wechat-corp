<template>
  <div class="activity">
    <my-tabs :tabs="tabs" @tabChanged="handleTabChanged" v-show="isTeachGroupLeader && isPrepareLeader"></my-tabs>

    <div v-show="curTabIndex === 0">
      <no-data v-show="!teachGroupLoading && !teachGroupList.length"></no-data>
      <van-list
        v-model="teachGroupLoading"
        :finished="teachGroupLoadingFinished"
        @load="onLoad">

        <van-swipe-cell v-for="item in teachGroupList"
                        :key="item.id"
                        :right-width="cellRightWidth"
                        :on-close="handleSwipeCellClose">
          <div class="activity-item" @click="goDetail(item.id)">
            <div class="activity-item-header">
              <span class="activity-item-header__title">{{item.activityName}}</span>
            </div>
            <div class="activity-item-body">
              {{item.activityContent.length > 60? item.activityContent.substr(0,60)+'......' : item.activityContent}}
            </div>
            <div class="van-hairline--bottom"></div>
            <div class="activity-item-footer">
              <span class="activity-item-footer__date">{{item.activityDate | ymd}}</span>
            </div>
          </div>
          <span slot="right" class="activity-item-right">删除</span>
        </van-swipe-cell>
      </van-list>
    </div>

    <div v-show="curTabIndex === 1">
      <no-data v-show="!activityLoading && !activityList.length"/>

      <van-list
        v-model="activityLoading"
        :finished="activityFinished"
        @load="onLoad">

        <div class="activity-item"
             v-for="item in activityList"
             :key="item.id"
             @click="goDetail(item.id)">

          <div class="activity-item-header">
            <span class="activity-item-header__title">{{item.activityName}}</span>
          </div>

          <div class="activity-item-body">
            {{item.activityContent.length > 60? item.activityContent.substr(0,60)+'......' : item.activityContent}}
          </div>
          <div class="van-hairline--bottom"></div>
          <div class="activity-item-footer">
            <span class="activity-item-footer__date">{{item.activityDate | ymd}}</span>
          </div>
        </div>
      </van-list>
    </div>

    <my-button :content="addActivityBtnTitle" @btnClick="handleAddActivityClick"></my-button>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    name: 'ActivityList',
    computed: {},
    data () {
      return {
        tabs: [{
          id: 0,
          label: '教研活动'
        }, {
          id: 1,
          label: '集体备课'
        }],
        addActivityBtnTitle: '新增教研活动',
        cellRightWidth: 160,
        teachGroupLoading: false,
        teachGroupLoadingFinished: false,
        activityLoading: false,
        activityFinished: false,
        isTeachGroupLeader: false,
        isPrepareLeader: false,
        curTabIndex: 0,
        teachGroupPageNo: 1,
        activityPageNo: 1,
        teachGroupList: [{
          'id': 1 /*主键*/,
          'teachGroupId': 1 /*教研组Id*/,
          'gradeId': 1 /*年级Id*/,
          'activityType': 'ACTIVITY_PREPARE_LESSONS' /*活动类型1教研活动2备课活动：ALL|ACTIVITY_TEACH_GROUP|ACTIVITY_PREPARE_LESSONS*/,
          'activityName': 'activityName' /*活动名称*/,
          'activityDate': '2018-12-18 10:55:26' /*活动日期*/,
          'activityLocation': 'activityLocation' /*活动地点*/,
          'activitySponsor': 'activitySponsor' /*举办单位*/,
          'activityContent': '教研组内容' /*活动内容*/,
          'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
          'createdTime': '2018-12-18 10:55:26' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
          'updatedTime': '2018-12-18 10:55:26' /*更新时间 默认值：CURRENT_TIMESTAMP*/,
          'startTime': '2018-12-18 10:55:26' /*开始时间*/,
          'endTime': '2018-12-18 10:55:26' /*结束时间*/
        }],
        activityList: [{
          'id': 1 /*主键*/,
          'teachGroupId': 1 /*教研组Id*/,
          'gradeId': 1 /*年级Id*/,
          'activityType': 'ACTIVITY_PREPARE_LESSONS' /*活动类型1教研活动2备课活动：ALL|ACTIVITY_TEACH_GROUP|ACTIVITY_PREPARE_LESSONS*/,
          'activityName': 'activityName' /*活动名称*/,
          'activityDate': '2018-12-18 10:55:26' /*活动日期*/,
          'activityLocation': 'activityLocation' /*活动地点*/,
          'activitySponsor': 'activitySponsor' /*举办单位*/,
          'activityContent': '活动内容' /*活动内容*/,
          'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
          'createdTime': '2018-12-18 10:55:26' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
          'updatedTime': '2018-12-18 10:55:26' /*更新时间 默认值：CURRENT_TIMESTAMP*/,
          'startTime': '2018-12-18 10:55:26' /*开始时间*/,
          'endTime': '2018-12-18 10:55:26' /*结束时间*/
        }],
        showDeleteDialog: false,
        myself: {
          'userId': 45,
          'name': '大老师',
          'empNo': null,
          'phone': '13900000000',
          'avatar': null,
          'isTeacher': 'YES',
          'isParent': 'YES',
          'isTeachGroupLeader': 'YES',
          'isPrepareLeader': 'YES'
        }
      }
    },
    methods: {
      handleTabChanged (tabIndex) {
        this.curTabIndex = tabIndex
      },
      listQuery (isTeachGroup) {
        return {
          activityType: isTeachGroup ? 'ACTIVITY_TEACH_GROUP' : 'ACTIVITY_PREPARE_LESSONS',
          pageNo: isTeachGroup ? this.teachGroupPageNo : this.activityPageNo,
          pageSize: config.pageSize
        }
      },
      // 删除教研活动
      handleSwipeCellClose (clickPosition, instance) {
        console.log(11111)
        switch (clickPosition) {
          case 'right':
            this.$dialog.confirm({
              title: `是否删除当前教研活动？`
            }).then(() => {
              console.log('用户取消1')
              instance && instance.close()
            }, () => {
              instance && instance.close()
              console.log('用户取消2')
            })
            break
        }
        // await this.$api.teacher.deleteTeachGroupActivity(id)
        // this.teachGroupList.splice(this.teachGroupList.findIndex(item => item.id === id), 1)
        // this.$toast.success('删除成功')
      },
      onLoad () {},
      goDetail (id) {
        this.$router.push(`/teacher/activity/${id}`)
      },
      handleAddActivityClick () {
        this.$router.push(`/teacher/activity/add/${this.curTabIndex}`)
      }
    },
    async created () {
      this.loading = true
      // this.myself = await this.$api.teacher.getSessionUserDetail({})
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
      // this.teachGroupList = await this.$api.teacher.queryTeachGroupActivityPage(this.listQuery(true))
      // this.activityList = await this.$api.teacher.queryTeachGroupActivityPage(this.listQuery(false))
      if (!this.isTeachGroupLeader && this.isPrepareLeader) {
        this.curTabIndex = 1
      }
      console.log(this.myself)
      this.loading = false
    }
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
