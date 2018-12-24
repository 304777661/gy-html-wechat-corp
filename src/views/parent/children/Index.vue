<template>
  <div>
    <no-data v-show="!loading && !childrenList.length"/>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        childrenList: []
      }
    },
    async created () {
      this.childrenList = await this.$api.parent.queryStudentList({})
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
        this.$router.replace(`/parent/children/detail/${id}`)
      },
      goToSetting () {
        this.$router.replace(`/parent/children/setting`)
      }
    }
  }
</script>

<style lang="sass" scoped>
</style>
