<template>
  <div class="bulletin">
    <div class="bulletin-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <no-data v-show=" !loading && !articleList.length"/>

    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <article class="bulletin-article"
               v-for="article in articleList"
               :key="article.noticeId">
        <div class="bulletin-article__header"
             @click="goDetail(article.noticeId,article.noticeType)">
          <van-tag class="bulletin-article__tag"
                   plain
                   type="primary"
                   v-if="article.noticeType === 'ACTIVITY'">活动
          </van-tag>
          <span class="bulletin-article__unread" v-if="article.isRead === 'NO'"></span>
          <span class="bulletin-article__top" v-if="article.isTop === 'YES'"></span>
          <span class="bulletin-article__title">
          {{article.title}}
          </span>
        </div>

        <div class="bulletin-article__body">
          <!--<p class="bulletin-article__summary">-->
          {{article.content}}
          <!--</p>-->
        </div>

        <div class="bulletin-article__footer">
          <span class="bulletin-article__time">{{article.issueTime | ymd}}</span>
          <span class="bulletin-article__announcer">{{article.issueMan}}</span>
          <span class="bulletin-article__type">{{$enums.NoticeType.getName(article.noticeType)}}</span>
        </div>
      </article>
    </van-list>
  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'
  import config from '@/config'

  export default {
    components: {
      Search
    },
    computed: {
      query () {
        return {
          noticeTarget: 'PARENT',
          keywords: this.keywords,
          noticeType: null,
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      }
    },
    data () {
      return {
        keywords: null,
        pageNo: 1,
        articleList: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      async initData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.articleList = []
          this.pageNo = 1
        }
        let data = await this.$api.parent.queryNoticeInfoList(this.query)

        if (resetList) {
          this.articleList = data.list
        } else {
          this.articleList = this.articleList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.pageNo++
      },
      onSearch () {
        this.initData(true)
      },
      onLoad () {
        this.initData()
      },
      goDetail (id, type) {
        console.log(id)
        this.$router.push(`bulletin/${id}/${type}`)
      }
    }
  }
</script>

<style lang="sass">
  .bulletin
    padding-bottom: $default-gap
    &-search
      padding: $default-gap
      background: $white
    &-article
      margin: $default-gap $default-gap 0
      padding: $default-gap - 5px
      background: $white
      border-radius: 10px
      box-shadow: $default-shadow
      &__header
        position: relative
        padding-bottom: $default-gap - 5px
        border-bottom: 1.5px dashed $gray-light
        line-height: 1
        @include hor-start-center
      &__title
        font-weight: bold
        font-size: $font-large
        @include text-overflow
      &__tag
        white-space: nowrap
        border-radius: 5px
        margin-right: 10px
        &.van-tag:after
          border-radius: 20px
      &__unread
        @include circle(7px)
        margin-right: 10px
        background: $orange
      &__top
        display: block
        position: absolute
        top: 0
        right: 0
        width: 21px
        height: 20px
        background: url("~IMAGE/pin.png") no-repeat center / cover
      &__body
        padding: $default-gap 0
        font-size: $font-small
        color: $gray
      &__footer
        padding: 0
        font-size: $font-small
        color: $gray
        @include hor-start-center
      &__time
        flex: 1
      &__announcer
        flex: 2
      &__type
        flex: 1
        text-align: right
</style>
