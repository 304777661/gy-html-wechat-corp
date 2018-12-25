<template>
  <div class="mailbox">
    <div class="mailbox-list">
      <no-data v-show=" !loading && !articleList.length"/>
      <div v-if="articleList.length">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad">
          <div class="mailbox-item"
               v-for="item in articleList"
               :key="item.id"
               @click="goDetail(item.id)">
            <div class="mailbox-item-header">
              <span class="mailbox-item-header__title">{{item.title}}</span>
              <van-tag class="mailbox-item-header__tag" color="#24A197" v-show="item.isAnonymous === 'YES'">匿名</van-tag>
            </div>

            <div class="mailbox-item-body">
              {{item.content | summary(42)}}
            </div>
            <div class="van-hairline--bottom"></div>
            <div class="mailbox-item-footer">
              <span class="mailbox-item-footer__date">{{item.createdTime | ymd}}</span>
              <span class="mailbox-item-footer__line" v-show="item.createdTime">|</span>
              <span class="mailbox-item-footer__reply">{{item.replyNum || '0'}}条回复</span>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>

</template>

<script>
  import config from '@/config'

  export default {
    data () {
      return {
        loading: false,
        finished: false,
        pageNo: 1,
        articleList: [],
      }
    },
    computed: {
      query () {
        return {
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      }
    },
    methods: {
      async loadData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.articleList = []
          this.pageNo = 1
        }
        let data = await this.$api.teacher.queryPatriarchMailPage(this.query)
        if (resetList) {
          this.articleList = data.list
        } else {
          this.articleList = this.articleList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.pageNo++
      },
      onLoad () {
        this.loadData()
      },
      goDetail (id) {
        this.$router.push(`/teacher/mailbox/detail?id=${id}`)
      },
    },
    async created () {
      this.loadData(true)
    }
  }
</script>

<style lang="sass">
  .mailbox
    &-item
      padding: 8px 14px 8px
      background: $white
      border-bottom: 1px solid $gray-light
      &-header
        position: relative
        line-height: 1
        @include hor-start-center
        &__title
          flex: 1
          font-size: 17px
          line-height: 21px
          color: $black
          font-weight: bold
          @include text-overflow
        &__tag
          background: #24A197
          padding: 2px 6px
          font-size: 11px
          margin-left: 10px
          margin-top: 2px
      &-body
        padding: 8px 0 8px
        font-size: 14px
        color: $gray
        line-height: 1.5
      &-footer
        font-size: 13px
        line-height: 18px
        color: #ccc
        margin-top: 8px
        &__line
          margin: 0 8px

</style>
