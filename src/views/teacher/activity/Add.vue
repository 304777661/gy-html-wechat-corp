<template>
  <div class="activity-add">
    <div class="wrapper">
      <van-cell-group>
        <van-field label="活动名称" placeholder="请输入" v-model="activity.activityName" input-align="right"></van-field>
        <van-cell title="活动时间" :value="activity.activityDate | ymd" is-link @click="handleTimePicker"></van-cell>
        <van-cell title="教研组" :value="curTeachGroup.label || '请选择'" is-link @click="handleTeachGroupPicker"
                  v-if="!isTeachGroup()"></van-cell>
        <van-cell title="年级" :value="curGrade.label || '请选择'" is-link @click="handleGradePicker"
                  v-if="!isTeachGroup()"></van-cell>
        <van-field label="活动地点" placeholder="请输入" v-model="activity.activityLocation" input-align="right"></van-field>
        <van-field label="举办单位" placeholder="请输入" v-model="activity.activitySponsor" input-align="right"></van-field>
      </van-cell-group>
      <van-cell title="活动内容" class="activity-add-sticky"></van-cell>
      <van-field v-model="activity.activityContent" type="textarea" input-align="left" :autosize="textAreaSize"
                 :value="activity.activityContent" placeholder="请输入">
      </van-field>
      <van-cell title="活动照片" class="activity-add-sticky"></van-cell>
      <div class="activity-add-picture ">
        <picture-map :upload="true" :pictures="imageList"></picture-map>
      </div>
      <van-cell title="参与人员" class="activity-add-sticky"></van-cell>
      <select-member :canAdd="true"
                     :canDelete="true"
                     :memberList="memberList"
                     @addClick="handleAddMemberClick">
      </select-member>
    </div>
    <van-popup v-model="showDatePicker" position="bottom">
      <van-datetime-picker
        v-model="selectDate"
        type="date"
        show-toolbar
        @confirm="handleDatePickerConfirm"
        @cancel="handleDatePickerCancel"
        :min-date="minDate">
      </van-datetime-picker>
    </van-popup>

    <van-popup v-model="showPopup" position="bottom">
      <van-picker :columns="columns"
                  show-toolbar
                  @cancel="handleGradeCancel"
                  @confirm="handleGradeConfirm"
                  value-key="label"
                  :loading="gradeLoading" ref="picker">
      </van-picker>
    </van-popup>

    <van-popup v-model="showPopup" position="bottom">
      <van-picker :columns="teacherGroupColumns"
                  show-toolbar
                  @cancel="handleTeacherGroupCancel"
                  @confirm="handleTeacherGroupConfirm"
                  value-key="label"
                  :loading="gradeLoading" ref="picker">
      </van-picker>
    </van-popup>

    <my-button :content="'提交'" @btnClick="handleSubmitClick"></my-button>
  </div>
</template>

