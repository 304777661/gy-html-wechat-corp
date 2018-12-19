<template>
  <div class="activity-add">
    <div class="wrapper">

      <van-field label="活动名称" placeholder="请输入" v-model="activity.activityName" input-align="right"></van-field>
      <van-cell title="活动时间" :value="selectDate | ymd" is-link @click="handleTimePicker"></van-cell>
      <van-cell title="年级" :value="curGrade.name" is-link @click="handleGradePicker"></van-cell>
      <van-field label="活动地点" placeholder="请输入" v-model="activity.activityLocation" input-align="right"></van-field>
      <van-field label="举办单位" placeholder="请输入" v-model="activity.activitySponsor" input-align="right"></van-field>
      <van-field class="visit-detail-title" label="活动内容" disabled></van-field>
      <van-field v-model="activity.activityContent" type="textarea" input-align="left" :autosize="textAreaSize"
                 :value="activity.activityContent" placeholder="请输入"></van-field>
      <van-cell title="活动照片"></van-cell>
      <div class="activity-add-picture">
        <picture-map :upload="true" :pictures="activity.imageList"></picture-map>
      </div>
      <van-cell title="参与人员"></van-cell>
    </div>

    <van-popup v-model="showDatePicker" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="selectDate"
        type="date"
        show-toolbar
        :item-height="itemHeight"
        @confirm="handleDatePickerConfirm"
        @cancel="handleDatePickerCancel"
        :min-date="minDate">
      </van-datetime-picker>
    </van-popup>

    <van-popup v-model="showPopup" position="bottom" :overlay="true" lazy-render close-on-click-overlay>
      <van-picker :columns="columns"
                  show-toolbar
                  @cancel="handleGradeCancel"
                  @confirm="handleGradeConfirm"
                  :item-height="popupItemHeight"
                  value-key="label"
                  :loading="gradeLoading" ref="picker">
      </van-picker>

    </van-popup>

    <my-button :content="submitBtnTitle" @btnClick="handleSubmitClick"></my-button>
  </div>
</template>

<script>
  export default {
    name: 'AddActivity',
    data () {
      return {
        typeId: this.$route.params.typeId,
        showPopup: false,
        submitBtnTitle: '提交',
        showDatePicker: false,
        title: '',
        popupItemHeight: 60,
        itemHeight: 70,
        textAreaSize: {
          minHeight: 200
        },
        curGrade: {
          id: 0,
          name: ''
        },
        gradeList: [],
        minDate: new Date(),
        selectDate: new Date(),
        myself: {},
        gradeLoading: false,
        columns:
          [{
            values: [],
            // className: 'student-popup-item'
          }],
        activity:
          {
            activityType: 'ACTIVITY_PREPARE_LESSONS' /*活动类型1教研活动2备课活动：ALL|ACTIVITY_TEACH_GROUP|ACTIVITY_PREPARE_LESSONS*/,
            gradeId: 11 /*年级Id - 备课活动时必填[可选]*/,
            activityName: '名名名名名名名名名名名名名' /*活动名称*/,
            activityDate: '',
            activityLocation: '地点地点地点地点地点地点地点地点地点地点地点地点' /*活动地点*/,
            activitySponsor: '单位单位单位单位单位单位单位单位单位单位' /*举办单位*/,
            activityContent: '内容内容内容内容内容内容内容内容内容内容内容' /*活动内容*/,
            teacherList: [45],
            attachmentList: [
              {
                'fileName': 'bcebcb67460a' /*文件名*/,
                'fileUrl': 'https://gydev-1252687978.piccd.myqcloud.com/gy/corp-upload/80fa5a3c-34fd-4012-bb9f-bcebcb67460a.png' /*文件路径*/
              }, {
                'fileName': '2345' /*文件名*/,
                'fileUrl': 'https://gydev-1252687978.piccd.myqcloud.com/gy/corp-upload/80fa5a3c-34fd-4012-bb9f-bcebcb67460a.png' /*文件路径*/
              }
            ]

          }
      }
    },
    methods: {
      handleSubmitClick () {
        // 数据校验
        if (this.activity.activityName.length === 0) {
          this.$toast.fail('请输入活动名称')
          return
        }
        if (this.activity.activityLocation.length === 0) {
          this.$toast.fail('请输入活动地点')
          return
        }
        if (this.activity.activitySponsor.length === 0) {
          this.$toast.fail('请输入活动单位')
          return
        }
        if (this.activity.activityContent.length === 0) {
          this.$toast.fail('请输入活动内容')
          return
        }
        if (this.activity.teacherList.length === 0) {
          this.$toast.fail('请添加参与人员')
          return
        }
        if (this.type === 0 && this.grade.id <= 0) {
          this.$toast.fail('请选择年级')
          return
        }
        if (this.type === 0) {
          this.activity.gradeId = this.grade.id
        }
        this.activity.activityDate = this.selectDate.Format('yyyy-MM-dd 00:00:00')
        this.$api.teacher.addTeachGroupActivity(this.activity)
      },
      handleGradeConfirm (value, index) {
        console.log(value, index)
        this.curGrade = {
          id: this.gradeList[index[0]].gradeId,
          name: this.gradeList[index[0]].gradeName
        }
        this.showPopup = false
      },
      handleGradeCancel () {
        this.showPopup = false
      },
      handleTimePicker () {
        this.showDatePicker = true
      },
      handleGradePicker () {
        this.showPopup = true
      },
      handleDatePickerConfirm () {
        this.showDatePicker = false
      },
      handleDatePickerCancel () {
        this.showDatePicker = false
      }
    },
    async created () {
      this.activity.activityType = this.typeId === 0 ? 'ACTIVITY_TEACH_GROUP' : 'ACTIVITY_PREPARE_LESSONS'
      if (this.typeId === 0 || this.typeId === '0') {
        this.gradeLoading = true
        this.gradeList = await this.$api.teacher.queryClassCascadeList({})
        this.gradeLoading = false
        this.columns[0].values = this.gradeList.map(item => {
          return {
            label: item.label,
            value: item.value,
          }
        })

        if (this.gradeList && this.gradeList.length > 0) {
          this.curGrade = {
            id: this.gradeList[0].label,
            name: this.gradeList[0].value
          }
        }
      }
      this.myself = await this.$api.teacher.getSessionUserDetail()
      // this.activity.teacherList.push(this.myself)
    }
  }
</script>

<style scoped lang="sass">
  .activity-add
    .wrapper
      height: calc(100vh - 70px)
    &-picture
      background: $white
      padding: 10px 14px

</style>
