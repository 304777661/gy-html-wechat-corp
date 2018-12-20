<template>
  <div class="mailbox-detail">
    <my-loading v-model="loading"/>
    <div v-show="!loading">
      <div class="mailbox-detail__title">
        <span>{{article.title}}</span>
        <!--<span v-show="$route.params.type === 'ACTIVITY'" class="ongoing">{{article.isEnd?'已结束':'进行中'}}</span>-->
      </div>

      <div class="mailbox-detail__infoBar">
        <span class="mailbox-detail__time">{{article.createdTime | ymd}}</span>
      </div>

      <div class="mailbox-detail__content">
        {{article.content}}
      </div>
      <div class="mailbox-detail__image">
        <picture-map :pictures="article.imageList"/>
      </div>

      <p class="mailbox-detail__total">全部回复({{commentTotal}})</p>

      <!--{{commentList}}-->
      <div class="comment text-center gray" v-if="!commentLoading && !commentList.length">暂无评论</div>
      <van-list :loading="commentLoading"
                :finished="finished"
                @load="initCommentList">
        <div class="comment"
             v-for="(comment, idx) in commentList"
             :key="idx">
          <div class="comment-left">
            <img :src="comment.avatar | defaultAvatar" class="comment-left__avatar">
          </div>
          <div class="comment-right">
            <p class="comment-right__name">{{comment.userName}}</p>
            <p class="comment-right__comment">{{comment.content}}</p>
            <p class="comment-right__time">{{comment.createdTime | ymd}}</p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: true,
        article: {},
        commentList: [],
        commentTotal: 0,
        commentLoading: false,
        finished: false,
        query: {
          rectorMailId: this.$route.params.id,
          pageNo: 1,
          pageSize: this.$config.pageSize
        }
      }
    },
    async created () {
      this.loading = true
      this.article = await this.$api.parent.getRectorMail({'rectorMailId': this.$route.params.id})
      this.loading = false

      this.initCommentList()
    },
    methods: {
      async initCommentList () {
        this.commentLoading = true
        let commentData = await this.$api.parent.queryRectorReplyPage(this.query)
        this.commentList = this.commentList.concat(commentData.list)
        this.commentTotal = commentData.total
        this.commentLoading = false
        this.finished = !commentData.hasNextPage
        this.query.pageNo++
      }
    }
  }
</script>

<style lang="sass">
  .mailbox-detail
    padding: 20px
    background: white
    &__title
      font-size: $font-large
      font-weight: bold
      @include hor-between-center
      .ongoing
        font-weight: normal
        font-size: $font-small
        color: $orange
    &__infoBar
      margin: 10px 0
      color: $gray
      font-size: $font-small
      @include hor-between-center
    &__content
      line-height: 1.5
    &__image
      margin-top: $default-gap - 5px

    &__total
      margin: $default-gap auto
    // padding-left: $default-gap
    .comment
      width: 100%
      // margin-top: $default-gap
      padding: $default-gap 0
      background: #fff
      border-bottom: 1px solid $gray-light
      @include clearfix
      &-left
        float: left
        &__avatar
          @include circle(45px)
      &-right
        float: left
        width: calc(100% - 60px)
        margin-left: $default-gap
        &__name, &__time
          font-size: $font-small
          color: $gray
        &__comment
          margin: 10px auto
          white-space: pre-wrap
          word-wrap: break-word
          word-break: break-all
</style>
