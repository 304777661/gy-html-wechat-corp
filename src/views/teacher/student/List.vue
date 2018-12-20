<template>
  <div class="student">

    <div class="student-header">
      <span class="student-header-class-name">{{curClass.label || '--'}}</span>
      <span class="student-header-class-picker" @click="handleSwitchClassClick">选择班级</span>
    </div>
    <div class="student-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <no-data v-show="!loading && !studentList.length"/>
    <div v-if="studentList.length">
      <van-list v-model="loading"
                :finished="finished"
                @load="onLoad">
        <div class="student-item van-hairline--bottom" v-for="(item,index) in studentList" :key="index"
             @click="goDetail(item.id)">
          <img :src="item.avatar | defaultAvatar" class="student-item__avatar">
          <span class="student-item__name">{{item.name || '--'}}</span>
          <van-tag size="large" plain v-show="item.position" class="student-item__tag">班长</van-tag>
        </div>
      </van-list>
    </div>
    <van-popup v-model="showPopup" position="bottom" lazy-render>
      <van-picker :columns="columns"
                  @change="onPickerChange"
                  show-toolbar
                  @cancel="onPickerCancel"
                  @confirm="onPickerConfirm"
                  :item-height="popupItemHeight"
                  value-key="label"
                  :loading="gradeLoading"
                  ref="picker">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    name: 'StudentList',
    data () {
      return {
        studentList: [],
        loading: false,
        finished: false,
        keywords: null,
        gradeList: [],
        curGrade: {},
        curClass: {},
        pageNo: 1,
        popupItemHeight: 60,
        showPopup: false,
        selectGradeId: null,
        selectClassId: null,
        columns: [{
          values: [],
          className: 'student-popup-item'
        }, {
          values: [],
          className: 'student-popup-item'
        }],
        gradeLoading: true
      }
    },
    watch: {
      keywords (newVal) {
        if (!newVal) {
          this.loadData(true)
        }
      }
    },
    methods: {
      goDetail (id) {
        this.$router.push(`/teacher/student/detail/${id}`)
      },
      onLoad () {
        this.loadData()
      },
      onSearch () {
        this.loadData(true)
      },
      handleSwitchClassClick () {
        if (this.columns && this.columns.length > 0) {
          this.showPopup = true
        } else {
          this.$toast.fail('数据初始化失败')
        }
      },
      onPickerChange (picker, values) {
        let curGrade = this.gradeList.find(item => item.value === values[0].value)
        if (curGrade.children) {
          this.columns[1].values = curGrade.children.map(item => {
            return {
              label: item.label,
              value: item.value,
            }
          })
          picker && picker.setColumnValues(1, this.columns[1].values)
        }
      },
      onPickerCancel () {
        this.showPopup = false
      },
      onPickerConfirm (value, index) {
        this.showPopup = false
        if (!this.gradeList[index[0]]) {
          this.$toast.fail('年级数据错误')
          return
        }
        if (!this.curGrade.children || !this.curGrade.children[index[1]]) {
          this.$toast.fail('班级数据错误')
          return
        }
        this.curGrade = this.gradeList[index[0]]
        this.curClass = this.curGrade.children[index[1]]
        this.loadData(true)
      },
      async loadData (resetList = false) {
        this.loading = true
        if (resetList) {
          this.studentList = []
          this.pageNo = 1
        }
        let data = await this.$api.teacher.queryStudentPage(this.getQuery())
        if (resetList) {
          this.studentList = data.list
        } else {
          this.studentList = this.studentList.concat(data.list)
        }
        this.finished = !data.hasNextPage
        this.loading = false
        this.pageNo++
      },
      getQuery () {
        return {
          classId: this.curClass.value,
          keywords: this.keywords,
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      }
    },
    async created () {
      this.gradeLoading = true
      this.gradeList = await this.$api.teacher.queryClassCascadeList({})
      if (this.gradeList && this.gradeList.length > 0) {
        this.curGrade = this.gradeList[0]
        this.columns[0].values = this.gradeList.map(item => {
          return {
            label: item.label,
            value: item.value,
          }
        })
        if (this.curGrade && this.curGrade.children && this.curGrade.children.length > 0) {
          this.curClass = this.curGrade.children[0]
          this.columns[1].values = this.curGrade.children.map(item => {
            return {
              label: item.label,
              value: item.value,
            }
          })
        }
      }
      this.gradeLoading = false
      // 查询学生列表
      this.loadData(true)
    },
  }
</script>

<style lang="sass">
  .student
    &-popup-title
      line-height: 40px
      height: 40px
      color: #3296FA
      padding: 0 14px
      display: flex
      flex-direction: row
      justify-content: space-between
    &-popup-item
      line-height: 60px
      height: 60px
    &-header
      background: $dark-blue
      height: 60px
      position: relative
      $mb: 16px
      &-class-name
        position: absolute
        color: $white
        font-size: 21px
        line-height: 29px
        left: 14px
        bottom: $mb
      &-class-picker
        position: absolute
        right: 20px
        bottom: $mb
        font-size: 12px
        line-height: 17px
        color: #86B6F1
    &-search
      padding: 9px $default-gap
      background: $white
      margin-bottom: 10px
    &-item
      height: 70px
      background: $white
      padding: 0 14px
      @include hor
      align-items: center
      $avatar-height: 40px
      &__avatar
        @include circle($avatar-height)
      &__name
        margin-left: 14px
        line-height: 24px
        font-size: 17px
        color: $black
      &__tag
        margin-left: 14px
        font-size: 12px
        line-height: 14px
        color: #24A197
        padding: 5px 10px
</style>
