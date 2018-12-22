<template>
  <div class="mailbox">
    <no-data v-show="!loading && !articleList.length"/>
    <my-loading v-model="initLoading"/>
    <div class="mailbox-list" v-if="articleList && articleList.length>0">
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
            {{item.content.length > 60? item.content.substr(0,60)+'......' : item.content}}
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
    <my-button :content="'新增'" @btnClick="handleAddClick"></my-button>
  </div>

</template>

<script>
  import config from '@/config'

  export default {
    data () {
      return {
        pageNo: 1,
        loading: false,
        initLoading: false,
        finished: false,
        articleList: [],
      }
    },
    methods: {
      getQuery () {
        return {
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      },
      async loadData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.articleList = []
          this.pageNo = 1
        }
        let data = await this.$api.parent.queryPatriarchMailPage(this.getQuery())
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
        this.$router.push(`/parent/mailbox/detail/${id}`)
      },
      handleAddClick () {
        this.$router.push(`/parent/mailbox/add`)
      }
    },
    async activated () {
      this.initLoading = true
      await this.loadData(true)
      this.initLoading = false
    }
  }
</script>

<style lang="sass">
  .mailbox
    &-list
      height: calc(100vh - 70px)
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
          font-size: 16px
          line-height: 21px
          color: $black
          @include text-overflow
          font-weight: bold
        &__tag
          margin-left: 10px
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
