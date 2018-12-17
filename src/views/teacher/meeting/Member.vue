<!--会议室预约-选择人员-->
<template>
  <div class="member">
    <div class="member-item van-hairline--bottom"
         v-for="(organ,index) in organList"
         :key="index">
      <van-icon :name="organ.isSelected ? 'checked' : 'check'"
                :color="organ.isSelected ? '#108EE9' : '#CFCFCF'"
                @click="handleOrganIconClick(organ)">
      </van-icon>
      <span @click="handleOrganLabelClick(organ)">{{organ.name}}</span>
    </div>

    <div class="member-selected">
      <div class="member-selected-list">
        <div class="member-selected-list__item" v-for="(item,index) in memberSelectedList" :key="index">
          <img class="member-selected-list__item__avatar" :src="item.avatar | defaultAvatar">
          <p class="member-selected-list__item__name">{{item.name}}</p>
        </div>
        <div class="member-selected-line"></div>
      </div>
      <div class="member-selected-additional">
        <span class="member-selected-additional-count"> 已选择：{{memberSelectedList.length}}人</span>
        <div class="member-selected-additional-btn">
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Member',
    data () {
      const orgId = this.$route.params.orgId
      return {
        query: {
          orgId: orgId
        },
        organList: [{
          'id': 1 /*机构或用户Id*/,
          'avatar': null,
          'name': 'name' /*名称*/,
          'addressBookType': 'USER' /*类型：ALL|ORG|USER*/
        }],
        memberSelectedList: [
          {
            'id': 1 /*机构或用户Id*/,
            'avatar': null,
            'name': '李老师' /*名称*/,
            'addressBookType': 'USER' /*类型：ALL|ORG|USER*/
          }, {
            'id': 1 /*机构或用户Id*/,
            'avatar': null,
            'name': '李老师' /*名称*/,
            'addressBookType': 'USER' /*类型：ALL|ORG|USER*/
          }]
      }
    },
    methods: {
      handleOrganIconClick (organ) {
        console.log(organ.id)
        console.log(organ.isSelected)
        organ.isSelected = !organ.isSelected
        console.log(organ.isSelected)
      },
      handleOrganLabelClick (organ) {
        if (organ.addressBookType === 'USER') {
          organ.isSelected = !organ.isSelected
        } else if ((organ.addressBookType === 'ORG')) {
          this.query.orgId = organ.id
          this.loadData()
        }
      },
      async loadData () {
        this.loading = true
        this.organList = await this.$api.teacher.queryAddressBookItemListByOrgId(this.query)
        this.loading = false
      }
    },
    async created () {
      this.loadData()
    }
  }
</script>

<style scoped lang="sass">
  .member
    position: relative
    &-item
      background: $white
      line-height: 50px
      padding: 0 14px
      font-size: 18px
      @include hor-start-center
      &:first-child
        margin-bottom: 10px
      .van-icon
        margin-right: 20px
        font-size: 20px
      span
        flex: 1
    &-selected
      $additional-height: 45px
      background: $white
      position: fixed
      left: 0
      right: 0
      bottom: 0
      &-list
        flex: 1
        display: -webkit-box
        overflow-x: scroll
        overflow-scrolling: touch
        padding: 10px
        left: 0
        &__item
          width: 70px
          height: 60px
          overflow: hidden
          margin-right: 5px
          @include ver-center-center
          &__avatar
            @include circle(40px)
          &__name
            text-align: center
            font-size: 12px
            margin-top: 1px
            @include text-overflow
      &-line
        background: $white
        z-index: 4
        position: absolute
        left: 0
        right: 0
        bottom: $additional-height
        height: 4px
      &-additional
        height: $additional-height
        @include hor-start-center
        &-count
          flex: 1
          padding-left: 14px
          font-size: 15px
          color: $black
        &-btn
          color: $white
          height: $additional-height
          line-height: $additional-height
          width: 140px
          font-size: 15px
          text-align: center
          background: $dark-blue

</style>
