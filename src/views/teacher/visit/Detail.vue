<template>
  <div class="visit-detail">
    <my-loading v-model="loading"/>
    <van-cell-group>
      <van-cell title="学生" :value="visit.studentName"></van-cell>
      <van-cell title="家访时间" :value="visit.visitDate | ymd"></van-cell>
      <van-cell title="家访对象" :value="visit.visitObject"></van-cell>
    </van-cell-group>

    <van-field class="visit-detail-title" label="家访内容" disabled></van-field>
    <van-field v-model="visit.visitContent"
               type="textarea"
               disabled
               readonly
               input-align="left"
               :autosize="textAreaSize"
               :value="visit.visitContent"
               placeholder="">
    </van-field>
    <div v-show="imageList && imageList.length >0">
      <van-cell title="照片" class="visit-detail-title"></van-cell>
      <div class="visit-detail-picture">
        <picture-map :pictures="imageList" :upload="false"/>
      </div>
    </div>
  </div>
</template>

<script>
  import PictureMap from 'COMPONENT/PictureMap'

  export default {
    name: 'VisitDetail',
    data () {
      return {
        loading: false,
        textAreaSize: {
          minHeight: 200
        },
        visit: {},
        id: this.$route.query.id,
        imageList: []
      }
    },
    async created () {
      this.loading = true
      this.visit = await this.$api.teacher.getHomeVisitingWX({'id': this.id})
      if (this.visit && this.visit.attachmentList && this.visit.attachmentList.length > 0) {
        for (let i = 0; i < this.visit.attachmentList.length; i++) {
          this.imageList.push(this.visit.attachmentList[i].fileUrl)
        }
      }
      this.loading = false
    },
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
    &-picture
      background: $white
      padding: 10px 14px

</style>
