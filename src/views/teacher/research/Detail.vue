<template>
  <div class="research-detail">
    <my-loading v-model="loading"/>
    <div class="wrapper">
      <p class="research-detail__title">{{activity.title}}</p>
      <p class="research-detail__time">{{activity.createdTime | ymd}}</p>
      <hr>
      <div class="research-detail__content">
        {{activity.content}}
      </div>
    </div>
    <div class="research-detail__additional" v-if="activity && activity.attachmentList.length>0">
      <p class="research-detail__additional__sticky van-hairline--bottom">附件</p>
      <div class="research-detail__additional__item van-hairline--bottom"
           v-for="(file,index) in activity.attachmentList" :key="index">
        <img class="research-detail__additional__item__icon" :src="file.fileUrl | fileIcon"/>
        <span class="research-detail__additional__item__name">{{file.fileName}}</span>
        <div class="research-detail__additional__item__func" @click="handleDownloadClick(file)">下载</div>
      </div>
    </div>

    <van-actionsheet v-model="showActionSheet" :actions="actions"></van-actionsheet>
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
        activity: {}
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
        window.location.href = `${window.location.origin}${this.$config.apiPrefix}/oss/downloadFile.do?path=${this.curFile.fileUrl}`
        this.showActionSheet = false
      }
    },
    async created () {
      this.loading = true
      this.activity = await this.$api.teacher.getNotice({'id': this.id})
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
      line-height: 1.5
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
