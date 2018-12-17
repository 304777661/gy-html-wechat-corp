<template>
  <div class="interactive-add">
    <div class="header">
      <span class="title">课堂点评</span>
      <span class="icon icon-add" @click="doAddTag"> 添加点评</span>
    </div>
    <card v-for="(item, idx) in interact.interactTagRecords"
          :key="item.id">
      <div class="card-header">
        <span class="card-header__title"
              :class="[item.tagType === 'CRITICISM' ? 'card-header__title--negative' : 'card-header__title--positive']"
              @click="doOpenTagPopup(item)">
          <!--上课积极回答问题-->
          <span>{{item.tagName || '请选择一个标签'}}</span>
        </span>
        <span class="icon icon-close" @click="doDelTag(idx)"></span>
      </div>

      <van-popup v-model="selectTagShow" position="right">
        <div class="popup-right popup-right--tag">
          <div v-for="count in 2"
               :key="'count' + count">
            <p :class="[count === 1 ? 'green-dot' : 'red-dot']"></p>

            <ul class="tag-list">
              <li class="tag-list__li"
                  v-for="tag in tagList"
                  :key="tag.id"
                  :class="{'tag-list__li--active': tag.id === curTag.id}"
                  v-if="count === 1 && tag.tagType === 'PRAISE' || count === 2 && tag.tagType === 'CRITICISM'"
                  @click="doSelectTag(tag)">
                {{tag.name}}
              </li>
            </ul>
          </div>
        </div>
        <van-button type="primary" class="btn-primary" @click="doSaveTag">确定</van-button>
      </van-popup>

      <ul class="card-body">
        <li class="card-body__li name"
            v-for="i in item.students"
            :key="i.studentId">
          {{i.studentName}}
        </li>
        <li class="card-body__li icon icon-add" @click="doOpenStudentPopup(item)"></li>
      </ul>

      <van-popup v-model="selectStudentShow" position="right">
        <div class="popup-right popup-right--student">
          <ul class="student-list">
            <li class="student-list__li"
                v-for="student in studentList"
                :key="'student' + student.id"
                :class="{'student-list__li--active': student.active}"
                @click="doSelectStudent(student)">{{student.name}}
            </li>
          </ul>
        </div>
        <van-button type="primary" class="btn-primary" @click="doSaveStudent">确定</van-button>
      </van-popup>

      <div class="card-footer">
        <van-field v-model="item.remark" placeholder="评语: "/>
      </div>
    </card>

    <div class="header">
      <span class="title">课堂整体评价</span>
    </div>
    <card>
      <van-field v-model="interact.interactContent" type="textarea" placeholder="请输入"/>
    </card>

    <div class="header">
      <span class="title">教案</span>
      <span class="icon icon-add" @click="openActionSheet"> 添加教案</span>
    </div>

    <input type="file" hidden id="file_input" multiple @change="inputChange($event)">

    <card>
      <p class="no-mat" v-if="!(interact.interactMats && interact.interactMats.length)">
        暂无教案
      </p>
      <div class="file-list"
           v-for="(item, idx) in interact.interactMats"
           :key="idx">
        <img :src="item.fileName | fileIcon" class="file-list__img">
        <span class="file-list__name">{{item.fileName}}</span>
        <span class="icon icon-close file-list__close" @click="doDelFile(idx)"></span>
      </div>
    </card>

    <van-button type="primary" class="btn-primary" @click="doSubmit">发布</van-button>

    <van-actionsheet v-model="actionSheetShow" :actions="actions"/>

    <van-popup v-model="selectFileShow" position="right">
      <div class="popup-right">
        <my-loading v-model="fileLoading"/>
        <no-data v-show="!fileLoading && !fileList.length"/>

        <div v-show="!fileLoading">
          <p class="back"
             @click="goBack"
             v-show="directoryRouteIds.length">返回上一层</p>

          <div class="teach-plan__list"
               v-for="(file, idx) in fileList"
               :key="idx"
               @click="goNextDirectory(file)">
            <img :src="getFileSuffix(file) | fileIcon"/>
            <div class="list-left">
              <p class="text-overflow">{{file.fileName}}</p>
              <p class="secondline">
                <span>{{file.createdTime | ymd}}</span>
              </p>
            </div>
            <div class="radio"
                 v-if="file.fileType === 'FILE'"
                 @click.stop="doSelectFile(file)">
              <span class="radio-bg" :class="{'radio-bg--on': file.active}"></span>
            </div>
          </div>
        </div>
      </div>
      <van-button type="primary"
                  class="btn-primary"
                  @click="doConfirmFile">确定
      </van-button>
    </van-popup>
  </div>
</template>

