<!--添加家访记录-->
<template>
  <div class="visit-add">
    <div class="wrapper">


      <van-cell-group>
        <van-cell title="学生" is-link :value="visit.studentName ||'请选择'" @click="handleStudentsClick">
        </van-cell>
        <van-cell title="家访时间" :value="visit.visitDate | ymd"
                  is-link @click="handleSelectTimeClick"></van-cell>
        <van-field label="家访对象" v-model="visit.visitObject" input-align="right" placeholder="请输入"></van-field>
      </van-cell-group>

      <van-field class="visit-add-title" label="家访内容" disabled></van-field>
      <van-field
        v-model="visit.visitContent"
        type="textarea"
        input-align="left"
        :autosize="textAreaSize"
        placeholder="请输入">
      </van-field>
      <van-field class="visit-add-title" label="照片" disabled></van-field>

      <div class="visit-add-picture">
        <picture-map :pictures="imageList" :upload="true"/>
      </div>

      <van-popup v-model="showDatePicker" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="visitTime"
          type="date"
          show-toolbar
          @confirm="handleDatePickerConfirm"
          @cancel="handleDatePickerCancel"
          :min-date="minDate">
        </van-datetime-picker>
      </van-popup>
    </div>
    <my-button :content="submitBtnTitle" @btnClick="handleSubmitClick"></my-button>
  </div>
</template>

<script>
  export default {
    name: 'AddVisit',
    data () {
      return {
        submitBtnTitle: '提交',
        showDatePicker: false,
        minDate: new Date(),
        visitTime: new Date(),
        textAreaSize: {
          minHeight: 200
        },
        itemHeight: 70,
        imageList: [],
        visit: {
          visitDate: new Date(),
          visitObject: '',
          visitContent: '',
          attachments: [],
          studentId: 0,
          studentName: ''
        }
      }
    },
    methods: {
      handleSelectStudentEvent () {
        this.$eventBus.$on('selectStudent', ({id, name}) => {
          this.visit.studentId = id
          this.visit.studentName = name
        })
      },
      handleStudentsClick () {
        this.$router.push(`/teacher/visit/students`)
      },
      async handleSubmitClick () {
        // 数据校验
        if (this.visit.studentName.length === 0) {
          this.$toast.fail('请选择学生')
          return
        }
        if (this.visit.visitObject.length === 0) {
          this.$toast.fail('请输入家访对象')
          return
        }
        if (this.visit.visitContent.length === 0) {
          this.$toast.fail('请输入家访内容')
          return
        }
        this.visit.visitDate = this.visitTime.Format('yyyy-MM-dd 00:00:00')
        if (this.imageList && this.imageList.length > 0) {
          this.imageList.map(item => {
            this.visit.attachments.push({
              fileName: item.substr(item.lastIndexOf('/') + 1).toLowerCase(),
              fileUrl: item
            })
          })
        }
        await this.$api.teacher.addHomeVisitingWX(this.visit)
        this.$toast.success('添加成功')
        this.$router.back()
      },
      handleSelectTimeClick () {
        this.showDatePicker = true
      },
      handleDatePickerConfirm () {
        this.visit.visitDate = this.visitTime
        this.showDatePicker = false
      },
      handleDatePickerCancel () {
        this.showDatePicker = false
      }
    },
    mounted () {
      this.handleSelectStudentEvent()
    }
  }
</script>

<style scoped lang="sass">
  .visit-add
    .wrapper
      height: calc(100vh - 80px)
    &-title
      margin-top: 10px
    &-picture
      background: white
      padding: 10px 14px
</style>
