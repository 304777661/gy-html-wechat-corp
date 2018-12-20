<template>
  <div class="bulletin-detail">
    <my-loading v-model="loading"/>
    <div v-show="!loading">
      <p class="bulletin-detail__title">
        {{article.title}}
      </p>
      <p class="bulletin-detail__time">
        {{article.createdTime | ymd}}
      </p>
      <hr>
      <div class="bulletin-detail__content">
        {{article.content}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        id: this.$route.params.id,
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
  .bulletin-detail
    padding: 14px
    background: $white
    height: 100vh
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
</style>