<script>
  export default {
    data () {
      const {id} = this.$route.params
      return {
        id,
        selectTagShow: false,
        selectStudentShow: false,
        interact: {},
        tagList: [],
        studentList: [],
        curTag: {},
        curInteract: {},
        actionSheetShow: false,
        actions: [{
          name: '从教案管理中添加',
          callback: this.openFilePopup
        }, {
          name: '本地上传',
          callback: this.openUpload
        }],
        directoryId: null,
        fileList: [],
        selectFileShow: false,
        fileLoading: false,
        directoryRouteIds: [],
        // 已选教案文件列表
        selectedFileList: []
      }
    },
    async created () {
      await Promise.all([
        this.$api.teacher.getInteractDetail(this.id),
        this.$api.teacher.queryInteractTagList(),
        this.initFileList()
      ]).then(res => {
        if (!res[0].interactMats) {
          res[0].interactMats = []
        }
        if (!res[0].interactTagRecords) {
          res[0].interactTagRecords = [{
            tagName: null,
            students: [],
            remark: null,
            tagId: null
          }]
        }
        this.interact = res[0]
        this.tagList = res[1]
      })
      // 先赋值给this.studentList之前就把active字段初始化好, 不然active字段不是响应式的
      let studentList = await this.$api.teacher.queryClassStudentList(this.interact.classId)
      studentList.forEach(stud => {
        stud.active = false
      })
      this.studentList = studentList
    },
    methods: {
      doAddTag () {
        this.interact.interactTagRecords.unshift({
          tagName: null,
          students: [],
          remark: null,
          tagId: null
        })
      },
      doDelTag (idx) {
        if (this.interact.interactTagRecords.length === 1) {
          this.$toast('最少需要保留1个')
          return
        }
        this.interact.interactTagRecords.splice(idx, 1)
      },
      doOpenTagPopup (item) {
        this.curInteract = item
        if (item.tagId) {
          this.curTag = this.tagList.filter(tag => {
            return tag.id === item.tagId
          })[0]
        }
        this.selectTagShow = true
      },
      doSelectTag (tag) {
        this.curTag = tag
      },
      doSaveTag () {
        this.curInteract.tagName = this.curTag.name
        this.curInteract.tagType = this.curTag.tagType
        this.curInteract.tagId = this.curTag.id
        this.selectTagShow = false
      },
      doOpenStudentPopup (item) {
        this.curInteract = item
        this.studentList.forEach(st => {
          st.active = false
        })
        item.students.forEach(s => {
          this.studentList.find(st => {
            return s.studentId === st.id
          }).active = true
        })
        this.selectStudentShow = true
      },
      doSelectStudent (student) {
        this.studentList.find(s => {
          return s.id === student.id
        }).active = !student.active
      },
      doSaveStudent () {
        // this.curInteract.students.push()
        let isActiveItem = this.studentList.filter(stud => {
          return stud.active
        })
        let temp = []
        isActiveItem.forEach(stud => {
          temp.push({
            studentId: stud.id,
            studentName: stud.name
          })
        })
        this.curInteract.students = temp
        this.selectStudentShow = false
      },
      openActionSheet () {
        this.actionSheetShow = true
      },
      async inputChange (e) {
        if (e.target.files.length === 0) return
        if (!this.interact.interactMats) {
          this.interact.interactMats = []
        }
        let toast = this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: '文件上传中...'
        })
        let files = e.target.files
        for (let i = 0; i < files.length; i++) {
          let formData = new FormData()
          const file = files[i]
          console.log(file)
          formData.append('resources', file)
          let filePath = await this.$api.teacher.upload(formData)
          this.interact.interactMats.push({
            fileName: file.name,
            filePath,
            fileSource: 'LOCAL'
          })
        }
        toast.clear()
        // 防止选择同一图片后, change事件不触发
        document.getElementById('file_input').value = null
        // this.$toast.success('文件上传成功')
      },
      doDelFile (idx) {
        this.interact.interactMats.splice(idx, 1)
      },
      openUpload () {
        document.getElementById('file_input').click()
        this.actionSheetShow = false
      },
      openFilePopup () {
        this.selectFileShow = true
      },
      async initFileList () {
        this.fileLoading = true
        let fileList = await this.$api.teacher.queryTeachMatList({fileId: this.directoryId})
        if (!this.selectedFileList.length) {
          fileList.forEach(file => {
            file.active = false
          })
        } else {
          for (let i = 0; i < fileList.length; i++) {
            let file = fileList[i]
            for (let j = 0; j < this.selectedFileList.length; j++) {
              let f = this.selectedFileList[j]
              if (file.id === f.id) {
                file.active = true
                break
              } else {
                file.active = false
              }
            }
          }
        }
        this.fileList = fileList
        this.fileLoading = false
      },
      goBack () {
        let routeIds = this.directoryRouteIds
        let len = routeIds.length
        this.directoryId = routeIds[len - 1]
        this.initFileList()
        this.directoryRouteIds.splice(len - 1, 1)
      },
      goNextDirectory (file) {
        if (file.fileType === 'FILE') return
        this.directoryRouteIds.push(this.directoryId)
        this.directoryId = file.id
        this.initFileList()
      },
      getFileSuffix (file) {
        if (file.fileType === 'DIRECTORY') {
          return 'directory'
        }
        return file.fileName
      },
      doSelectFile (file) {
        file.active = !file.active
        let idx = this.selectedFileList.findIndex(f => f.id === file.id)
        if (idx === -1 && file.active) {
          this.selectedFileList.push(file)
        } else if (idx > -1 && !file.active) {
          this.selectedFileList.splice(idx, 1)
        }
      },
      doConfirmFile () {
        this.selectedFileList.forEach(file => {
          this.interact.interactMats.push({
            fileName: file.fileName,
            filePath: file.filePath,
            fileSource: 'TEACH_MAT',
            teachMatId: file.id
          })
        })
        this.selectFileShow = false
        this.actionSheetShow = false
      },
      async doSubmit () {
        this.$toast.loading({
          // 持续展示 toast
          duration: 0,
          // 禁用背景点击
          forbidClick: true,
          loadingType: 'spinner',
          message: '发布中...'
        })
        await this.$api.teacher.saveInteract(this.interact)
        this.$toast.success('发布成功')
        this.$router.back()
      }
    }
  }
