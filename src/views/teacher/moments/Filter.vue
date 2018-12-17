<template>
  <div>
    <no-data v-show="!loading && !momentList.length"/>
    <van-list :loading="loading"
              :finished="finished"
              @load="initData">
      <moments-item v-for="(moment, idx) in momentList"
                    :key="idx"
                    :moment="moment"/>
    </van-list>
  </div>
</template>

<script>
  import MomentsItem from 'COMPONENT/MomentsItem'
  import config from '@/config'

  export default {
    components: {
      MomentsItem
    },
    data () {
      return {
        query: {
          pageNo: 1,
          pageSize: config.pageSize,
          mienType: 'SCHOOL',
          commentType: null
        },
        momentList: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      async initData () {
        this.loading = true
        let data = null
        let type = this.$route.query.type
        switch (type) {
          case 'PUBLISH':
            data = await this.$api.teacher.queryMyPublishMienInfoPage(this.query)
            break
          case 'FAVORITE':
          case 'COMMENT':
          case 'PRAISE':
            this.query.commentType = type
            data = await this.$api.teacher.queryMyCommentMienInfoPage(this.query)
        }
        this.momentList = this.momentList.concat(data.list)
        this.loading = false
        this.finished = !data.hasNextPage
        this.query.pageNo++
      }
    }
  }
</script>

<style lang="sass">

</style>
