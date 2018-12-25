<template>
  <div class="student">

    <div class="student-header">
      <span class="student-header-class-name">{{curClass.className || '--'}}</span>
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
                  show-toolbar
                  @cancel="onPickerCancel"
                  @confirm="onPickerConfirm"
                  value-key="label"
                  :loading="classLoading"
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
        classList: [],
        curClass: {},
        pageNo: 1,
        showPopup: false,
        selectGradeId: null,
        selectClassId: null,
        columns: [],
        classLoading: true
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
        this.$router.push(`/teacher/student/detail?id=${id}`)
      },
      onLoad () {
        this.loadData()
      },
      onSearch () {
        this.loadData(true)
      },
      handleSwitchClassClick () {
        this.showPopup = true
      },
      onPickerCancel () {
        this.showPopup = false
      },
      onPickerConfirm (item) {
        this.showPopup = false
        this.curClass = this.classList[this.classList.findIndex(clazz => clazz.id === item.value)]
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
          classId: this.curClass.id,
          keywords: this.keywords,
          pageNo: this.pageNo,
          pageSize: config.pageSize
        }
      }
    },
    async created () {
      this.classLoading = true
      this.classList = await this.$api.teacher.queryTeacherClassList({})
      if (this.classList && this.classList.length > 0) {
        this.curClass = this.classList[0]
        this.columns = this.classList.map(item => {
          return {
            label: item.className,
            value: item.id,
          }
        })
      }
      this.classLoading = false
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
