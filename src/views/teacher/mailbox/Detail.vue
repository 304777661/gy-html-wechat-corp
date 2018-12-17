<template>
  <div class="mailbox-detail">
    <!--<my-loading v-model="loading"/>-->

    <div class="mailbox-detail-wrapper">
      <div v-show="!loading">
        <p class="mailbox-detail-wrapper__title">{{article.title}}</p>
        <p class="mailbox-detail-wrapper__time">{{article.createdTime | ymd}}</p>
        <hr>
        <div class="mailbox-detail-wrapper__content">
          {{article.content}}
        </div>
      </div>

    </div>
    <div class="mailbox-detail-reply">
      <p class="mailbox-detail-reply-count van-hairline--bottom">{{replyList.length}}条回复</p>

      <van-list
        v-model="reply_loading"
        :finished="finished"
        @load="onLoad">
        <div class="mailbox-detail-reply-item van-hairline--bottom"
             v-for="item in replyList"
             :key="item.id"
             @click="">
          <div class="mailbox-detail-reply-item-header">
            <span class="mailbox-detail-reply-item-header-name">{{replyName}}</span>
            <span class="mailbox-detail-reply-item-header-time">{{item.createdTime | ymd}}</span>
          </div>
          <p class="mailbox-detail-reply-item-content">
            {{item.content}}
          </p>
        </div>
      </van-list>
    </div>

    <!--<van-button class="btn"-->
    <!--type="primary"-->
    <!--@click="handelReplyClick">回复-->
    <!--</van-button>-->

    <my-button :content="replyBtnTitle" @btnClick="handelReplyClick"></my-button>

    <div class="mailbox-detail-mask" @click="handleMaskClick" v-show="showMask"></div>

    <div class="mailbox-detail-reply-additional" v-show="showReply">
      <van-cell-group>
        <van-field v-model="replyContent" placeholder="请输入回复内容" clearable>
          <van-button slot="button" size="small" type="primary" @click="onReply">回复</van-button>
        </van-field>
      </van-cell-group>
    </div>
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
          pageSize: config.size
        }
      },
      replyQuery () {
        return {
          mailId: this.id,
          content: this.replyContent
        }
      },
      replyName () {
        return this.article.isAnonymous ? '--' : this.article.isAnonymous === 'YES' ? '学校' : '班主任'
      },
    },
    data () {
      const id = this.$route.params.id
      return {
        loading: false,
        id,
        pageNo: 1,
        replyContent: '',
        showReply: false,
        replyBtnTitle: '回复',
        replyList: [{
          'id': 1 /*主键*/,
          'mailId': 1 /*家长信箱Id*/,
          'replierId': 1 /*回复人Id*/,
          'content': '这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上一个vue实例被生成后还要绑定到某个html元素上一' +
          '个vue实例被生成后还要绑定到某个html元素上一个vue实例被生成后还要绑定到某个html元素上一个vue实例被生成后还要绑定到某个html元素上，之后还要' /*回复内容*/,
          'createdTime': '2018-12-13 09:07:20'
        }, {
          'id': 2 /*主键*/,
          'mailId': 1 /*家长信箱Id*/,
          'replierId': 1 /*回复人Id*/,
          'content': '这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要' /*回复内容*/,
          'createdTime': '2018-12-13 09:07:20'
        }, {
          'id': 3 /*主键*/,
          'mailId': 1 /*家长信箱Id*/,
          'replierId': 1 /*回复人Id*/,
          'content': '这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要' /*回复内容*/,
          'createdTime': '2018-12-13 09:07:20'
        }, {
          'id': 4 /*主键*/,
          'mailId': 1 /*家长信箱Id*/,
          'replierId': 1 /*回复人Id*/,
          'content': '这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要' /*回复内容*/,
          'createdTime': '2018-12-13 09:07:20'
        }],
        reply_loading: false,
        finished: true,
        showMask: false,
        article: {}
      }
    },
    async created () {
      this.loading = true
      this.article = this.$api.teacher.getPatriarchMailbox({'id': this.id})
      // this.replyList = this.$api.teacher.queryPatriarchMailboxReplyPage(this.query)
      this.loading = false
    },
    methods: {
      onLoad () {},
      handelReplyClick () {
        this.showReply = true
        this.showMask = true
      },
      async onReply () {
        if (this.replyContent != null && this.replyContent.length > 0) {
          await this.$api.teacher.addPatriarchMailboxReply(this.replyQuery)
          this.$toast.success('回复成功')
          this.handleMaskClick()
        } else {
          this.$toast.fail('回复内容为空')
        }
      },
      handleMaskClick () {
        this.showMask = false
        this.showReply = false
      }
    }
  }
</script>

<style scoped lang="sass">

  .mailbox-detail
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
    &-reply-additional
      z-index: 4
      position: absolute
      bottom: 10px
      left: 0
      right: 0
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
        line-height: 1.5
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
          @include text-overflow-line(3)
</style>
