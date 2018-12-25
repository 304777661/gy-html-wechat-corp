<template>
  <div class="notice-detail">
    <my-loading v-model="loading"/>
    <div v-show="!loading">
      <div class="notice-detail-header">
        <div class="notice-detail-header-title">
          <p class="notice-detail-header-title__name">{{article.title}}</p>
          <div class="notice-detail-header-title__tag" v-if="article.noticeType === 'ACTIVITY'">
            <van-tag v-if="article.isParticipated === 'YES'" color="#24A197">已参与
            </van-tag>
            <van-tag v-else-if="article.isFinish === 'YES'" color="#9B9B9B" plain>已结束
            </van-tag>
            <van-tag v-else color="#24A197" plain>进行中
            </van-tag>
          </div>
        </div>
        <div class="notice-detail-header__additional">
          <span><span v-if="article.noticeType === 'ACTIVITY'">结束时间：</span>{{article.endDate | ymdhm}}</span>
          <span v-if=" article.noticeType=== 'ACTIVITY'">{{article.participationNum}}人已参与</span>
        </div>
      </div>
      <hr>
      <div class="notice-detail__content" v-html="article.content"></div>
    </div>
    <hr v-if="article.isAttachment === 'YES'">
    <picture-map v-if="article.isAttachment === 'YES'"
                 :upload="article.isParticipated === 'NO' && article.isFinish === 'NO'"
                 :pictures="imageList">
    </picture-map>
    <my-button v-if="article.noticeType === 'ACTVIITY' &&
                     article.isAttachment==='YES' &&
                     article.isParticipated === 'NO' &&
                     article.isFinish==='NO'"
               :content="'我要报名'"
               @btnClick="handleApplyClick">
    </my-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
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
        // 附件
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
      }
    },
    async created () {
      this.loading = true
      this.article = await this.$api.parent.getNotice({'id': this.$route.query.id})
      if (this.article && this.article.attachmentList && this.article.attachmentList.length > 0) {
        for (let i = 0; i < this.article.attachmentList.length; i++) {
          this.imageList.push(this.article.attachmentList[i].fileUrl)
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
    background: $white
    padding: 10px 14px $default-gap
    overflow-x: scroll
    &-header
      &-title
        @include hor-between-center
        &__name
          flex: 1
          @include text-overflow
          color: $black
          font-size: 17px
          line-height: 24px
          font-weight: bold
        &__tag
          .van-tag
          padding: 3px 0
      &__additional
        margin-top: 8px
        @include hor-between-center
        color: #cccccc
        font-size: 13px
        line-height: 18px
    &__content
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
    .picture-map
      margin-top: 10px

</style>
