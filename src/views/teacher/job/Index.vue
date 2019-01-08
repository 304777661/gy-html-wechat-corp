<template>
  <div class="job">
    <div class="job-container">
      <p class="job-container-prompt">湖南广益实验中学邀请您填写手机号</p>
      <p class="job-container-prompt">确认参加招聘考试和面试</p>
      <div v-if="interviewTime">
        <p class="job-container-prompt">面试时间：{{interviewTime | ymdhm}}</p>
        <p class="job-container-prompt">面试地点：{{interviewVenue}}</p>
      </div>
      <van-field v-model="phone" placeholder="输入手机号" class="job-container-input" maxlength="11"></van-field>
      <van-field v-model="verifyCode" placeholder="输入验证码" class="job-container-input verify" maxlength="4">
        <van-button slot="button" @click="sendVerifyCodeClick" :disabled="disabledClick">{{countdown}}</van-button>
      </van-field>
      <van-button class="job-container-input submit-btn" @click="handleSubmitClick">提交</van-button>
    </div>
    <van-popup v-model="showConfirm">
      <div class="job-confirm">
        <van-icon name="checked" color="#0EBF89" class="job-confirm-success"></van-icon>
        <p class="van-hairline--bottom job-confirm-content">提交成功</p>
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
        phone: '',
        verifyCode: '',
        serverVerifyCode: '',
        interviewTime: null,
        interviewVenue: '',
        timer: null,
        countdown: '获取',
        disabledClick: false
      }
    },
    watch: {
      phone (newVal, oldVal) {
        if (newVal && newVal.length === 11) {
          this.getInterviewInfo()
        }
      }
    },
    methods: {
      async getInterviewInfo () {
        let data = await this.$api.teacher.getTeacherApplyInterview({'phone': this.phone})
        this.interviewTime = data.interviewTime
        this.interviewVenue = data.interviewVenue
      },
      async sendVerifyCodeClick () {
        if (this.phone.length === 0) {
          this.$toast.fail('请输入手机号')
          return
        }
        if (!this.checkMobile(this.phone)) {
          this.$toast.fail('手机号不正确')
          return
        }
        this.serverVerifyCode = await this.$api.teacher.sendVerifyCode({'phone': this.phone})
        const TIME_COUNT = 60
        if (!this.timer) {
          this.count = TIME_COUNT
          this.disabledClick = true
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.countdown = this.count + 's'
              this.count--
            } else {
              this.disabledClick = false
              this.countdown = '获取'
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      },
      async handleSubmitClick () {
        if (this.phone.length === 0) {
          this.$toast.fail('请输入手机号')
          return
        }
        if (this.verifyCode.length === 0) {
          this.$toast.fail('请输入验证码')
          return
        }
        if (this.verifyCode !== this.serverVerifyCode) {
          this.$toast.fail('验证码输入有误')
          return
        }
        await this.$api.teacher.teacherApplyConfirm({
          phone: this.phone,
          vertifyCode: this.verifyCode
        })
        this.showConfirm = true
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
    background: url('~IMAGE/job_bg.png') no-repeat
    background-size: 100% 100%
    width: 100vw
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
      padding: 260px 40px 0
      position: absolute
      margin: 0 auto
      .submit-btn
        height: $input-height
        background: #24A197
        color: white
        width: 100%
      &-prompt
        color: #333333
        font-size: 13px
        line-height: 22px
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
