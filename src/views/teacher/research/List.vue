<template>
  <div class="research">
    <my-tabs :tabs="tabs" @tabChanged="handleTabChange"></my-tabs>
    <div class="research-list" v-if="articleList.length">
      <no-data v-show="!loading && !articleList.length"/>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="research-list-item van-hairline--bottom"
             v-for="(item,index) in articleList"
             :key="index"
             @click="handleItemClick(item.id)">
          <div class="research-list-item__header">
            <p>{{item.title}}</p>
          </div>
          <div class="research-list-item__content">
            {{item.content.length > 60? item.content.substr(0,60)+'......' : item.content}}
          </div>
          <div class="research-list-item__additional">
            <p>{{item.createdTime | ymd}}</p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>

  import config from '@/config'

  export default {
    name: 'List',
    data () {
      return {
        loading: false,
        finished: false,
        articleList: [{
          'id': 1 /*主键*/,
          'publisherId': 1 /*发布用户Id*/,
          'noticeType': 'TEACH_GROUP' /*通知类型：ALL|NOTICE|SCHOOL_RULE|PATRIARCH_NOTICE|ACTIVITY|SUBJECT_STUDY|TEACHER_TRAIN|OLYMPICS_TRAIN|TEACH_GROUP*/,
          'title': '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题' /*标题*/,
          'content': '我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容' /*内容*/,
          'bannerImage': 'bannerImage' /*封面图片 - 类型为教研团队时有值*/,
          'teachGroupId': 1 /*教研组Id - 类型为教研团队时有值*/,
          'teachGroupName': 'teachGroupName' /*教研组名称 - 类型为教研团队时有值*/,
          'endDate': '2018-12-19 09:29:02' /*截止日期*/,
          'isAttachment': 'NO' /*是否需要附件：ALL|YES|NO*/,
          'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
          'isTop': 'NO' /*是否置顶：ALL|YES|NO*/,
          'topTime': '2018-12-19 09:29:02' /*置顶时间*/,
          'createdTime': '2018-12-19 09:29:02' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
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
        }, {
          'id': 1 /*主键*/,
          'publisherId': 1 /*发布用户Id*/,
          'noticeType': 'TEACH_GROUP' /*通知类型：ALL|NOTICE|SCHOOL_RULE|PATRIARCH_NOTICE|ACTIVITY|SUBJECT_STUDY|TEACHER_TRAIN|OLYMPICS_TRAIN|TEACH_GROUP*/,
          'title': 'title' /*标题*/,
          'content': 'content' /*内容*/,
          'bannerImage': 'bannerImage' /*封面图片 - 类型为教研团队时有值*/,
          'teachGroupId': 1 /*教研组Id - 类型为教研团队时有值*/,
          'teachGroupName': 'teachGroupName' /*教研组名称 - 类型为教研团队时有值*/,
          'endDate': '2018-12-19 09:29:02' /*截止日期*/,
          'isAttachment': 'NO' /*是否需要附件：ALL|YES|NO*/,
          'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
          'isTop': 'NO' /*是否置顶：ALL|YES|NO*/,
          'topTime': '2018-12-19 09:29:02' /*置顶时间*/,
          'createdTime': '2018-12-19 09:29:02' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
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
        }, {
          'id': 1 /*主键*/,
          'publisherId': 1 /*发布用户Id*/,
          'noticeType': 'TEACH_GROUP' /*通知类型：ALL|NOTICE|SCHOOL_RULE|PATRIARCH_NOTICE|ACTIVITY|SUBJECT_STUDY|TEACHER_TRAIN|OLYMPICS_TRAIN|TEACH_GROUP*/,
          'title': 'title' /*标题*/,
          'content': 'content' /*内容*/,
          'bannerImage': 'bannerImage' /*封面图片 - 类型为教研团队时有值*/,
          'teachGroupId': 1 /*教研组Id - 类型为教研团队时有值*/,
          'teachGroupName': 'teachGroupName' /*教研组名称 - 类型为教研团队时有值*/,
          'endDate': '2018-12-19 09:29:02' /*截止日期*/,
          'isAttachment': 'NO' /*是否需要附件：ALL|YES|NO*/,
          'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
          'isTop': 'NO' /*是否置顶：ALL|YES|NO*/,
          'topTime': '2018-12-19 09:29:02' /*置顶时间*/,
          'createdTime': '2018-12-19 09:29:02' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
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
        }],
        pageNo: 1,
        curTabIndex: 0,
        tabs: [{
          id: 0,
          label: '课题研究'
        }, {
          id: 1,
          label: '教师培训'
        }, {
          id: 2,
          label: '奥赛培训'
        }]
      }
    },
    methods: {
      onLoad () {},
      getQuery () {
        let type = ''
        if (this.curTabIndex === 0) {
          // 课题研究
          type = 'SUBJECT_STUDY'
        } else if (this.curTabIndex === 1) {
          // 教师培训
          type = 'TEACHER_TRAIN'
        } else {
          // 奥赛培训
          type = 'OLYMPICS_TRAIN'
        }
        return {
          noticeType: type,
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      },
      handleTabChange (tabIndex) {
        this.curTabIndex = tabIndex
      },
      async loadData () {
        let response = await this.$api.teacher.queryNoticePage(this.getQuery())
        this.articleList = response.list
      },
      handleItemClick (id) {
        this.$router.push(`/teacher/research/${id}`)
      }
    },
    async created () {
      this.loading = true
      this.loadData()
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">

  .research
    padding-bottom: $default-gap
    &-search
      padding: $default-gap
      background: $white
      margin-bottom: 10px
    &-list
      &-item
        padding: 14px
        background: $white
        &__header
          font-weight: bold
          font-size: 18px
          color: $black
          line-height: 25px
          p
            @include text-overflow
        &__content
          font-size: 15px
          margin-top: 6px
          color: #9B9B9B
        &__additional
          margin-top: 8px
          color: #9B9B9B

</style>
