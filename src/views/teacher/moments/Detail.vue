<template>
  <div class="moments-detail">
    <moments-item :moment="moment"/>

    <p class="moments-detail__total">全部评论({{moment.commentTotal}})</p>

    <!--{{commentList}}-->
    <div class="comment text-center gray" v-if="!loading && !commentList.length">暂无评论</div>
    <van-list :loading="loading"
              :finished="finished"
              @load="onLoad">
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

    <div class="leave-comment">
      <textarea class="leave-comment__textarea" v-model="commentText"/>
      <van-button plain size="small" @click="doLeaveComment">发送</van-button>
    </div>
  </div>
</template>

<script>
  import MomentsItem from 'COMPONENT/MomentsItem'
  import config from '@/config'

  export default {
    components: {
      MomentsItem
    },
    data () {
      const {id} = this.$route.params
      return {
        id,
        moment: {},
        query: {
          mienId: id,
          pageNo: 1,
          pageSize: config.pageSize
        },
        commentList: [],
        loading: false,
        finished: false,
        allLoading: false,
        commentText: null
      }
    },
    async created () {
      this.moment = await this.$api.teacher.getMienInfo(this.id)
      // this.allLoading = true
      // this.loading = true
      // Promise.all([this.$api.teacher.getMienInfo(this.id), this.$api.teacher.queryMienCommentPage(this.query)]).then(res => {
      //   this.moment = res[0]
      //   this.commentList = res[1].list
      //   this.loading = false
      //   this.query.pageNo++
      //   this.allLoading = false
      // })
      // this.moment = await
    },
    methods: {
      async onLoad (resetList = false) {
        if (resetList) {
          this.query.pageNo = 1
        }
        this.loading = true
        let data = await this.$api.teacher.queryMienCommentPage(this.query)
        if (resetList) {
          this.commentList = data.list
          document.documentElement.scrollTop = 0
        } else {
          this.commentList = this.commentList.concat(data.list)
        }
        this.loading = false
        this.finished = !data.hasNextPage
        this.query.pageNo++
      },
      async doLeaveComment () {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '留言中...'
        })
        await this.$api.teacher.addMienComment({
          mienId: this.id,
          commentType: 'COMMENT',
          content: this.commentText
        })
        this.commentText = null
        this.$toast.clear()
        this.$toast.success('留言成功')
        this.onLoad(true)
      }
    }

  }
</script>

<style lang="sass">
  $leave-comment-height: 45px
  .moments-detail
    padding-bottom: $leave-comment-height
    &__total
      margin: $default-gap auto
      padding-left: $default-gap
    .comment
      width: 100%
      padding: $default-gap
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
    .leave-comment
      position: fixed
      bottom: 0
      left: 0
      width: 100%
      padding: 5px $default-gap
      height: $leave-comment-height
      background: $gray-light
      @include hor-between-center
      &__textarea
        width: 80%
        height: $leave-comment-height - 10px
        padding: 0
        margin: 0
        overflow: hidden
        line-height: 1.2
        background: $gray-light
        border-bottom: 1px solid #b3b3b3
        resize: none
      .van-button
        color: #b3b3b3
        border-color: #b3b3b3
        background: transparent
        // height: 25px
</style>
