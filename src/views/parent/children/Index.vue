<template>
  <div>
    <no-data v-show="!loading && !childrenList.length"/>
    <my-loading v-model="loading"/>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        childrenList: [],
        loading: false
      }
    },
    async created () {
      this.loading = true
      this.childrenList = await this.$api.parent.queryStudentList({})
      this.loading = false
      if (this.childrenList && this.childrenList.length > 0) {
        if (this.childrenList.length === 1) {
          this.goToDetail(this.childrenList[0].id)
        } else {
          this.goToSetting()
        }
      }
    },
    methods: {
      goToDetail (id) {
        this.$router.replace(`/parent/children/detail?id=${id}`)
      },
      goToSetting () {
        this.$router.replace(`/parent/children/setting`)
      }
    }
  }
</script>

<style lang="sass" scoped>
</style>
