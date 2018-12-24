<template>
  <div class="notice-detail">
    <my-loading v-model="loading"/>
    <div v-show="!loading">
      <div class="notice-detail-header">
        <div class="notice-detail-header-title">
          <p class="notice-detail-header-title__name">{{article.title}}</p>
          <div class="notice-detail-header-title__tag" v-if="article.noticeType === 'ACTIVITY'">
            <van-tag v-if="article.isParticipated === 'YES'" color="#24A197">已参与
            </van-tag>
            <van-tag v-else-if="article.isFinish === 'YES'" color="#9B9B9B" plain>已结束
            </van-tag>
            <van-tag v-else color="#24A197" plain>进行中
            </van-tag>
          </div>
        </div>
        <div class="notice-detail-header__additional">
          <span><span v-if="article.noticeType === 'ACTIVITY'">结束时间：</span>{{article.endDate | ymdhm}}</span>
          <span v-if=" article.noticeType=== 'ACTIVITY'">{{article.participationNum}}人已参与</span>
        </div>
      </div>
      <hr>
      <div class="notice-detail__content">
        {{article.content}}
      </div>
    </div>
    <hr>
    <picture-map :upload="article.isParticipated === 'NO' && article.isFinish === 'NO'"
                 :pictures="imageList"></picture-map>
    <my-button v-if="article.isParticipated === 'YES'" :content="'取消报名'" @btnClick="handleCancelClick"></my-button>
    <my-button v-else-if="article.isParticipated === 'NO' && article.isFinish==='NO'" :content="'我要报名'"
               @btnClick="handleApplyClick"></my-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        imageList: [],
        article: {
          'id': 1 /*主键*/,
          'publisherId': 1 /*发布用户Id*/,
          'noticeType': 'TEACH_GROUP' /*通知类型：ALL|NOTICE|SCHOOL_RULE|PATRIARCH_NOTICE|ACTIVITY|SUBJECT_STUDY|TEACHER_TRAIN|OLYMPICS_TRAIN|TEACH_GROUP*/,
          'title': 'title' /*标题*/,
          'content': 'content' /*内容*/,
          'bannerImage': 'bannerImage' /*封面图片 - 类型为教研团队时有值*/,
          'teachGroupId': 1 /*教研组Id - 类型为教研团队时有值*/,
          'teachGroupName': 'teachGroupName' /*教研组名称 - 类型为教研团队时有值*/,
          'endDate': '2018-12-22 18:17:25' /*截止日期*/,
          'isAttachment': 'NO' /*是否需要附件：ALL|YES|NO*/,
          'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
          'isTop': 'NO' /*是否置顶：ALL|YES|NO*/,
          'topTime': '2018-12-22 18:17:25' /*置顶时间*/,
          'createdTime': '2018-12-22 18:17:25' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
          'isFinish': 'NO' /*是否已经结束 - 类型为活动时有值：ALL|YES|NO*/,
          'isParticipated': 'NO' /*是否已经参与 - 类型为活动时有值：ALL|YES|NO*/,
          'readNum': 1 /*阅读人数*/,
          'participationNum': 1 /*参与人数 - 类型为活动时有值*/,
          'scopeList': [
            {
              'id': 1 /*主键*/,
              'noticeId': 1 /*公告通知Id*/,
              'scopeType': 'ORGANIZATION' /*范围类型：ALL|ORGANIZATION*/,
              'businessId': 1 /*业务Id*/,
              'scopeName': 'scopeName' /*范围名称*/
            }
          ],
          'attachmentList': [
            {
              'fileName': 'fileName' /*文件名*/,
              'fileUrl': 'fileUrl' /*文件路径*/
            }
          ]
        }
      }
    },
    methods: {
      handleCancelClick () {
        // 取消报名
      },
      async handleApplyClick () {
        // 我要报名
        await this.$api.parent.participationNotice(this.getQuery())
      },
      getQuery () {
        // 附件
        let attachments = []
        if (this.imageList && this.imageList.length > 0) {
          this.imageList.map(item => {
            attachments.push({
              fileName: item.substr(item.lastIndexOf('/') + 1).toLowerCase(),
              fileUrl: item
            })
          })
        }
        return {
          id: this.article.id,
          attachmentList: attachments
        }
      }
    },
    async created () {
      this.loading = true
      this.article = await this.$api.parent.getNotice({'id': this.$route.params.id})
      if (this.article && this.article.attachmentList && this.article.attachmentList.length > 0) {
        for (let i = 0; i < this.article.attachmentList.length; i++) {
          this.imageList.push(this.article.attachmentList[i].fileUrl)
        }
      }
      this.loading = false
    }
  }
</script>

<style lang="sass">
  .notice-detail
    //padding: 20px
    background: $white
    height: calc(100vh - #{$default-gap})
    padding: 10px 14px 14px $default-gap
    &-header
      &-title
        @include hor-between-center
        &__name
          flex: 1
          @include text-overflow
          color: $black
          font-size: 17px
          line-height: 24px
          font-weight: bold
        &__tag
          .van-tag
          padding: 3px 0
      &__additional
        margin-top: 8px
        @include hor-between-center
        color: #cccccc
        font-size: 13px
        line-height: 18px
    &__content
      line-height: 1.5
    .picture-map
      margin-top: 10px

</style>
