<template>
  <div class="job">
    <div class="job-container">
      <p class="job-container-prompt">湖南广益实验中邀请您填写手机号</p>
      <p class="job-container-prompt">确认参加招聘考试和面试</p>
      <van-field v-model="mobile" placeholder="输入手机号" class="job-container-input"></van-field>
      <van-field v-model="verifyCode" placeholder="输入验证码" class="job-container-input verify">
        <van-button slot="button" @click="sendVerifyCodeClick">获取</van-button>
      </van-field>
      <van-button class="job-container-input submit-btn" @click="handleSubmitClick">提交</van-button>
    </div>
    <van-popup v-model="showConfirm">
      <div class="job-confirm">
        <van-icon name="checked" color="#0EBF89" class="job-confirm-success"></van-icon>
        <p class="van-hairline--bottom job-confirm-content">提交成功</p>
        <!--<van-icon name="cross" class="job-confirm-close" @click="handleCloseClick"></van-icon>-->
        <p class="job-confirm-sure" @click="handleOkClick">确定</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        showConfirm: false,
        mobile: '',
        verifyCode: ''
      }
    },
    methods: {
      sendVerifyCodeClick () {
        // 数据校验
        if (this.mobile.length === 0) {
          this.$toast.fail('请输入手机号')
          return
        }
        if (this.checkMobile(this.mobile)) {
          this.$toast.fail('手机号不正确')
          return
        }
        // todo 发送验证码

      },
      handleSubmitClick () {
        this.showConfirm = true
        if (this.mobile.length === 0) {
          this.$toast.fail('请输入手机号')
          return
        }
        if (this.verifyCode.length === 0) {
          this.$toast.fail('请输入验证码')
          return
        }
        // todo 提交时间
      },
      handleCloseClick () {
        this.showConfirm = false
      },
      handleOkClick () {
        this.showConfirm = false
      },
      checkMobile (input) {
        let re = /^1\d{10}$/
        return re.test(input)
      }
    },
  }
</script>

<style scoped lang="sass">
  .job
    position: relative
    background-image: url(../../../assets/images/job_bg.png)
    height: 100vh
    .van-popup
      border-radius: 4px
    &-confirm
      background: $white
      height: 170px
      position: relative
      width: 200px
      border-radius: 18px
      display: flex
      flex-direction: column
      align-items: center
      &-success
        margin-top: 30px
        font-size: 50px
      &-close
        position: absolute
        font-size: 17px
        right: 10px
        top: 10px
      &-content
        width: 100%
        margin-top: 15px
        text-align: center
        padding-bottom: 20px
      &-sure
        text-align: center
        padding-top: 10px
    &-container
      $input-height: 45px
      width: 100vw
      padding: 350px 40px 0
      position: absolute
      margin: 0 auto
      .submit-btn
        height: $input-height
        background: #24A197
        color: white
        width: 100%
      &-prompt
        color: #9B9B9B
        font-size: 13px
        line-height: 18px
        text-align: center
      &-input
        height: $input-height
        border-radius: $input-height/2
        background: #f8fafc
        margin-top: 10px
        border: 1px solid $gray-light
      .verify
        padding: 0 15px
      .van-field__button
        .van-button
          background: transparent
          font-size: 13px
          border: none
          border-left: 1px solid $gray-light
          color: #24A197

</style>
