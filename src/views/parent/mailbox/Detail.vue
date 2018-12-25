<template>
  <div class="mailbox-detail">
    <my-loading v-model="loading"/>
    <notice-detail :article="article" :isAnonymous="article.isAnonymous === 'YES'"></notice-detail>
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
</template>

<script>
  import config from '@/config'

  export default {
    name: 'MailboxDetail',
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
      this.article = await this.$api.parent.getPatriarchMailbox({'id': this.id})
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
        let data = await this.$api.parent.queryPatriarchMailboxReplyPage(this.getReplyQuery())
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
      getReplyQuery () {
        return {
          mailId: this.id,
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      }
    }
  }
</script>

<style scoped lang="sass">

  .mailbox-detail
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
          margin-top: 10px
          line-height: 1.2
</style>
