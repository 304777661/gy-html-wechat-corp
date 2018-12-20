<template>
  <div class="work-add">
    <div class="wrapper">
      <van-cell title="开始时间" :value="resume.startTernName" @click="handleStartTermClick" is-link></van-cell>
      <van-cell title="结束时间" :value="resume.endTermName" @click="handleEndTermClick" is-link></van-cell>
      <van-cell title="教授科目" :value="resume.courseName" @click="handleCourseClick" is-link></van-cell>
      <van-cell title="年级" :value="resume.gradeName" @click="handleGradeClick" is-link></van-cell>
      <van-field label="班级" v-model="resume.className" placeholder="请输入" input-align="right"></van-field>
      <van-cell title="是否班主任" is-link :value="(resume.isAdviser === 'YES') ? '是':'否'" @click="handleAdviserClick">
      </van-cell>
    </div>

    <van-popup v-model="showPicker" position="bottom" :lazy-render="false">
      <van-picker show-toolbar
                  :item-height="itemHeight"
                  :columns="columns"
                  value-key="label"
                  @cancel="handlePickerCancelClick"
                  @confirm="handlePickerConfirmClick"></van-picker>
    </van-popup>

    <my-button :content="submitBtnTitle" @btnClick="handleSubmitClick"></my-button>

  </div>
</template>

<script>
  export default {
    name: 'WorkAdd',
    data () {
      return {
        submitBtnTitle: '提交',
        resume: {
          startTermId: 0 /*开始学期Id*/,
          startTernName: '' /*开始学期时间*/,
          endTermId: 0 /*结束学期Id*/,
          endTermName: '' /*结束学期时间*/,
          courseId: 0 /*教授课程Id*/,
          courseName: '' /*教授课程名称*/,
          gradeId: 0 /*年级Id*/,
          gradeName: '' /*年级名称*/,
          className: '' /*班级名称*/,
          isAdviser: 'NO'
        },
        showPicker: false,
        columns: [],
        itemHeight: 60,
        pickerType: '',
        termColumns: [],
        gradeColumns: []
      }
    },
    methods: {
      handlePickerCancelClick () {
        this.showPicker = false
        this.columns = []
      },
      handlePickerConfirmClick (item) {
        this.showPicker = false
        console.log(item)
        switch (this.pickerType) {
          case 'START_TERM':
            this.resume.startTernId = item.value
            this.resume.startTernName = item.label
            break
          case 'END_TERM':
            this.resume.endTermId = item.value
            this.resume.endTermName = item.label
            break
          case 'COURSE':
            this.resume.courseId = item.value
            this.resume.courseName = item.label
            break
          case 'GRADE':
            this.resume.gradeId = item.value
            this.resume.gradeName = item.label
            break
          case 'ADVISER':
            this.resume.isAdviser = item.value
            break
        }
      },
      handleStartTermClick () {
        this.pickerType = 'START_TERM'
        this.columns = this.termColumns
        this.showPicker = true
      },
      handleEndTermClick () {
        this.pickerType = 'END_TERM'
        this.columns = this.termColumns
        this.showPicker = true
      },
      handleCourseClick () {
        this.pickerType = 'COURSE'
        // todo
        this.columns = []
        this.showPicker = true
      },
      handleGradeClick () {
        this.pickerType = 'GRADE'
        this.columns = this.gradeColumns
        this.showPicker = true
      },
      handleAdviserClick () {
        this.pickerType = 'ADVISER'
        this.columns = this.$enums.YesNoStatus.list
        this.showPicker = true
      },
      handleSubmitClick () {
        // 数据校验
        if (!this.resume.startTernName || this.resume.startTernName.length === 0) {
          this.$toast.fail('请选择开始时间')
          return
        }
        if (!this.resume.endTermName || this.resume.endTermName.length === 0) {
          this.$toast.fail('请选择结束时间')
          return
        }
        if (!this.resume.courseName || this.resume.courseName.length === 0) {
          this.$toast.fail('请选择教授科目')
          return
        }
        if (!this.resume.gradeName || this.resume.gradeName.length === 0) {
          this.$toast.fail('请选择年级')
          return
        }
        if (!this.resume.className || this.resume.className.length === 0) {
          this.$toast.fail('请输入年级')
          return
        }
        // todo 添加工作经历
        this.$toast.success('提交成功')
        this.$router.back()
      },
    },
    async created () {
      this.termList = await this.$api.teacher.querySchoolTermList({})
      if (this.termList && this.termList.length > 0) {
        this.termColumns = this.termList.map(item => {
          return {
            label: item.name,
            value: item.id,
          }
        })
      }
      this.gradeList = await this.$api.teacher.queryClassCascadeList({})
      if (this.gradeList && this.gradeList.length > 0) {
        console.log(333)
        this.gradeColumns = this.gradeList.map(item => {
          return {
            label: item.label,
            value: item.value,
          }
        })
      }
    }
  }
</script>

<style scoped lang="sass">

</style>