<script>
  export default {
    name: 'AddActivity',
    data () {
      return {
        typeId: this.$route.params.typeId,
        showPopup: false,
        showDatePicker: false,
        showTeachGroupPicker: false,
        popupItemHeight: 60,
        itemHeight: 70,
        textAreaSize: {
          minHeight: 200
        },
        curGrade: {},
        curTeachGroup: {},
        gradeList: [],
        minDate: new Date(),
        selectDate: new Date(),
        myself: {},
        gradeLoading: false,
        columns: [],
        teacherGroupColumns: [],
        activity: {},
        imageList: [],
        memberList: [],
        teachGroupList: [],
        orgId: null
      }
    },
    methods: {
      handleTeachGroupPicker () {
        this.showTeachGroupPicker = true
      },
      handleTeacherGroupCancel () {
        this.showTeachGroupPicker = false
      },
      handleTeacherGroupConfirm (item) {
        this.orgId = item.tag
        let index = this.teachGroupList.findIndex(teachGroupItem => teachGroupItem.value === item.value)
        this.curTeachGroup = this.teachGroupList[index]
        this.columns = this.teachGroupList[index].map(item => {
          return {
            label: item.label,
            value: item.value,
          }
        })
        this.showTeachGroupPicker = false
      },
      async handleSubmitClick () {
        // 数据校验
        if (!this.activity.activityName || this.activity.activityName.length === 0) {
          this.$toast.fail('请输入活动名称')
          return
        }
        if (!this.curTeachGroup || this.curTeachGroup.value < 0) {
          this.$toast.fail('请选择教研组')
          return
        }
        if (!this.activity.activityLocation || this.activity.activityLocation.length === 0) {
          this.$toast.fail('请输入活动地点')
          return
        }
        if (!this.activity.activitySponsor || this.activity.activitySponsor.length === 0) {
          this.$toast.fail('请输入活动单位')
          return
        }
        if (!this.activity.activityContent || this.activity.activityContent.length === 0) {
          this.$toast.fail('请输入活动内容')
          return
        }
        if (this.memberList.length === 0) {
          this.$toast.fail('请添加参与人员')
          return
        }
        if ((!this.isTeachGroup()) && this.curGrade.value <= 0) {
          this.$toast.fail('请选择年级')
          return
        }
        if (!this.isTeachGroup()) {
          this.activity.gradeId = this.curGrade.value
        }
        this.activity.activityDate = this.selectDate.Format('yyyy-MM-dd 00:00:00')
        // 人员
        this.activity.teacherList = []
        this.memberList.map(item => {
          this.activity.teacherList.push(item.id)
        })
        // 附件
        if (this.imageList && this.imageList.length > 0) {
          this.activity.attachmentList = []
          this.imageList.map(item => {
            this.activity.attachmentList.push({
              fileName: item.substr(item.lastIndexOf('/') + 1).toLowerCase(),
              fileUrl: item
            })
          })
        }
        await this.$api.teacher.addTeachGroupActivity(this.activity)
        this.$toast.success('提交成功')
        this.$router.back()
      },
      handleGradeConfirm (item) {
        this.showPopup = false
        this.curGrade = item
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
        this.activity.activityDate = this.selectDate.Format('yyyy-MM-dd 00:00:00')
        this.showDatePicker = false
      },
      handleDatePickerCancel () {
        this.showDatePicker = false
      },
      handleAddMemberClick () {
        sessionStorage.setItem('MEETING_MEMBER', JSON.stringify(this.memberList))
        this.$router.push(`/teacher/activity/member/${this.orgId}`)
      },
      handleMemberSelectedEvent () {
        this.$eventBus.$on('memberSelectedEvent', (memberSelectedList) => {
          this.memberList = memberSelectedList
        })
      },
      isTeachGroup () {
        return this.typeId === 0 || this.typeId === '0'
      }
    },
    async created () {
      this.activity.activityType = this.isTeachGroup() ? 'ACTIVITY_TEACH_GROUP' : 'ACTIVITY_PREPARE_LESSONS'
      this.activity.activityDate = this.selectDate.Format('yyyy-MM-dd 00:00:00')
      this.teachGroupList = this.$api.teacher.queryTeachGroupListWithUser({})

      if (this.teachGroupList && this.teachGroupList.length > 0) {
        this.curTeachGroup = this.teachGroupList[0]
        this.teacherGroupColumns = this.teachGroupList.map(item => {
          return {
            label: item.label,
            value: item.value,
            tag: item.tag
          }
        })
      }
      let myself = await this.$api.teacher.getSessionUserDetail({})
      myself.id = myself.userId
      this.myself = myself
      this.memberList.push(this.myself)
    },
    mounted () {
      this.handleMemberSelectedEvent()
    }
  }
</script>

<style scoped lang="sass">
  .activity-add
    .wrapper
      height: calc(100vh - 70px)
    &-sticky
      margin-top: 10px
    &-picture
      background: $white
      padding: 10px 14px

</style>
