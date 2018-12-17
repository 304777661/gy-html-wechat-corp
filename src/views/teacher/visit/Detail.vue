<template>
  <div class="visit-detail">
    <van-cell-group>
      <van-cell title="学生" :value="visit.studentName"/>
      <van-cell title="家访时间" :value="visit.visitDate | ymd"/>
      <van-cell title="家访对象" :value="visit.visitObject"/>
    </van-cell-group>

    <van-field class="visit-detail-title" label="家访内容" disabled/>
    <van-field v-model="visit.visitContent"
               type="textarea"
               disabled
               readonly
               input-align="left"
               :autosize="textAreaSize"
               :value="visit.visitContent"
               placeholder=""/>
    <van-field class="visit-detail-title" label="照片" disabled/>

    <picture-map :pictures="visit.attachmentList" :upload="false"/>
  </div>
</template>

<script>
  import PictureMap from 'COMPONENT/PictureMap'

  export default {
    name: 'Detail',
    data () {
      return {
        loading: false,
        finished: false,
        textAreaSize: {
          minHeight: 200
        },
        visit: {}
      }
    },
    methods: {
      onLoad () {}
    },
    async created () {
      this.loading = true
      this.visit = await this.$api.teacher.getHomeVisitingWX({'id': 1})
      this.loading = false
      // this.initCommentList()
    },
    mounted: {},

  }
</script>

<style scoped lang="sass">

  .visit-detail
    /deep/ .van-cell__title
      color: #9B9B9B
      font-size: 16px
    /deep/ .van-cell__value
      color: $black
      font-size: 16px
    &-title
      color: #9B9B9B
      margin-top: 10px

</style>
