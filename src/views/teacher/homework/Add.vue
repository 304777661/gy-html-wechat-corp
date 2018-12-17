<template>
  <div class="homework-add">
    <van-cell-group :border="false">
      <van-cell title="交作业日期" :value="deadline | ymd" is-link @click="deadlineShow = true"/>
      <van-popup v-model="deadlineShow"
                 :lazy-render="false"
                 position="bottom">
        <van-datetime-picker ref="deadlinePicker"
                             type="date"
                             :min-date="minDate"
                             :item-height="itemHeight"
                             :formatter="formatter"
                             @confirm="onDeadlineConfirm"
                             @cancel="deadlineShow = false"/>
      </van-popup>

      <van-cell title="科目"
                :value="curCourse.label"
                :is-link="!isDetailPage"
                @click="doOpenCoursePopup"/>
      <van-popup v-model="courseShow"
                 :lazy-render="false"
                 position="bottom">
        <van-picker ref="coursePicker"
                    :columns="courseList"
                    :item-height="itemHeight"
                    value-key="label"
                    show-toolbar
                    @confirm="onCourseConfirm"
                    @cancel="courseShow = false"/>
      </van-popup>

      <van-cell title="选择班级"
                :value="classLabelList"
                :is-link="!isDetailPage"
                @click="doOpenClassPopup"/>
      <van-popup v-model="classShow" position="right">
        <div class="popup-right popup-right--student">
          <ul class="class-list">
            <li class="class-list__li"
                v-for="cls in classList"
                :key="'class' + cls.classId"
                :class="{'class-list__li--active': cls.active}"
                @click="doSelectClass(cls)">
              {{cls.className}}
            </li>
          </ul>
        </div>
        <van-button type="primary" class="btn-primary" @click="doConfirmClass">确定</van-button>
      </van-popup>

      <van-cell title="作业内容" :border="false"/>
      <van-field v-model="submit.content"
                 placeholder="请输入作业内容"
                 type="textarea"/>

    </van-cell-group>

    <picture-map v-model="submit.imageUrls" upload/>

    <p class="tips">最多可以上传9张图片</p>

    <van-button type="primary" class="btn-primary" @click="doSubmit">{{isDetailPage ? '更新' : '发布'}}</van-button>
  </div>
</template>

<script>
  import PictureMap from 'COMPONENT/PictureMap'

  export default {
    components: {
      PictureMap
    },
    data () {
      let date = new Date()
      let {id} = this.$route.params
      return {
        isDetailPage: id && id !== 'null' && id !== 'undefined' && id !== 'add',
        submit: {
          taskId: id,
          deadline: null,
          courseId: null,
          classIds: [],
          content: null,
          imageUrls: []
        },
        courseShow: false,
        itemHeight: null,
        courseList: [],
        curCourse: {},
        deadlineShow: false,
        deadline: date,
        minDate: date,
        classShow: false,
        classList: []
      }
    },
    computed: {
      classLabelList () {
        return this.classList.filter(c => c.active).map(c => c.className).join(', ')
      }
    },
    async created () {
      let homeworkData = null
      if (this.isDetailPage) {
        homeworkData = await this.$api.teacher.getTaskInfoDetail(this.submit.taskId)
        this.submit.imageUrls = homeworkData.imageUrls
        this.submit.content = homeworkData.content
        this.deadline = new Date(homeworkData.deadline)

        this.curCourse = {
          label: homeworkData.courseName,
          id: homeworkData.courseId
        }
      }
      let allData = await Promise.all([this.$api.teacher.queryLectureInfoList(), this.$api.teacher.queryTeachingClassList()])
      let [courseData, classData] = allData
      // let courseData = await this.$api.teacher.queryLectureInfoList()
      this.courseList = courseData.map(c => {
        return {
          label: c.courseName,
          id: c.id
        }
      })
      // this.curCourse = this.courseList[0]

      classData.forEach(cls => {
        cls.active = false
      })
      // classData[0].active = true
      if (this.isDetailPage) {
        classData.find(cls => cls.classId === homeworkData.classId).active = true
      }
      // classData.indexOf(cls => {cls.classId === homeworkData})
      this.classList = classData
    },
    watch: {
      courseShow () {
        this.resetItemHeight()
      },
      deadlineShow () {
        this.resetItemHeight()
      }
    },
    methods: {
      doOpenCoursePopup () {
        if (this.isDetailPage) return
        this.courseShow = true
      },
      doOpenClassPopup () {
        if (this.isDetailPage) return
        this.classShow = true
      },
      onCourseConfirm (val) {
        this.curCourse = val
        this.courseShow = false
      },
      onDeadlineConfirm (val) {
        this.deadline = val
        this.deadlineShow = false
      },
      doSelectClass (cls) {
        cls.active = !cls.active
      },
      doConfirmClass () {
        this.classShow = false
      },
      async doSubmit () {
        if (!this.submit.content) {
          this.$toast('请填写作业内容')
          return
        }
        const Toast = this.$toast.loading({
          // 持续展示 toast
          duration: 0,
          // 禁用背景点击
          forbidClick: true,
          loadingType: 'spinner',
          message: '作业发布中...'
        })
        this.submit.deadline = this.deadline.Format('yyyy-MM-dd 23:59:59')
        this.submit.courseId = this.curCourse.id
        this.submit.classIds = this.classList.filter(c => c.active).map(c => c.classId)
        if (this.isDetailPage) {
          await this.$api.teacher.updateTaskInfo(this.submit)
        } else {
          await this.$api.teacher.addTaskInfo(this.submit)
        }
        Toast.clear()
        this.$toast.success('成功')
        this.$router.back()
      },
      resetItemHeight () {
        if (this.itemHeight) return
        this.$nextTick(() => {
          this.itemHeight = this.$refs.coursePicker.$el.children[0].clientHeight || this.$refs.deadlinePicker.$el.children[0].clientHeight
        })
      },
      formatter (type, value) {
        let suffix = ''
        switch (type) {
          case 'year':
            suffix = '年'
            break
          case 'month':
            suffix = '月'
            break
          case 'day':
            suffix = '日'
            break
        }
        return value + suffix
      }
    }
  }
</script>

<style lang="sass">
  .homework-add
    .picture-map
      padding: $default-gap
    .tips
      margin: $default-gap
      color: $gray
    .van-popup--right
      width: 92%
      height: 100%
      .btn-primary
        margin: 0 auto
    .popup-right
      padding: $default-gap $default-gap 0
      margin-bottom: $default-gap
      height: calc(100% - #{$default-gap * 2 + 35px})
      overflow-y: auto
      .class-list__li
        @include rightPopupItem(3, 2%)
</style>
