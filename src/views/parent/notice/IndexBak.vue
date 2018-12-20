<template>
  <div class="bulletin">
    <div class="bulletin-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <no-data v-show="!loading && !articleList.length"/>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <div class="bulletin-item van-hairline--bottom"
           v-for="item in articleList"
           :key="item.id"
           @click="goDetail(item.id)">
        <div class="bulletin-item-title">
          <p class="bulletin-item-title__content">{{item.title}}</p>
          <div class="bulletin-item-title__tag">
            <van-tag v-if="article.noticeType === 'ACTIVITY'" color="#24A197">活动
            </van-tag>
            <van-tag v-else color="#24A197">通知
            </van-tag>
          </div>
        </div>
        <p class="bulletin-item-summary">
          {{item.content}}
        </p>
        <p class="bulletin-item-date">{{item.createdTime | ymd}}</p>
      </div>
    </van-list>
  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'
  import MyTabs from 'COMPONENT/MyTabs'
  import config from '@/config'

  export default {
    components: {
      Search,
      MyTabs
    },
    data () {
      return {
        keywords: null,
        pageNo: 1,
        articleList: [{
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
          'noticeType': 'ACTIVITY' /*通知类型：ALL|NOTICE|SCHOOL_RULE|PATRIARCH_NOTICE|ACTIVITY|SUBJECT_STUDY|TEACHER_TRAIN|OLYMPICS_TRAIN|TEACH_GROUP*/,
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
        loading: false,
        finished: false,
      }
    },
    methods: {
      async loadData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.articleList = []
          this.pageNo = 1
        }
        let data = await this.$api.parent.queryNoticePage(this.getQuery())
        if (resetList) {
          this.articleList = data.list
        } else {
          this.articleList = this.articleList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.pageNo++
      },
      onSearch () {
        this.loadData(true)
      },
      onLoad () {
        this.loadData()
      },
      goDetail (id) {
        this.$router.push(`/notice/detail/${id}`)
      },
      getQuery () {
        return {
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      },
    },
    async created () {
      this.loadData(true)
    }
  }
</script>

<style lang="sass" scoped>
  .bulletin
    padding-bottom: $default-gap
    display: flex
    flex-direction: column
    height: 100vh
    &-search
      padding: 9px $default-gap
      background: $white
      margin-bottom: 10px
    /deep/ .van-list
      /*position: absolute*/
      /*left: 0*/
      /*bottom: 0*/
      /*top: 194px*/
      /*right: 0*/
      max-height: calc(100vh - 48px)
      flex: 1
      overflow: auto
    &-item
      height: 137px
      background: $white
      padding: 14px
      &-title
        @include hor-start-center
        &__content
          flex: 1
          font-size: 17px
          color: $black
          line-height: 22px
      &-summary
        margin-top: 8px
        color: $normal-text-color
        font-size: 14px
        line-height: 20px
        @include text-overflow-line(3)
      &-date
        margin-top: 10px
        color: #ccc
        font-size: 13px
        line-height: 18px
</style>
