<template>
  <div class="teach-plan">
    <div class="teach-plan__search">
      <search v-model="query.keywords"
              placeholder="请输入关键字进行搜索"
              @search="doSearch"></search>
    </div>
    <div class="teach-plan__picker">
      <select-picker type="course" @confirm="onCourseConfirm" />
    </div>

    <my-loading v-model="loading"/>
    <no-data v-show=" !loading && !matList.length"/>

    <div class="teach-plan__body">
      <div class="teach-plan__list" v-for="(file, idx) in matList"
           :key="'section' + idx">
        <img :src="getFileSuffix(file) | fileIcon" />
        <div class="list-left">
          <p class="text-overflow">{{file.fileName}}</p>
          <p class="secondline">
            <span>{{file.classDate | md}}</span>
            <span class="ml15">{{file.teacherName}}老师</span>
          </p>
        </div>
        <div class="list-right icon icon-xuanxiang" @click.stop="doShowSheet(file)"></div>
      </div>
      <!--<div class="teach-plan__list">-->
        <!--<img src="~IMAGE/xlsx.png"/>-->
        <!--<div class="list-left docx">-->
          <!--<p>初一语文第三苦长训练.docx</p>-->
          <!--<p class="secondline">7-4 张三老师</p>-->
        <!--</div>-->
        <!--<div class="list-right icon icon-xuanxiang"></div>-->
      <!--</div>-->
      <!--<div class="teach-plan__list">-->
        <!--<img src="~IMAGE/pdf.png"/>-->
        <!--<div class="list-left docx">-->
          <!--<p>初一语文第三苦长训练.docx</p>-->
          <!--<p class="secondline">7-4 张三老师</p>-->
        <!--</div>-->
        <!--<div class="list-right icon icon-xuanxiang"></div>-->
      <!--</div>-->
    </div>

    <van-actionsheet v-model="actionSheetShow" :actions="actions"/>

  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'
  import config from '@/config'
  export default {
    components: {
      Search
    },
    data () {
      return {
        query: {
          keywords: null,
          courseId: null,
          pageNo: 1,
          pageSize: config.pageSize
        },
        curFile: {},
        actionSheetShow: false,
        actions: [{
          name: '下载到手机',
          className: 'icon icon-download',
          callback: this.doDownload
        }],
        matList: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      async initData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.matList = []
          this.pageNo = 1
        }
        let data = await this.$api.parent.queryInteractMatList(this.query)
        if (resetList) {
          this.matList = data.list
        } else {
          this.matList = this.matList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.query.pageNo++
      },
      onCourseConfirm (course) {
        this.matList = []
        this.pageNo = 1
        this.query.courseId = course.id
        this.initData()
      },
      doSearch () {

      },
      doShowSheet (file) {
        this.curFile = file
        this.actionSheetShow = true
      },
      async doDownload () {
        window.location.href = `${window.location.origin}${this.$config.apiPrefix}/oss/downloadFile.do?path=${this.curFile.filePath}`
        this.actionSheetShow = false
      },
      getFileSuffix (file) {
        if (file.fileType === 'DIRECTORY') {
          return 'directory'
        }
        return file.fileName
      }
    }
  }
</script>

<style lang="sass">
  .teach-plan
    &__search
      @include hor-between-center
      padding: $default-gap
      background: #fff
      box-shadow: $default-shadow
      .icon
        @include fixed-width(18px)
        margin-left: $default-gap
        font-size: 18px
        text-align: right
        color: $black
      .search
        flex: 1
    &__picker
      margin-top: 10px
      background: white
      padding: 10px 0
      border-bottom: 1px solid $gray_light
      @include hor-around-center
    &__body
      background: white
      // margin-top: $default-gap
    &__list
      padding: $default-gap 0
      margin: 0 10px
      border-bottom: 1px solid $gray_light
      @include hor-between-center
      &:last-child
        border-bottom: none
      img
        width: 33px
        flex: 1
      .list-left
        flex: 9
        margin-left: $default-gap
        position: relative
        @include text-overflow
        .secondline
          color: $gray
          font-size: $font-small
          margin-top: $default-gap/2
      .list-right
        @include fixed-width(20px)
        margin-right: 5px
        font-size: 12px
        color: $gray
    .van-actionsheet .icon:before
      margin-right: 10px
</style>
