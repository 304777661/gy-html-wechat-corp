<template>
  <div class="notice">
    <div class="notice-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <no-data v-show="!loading && !articleList.length"/>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad">
      <div class="notice-list-item van-hairline--bottom"
           v-for="(item,index) in articleList"
           :key="index"
           @click="goDetail(item.id)">
        <div class="notice-list-item-title">
          <van-tag v-if="item.noticeType === 'ACTIVITY'" color="#24A197">活动
          </van-tag>
          <van-tag v-else color="#24A197">通知
          </van-tag>
          <span class="notice-list-item-title__content">{{item.title}}</span>
          <div class="notice-list-item-title__tag">
            <span v-if="item.noticeType === 'ACTIVITY'">
              <van-tag v-if="item.isParticipated === 'YES'" color="#24A197">已参与
              </van-tag>
              <van-tag v-else-if="item.isFinish === 'YES'" color="#9B9B9B" plain>已结束
              </van-tag>
              <van-tag v-else color="#24A197" plain>进行中
              </van-tag>
            </span>
          </div>
        </div>
        <div class="notice-list-item__summary">
          {{item.content.length > 60? item.content.substr(0,60)+'......' : item.content}}
        </div>
        <div class="notice-list-item__additional">
          <p>{{item.createdTime | ymd}}</p>
        </div>
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
          'noticeType': 'ACTIVITY' /*通知类型：ALL|NOTICE|SCHOOL_RULE|PATRIARCH_NOTICE|ACTIVITY|SUBJECT_STUDY|TEACHER_TRAIN|OLYMPICS_TRAIN|TEACH_GROUP*/,
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
          'isParticipated': 'YES' /*是否已经参与 - 类型为活动时有值：ALL|YES|NO*/,
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
            }],
        }, {
          'id': 2 /*主键*/,
          'publisherId': 1 /*发布用户Id*/,
          'noticeType': 'NOTICE' /*通知类型：ALL|NOTICE|SCHOOL_RULE|PATRIARCH_NOTICE|ACTIVITY|SUBJECT_STUDY|TEACHER_TRAIN|OLYMPICS_TRAIN|TEACH_GROUP*/,
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
          'isParticipated': 'YES' /*是否已经参与 - 类型为活动时有值：ALL|YES|NO*/,
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
            }],
        }
        ],
        loading: false,
        finished: false,
      }
    },
    async created () {
      this.loadData(false)
    },
    watch: {
      keywords (newVal) {
        if (!newVal) {
          this.loadData(true)
        }
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
        data.list = this.articleList
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
        this.$router.push(`/parent/notice/detail/${id}`)
      },
      getQuery () {
        return {
          pageNo: this.pageNo,
          keywords: this.keywords,
          pageSize: config.pageSize
        }
      }
    },
  }
</script>

<style scoped lang="sass">

  .notice
    padding-bottom: $default-gap
    &-search
      padding: $default-gap
      background: $white
      margin-bottom: 10px
    &-list
      &-item
        padding: 14px
        background: $white
        &-title
          @include hor-start-center
          &__content
            flex: 1
            font-size: 17px
            color: $black
            font-weight: bold
            line-height: 22px
            margin-left: 8px
            @include text-overflow
        &__summary
          font-size: 15px
          margin-top: 6px
          color: #9B9B9B
        &__additional
          margin-top: 8px
          color: #9B9B9B
</style>
