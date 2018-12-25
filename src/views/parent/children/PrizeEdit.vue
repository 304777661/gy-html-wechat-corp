<template>
  <div class="add-prize">
    <van-cell-group>
      <van-field v-model="prize.prizeName" label="奖项名称" placeholder="需详细说明荣誉称号或获奖等级" input-align="right"></van-field>
      <van-cell title="获奖级别" is-link :value="prizeLevel.label" @click="handlePrizeLevelClick"></van-cell>
      <van-field v-model="prize.sponsor" label="举办单位" placeholder="请输入" input-align="right"></van-field>
      <van-cell title="获奖时间" is-link :value="prize.prizeDate | ymd" @click="handleShowDatePicker"></van-cell>
    </van-cell-group>
    <div class="add-prize-attachment">
      <p class="add-prize-attachment__title">奖励证书</p>
      <picture-map :upload="true" :pictures="imageList"></picture-map>
    </div>

    <my-button :content="'提交'" @btnClick="handleSubmitClick"></my-button>

    <van-popup v-model="showPrizeLevel" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        ref="picker"
        :columns="prizeLevelColumns"
        value-key="label"
        @cancel="handlePrizeLevelCancelClick"
        @confirm="handlePrizeLevelConfirmClick">
      </van-picker>
    </van-popup>

    <van-popup v-model="showDatePicker" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="prizeDate"
        type="date"
        :max-date="maxDate"
        @cancel="handleTimeCancel"
        @confirm="handleTimeConfirm"
        :min-date="minDate">
      </van-datetime-picker>
    </van-popup>

  </div>
</template>

<script>
  export default {
    name: 'AddPrize',
    data () {
      return {
        index: this.$route.query.index,
        imageList: [],
        pickerItemHeight: 70,
        prizeDate: new Date(),
        minDate: new Date(1970, 1, 1),
        maxDate: new Date(),
        showPrizeLevel: false,
        showDatePicker: false,
        prizeLevel: {},
        prizeLevelColumns: this.$enums.PrizeLevel.list,
        prizeList: [],
        prize: {
          id: null,
          prizeName: '',
          prizeDate: new Date().Format('yyyy-MM-dd 00:00:00'),
          prizeLevel: '',
          sponsor: ''
        }
      }
    },
    methods: {
      handleShowDatePicker () {
        this.showDatePicker = true
      },
      handleTimeCancel () {
        this.showDatePicker = false
      },
      handleTimeConfirm () {
        this.prize.prizeDate = this.prizeDate.Format('yyyy-MM-dd 00:00:00')
        this.showDatePicker = false
      },
      handlePrizeLevelClick () {
        this.showPrizeLevel = true
      },
      handlePrizeLevelCancelClick () {
        this.showPrizeLevel = false
      },
      handlePrizeLevelConfirmClick (item) {
        this.prizeLevel = item
        this.showPrizeLevel = false
      },
      async handleSubmitClick () {
        if (!this.prize.prizeName || this.prize.prizeName.length === 0) {
          this.$toast.fail('请输入奖项名称')
          return
        }
        if (!this.prizeLevel) {
          this.$toast.fail('请选择获奖级别')
          return
        }
        if (!this.prize.sponsor || this.prize.sponsor.length === 0) {
          this.$toast.fail('请输入举办单位')
          return
        }
        let attachmentList = []
        if (this.imageList && this.imageList.length > 0) {
          this.imageList.map(item => {
            attachmentList.push({
              fileName: item.substr(item.lastIndexOf('/') + 1).toLowerCase(),
              fileUrl: item
            })
          })
        }
        this.prize.prizeLevel = this.prizeLevel.value
        this.prize.attachmentList = attachmentList
        await this.$api.parent.addStudentPrize(this.prize)
        this.$toast.success('提交成功')
        this.$router.back()
      }
    },
    async created () {
      if (this.index >= 0) {
        this.$route.meta.title = '编辑获奖情况'
        this.prizeList = await this.$api.parent.queryStudentPrizeList()
        if (this.prizeList && this.prizeList.length > 0) {
          this.prize = this.prizeList[this.index]
          for (let i = 0; i < this.$enums.PrizeLevel.list.length; i++) {
            let item = this.$enums.PrizeLevel.list[i]
            if (item.value === this.prize.prizeLevel) {
              this.prizeLevel = item
              break
            }
          }
        }
      } else {
        this.$route.meta.title = '添加获奖情况'
      }
    }
  }
</script>

<style scoped lang="sass">
  .add-prize
    position: relative
    height: 100vh
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
