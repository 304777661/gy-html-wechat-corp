<template>
  <div class="bulletin-detail">
    <my-loading v-model="loading"/>
    <div v-show="!loading" class="min-height">
      <div class="bulletin-detail__title">
        <span>{{article.title}}</span>
        <span v-show="$route.params.type === 'ACTIVITY'" class="ongoing">{{article.isEnd?'已结束':'进行中'}}</span>
      </div>

      <div class="bulletin-detail__infoBar">
        <span class="bulletin-detail__time">{{article.issueTime | ymd}}</span>
        <span class="bulletin-detail__announcer">{{article.issueMan}}</span>
        <span v-show="$route.params.type === 'ACTIVITY'" class="bulletin-detail__read">{{article.applyCount}}人已报名</span>
      </div>

      <div class="bulletin-detail__content">
        {{article.content}}
      </div>
    </div>

    <div class="bulletin-detail__sign">
      <p v-show="!article.isApply">您已报名成功！</p>
      <span class="btn" v-show="article.isEnd" @click="show = true">{{article.isApply?'取消报名':'我要报名'}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: true,
        article: {}
      }
    },
    async created () {
      if (this.$route.params.type === 'ACTIVITY') {
        this.article = await this.$api.parent.getActivityInfoDetail({'noticeId': this.$route.params.id})
      } else {
        this.article = await this.$api.parent.getNoticeInfoDetail({'noticeId': this.$route.params.id})
      }

      this.loading = false
    }
  }
</script>

<style lang="sass">
  .bulletin-detail
    //padding: 20px
    $sign-height: 140px
    .min-height
      padding: 20px
      min-height: calc(100vh - #{$sign-height})
      background: #fff
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
    &__time, &__read
      flex: 1
    &__read
      text-align: right
    &__announcer
      flex: 2
    &__content
      line-height: 1.5
    &__sign
      width: 100%
      height: $sign-height
      //position: absolute
      //bottom: $default-gap * 2
      // text-align: center
      @include ver-center-center
      p
        color: $gray
        font-size: $font-normal
        margin-bottom: 8px
      .btn
        $btn-width: 200px
        $btn-height: 35px
        width: $btn-width
        height: $btn-height
        line-height: $btn-height
        border-radius: $btn-height / 2
        border: 1px solid $blue
        color: $blue
        font-size: $font-large
        padding: 0 $default-gap * 3
        text-align: center
</style>
