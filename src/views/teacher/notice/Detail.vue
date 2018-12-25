<template>
  <div class="notice-detail">
    <my-loading v-model="loading"/>
    <div v-show="!loading">
      <p class="notice-detail__title">
        {{article.title}}
      </p>
      <p class="notice-detail__time">
        {{article.createdTime | ymd}}
      </p>
      <hr>
      <div class="notice-detail__content" v-html="article.content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        id: this.$route.query.id,
        article: {}
      }
    },
    async created () {
      this.loading = true
      this.article = await this.$api.teacher.getNotice({'id': this.id})
      this.loading = false
    }
  }
</script>

<style lang="sass" scoped>
  .notice-detail
    padding: 14px
    background: $white
    overflow-x: scroll
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
        line-height: 18px
      /deep/ table
        border: 1px solid #cccccc
        margin-right: 14px
        tr
          padding: 4px
        td
          min-width: 25%
          border: 1px solid #cccccc
          text-align: center
          padding: 4px
</style>
