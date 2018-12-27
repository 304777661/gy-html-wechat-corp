<template>
  <div class="member">
    <div class="wrapper">
      <div class="member-selected">
        <div class="member-selected-item" v-for="(item,index) in memberSelectedList" :key="index">
          <img class="member-selected-item__avatar" :src="item.avatar | defaultAvatar">
          <p class="member-selected-item__name">{{item.name}}</p>
          <van-icon class="member-selected-item__delete icon-size" name="clear" @click="handleDeleteClick(index)">
          </van-icon>
        </div>
        <div class="member-selected-line"></div>
        <p class="member-selected-empty" v-show="!memberSelectedList || memberSelectedList.length===0">选择的人员将显示在这里</p>
      </div>
      <van-cell-group>
        <van-cell :icon="checkIcon" class="all-check"
                  :class="checkIcon === 'checked' ? 'all-check-active':'all-check-inactive'"
                  @click="handleAllCheckClick" title="全选" color="#ccc">
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell @click="handleBackClick" v-if="stepStack.length > 0">
          <template slot="title">
            <img class="member-item-icon" src="../../../assets/images/back.png"/>
            <span class="member-item-title">返回上一级</span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell class="member-item"
                  v-for="(item,index) in organList" :key="index"
                  :is-link="item.addressBookType === 'ORG'"
                  @click="handleItemClick(item,index)">
          <template slot="title">
            <img v-if="item.addressBookType === 'BACK'"
                 class="member-item-icon"
                 src="../../../assets/images/back.png"/>
            <img v-else-if="item.addressBookType === 'ORG'"
                 class="member-item-icon"
                 src="../../../assets/images/dept.png"/>
            <img v-else class="member-item-icon"
                 :src="item.avatar | defaultAvatar"/>
            <span class="member-item-title">{{item.name}}</span>
          </template>
          <van-icon class="member-item-radio"
                    v-if="item.addressBookType === 'USER'"
                    :name="item.isSelected ? 'checked' : 'check'"
                    :color="item.isSelected ? '#108EE9' : '#CFCFCF'">
          </van-icon>
        </van-cell>
      </van-cell-group>

      <my-loading v-model="loading"></my-loading>
    </div>
    <div class="member-additional">
      <span class="member-additional-count"> 已选择：{{memberSelectedList.length}}人</span>
      <div class="member-additional-btn" @click="handleOkClick">
        确定
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Member',
    data () {
      return {
        loading: false,
        orgId: 0,
        stepStack: [],
        organList: [],
        memberSelectedList: [],
        checkIcon: 'check'
      }
    },
    methods: {
      async handleItemClick (item, index) {
        if (this.isUser(item)) {
          item.isSelected = !item.isSelected
          let hasIndex = this.memberSelectedList.findIndex(member => member.id === item.id)
          if (item.isSelected) {
            if (hasIndex < 0) {
              // 已选择列表里面没有此人
              this.memberSelectedList.push(item)
            }
          } else {
            if (hasIndex >= 0) {
              this.memberSelectedList.splice(hasIndex, 1)
            }
          }
          this.$set(this.organList, index, item)
          this.judgeAllCheck()
        } else {
          if (this.isOrgan(item)) {
            this.stepStack.push(this.orgId)
          }
          this.orgId = item.id
          await this.loadData()
          this.judgeAllCheck()
        }
      },
      judgeAllCheck () {
        // 更新全选状态
        let hasUser = false
        let hasUnChecked = false
        for (let i = 0; i < this.organList.length; i++) {
          let item = this.organList[i]
          if (this.isUser(item)) {
            hasUser = true
            if (!item.isSelected) {
              hasUnChecked = true
              break
            }
          }
        }
        if (!hasUser) {
          this.checkIcon = 'check'
        } else {
          if (!hasUnChecked) {
            this.checkIcon = 'checked'
          } else {
            this.checkIcon = 'check'
          }
        }
      },
      isOrgan (item) {
        return item && item.addressBookType === 'ORG'
      },
      isUser (item) {
        return item && item.addressBookType === 'USER'
      },
      handleOkClick () {
        if (this.memberSelectedList.length === 0) {
          this.$toast.fail('至少选择一人')
          return
        }
        this.$eventBus.$emit('memberSelectedEvent', this.memberSelectedList)
        this.$router.back()
      },
      handleDeleteClick (index) {
        this.$dialog.confirm({
          title: `是否删除${this.memberSelectedList[index].name}？`
        }).then(() => {
          let deletedItems = this.memberSelectedList.splice(index, 1)
          for (let i = 0; i < this.organList.length; i++) {
            let item = this.organList[i]
            if (this.isUser(item) && item.id === deletedItems[0].id) {
              item.isSelected = false
              this.$set(this.organList, i, item)
              break
            }
          }
          this.judgeAllCheck()
        }, () => {
          console.log('用户取消')
        })
      },
      async loadData () {
        this.loading = true
        let data = await this.$api.teacher.queryAddressBookItemListByOrgId({'orgId': this.orgId})
        // 和当前选中的人员比较，是否选中
        for (let i = 0; i < data.length; i++) {
          if (this.isUser(data[i])) {
            for (let j = 0; j < this.memberSelectedList.length; j++) {
              if (data[i].id === this.memberSelectedList[j].id) {
                data[i].isSelected = true
                break
              }
            }
          }
        }
        this.organList = data
        this.loading = false
      },
      // 返回上一级
      async handleBackClick () {
        this.orgId = this.stepStack[this.stepStack.length - 1]
        await this.loadData()
        this.stepStack.splice(this.stepStack.length - 1, 1)
        this.judgeAllCheck()
      },
      // 全选
      handleAllCheckClick () {
        // 判断是否有可以全选的用户
        let hasUser = false
        for (let i = 0; i < this.organList.length; i++) {
          if (this.isUser(this.organList[i])) {
            hasUser = true
            break
          }
        }
        if (!hasUser) {
          this.$toast.fail('当前部门没有可选择的人')
          return
        }
        if (this.checkIcon === 'check') {
          this.checkIcon = 'checked'
          this.organList.map(item => {
            if (this.isUser(item)) {
              item.isSelected = true
              let hasSelectedIndex = this.memberSelectedList.findIndex(member => member.id === item.id)
              if (hasSelectedIndex < 0) {
                this.memberSelectedList.push(item)
              }
            }
          })
        } else {
          this.checkIcon = 'check'
          this.organList.map(item => {
            if (this.isUser(item)) {
              item.isSelected = false
              let hasSelectedIndex = this.memberSelectedList.findIndex(member => member.id === item.id)
              if (hasSelectedIndex >= 0) {
                this.memberSelectedList.splice(hasSelectedIndex, 1)
              }
            }
          })
        }
      }
    },
    async created () {
      let memberList = JSON.parse(sessionStorage.getItem('MEETING_MEMBER'))
      if (memberList && memberList.length > 0) {
        memberList.map(item => {
          this.memberSelectedList.push(item)
        })
      }
      await this.loadData()
      this.judgeAllCheck()
    }
  }
