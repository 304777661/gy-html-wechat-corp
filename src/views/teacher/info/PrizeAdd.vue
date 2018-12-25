<template>
  <div class="add-prize">
    <van-cell-group>
      <van-field label="项目名称" v-model="prize.entryName" placeholder="请输入" input-align="right"></van-field>
      <van-cell title="类型" is-link :value="$enums.ProjectType.getName(prize.entryType)"
                @click="handleEntryTypeClick"></van-cell>
      <van-field label="颁奖单位" v-model="prize.awardUnit" placeholder="请输入" input-align="right"></van-field>
      <van-field label="获奖等级或获得的成绩" v-model="prize.achievement" placeholder="请输入" input-align="right"></van-field>
      <van-cell title="获奖时间" is-link :value="prize.obtainTime | ymd" @click="handleShowDatePicker"></van-cell>
    </van-cell-group>
    <div class="add-prize-attachment">
      <p class="add-prize-attachment__title">证明材料</p>
      <picture-map :upload="true" :pictures="imageList"></picture-map>
    </div>

    <my-button :content="submitBtnTitle" @btnClick="handleSubmitClick"></my-button>

    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        :columns="prizeLevelColumns"
        value-key="label"
        @cancel="handleEntryTypeCancelClick"
        @confirm="handleEntryTypeConfirmClick">
      </van-picker>
    </van-popup>

    <van-popup v-model="showDatePicker" position="bottom">
      <van-datetime-picker
        v-show="showDatePicker"
        v-model="obtainTime"
        type="date"
        @cancel="handleTimeCancel"
        @confirm="handleTimeConfirm"
        :min-date="minDate">
      </van-datetime-picker>
    </van-popup>

  </div>
</template>

<script>
  export default {
    name: 'PrizeAdd',
    data () {
      return {
        prize: {
          entryName: '',
          awardUnit: '',
          achievement: '',
          obtainTime: new Date(),
          attachmentList: [],
          entryType: ''
        },
        obtainTime: new Date(),
        submitBtnTitle: '提交',
        pickerItemHeight: 70,
        minDate: new Date(1970, 1, 1),
        showType: false,
        showDatePicker: false,
        prizeLevelColumns: this.$enums.ProjectType.list,
        imageList: []
      }
    },
    methods: {
      handleEntryTypeClick () {
        this.showType = true
      },
      handleEntryTypeCancelClick () {
        this.showType = false
      },
      handleEntryTypeConfirmClick (item) {
        this.prize.entryType = item.value
        this.showType = false
      },
      handleShowDatePicker () {
        this.showDatePicker = true
      },
      handleTimeCancel () {
        this.showDatePicker = false
      },
      handleTimeConfirm () {
        this.prize.obtainTime = this.obtainTime
        this.showDatePicker = false
      },
      async handleSubmitClick () {
        if (!this.prize.entryName || this.prize.entryName.length === 0) {
          this.$toast.fail('请输入项目名称')
          return
        }
        if (!this.prize.entryType || this.prize.entryType.length === 0) {
          this.$toast.fail('请选择类型')
          return
        }
        if (!this.prize.awardUnit || this.prize.awardUnit.length === 0) {
          this.$toast.fail('请输入颁奖单位')
          return
        }
        if (!this.prize.achievement || this.prize.achievement.length === 0) {
          this.$toast.fail('获奖等级或获得的成绩')
          return
        }
        if (this.imageList && this.imageList.length > 0) {
          this.prize.attachmentList = []
          this.imageList.map(item => {
            this.prize.attachmentList.push({
              fileName: item.substr(item.lastIndexOf('/') + 1).toLowerCase(),
              fileUrl: item
            })
          })
        }
        await this.$api.parent.addStudentPrize(this.prize)
        this.$toast.success('已提交，请耐心等待审核')
        this.$router.back()
      },
    },
  }
</script>

<style scoped lang="sass">
  .add-prize
    position: relative
    height: calc(100vh - 80px)
    /deep/ .van-cell__title
      max-width: 200px
    &-attachment
      background: $white
      padding: 10px 14px
      margin-top: 10px
      &__title
        margin-top: 4px
        margin-bottom: 8px
        line-height: 21px

</style>
