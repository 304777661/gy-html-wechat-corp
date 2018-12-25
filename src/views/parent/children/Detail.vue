<template>
  <div class="child-detail">
    <div class="child-detail-header">
      <p class="child-detail-header__name">{{student.name}}</p>
      <div class="child-detail-header-wrapper">
        <img class="child-detail-header-wrapper__avatar" :src="student.avatar | defaultAvatar">
        <div class="child-detail-header-wrapper__input">
          <input type="file"
                 id="file-input"
                 accept="image/*"
                 hidden
                 @change="inputChanged">
          <label for="file-input"> </label>
        </div>
        <div class="child-detail-header-wrapper__tag" v-show="student.isCurrent === 'YES'">
          <img src="../../../assets/images/main-children.png"/>
          <span>主</span>
        </div>
      </div>
      <div class="child-detail-header__setting" @click="handleSetPrimaryClick" v-if="student.isCurrent === 'NO'">设置主查询
      </div>
    </div>
    <my-tabs :tabs="tabs" @tabChanged="handleTabChange"></my-tabs>
    <div v-show="curTabIndex === 0" class="child-detail-tab">
      <div class="child-detail-tab-wrapper">
        <van-cell-group>
          <van-cell title="班级学号" :value="student.classStudentNo || '--'"></van-cell>
          <van-cell title="全国学籍号" :value="student.nationStudentNo || '--'"></van-cell>
          <van-cell title="身份证号" :value="student.idCard || '--'"></van-cell>
          <van-cell title="出生日期" :value="student.birthday | ymd"></van-cell>
          <van-cell title="民族" :value="student.nationName || '--'"></van-cell>
          <van-cell title="户口性质" :value="$enums.ResidentType.getName(student.residentType) || '--'"></van-cell>
          <van-cell title="政治面貌"
                    :value="$enums.StudentPoliticsStatus.getName(student.politicsStatus) || '--'"></van-cell>
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
      <my-button :content="'编辑基本信息'" @btnClick="handleEditInfoClick"></my-button>
    </div>

    <div v-show="curTabIndex === 1" class="child-detail-tab prize">
      <no-data v-show="!loading && !prizeList.length"/>
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
      return {
        id: this.$route.query.id,
        curTabIndex: 0,
        loading: false,
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
        prizeList: [],

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
            this.motherPhone = this.student.mother.phone
          }
          if (this.student.guardian) {
            this.guardianName = this.student.guardian.name + '(监护人)'
            this.guardianPhone = this.student.guardian.phone
          }
        } else if (this.curTabIndex === 1) {
          this.prizeList = await this.$api.parent.queryStudentPrizeList({})
        }
      },
      async handleTabChange (curTabIndex) {
        if (this.curTabIndex === curTabIndex) {
          return
        }
        this.curTabIndex = curTabIndex
        await this.loadData()
      },
      handleEditInfoClick () {
        this.$router.push(`/parent/children/info/edit?id=${this.id}`)
      },
      handlePrizeEdit (index) {
        this.$router.push(`/parent/children/prize/edit?index=${index}`)
      },
      handleAddPrizeClick () {
        this.$router.push(`/parent/children/prize/edit?index=-1`)
      },
      async handleSetPrimaryClick () {
        this.loading = true
        await this.$api.parent.setCurrentChild({'studentId': this.id})
        this.loading = false
        this.$toast.success('设置成功')
        this.student.isCurrent = 'YES'
      },
      async inputChanged (e) {
        if (e.target.files.length === 0) return
        let toast = this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: '文件上传中...'
        })
        let files = e.target.files
        // 所有的图片一起异步上传, 使用j变量来控制上传进度
        for (let i = 0; i < files.length; i++) {
          let formData = new FormData()
          const file = files[i]
          formData.append('file', file)
          this.$api.teacher.upload(formData).then(imgUrl => {
            // 使pictures这个数组里面的图片能保持上传的位置
            this.student.avatar = imgUrl
            toast.clear()
            // 防止选择同一图片后, change事件不触发
            document.getElementById('file-input').value = null
            this.$toast.success('文件上传成功')
          })
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  .child-detail
    .prize
      padding-bottom: 70px
    &-header
      background: $dark-blue
      @include ver-center-center
      &__name
        color: $white
        font-size: 18px
        line-height: 25px
        text-align: center
        margin-top: 10px
      &-wrapper
        position: relative
        margin-bottom: 14px
        &__input
          position: absolute
          top: 40px
          left: 0
          width: 70px
          height: 70px
          label
            width: 100%
            height: 100%
            padding: 29px 36px
            background: transparent
        &__avatar
          margin-top: 14px
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
        margin-bottom: 10px
        font-size: 14px
        line-height: 21px
        background: #FFC500
        border-radius: 8px
        padding: 4px 20px
    &-tab
      margin-top: 10px
      &-wrapper
        padding-bottom: 70px
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
