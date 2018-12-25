<template>
  <div class="mailbox-detail">
    <!--<my-loading v-model="loading"/>-->
    <div class="wrapper">
      <div class="mailbox-detail-wrapper">
        <div v-show="!loading">
          <p class="mailbox-detail-wrapper__title">{{article.title || '未知'}}</p>
          <p class="mailbox-detail-wrapper__time">{{article.createdTime | ymd}}</p>
          <hr>
          <div class="mailbox-detail-wrapper__content" v-html="article.content">
          </div>
        </div>

      </div>
      <div class="mailbox-detail-reply" v-if="replyList && replyList.length>0">
        <p class="mailbox-detail-reply-count van-hairline--bottom">{{replyList ? replyList.length : '0'}}条回复</p>

        <van-list
          v-model="replyLoading"
          :finished="finished"
          @load="onLoad">
          <div class="mailbox-detail-reply-item van-hairline--bottom"
               v-for="item in replyList"
               :key="item.id">
            <div class="mailbox-detail-reply-item-header">
              <span
                class="mailbox-detail-reply-item-header-name">{{article.isAnonymous === 'YES' ? '学校' : '班主任'}}</span>
              <span class="mailbox-detail-reply-item-header-time">{{item.createdTime | ymd}}</span>
            </div>
            <p class="mailbox-detail-reply-item-content">
              {{item.content}}
            </p>
          </div>
        </van-list>
      </div>
    </div>
    <my-button :content="'回复'" @btnClick="handelReplyClick"></my-button>

    <van-popup v-model="showReply" position="bottom">
      <div class="mailbox-detail-reply-additional">
        <van-cell-group>
          <van-field v-model="replyContent" placeholder="请输入回复内容" clearable>
            <van-button slot="button" size="small" type="primary" @click="onReply">回复</van-button>
          </van-field>
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    name: 'MailboxDetail',
    computed: {
      query () {
        return {
          mailId: this.id,
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      },
      replyQuery () {
        return {
          mailId: this.id,
          content: this.replyContent
        }
      },
    },
    data () {
      return {
        id: this.$route.query.id,
        loading: false,
        pageNo: 1,
        replyContent: '',
        showReply: false,
        replyList: [],
        replyLoading: false,
        finished: true,
        article: {}
      }
    },
    async created () {
      this.loading = true
      this.article = await this.$api.teacher.getPatriarchMailbox({'id': this.id})
      this.loadReplyData(true)
      this.loading = false
    },
    methods: {
      async loadReplyData (resetList = false) {
        this.replyLoading = true
        if (resetList) {
          this.replyList = []
          this.pageNo = 1
        }
        let data = await this.$api.teacher.queryPatriarchMailboxReplyPage(this.query)
        if (resetList) {
          this.replyList = data.list
        } else {
          this.replyList = this.replyList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.replyLoading = false
        this.pageNo++
      },
      onLoad () {
        this.loadReplyData()
      },
      handelReplyClick () {
        this.showReply = true
      },
      async onReply () {
        if (!this.replyContent || this.replyContent.length === 0) {
          this.$toast.fail('请输入回复内容')
          return
        }
        this.showReply = false
        await this.$api.teacher.addPatriarchMailboxReply(this.replyQuery)
        this.loadReplyData(true)
        this.replyContent = ''
        this.$toast.success('回复成功')
      },
    }
  }
</script>

<style scoped lang="sass">

  .mailbox-detail
    position: relative
    overflow-x: scroll
    .wrapper
      height: calc(100vh - 70px)
    &-reply-additional
      margin-bottom: 10px
    &-wrapper
      background: $white
      padding: 14px
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
    &-reply
      margin-top: 10px
      background: $white
      &-count
        padding-left: 14px
        font-size: 14px
        line-height: 30px
        color: #24A197
      &-item
        height: auto
        padding: 14px 12px
        &-header
          @include hor-between-center
          &-name
            color: $black
            font-size: 14px
            margin-top: 1px
          &-time
            margin-right: 8px
            color: #9B9B9B
        &-content
          margin-top: 8px
          color: #9B9B9B
          line-height: 21px
          font-size: 15px
  // @include text-overflow-line(3)
</style>
