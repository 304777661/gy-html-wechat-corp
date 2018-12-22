<template>
  <div class="activity-detail">
    <my-loading v-model="loading"></my-loading>
    <van-cell-group>
      <van-cell title="活动名称" :value="activity.activityLocation || '--'"></van-cell>
      <van-cell title="活动时间" :value="activity.activityDate | ymd"></van-cell>
      <van-cell title="活动地点" :value="activity.activityLocation || '--'"></van-cell>
      <van-cell title="举办单位" :value="activity.activitySponsor || '--'"></van-cell>
    </van-cell-group>
    <van-cell title="活动内容" class="activity-detail-sticky"></van-cell>
    <van-field v-model="activity.activityContent"
               type="textarea"
               disabled
               readonly
               input-align="left"
               :autosize="textAreaSize"
               :value="activity.activityContent"
               placeholder="暂无内容"></van-field>

    <van-cell title="活动照片" class="activity-detail-sticky"></van-cell>
    <div class="activity-detail-picture">
      <picture-map :upload="false" :pictures="imageList"></picture-map>
    </div>
    <van-cell title="参与人员" class="activity-detail-sticky"></van-cell>
    <select-member :canAdd="false" :canDelete="false" :memberList="activity.teacherList"></select-member>
  </div>
</template>

<script>
  export default {
    name: 'ActivityDetail',
    data () {
      return {
        id: this.$route.params.id,
        loading: false,
        imageList: [],
        activity: {}
      }
    },
    async created () {
      this.loading = true
      this.activity = await this.$api.teacher.getTeachGroupActivity({'id': this.id})
      if (this.activity.attachmentList && this.activity.attachmentList.length > 0) {
        this.activity.attachmentList.map(item => {
          this.imageList.push(item.fileUrl)
        })
      }
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .activity-detail
    &-picture
      padding: 10px 14px
      background: $white
    &-sticky
      margin-top: 10px
    &-member
      display: flex
      flex-direction: row
      flex-wrap: wrap
      padding: 9px
      background: white
      &-person
        margin: 4px
        img
          @include circle(40px)
        p
          font-size: 14px
          text-align: center
          line-height: 18px
          margin-top: 4px
</style>
