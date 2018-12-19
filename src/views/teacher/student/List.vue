<template>
  <div class="student">

    <div class="student-header">
      <span class="student-header-class-name">{{curClass.className || '--'}}</span>
      <span class="student-header-class-picker" @click="onClassPicker">选择班级</span>
    </div>
    <div class="student-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <no-data v-show=" !loading && !studentList.length"/>

    <van-list :loading="loading"
              :finished="finished"
              @load="onLoad">

      <div class="student-item van-hairline--bottom" v-for="(item,index) in studentList" :key="index"
           @click="goDetail(item.id)">
        <img :src="item.avatar | defaultAvatar" class="student-item__avatar">
        <span class="student-item__name">{{item.name || '--'}}</span>
        <van-tag size="large" plain v-show="item.position" class="student-item__tag">班长</van-tag>
      </div>
    </van-list>

    <van-popup v-model="showPopup" position="bottom" :overlay="true" lazy-render close-on-click-overlay>
      <van-picker :columns="columns"
                  @change="onChange"
                  show-toolbar
                  @cancel="onCancel"
                  @confirm="onConfirm"
                  :item-height="popupItemHeight"
                  value-key="label"
                  :loading="gradeLoading" ref="picker"/>

    </van-popup>
  </div>
</template>

<script>

  import config from '@/config'

  export default {
    name: 'StudentList',
    computed: {
      query () {
        return {
          classId: this.curClass.id,
          keywords: this.keywords,
          pageNo: 1,
          pageSize: config.pageSize
        }
      }
    },
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
        columns:
          [{
            values: [],
            className: 'student-popup-item'
          }, {
            values: [],
            className: 'student-popup-item'
          }],
        gradeLoading:
          true
      }
    },
    methods: {
      goDetail (id) {
        this.$router.push(`/teacher/student/${id}`)
      },
      onLoad () {
      },
      onSearch () {},
      onClassPicker () {
        if (this.columns && this.columns.length > 0) {
          this.showPopup = true
        }
      },
      onChange (picker, values) {
        let curGrade = this.gradeList.find(item => item.gradeId === values[0].value)
        this.columns[1].values = curGrade.classInfoList.map(item => {
          return {
            label: item.className,
            value: item.id,
          }
        })
        picker && picker.setColumnValues(1, this.columns[1].values)
      },
      onCancel () {
        this.showPopup = false
      },
      async onConfirm (value, index) {
        // console.log(`当前值：${value}, 当前索引：${index}`)
        console.log(index)
        this.curGrade = this.gradeList[index[0]]
        this.curClass = this.curGrade.children[index[1]]
        this.request()
        this.showPopup = false
      },
      async request () {
        const studentResp = await  this.$api.teacher.queryStudentPage(this.query)
        this.studentList = studentResp.list
      }
    },
    async created () {
      this.gradeLoading = true
      this.gradeList = await this.$api.teacher.queryClassCascadeList({})
      this.gradeLoading = false

      this.columns[0].values = this.gradeList.map(item => {
        return {
          label: item.label,
          value: item.value,
        }
      })
      this.onChange(null, [this.columns[0].values[0], undefined])

      if (this.gradeList && this.gradeList.length > 0) {
        this.curGrade = this.gradeList[0]
        if (this.curGrade && this.curGrade.children && this.curGrade.children.length > 0) {
          this.curClass = this.curGrade.children[0]
        }
      }
      // 查询学生列表
      this.request()
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
      height: 120px
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
