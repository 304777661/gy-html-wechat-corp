<template>
  <div class="mailbox-add">
    <div class="mailbox-add-container">
      <p class="mailbox-add-title">标题</p>
      <van-field v-model="query.title" placeholder="请输入"></van-field>
      <div class="van-hairline--bottom"></div>
      <p class="mailbox-add-title">内容</p>
      <div class="mailbox-add-content van-hairline--bottom">
        <van-field v-model="query.content"
                   type="textarea"
                   :border="false"
                   :autosize="contentHeight"
                   placeholder="请输入"></van-field>
        <p class="mailbox-add-content-limit">{{query.content.length}}/500</p>
      </div>
      <picture-map v-model="query.attachmentList" upload/>
      <p class="van-hairline--top anonymous-title">是否匿名</p>
      <van-radio-group v-model="query.isAnonymous" @change="handleRadioChange">
        <van-radio name="YES" class="radio-item">是</van-radio>
        <van-radio name="NO" class="radio-item">否</van-radio>
      </van-radio-group>
    </div>
    <p class="hint">提示：不匿名反馈将发送至班主任处</p>
    <my-button :content="submitBtnTitle" @btnClick="handleSubmitClick"></my-button>
  </div>
</template>

<script>
  export default {
    computed: {
      content () {
        return this.query.content
      }
    },
    data () {
      return {
        submitBtnTitle: '提交',
        query: {
          title: '',
          content: '',
          isAnonymous: 'YES',
          attachmentList: []
        },
        radio: '1',
        contentHeight: {
          minHeight: 300,
          maxHeight: 400
        }
      }
    },
    methods: {
      async handleSubmitClick () {
        if (!this.query.title) {
          this.$toast('请输入标题')
          return
        } else if (!this.query.content) {
          this.$toast('请输入内容')
          return
        }
        await this.$api.parent.addPatriarchMailbox(this.query)
        this.$toast.success('新增成功')
        this.$router.back()
      },
      handleRadioChange () {
        console.log(this.query.isAnonymous)
      }
    },
    watch: {
      content (newVal, oldVal) {
        if (newVal.length <= 500) return
        this.$toast.fail('说明文字长度不能超过500')
        this.query.content = oldVal
      }
    },
  }
</script>

<style lang="sass">
  .mailbox-add
    &-container
      background: $white
      padding: 0 14px 14px
    &-title
      font-size: 17px
      line-height: 24px
      color: $black
      padding-top: 14px
      font-weight: bold
      margin-bottom: 4px
    &-content
      position: relative
      margin-bottom: 10px
      &-limit
        position: absolute
        right: 0
        bottom: 10px
        color: $gray
        font-size: 12px
    .van-field
      color: $black
      padding-left: 0
      padding-right: 0
    .anonymous-title
      margin: 10px 0
      color: $gray
      padding-top: 14px
      font-size: 14px
      line-height: 24px
    .hint
      color: #cccccc
      font-size: 13px
      line-height: 21px
      margin-top: 14px
      margin-left: 14px
    .radio-item
      display: inline-block
      margin-right: 25px
</style>