</script>

<style scoped lang="sass">
  .member
    position: relative
    .all-check
      /deep/ .van-cell__left-icon
        margin-right: 8px
      &-active
        /deep/ .van-cell__left-icon
          color: $dark-blue
      &-inactive
        /deep/ .van-cell__left-icon
          color: #cccccc
    .wrapper
      margin-bottom: 80px
    .icon-size
      font-size: 15px
    &-item
      @include hor-start-center
      &-icon
        width: 16px
        height: 16px
        margin-right: 4px
      &-title
        line-height: 24px
        &-radio
          font-size: 16px
    &-selected
      background: $white
      display: -webkit-box
      overflow-x: scroll
      overflow-scrolling: touch
      height: 60px
      padding-top: 5px
      padding-left: 4px
      margin-bottom: 10px
      &::-webkit-scrollbar
        display: none
      &-item
        width: 60px
        height: 50px
        overflow: hidden
        margin-right: 5px
        position: relative
        @include ver-center-center
        &__avatar
          @include circle(30px)
        &__name
          text-align: center
          font-size: 12px
          margin-top: 1px
          @include text-overflow
        &__delete
          position: absolute
          right: 5px
          top: 2px
          color: $gray
      &-line
        background: $white
        z-index: 4
        width: 100vw
        height: 3px
        left: 0
        top: 60px - 3px
        position: absolute
      &-empty
        color: #ccc
        font-size: 12px
        margin: 18px auto 0
    &-additional
      $additional-height: 40px
      background: $white
      position: fixed
      left: 0
      right: 0
      bottom: 0
      height: $additional-height
      display: flex
      @include hor-start-center
      &-count
        flex: 1
        padding-left: 14px
        font-size: 14px
        color: $black
      &-btn
        color: $white
        height: $additional-height
        line-height: $additional-height
        width: 140px
        font-size: 14px
        text-align: center
        background: $dark-blue

</style>
