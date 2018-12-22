<template>
  <div class="member">
    <div class="member-selected">
      <div class="member-selected-item" v-for="(item,index) in memberSelectedList" :key="index">
        <img class="member-selected-item__avatar" :src="item.avatar | defaultAvatar">
        <p class="member-selected-item__name">{{item.name}}</p>
        <van-icon class="member-selected-item__delete" name="clear" size="30px" @click="handleDeleteClick(index)">
        </van-icon>
      </div>
      <div class="member-selected-line"></div>
      <p class="member-selected-empty" v-show="!memberSelectedList || memberSelectedList.length===0">选择的人员将显示在这里</p>
    </div>

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
        memberSelectedList: []
      }
    },
    methods: {
      async handleItemClick (item, index) {
        if (this.isUser(item)) {
          item.isSelected = !item.isSelected
          let hasIndex = this.memberSelectedList.findIndex(member => member.id === item.id)
          if (item.isSelected) {
            if (hasIndex < 0) {
              this.memberSelectedList.push(item)
            }
          } else {
            if (hasIndex > 0) {
              this.memberSelectedList.splice(hasIndex, 1)
            }
          }
          this.$set(this.organList, index, item)
        } else {
          if (this.isOrgan(item)) {
            this.stepStack.push(this.orgId)
          }
          if (this.isBack(item)) {
            this.stepStack.splice(this.stepStack.length - 1, 1)
          }
          this.orgId = item.id
          await this.loadData()
        }
      },
      isOrgan (item) {
        return item && item.addressBookType === 'ORG'
      },
      isUser (item) {
        return item && item.addressBookType === 'USER'
      },
      isBack (item) {
        return item && item.addressBookType === 'BACK'
      },
      handleOkClick () {
        if (this.memberSelectedList.length === 0) {
          this.$toast.fail('至少选择一人')
          return
        }
        this.$eventBus.$emit('memberSelectedEvent', this.memberSelectedList)
        console.log(this.memberSelectedList)
        this.$router.back()
      },
      handleDeleteClick (index) {
        this.$dialog.confirm({
          title: `是否删除${this.memberSelectedList[index].name}？`
        }).then(() => {
          let deletedItem = this.memberSelectedList.splice(index, 1)
          console.log(deletedItem)
          for (let i = 0; i < this.organList.length; i++) {
            let item = this.organList[i]
            if (this.isUser(item) && item.id === deletedItem.id) {
              item.isSelected = false
              this.$set(this.organList, i, item)
              break
            }
          }
        }, () => {
          console.log('用户取消')
        })
      },
      async loadData () {
        this.loading = true
        let data = await this.$api.teacher.queryAddressBookItemListByOrgId({'orgId': this.orgId})
        if (this.stepStack.length > 0) {
          data.splice(0, 0, {
            addressBookType: 'BACK',
            avatar: null,
            id: this.stepStack[this.stepStack.length - 1],
            name: '返回上一级'
          })
        }
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
    }
  }
</script>

<style scoped lang="sass">
  .member
    position: relative
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
      margin-bottom: 10px
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
