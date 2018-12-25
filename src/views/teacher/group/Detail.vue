<template>
  <div class="team-detail">
    <my-loading v-model="loading"></my-loading>
    <notice-detail :article="article"></notice-detail>
  </div>
</template>

<script>
  export default {
    name: 'GroupDetail',
    data () {
      return {
        id: this.$route.query.id,
        loading: false,
        article: {}
      }
    },
    methods: {},
    async created () {
      this.loading = true
      this.article = await this.$api.teacher.getNotice({'id': this.id})
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">

</style>
