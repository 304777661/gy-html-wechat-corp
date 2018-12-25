<template>
  <div class="research-detail">
    <my-loading v-model="loading"/>
    <notice-detail :article="article"></notice-detail>
  </div>
</template>

<script>
  export default {
    name: 'ResearchDetail',
    data () {
      return {
        id: this.$route.query.id,
        actions: [{
          name: '下载到手机',
          className: 'icon icon-download',
          callback: this.doDownload
        }],
        loading: false,
        showActionSheet: false,
        curFile: null,
        article: {}
      }
    },
    methods: {
      handleDownloadClick (file) {
        this.curFile = file
        this.showActionSheet = true
      },
      async doDownload () {
        if (!this.curFile) {
          this.$toast.fail('获取文件错误')
          this.showActionSheet = false
          return
        }
        // window.location.href = `${window.location.origin}${this.$config.apiPrefix}/oss/downloadFile.do?path=${this.curFile.fileUrl}`
        window.location.href = this.curFile.fileUrl
        this.showActionSheet = false
      }
    },
    async created () {
      this.loading = true
      this.article = await this.$api.teacher.getNotice({'id': this.id})
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .research-detail
    height: 100vh
    /deep/ .van-actionsheet__name
      margin-left: 10px
    .wrapper
      padding: 10px 14px
      background: $white
    &__title
      font-size: $font-large
      line-height: 24px
    &__time
      font-size: 13px
      line-height: 18px
      color: #ccc
      margin-top: 8px
      padding-bottom: 2px
    &__content
      margin-top: 10px
      /deep/ img
        width: 100%
        max-width: 100%
      /deep/ p
        line-height: 24px
      /deep/ table
        border: 1px solid #cccccc
        margin-right: 8px
        tr
          padding: 4px
        td
          min-width: 25%
          border: 1px solid #cccccc
          text-align: center
          padding: 4px
    &__additional
      margin-top: 10px
      background: $white
      padding: 0 14px
      &__sticky
        color: #24A197
        font-size: 13px
        line-height: 18px
        padding: 8px 0
      &__item
        height: 60px
        @include hor-start-center
        &__icon
          margin-left: 6px
          width: 20px
          height: 24px
        &__name
          font-size: 15px
          color: $black
          margin-left: 8px
          flex: 1
          line-height: 24px
          @include text-overflow
        &__func
          color: #24A197
          font-size: 13px
          padding: 4px 10px
          line-height: 14px
          border-radius: 3px
          margin-right: 14px
          border: 1px solid #24A197
</style>