</script>

<style lang="sass">
  .interactive-add
    padding: 0 $default-gap $default-gap
    .no-mat
      text-align: center
      line-height: 25px
      color: $gray
    .back
      padding: 0 10px $default-gap
      font-size: $font-small
      color: $blue
    .teach-plan__list
      padding: $default-gap 0
      margin: 0 10px
      border-bottom: 1px solid $gray_light
      @include hor-between-center
      &:last-child
        border-bottom: none
      &:first-of-type
        padding-top: 0
      img
        @include fixed-width(33px)
      .list-left
        flex: 1
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
    .header
      padding: $default-gap 0
      @include hor-between-center
      .title
        font-size: $font-large
      .icon
        color: $blue
        font-size: $font-small
    .card
      position: relative
      ::-webkit-input-placeholder
        font-size: $font-small
      & + .card
        margin-top: $default-gap
      .van-cell
        padding: 0
      &-header
        @include hor-between-center
        &__title
          @include text-overflow
          &:before
            content: ''
            display: inline-block
            margin-right: 12px
            @include circle(8px)
          &--positive:before
            background: $green
          &--negative:before
            background: $red
        .icon-close
          color: $red
          font-size: $font-small
      &-body
        padding: $default-gap 0
        border-bottom: 1.4px dashed $gray-light
        @include hor-start-center
        flex-wrap: wrap
        &__li
          $w: 18%
          $h: 25px
          width: $w
          height: $h
          margin-right: 2.5%
          line-height: $h
          text-align: center
          font-size: $font-small
          border-radius: $h
          &:nth-of-type(5n)
            margin-right: 0
          &:nth-of-type(n + 6)
            margin-top: 8px
          &.name
            border: 1px solid $blue
            color: $blue
        .icon-add
          font-weight: bold
          color: $gray
          background: #e5e5e5
      &-footer
        padding-top: $default-gap
        .van-field__control
          font-size: $font-small
      .file-list
        padding-bottom: 10px
        border-bottom: 1.5px dashed $gray-light
        @include hor-between-center
        &__img
          width: 32px
        &__close
          color: $red
          font-size: $font-small
        &__name
          flex: 3
          margin: 0 $default-gap
          @include text-overflow
        & + .file-list
          padding-top: 10px
        &:last-child
          padding-bottom: 0
          border-bottom: none
    .van-popup
      width: 92%
      height: 100%
      .btn-primary
        margin: 0 auto
    .popup-right
      padding: $default-gap $default-gap 0
      margin-bottom: $default-gap
      height: calc(100% - #{$default-gap * 2 + 35px})
      overflow-y: auto
      // background: #000
      .red-dot, .green-dot
        @include circle(8px)
        margin-bottom: $default-gap
      .red-dot
        background: $red
      .green-dot
        background: $green
      .tag-list
        padding-bottom: $default-gap
        @include clearfix
        &__li
          @include rightPopupItem(3, 2%)
      .student-list
        &__li
          @include rightPopupItem(4, 1.5%)
  // position: fixed
  // @include rect()
</style>
