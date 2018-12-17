<template>
  <div class="mailbox">
    <div class="mailbox-list">
      <no-data v-show=" !loading && !articleList.length"/>

      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="mailbox-item"
             v-for="item in articleList"
             :key="item.id"
             @click="goDetail(item.id)">
          <div class="mailbox-item-header">
            <span class="mailbox-item-header__title">{{item.title}}</span>
            <van-tag class="mailbox-item-header__tag" color="#24A197" v-show="item.isAnonymous === 'YES'">匿名</van-tag>
          </div>

          <div class="mailbox-item-body">
            {{item.content.length > 60? item.content.substr(0,60)+'......' : item.content}}
          </div>
          <div class="van-hairline--bottom"></div>
          <div class="mailbox-item-footer">
            <span class="mailbox-item-footer__date">{{item.createdTime | ymd}}</span>
            <span class="mailbox-item-footer__line" v-show="item.createdTime">|</span>
            <span class="mailbox-item-footer__reply">{{item.replyNum || '0'}}条回复</span>
          </div>
        </div>
      </van-list>
    </div>
  </div>

</template>

<script>
  import config from '@/config'

  export default {
    data () {
      return {
        pageNo: 1,
        addBtnTitle: '新增',
        articleList: [
          {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'YES' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }, {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'NO' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }, {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'YES' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }, {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'YES' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }, {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'NO' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }, {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'YES' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }, {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'YES' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }, {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'YES' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }, {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'YES' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          }, {
            'id': 1 /*主键*/,
            'parentUserId': 1 /*父母用户Id*/,
            'studentId': 1 /*学生Id*/,
            'classId': 1 /*班级Id*/,
            'title': '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题' /*标题*/,
            'content': '这容这是内容内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容' /*内容*/,
            'isAnonymous': 'YES' /*是否匿名：ALL|YES|NO*/,
            'replyStatus': 'REPLIED' /*回复状态：ALL|NO_REPLY|REPLIED*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 09:07:20' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 09:07:20' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          },
        ],
        loading: false,
        finished: false
      }
    },
    computed: {
      query () {
        return {
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      }
    }
    ,
    methods: {
      async initData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.articleList = []
          this.pageNo = 1
        }
        let data = await this.$api.teacher.queryPatriarchMailPage(this.query)

        if (resetList) {
          this.articleList = data.list
        } else {
          this.articleList = this.articleList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.pageNo++
      },
      onLoad () {
        this.initData()
      },
      goDetail (id) {
        this.$router.push(`mailbox/${id}`)
      },
    }
  }
</script>

<style lang="sass">
  .mailbox
    &-item
      padding: 8px 14px 8px
      background: $white
      border-bottom: 1px solid #9B9B9B
      &-header
        position: relative
        line-height: 1
        @include hor-start-center
        &__title
          flex: 1
          font-size: 17px
          line-height: 21px
          color: $black
          @include text-overflow
        // font-weight: bold
        &__tag
          background: #24A197
          padding: 2px 8px
          font-size: 12px
          margin-left: 10px
          margin-top: 2px
      &-body
        padding: 8px 0 8px
        font-size: 14px
        color: $gray
        line-height: 1.5
      &-footer
        font-size: 13px
        line-height: 18px
        color: #ccc
        margin-top: 8px
        &__line
          margin: 0 8px

</style>
