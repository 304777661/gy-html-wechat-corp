<template>
  <div class="notice-detail">
    <my-loading v-model="loading"></my-loading>
    <notice-detail :article="article"></notice-detail>
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

</style>
