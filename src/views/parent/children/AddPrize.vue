<template>
  <div class="add-prize">
    <van-cell-group>
      <van-field v-model="prizeName" label="奖项名称" placeholder="需详细说明荣誉称号或获奖等级" input-align="right"></van-field>
      <van-cell title="获奖级别" is-link :value="prizeLevel.label" @click="handlePrizeLevelClick"></van-cell>
      <van-field v-model="sponsor" label="举办单位" placeholder="请输入" input-align="right"></van-field>
      <van-cell title="获奖时间" is-link :value="prizeDateValue | ymd" @click="handleShowDatePicker"></van-cell>
    </van-cell-group>
    <div class="add-prize-attachment">
      <p class="add-prize-attachment__title">奖励证书</p>
      <picture-map :upload="true" :pictures="attachmentList"></picture-map>
    </div>

    <div class="add-prize-mask" @click="handleMaskClick" v-show="showMask"></div>

    <van-popup v-model="showPrizeLevel" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        ref="picker"
        :columns="prizeLevelColumns"
        value-key="label"
        :item-height="pickerItemHeight"
        @cancel="handlePrizeLevelCancel"
        @confirm="handlePrizeLevelConfirm">
      </van-picker>
    </van-popup>

    <van-datetime-picker
      v-show="showDatePicker"
      v-model="prizeDate"
      type="date"
      class="time-picker"
      @cancel="handleTimeCancel"
      @confirm="handleTimeConfirm"
      :item-height="pickerItemHeight"
      :min-date="minDate">
    </van-datetime-picker>

    <my-button :content="submitBtnTitle" @btnClick="handleSubmitClick"></my-button>

  </div>
</template>

<script>
  export default {
    name: 'AddPrize',
    computed: {
      query () {
        return {
          prizeName: this.prizeName,
          prizeDate: this.prizeDateValue.Format('yyyy-MM-dd hh:mm:ss'),
          prizeLevel: this.prizeLevel.value,
          sponsor: this.sponsor,
          attachmentList: this.attachmentList
        }
      }
    },
    data () {
      let prizeDate = new Date()
      return {
        prizeName: '',
        sponsor: '',
        submitBtnTitle: '提交',
        prizeLevel: {
          label: '请选择',
          value: ''
        },
        showMask: false,
        pickerItemHeight: 70,
        prizeDate,
        prizeDateValue:
        prizeDate,
        minDate: new Date(prizeDate.setFullYear(prizeDate.getFullYear() - 50)),
        showPrizeLevel: false,
        showDatePicker: false,
        prizeLevelColumns: this.$enums.PrizeLevel.list,
        attachmentList: []
      }
    },
    methods: {
      handleShowDatePicker () {
        this.showMask = true
        this.showDatePicker = true
      },
      handleTimeCancel () {
        this.handleMaskClick()
      },
      handleTimeConfirm (val) {
        this.prizeDateValue = new Date(val)
        this.handleMaskClick()
      },
      handleMaskClick () {
        this.showMask = false
        this.showDatePicker = false
      },
      handlePrizeLevelConfirm (val) {
        this.prizeLevel = val
        this.showPrizeLevel = false
      },
      handlePrizeLevelCancel () {
        this.showPrizeLevel = false
      },
      handlePrizeLevelClick () {
        this.showPrizeLevel = true
      },
      async handleSubmitClick () {
        // validate form
        if (this.prizeName.length === 0) {
          this.$toast.fail('请输入奖项名称')
          return
        }
        if (this.prizeLevel.label === '请选择') {
          this.$toast.fail('请选择奖项名称')
          return
        }
        if (this.sponsor.length === 0) {
          this.$toast.fail('请输入举办单位')
          return
        }
        const resp = await this.$api.parent.addStudentPrize(this.query)
        this.$toast.success('提交成功')
        this.$router.back()
      }
    },
  }
</script>

<style scoped lang="sass">
  .add-prize
    position: relative
    height: 100vh
    .time-picker
      position: absolute
      bottom: 0
      left: 0
      z-index: 4
      right: 0
    &-mask
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      width: 100vw
      height: 100vh
      z-index: 3
      background: rgba(0, 0, 0, 0.5)
    &-attachment
      background: $white
      padding: 10px 14px
      &__title
        margin-top: 4px
        margin-bottom: 8px
        line-height: 21px

</style>
