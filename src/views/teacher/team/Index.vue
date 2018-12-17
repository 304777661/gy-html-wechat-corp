<template>

  <div class="team">

    <div class="team-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <no-data v-show=" !loading && !articleList.length"/>

    <my-tabs :tabs="tabs" @tabChanged="handleTabChange" :swipeable="true"/>

  </div>
</template>

<script>
  import MyTabs from 'COMPONENT/MyTabs'

  export default {
    components: {
      MyTabs
    },
    name: 'Index',
    data () {
      return {
        keywords: null,
        pageNo: 1,
        articleList: [],
        loading: false,
        finished: false,
        curTab: 0,
        tabs: [{
          label: '语文'
        }, {
          label: '语文'
        }, {
          label: '语文'
        }, {
          label: '语文'
        }, {
          label: '语文'
        }],
      }
    },
    methods: {
      onSearch () {
      },
      handleTabChange () {

      }
    }
  }
</script>

<style scoped lang="sass">

  .team
    padding-bottom: $default-gap
    &-search
      padding: $default-gap
      background: $white
      margin-bottom: 10px


</style>
