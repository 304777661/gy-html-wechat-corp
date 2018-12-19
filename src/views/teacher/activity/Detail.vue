<template>
  <div class="activity-detail">
    <van-cell-group>
      <van-cell title="活动名称" :value="activity.activityLocation"></van-cell>
      <van-cell title="活动时间" :value="activity.activityDate | ymd"></van-cell>
      <van-cell title="活动地点" :value="activity.activityLocation"></van-cell>
      <van-cell title="举办单位" :value="activity.activitySponsor"></van-cell>
    </van-cell-group>
    <van-field class="visit-detail-title" label="活动内容" disabled></van-field>
    <van-field v-model="activity.activityContent"
               type="textarea"
               disabled
               readonly
               input-align="left"
               :autosize="textAreaSize"
               :value="activity.activityContent"
               placeholder=""></van-field>

    <van-cell title="活动照片"></van-cell>
    <div class="activity-detail-picture">
      <picture-map :upload="false" :pictures="activity.imageList"></picture-map>
    </div>
    <van-cell title="参与人员"></van-cell>

    <div class="activity-detail-member van-hairline--top">
      <div class="activity-detail-member-person" v-for="(item,index) in activity.teacherList" :key="index">
        <img :src="item.avatar | defaultAvatar">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ActivityDetail',
    data () {
      let id = this.$route.params.id
      return {
        id,
        activity: {
          'id': 1 /*主键*/,
          'teachGroupId': 1 /*教研组Id*/,
          'teachGroupName': 'teachGroupName' /*教研组名称*/,
          'gradeId': 1 /*年级Id*/,
          'activityType': 'ACTIVITY_PREPARE_LESSONS' /*活动类型1教研活动2备课活动：ALL|ACTIVITY_TEACH_GROUP|ACTIVITY_PREPARE_LESSONS*/,
          'activityName': 'activityName' /*活动名称*/,
          'activityDate': '2018-12-18 10:55:26' /*活动日期*/,
          'activityLocation': 'activityLocation' /*活动地点*/,
          'activitySponsor': 'activitySponsor' /*举办单位*/,
          'activityContent': 'activityContent' /*活动内容*/,
          'teacherList': [
            {
              'userId': 1 /*用户Id*/,
              'name': 'name' /*姓名*/,
              'avatar': null /*头像*/
            }
          ],
          'attachmentList': [
            {
              'fileName': 'fileName' /*文件名*/,
              'fileUrl': 'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg' /*文件路径*/
            }, {
              'fileName': 'fileName' /*文件名*/,
              'fileUrl': 'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg' /*文件路径*/
            },
            {
              'fileName': 'fileName' /*文件名*/,
              'fileUrl': 'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg' /*文件路径*/
            }, {
              'fileName': 'fileName' /*文件名*/,
              'fileUrl': 'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg' /*文件路径*/
            }, {
              'fileName': 'fileName' /*文件名*/,
              'fileUrl': 'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg' /*文件路径*/
            }, {
              'fileName': 'fileName' /*文件名*/,
              'fileUrl': 'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg' /*文件路径*/
            }, {
              'fileName': 'fileName' /*文件名*/,
              'fileUrl': 'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg' /*文件路径*/
            },
          ],
          imageList: [
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
            'http://www.wndhw.com/diannao/xuetang/images/xt007t01.jpg',
          ]
        }
      }
    },
    async created () {
      this.loading = true
      this.activity = await this.$api.teacher.getTeachGroupActivity({'id': this.id})
      this.activity.imageList = []
      if (this.activity.attachmentList && this.activity.attachmentList.length > 0) {
        this.activity.attachmentList.map(item => {
          this.activity.imageList.push(item.fileUrl)
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
