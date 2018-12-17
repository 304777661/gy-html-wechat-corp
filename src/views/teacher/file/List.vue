<template>
  <div class="teach-plan">
    <div class="teach-plan__search">
      <search v-model="query.keywords"
              placeholder="搜索文件标题、类型"
              @search="doSearch"/>
      <!--<span class="icon icon-sort"></span>-->
    </div>
    <div class="teach-plan__body">
      <my-loading v-model="loading"/>
      <no-data v-show="!loading && !fileList.length"/>

      <div v-show="!loading">
        <p class="back" v-show="directoryRouteIds.length" @click="doBack">返回上一层</p>

        <div class="teach-plan__list"
             v-for="(file, idx) in fileList"
             :key="idx"
             @click="goNextDirectory(file)">
          <img :src="getFileSuffix(file) | fileIcon"/>
          <div class="list-left">
            <p class="text-overflow">{{file.fileName}}</p>
            <p class="secondline">
              <span>{{file.createdTime | ymd}}</span>
              <span class="ml15">{{file.fileSize | formatFileSize}}</span>
            </p>
          </div>
          <div class="list-right icon icon-xuanxiang"
               v-if="file.canOper === 'YES'"
               @click.stop="doShowSheet(file)"></div>
        </div>
      </div>
    </div>

    <div class="button-group">
      <span class="btn btn-white" @click="mkdirDialogShow = true">新建文件夹</span>
      <label for="file-input" class="btn btn-blue">
        <span>上传文件</span>
        <input type="file"
               hidden
               id="file-input"
               @change="onFileInputChanged">
      </label>
    </div>

    <van-actionsheet v-model="actionSheetShow" :actions="actions"/>

    <van-dialog v-model="renameDialogShow"
                show-cancel-button
                @confirm="doRenameConfirm"
                @cancel="doRenameCancel">
      <van-field v-model="newFileName"
                 :label="renameText.label"
                 :placeholder="renameText.placeholder"/>
    </van-dialog>

    <van-dialog v-model="mkdirDialogShow"
                show-cancel-button
                @confirm="doMkdirConfirm"
                @cancel="doMkdirCancel">
      <van-field v-model="newDirName"
                 label="文件夹名称"
                 placeholder="请输入文件夹名称"/>
    </van-dialog>

    <van-popup v-model="selectDirShow"
               position="right">
      <div class="popup-right">
        <my-loading v-model="dirLoading"/>
        <no-data v-show="!loading && !dirList.length"/>
        <div v-show="!dirLoading">
          <p class="back" @click="doBack" v-show="moveDirRouteIds.length">返回上一层</p>

          <div class="teach-plan__list"
               v-for="(file, idx) in dirList"
               :key="idx"
               @click="goNextDirectory(file)">
            <img :src="'directory' | fileIcon"/>
            <div class="list-left">
              <p class="text-overflow">{{file.fileName}}</p>
              <p class="secondline">
                <span>{{file.createdTime | ymd}}</span>
              </p>
            </div>
            <!--<div class="radio" @click.stop="doSelectRadio(file)">-->
            <!--<span class="radio-bg" :class="{'radio-bg&#45;&#45;on': file.active}"></span>-->
            <!--</div>-->
          </div>
        </div>

      </div>
      <van-button type="primary"
                  class="btn-primary"
                  @click="move">移动到当前目录
      </van-button>
    </van-popup>
  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'

  export default {
    components: {
      Search
    },
    data () {
      return {
        query: {
          fileId: null,
          keywords: null
        },
        loading: false,
        finished: false,
        fileList: [],
        curFile: {},
        actionSheetShow: false,
        actions: [{
          name: '重命名',
          className: 'icon icon-rename',
          callback: this.doRename
        }, {
          name: '删除',
          className: 'icon icon-delete',
          callback: this.doDelete
        }, {
          name: '移动',
          className: 'icon icon-move',
          callback: this.doMove
        }],
        variableSheet: {
          name: '下载到手机',
          className: 'icon icon-download',
          callback: this.doDownload
        },
        renameDialogShow: false,
        newFileName: null,
        directoryRouteIds: [],
        mkdirDialogShow: false,
        newDirName: null,
        selectDirShow: false,
        dirQuery: {
          fileId: null
        },
        dirList: [],
        dirLoading: false,
        moveDirRouteIds: []
      }
    },
    computed: {
      renameText () {
        if (this.curFile.fileType === 'FILE') {
          return {
            label: '文件名',
            placeholder: '请输入文件名'
          }
        } else {
          return {
            label: '文件夹名',
            placeholder: '请输入文件夹名'
          }
        }
      }
    },
    async created () {
      Promise.all([this.initData(), this.initDirList()])
      // this.initData()
    },
    methods: {
      async initData () {
        this.loading = true
        this.fileList = await this.$api.teacher.queryTeachMatList(this.query)
        this.loading = false
      },
      async initDirList () {
        this.dirLoading = true
        this.dirList = await this.$api.teacher.queryTeachMatDirectoryList(this.dirQuery.fileId)
        this.dirLoading = false
      },
      doSearch () {
        this.initData()
      },
      doShowSheet (file) {
        this.curFile = file
        const idx = this.actions.findIndex(act => act.name === '下载到手机')
        // 是否存在下载到手机这个选项
        const hadVariableSheet = idx > -1
        if (file.fileType === 'FILE' && !hadVariableSheet) {
          this.actions.splice(2, 0, this.variableSheet)
        } else if (file.fileType === 'DIRECTORY' && hadVariableSheet) {
          this.actions.splice(idx, 1)
        }
        this.actionSheetShow = true
      },
      doRename () {
        this.renameDialogShow = true
        this.actionSheetShow = false
        this.newFileName = this.curFile.fileName
      },
      async doRenameConfirm () {
        await this.$api.teacher.renameTeachMat({
          fileId: this.curFile.id,
          fileName: this.newFileName
        })
        this.fileList.find(file => file.id === this.curFile.id).fileName = this.newFileName
        this.$toast.success('重命名成功')
      },
      doRenameCancel () {
        // this.newFileName = ''
        this.actionSheetShow = false
      },
      async doDelete () {
        this.actionSheetShow = false
        // await this.$dialog.confirm({title: '文件删除后无法恢复!'})
        await this.$dialog.confirm({
          title: `是否删除${this.curFile.fileType === 'FILE' ? '文件' : '文件夹'}${this.curFile.fileName} ! `
        })
        await this.$api.teacher.deleteTeachMat(this.curFile.id)
        this.fileList.splice(this.fileList.findIndex(file => file.id === this.curFile.id), 1)
        this.$toast.success('删除成功')
      },
      async doDownload () {
        window.location.href = `${window.location.origin}${this.$config.apiPrefix}/oss/downloadFile.do?path=${this.curFile.filePath}`
        this.actionSheetShow = false
      },
      doMove () {
        this.selectDirShow = true
        this.dirQuery.fileId = null
        this.initDirList()
      },
      async goNextDirectory (file) {
        // 如果this.selectDirShow为false
        if (!this.selectDirShow) {
          if (file.fileType !== 'DIRECTORY') return
          this.directoryRouteIds.push(this.query.fileId)
          this.query.fileId = file.id
          this.query.keywords = null
          this.initData()
        } else {
          this.moveDirRouteIds.push(this.dirQuery.fileId)
          this.dirQuery.fileId = file.id
          this.initDirList()
        }
      },
      doBack () {
        if (!this.selectDirShow) {
          let routeIds = this.directoryRouteIds
          let len = routeIds.length
          this.query.fileId = routeIds[len - 1]
          this.query.keywords = null
          this.initData()
          this.directoryRouteIds.splice(len - 1, 1)
        } else {
          let routeIds = this.moveDirRouteIds
          let len = routeIds.length
          this.dirQuery.fileId = routeIds[len - 1]
          this.initDirList()
          this.moveDirRouteIds.splice(len - 1, 1)
        }
      },
      getFileSuffix (file) {
        if (file.fileType === 'DIRECTORY') {
          return 'directory'
        }
        return file.fileName
      },
      async doMkdirConfirm () {
        let submit = {
          fileType: 'DIRECTORY',
          fileName: this.newDirName,
          parentId: this.query.fileId
        }
        let newFile = await this.$api.teacher.addTeachMat(submit)
        // 这里后台没有返回createdTime字段
        newFile.createdTime = new Date()
        this.fileList.unshift(newFile)
        this.newDirName = null
      },
      doMkdirCancel () {
        this.mkdirDialogShow = false
        this.newDirName = null
      },
      async onFileInputChanged (e) {
        if (e.target.files.length === 0) return
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: '文件上传中...'
        })
        let files = e.target.files
        let j = 0
        for (let i = 0; i < files.length; i++) {
          let formData = new FormData()
          const file = files[i]
          formData.append('resources', file)
          this.$api.teacher.upload(formData).then(filePath => {
            this.$api.teacher.addTeachMat({
              fileType: 'FILE',
              filePath,
              fileName: file.name,
              parentId: this.query.fileId
            }).then(f => {
              j++
              if (j === files.length) {
                f.createdTime = new Date()
                this.fileList.push(f)
                this.$toast.clear()
                // 防止选择同一图片后, change事件不触发
                document.getElementById('file-input').value = null
                this.$toast.success('文件上传成功')
              }
            })
          })
        }
      },
      async move () {
        if (this.curFile.parentId === this.dirQuery.fileId) {
          this.$toast('请选择不同的文件夹')
          return
        }
        await this.$api.teacher.moveTeachMat({
          fileId: this.curFile.id,
          parentId: this.dirQuery.fileId
        })
        this.selectDirShow = false
        this.actionSheetShow = false
        this.initData()
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
      .search
        flex: 1
    &__picker
      margin-top: 10px
      background: white
      padding: 10px 0
      border-bottom: 1px solid $gray_light
      @include hor-around-center
    .back
      padding: $default-gap 10px 0 10px
      font-size: $font-small
      color: $blue
    .popup-right .back
      padding: 0 10px $default-gap 10px
    &__body
      height: calc(100vh - #{$search-input-height + $default-gap * 3 + 80px})
      overflow-y: auto
      margin-top: $default-gap
      background: white
    // padding-bottom: 80px
    &__list
      padding: $default-gap 0
      margin: 0 10px
      border-bottom: 1px solid $gray_light
      @include hor-between-center
      &:last-child
        border-bottom: none
      .popup-right &:first-of-type
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

    .van-actionsheet .icon:before
      margin-right: 10px

    .button-group
      position: fixed
      left: 0
      bottom: 0
      width: 100%
      height: 80px
      background: #fff
      @include hor-around-center
    $btn-height: 38px
    .btn
      display: inline-block
      width: 140px
      height: $btn-height
      line-height: $btn-height
      text-align: center
      border-radius: $btn-height / 2
      border-width: 1px
      border-style: solid
    .btn-white
      color: $blue
      border-color: $blue
    .btn-blue
      color: #fff
      background: $blue

    .van-popup
      width: 92%
      height: 100%
      .btn-primary
        margin: 0 auto
      .popup-right
        $height: calc(100% - #{$default-gap * 2 + 35px})
        padding: $default-gap $default-gap 0
        margin-bottom: $default-gap
        height: $height
        min-height: $height
        max-height: $height
        overflow-y: auto
  // background: #000
</style>
