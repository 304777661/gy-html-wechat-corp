<template>
  <div class="notice-detail">
    <my-loading v-model="loading"/>
    <notice-detail :article="article" :endTime="article.endDate" :isActivity="article.noticeType === 'ACTIVITY'">
    </notice-detail>
    <picture-map class="notice-detail-upload van-hairline--top"
                 v-if="article.isAttachment === 'YES'"
                 :upload="article.isParticipated === 'NO' && article.isFinish === 'NO'"
                 :pictures="imageList">
    </picture-map>

    <my-button v-if="isShowParticipateButton()" :content="'我要参与'" @btnClick="handleApplyClick">
    </my-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: this.$route.query.id,
        loading: false,
        imageList: [],
        article: {},
      }
    },
    methods: {
      async handleApplyClick () {
        // 我要报名
        await this.$api.parent.participationNotice(this.getQuery())
        this.$toast.success('报名成功')
        this.$router.back()
      },
      getQuery () {
        let attachments = []
        if (this.imageList && this.imageList.length > 0) {
          this.imageList.map(item => {
            attachments.push({
              fileName: item.substr(item.lastIndexOf('/') + 1).toLowerCase(),
              fileUrl: item
            })
          })
        }
        return {
          id: this.article.id,
          attachmentList: attachments
        }
      },
      isShowParticipateButton () {
        return this.article &&
          this.article.noticeType === 'ACTIVITY' &&
          this.article.isAttachment === 'YES' &&
          this.article.isParticipated === 'NO' &&
          this.article.isFinish === 'NO'
      },
    },
    async created () {
      this.loading = true
      this.article = await this.$api.parent.getNotice({'id': this.id})
      // 活动图片
      if (this.article && this.article.participationAttachmentList && this.article.participationAttachmentList.length > 0) {
        for (let i = 0; i < this.article.participationAttachmentList.length; i++) {
          this.imageList.push(this.article.participationAttachmentList[i].fileUrl)
        }
      }
      if (this.article.noticeType === 'ACTIVITY') {
        this.$route.meta.title = '活动详情'
      } else {
        this.$route.meta.title = '通知详情'
      }
      this.loading = false
    }
  }
</script>

<style lang="sass">
  .notice-detail
    padding-bottom: 70px
    &-upload
      padding: 10px 14px
      margin-top: 10px

</style>
