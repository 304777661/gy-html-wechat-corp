<template>
  <div class="child-detail">
    <div class="child-detail-header">
      <p class="child-detail-header__name">{{student.name}}</p>
      <div class="child-detail-header-wrapper">
        <img class="child-detail-header-wrapper__avatar" :src="student.avatar | defaultAvatar">
        <div class="child-detail-header-wrapper__tag" v-show="!showSetPrimary">
          <img src="../../../assets/images/main-children.png"/>
          <span>主</span>
        </div>
      </div>
      <div class="child-detail-header__setting" @click="handleSetPrimaryClick" v-show="showSetPrimary">设置主查询</div>
    </div>
    <my-tabs :tabs="tabs" @tabChanged="handleTabChange"></my-tabs>
    <div v-show="curTabIndex === 0" class="child-detail-tab">
      <van-cell-group :border="false">
        <van-cell title="班级学号" :value="student.classStudentNo || '--'"></van-cell>
        <van-cell title="全国学籍号" :value="student.nationStudentNo || '--'"></van-cell>
        <van-cell title="身份证号" :value="student.idCard || '--'"></van-cell>
        <van-cell title="出生日期" :value="student.birthday | ymd"></van-cell>
        <van-cell title="民族" :value="student.nationName || '--'"></van-cell>
        <van-cell title="户口性质" :value="getResidentType(student.residentType) || '--'"></van-cell>
        <van-cell title="政治面貌" :value="getPoliticsStatus(student.politicsStatus) || '--'"></van-cell>
        <van-cell title="家庭住址" :value="student.currentAddress || '--'"></van-cell>
        <van-collapse v-model="show" v-show="fatherName || motherName || guardianName">
          <van-collapse-item title="家长信息" name="1">
            <van-cell v-show="fatherName" :title="fatherName" :value="fatherPhone || '--'">
              <a :href="'tel:'+fatherPhone">{{fatherPhone || '--'}}</a>
            </van-cell>
            <van-cell v-show="motherName" :title="motherName" :value="motherPhone || '--'">
              <a :href="'tel:'+motherPhone">{{motherPhone || '--'}}</a>
            </van-cell>
            <van-cell v-show="guardianName" :title="guardianName" :value="guardianPhone || '--'">
              <a :href="'tel:'+guardianPhone">{{guardianPhone || '--'}}</a>
            </van-cell>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>
    </div>

    <div v-show="curTabIndex === 1" class="child-detail-tab prize">
      <div class="child-detail-tab-prize" v-for="(prize,index) in prizeList" :key="prize.id">
        <div class="child-detail-tab-prize-title van-hairline--bottom">
          <span>获奖情况{{index+1}}</span>
          <span @click="handlePrizeEdit(index)"><img src="../../../assets/images/edit.png">编辑</span>
        </div>
        <van-cell-group :border="false">
          <van-cell title="奖项名称" :value="prize.prizeName || '--'"></van-cell>
          <van-cell title="获奖级别" :value="$enums.PrizeLevel.getName(prize.prizeLevel) || '--'"></van-cell>
          <van-cell title="举办单位" :value="prize.sponsor || '--'"></van-cell>
          <van-cell title="获奖时间" :value="prize.prizeDate | ymd"></van-cell>
          <van-cell title="证明材料"
                    :value="(prize.attachmentList && prize.attachmentList.length>0) ? '已上传':'未上传'"></van-cell>
        </van-cell-group>
      </div>

      <my-button :content="'增加获奖情况'" @btnClick="handleAddPrizeClick"></my-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChildrenDetail',
    data () {
      const id = this.$route.params.id
      return {
        id,
        curTabIndex: 0,
        loading: false,
        showSetPrimary: true,
        tabs: [{
          id: 0,
          label: '基本信息'
        }, {
          id: 1,
          label: '获奖情况'
        }],
        show: ['1'],
        fatherName: null,
        fatherPhone: null,
        motherName: null,
        motherPhone: null,
        guardianName: null,
        guardianPhone: null,
        student: {},
        prizeList: []
      }
    },
    async created () {
      this.loading = true
      await this.loadData()
      this.loading = false
    },
    methods: {
      async loadData () {
        if (this.curTabIndex === 0) {
          this.student = await this.$api.parent.getStudent({'id': this.id})
          if (this.student.father) {
            this.fatherName = this.student.father.name + '(父亲)'
            this.fatherPhone = this.student.father.phone
          }
          if (this.student.mother) {
            this.motherName = this.student.mother.name + '(母亲)'
            this.motherPhone = this.student.father.phone
          }
          if (this.student.guardian) {
            this.guardianName = this.student.guardian.name + '(监护人)'
            this.guardianPhone = this.student.guardian.phone
          }
        } else if (this.curTabIndex === 1) {
          this.prizeList = await this.$api.parent.queryStudentPrizeList({})
        }
      },
      getResidentType (residentType) {
        switch (residentType) {
          case 'CITY':
            return '城市'
          case 'COUNTY':
            return '县城'
          case 'VILLAGE':
            return '农村'
        }
      },

      getPoliticsStatus (politicsStatus) {
        switch (politicsStatus) {
          case 'YOUNG_PIONEER':
            return '少先队员'
          case 'LEAGUE_MEMBER':
            return '共青团员'
          case 'COMMUNIST':
            return '共产党员'
          case 'MASSES':
            return '群众'
        }
      },
      async handleTabChange (curTabIndex) {
        if (this.curTabIndex === curTabIndex) {
          return
        }
        this.curTabIndex = curTabIndex
        await this.loadData()
      },
      handlePrizeEdit (index) {
        this.$router.push(`/parent/children/prize/edit/${index}`)
      },
      handleAddPrizeClick () {
        this.$router.push(`/parent/children/prize/edit/-1`)
      },
      async handleSetPrimaryClick () {
        this.loading = true
        await this.$api.parent.setCurrentChild({'studentId': this.id})
        this.loading = false
        this.$toast.success('设置成功')
        this.showSetPrimary = false
      }
    }
  }
</script>

<style scoped lang="sass">
  .child-detail
    .prize
      padding-bottom: 70px
    &-header
      height: 210px
      background: $dark-blue
      @include ver-center-center
      &__name
        color: $white
        font-size: 18px
        line-height: 25px
        text-align: center
      &-wrapper
        position: relative
        &__avatar
          margin-top: 20px
          @include circle(74px)
          border: 1px solid #FAFBFD
        &__tag
          position: absolute
          top: 25px
          right: -8px
          width: 25px
          height: 14px
          img
            position: absolute
          span
            position: absolute
            z-index: 2
            font-size: 11px
            left: 4px
            top: 2px
            color: $white
      &__setting
        color: $white
        margin-top: 20px
        font-size: 15px
        line-height: 21px
        background: #FFC500
        border-radius: 8px
        padding: 6px 25px
    &-tab
      margin-top: 10px
      &-prize
        position: relative
        &-title
          background: $white
          padding: 10px 16px
          @include hor-between-center
          span
            color: #24A197
            font-size: 13px
            line-height: 18px
          img
            width: 15px
            height: 15px
            margin-right: 8px

</style>
