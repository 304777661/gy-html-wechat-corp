<template>
  <div class="team-detail">
    <my-loading v-model="loading"/>
    <div v-show="!loading">
      <p class="team-detail__title">{{activity.title}}</p>
      <p class="team-detail__time">{{activity.createdTime | ymd}}</p>
      <hr>
      <div class="team-detail__content" v-html="activity.content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data () {
      return {
        id: this.$route.query.id,
        loading: false,
        activity: {}
      }
    },
    methods: {},
    async created () {
      this.loading = true
      this.activity = await this.$api.teacher.getNotice({'id': this.id})
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .team-detail
    background: $white
    padding: 10px 14px
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
      /deep/ img
        width: 100%
        max-width: 100%
      /deep/ p
        line-height: 24px
      /deep/ table
        border: 1px solid #cccccc
        margin-right: 8px
        tr
          padding: 4px
        td
          min-width: 25%
          border: 1px solid #cccccc
          text-align: center
          padding: 4px
</style>
