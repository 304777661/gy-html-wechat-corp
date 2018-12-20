<template>
  <div class="info-edit">
    <div class="wrapper">


      <!--基本信息-->
      <van-cell-group v-if="type==='basic'">
        <van-field label="姓名" v-model="teacher.name" placeholder="请输入" clearable input-align="right"></van-field>
        <van-cell title="性别" :value="getSex(teacher.sex)" is-link @click="handleSexClick"></van-cell>
        <van-cell title="当前状态" :value="getJobStatus(teacher.jobStatus) || '--'"></van-cell>
        <van-cell-group v-for="(course,index) in teacher.courseList" :key="'course'+index">
          <van-cell :title="(teacher.courseList.length === 1) ? '教授科目' : ('教授科目'+(index +1))"
                    :value="course.name || '--'">
          </van-cell>
        </van-cell-group>
        <van-cell-group v-for="(organ,index) in teacher.orgList" :key="'organ'+index">
          <van-cell :title="(teacher.orgList.length === 1) ? '所属部门':('所属部门'+(index+1))"
                    :value="organ.name || '--'">
          </van-cell>
        </van-cell-group>
        <van-cell title="年级" :value="teacher.grade || '--'"></van-cell>
        <van-field label="身份证号" v-model="teacher.idCard" placeholder="请输入" clearable input-align="right"></van-field>
        <van-field label="联系电话" v-model="teacher.phone" placeholder="请输入" clearable input-align="right"></van-field>
        <van-cell title="出生年月" :value="teacher.birthday | ymd"></van-cell>
        <van-cell title="年龄" :value="teacher.birthday ? (getAge(teacher.birthday)+'岁'): '--'"></van-cell>
        <van-cell title="民族" :value="teacher.folk || '--'"></van-cell>
        <van-cell title="籍贯" :value="teacher.residence || '--'"></van-cell>
        <van-cell title="政治面貌" :value="getPoliticsStatus(teacher.politicsStatus)" is-link
                  @click="handlePoliticsClick"></van-cell>
        <van-cell title="加入时间" :value="teacher.joinPartyTime | ymd" is-link @click="handleJoinPartyTime"></van-cell>
        <van-cell title="第一学历" :value="getEducation(teacher.firstEducation) || '--'"></van-cell>
        <van-cell title="最高学历" :value="getEducation(teacher.highestEducation) || '请选择'" is-link
                  @click="handleHighEducationClick"></van-cell>
        <van-cell title="毕业时间" :value="teacher.graduateTime | ymd"></van-cell>
        <van-cell title="毕业学校" :value="teacher.graduateSchool || '--'"></van-cell>
        <van-cell title="参加工作时间" :value="teacher.joinWorkTime | ymd"></van-cell>
        <van-cell title="工龄" :value="teacher.workYears ? (teacher.workYears +'年') : '--'"></van-cell>
        <van-cell title="来校时间" :value="teacher.joinSchoolTime | ymd"></van-cell>
        <van-cell title="原工作单位" :value="teacher.lastWorkUnit || '--'"></van-cell>
        <van-cell title="职称1" :value="getJobTitle(teacherTitle1)" is-link @click="handleTeacherTitle1Click"></van-cell>
        <van-cell title="评定时间1" :value="teacherAcquireTime1 | ymd" is-link @click="handleTitleAcquire1Click"></van-cell>
        <van-cell title="职称2" :value="getJobTitle(teacherTitle2)" is-link @click="handleTeacherTitle2Click"></van-cell>
        <van-cell title="评定时间2" :value="teacherAcquireTime2 | ymd" is-link @click="handleTitleAcquire2Click"></van-cell>
      </van-cell-group>

      <!--家庭信息-->
      <van-cell-group v-if="type==='children'">
        <van-cell title="家庭电话" :value="teacher.homeTel || '--'"></van-cell>
        <div class="info-basic-children" v-for="(child,index) in teacher.teacherChildList" :key="'child'+index">
          <van-cell :title="'子女信息'+(index+1)" class="info-basic-children-title"></van-cell>
          <van-cell title="姓名" :value="child.name || '--'"></van-cell>
          <van-cell title="性别" :value="getSex(child.sex) || '--'"></van-cell>
          <van-cell title="年龄" :value="(child.age || '--')+'岁'"></van-cell>
          <van-cell title="学校或单位" :value="child.unit || '--'"></van-cell>
          <van-cell title="备注" :value="child.remark || '--'"></van-cell>
        </div>
      </van-cell-group>
    </div>
    <my-button :content="submitBtnTitle" @btnClick="handleSubmitClick"></my-button>

    <van-popup v-model="showSexPicker"
               position="bottom"
               :lazy-render="false">
      <van-picker show-toolbar
                  :item-height="itemHeight"
                  :columns="sexColumns"
                  value-key="label"
                  @cancel="handleSexCancelClick"
                  @confirm="handleSexConfirmClick"></van-picker>
    </van-popup>

    <van-popup v-model="showPoliticsPicker"
               position="bottom"
               :lazy-render="false">
      <van-picker show-toolbar
                  :item-height="itemHeight"
                  :columns="politicsColumns"
                  value-key="label"
                  @cancel="handlePoliticsCancelClick"
                  @confirm="handlePoliticsConfirmClick"></van-picker>
    </van-popup>

    <van-popup v-model="showHighEducationPicker"
               position="bottom"
               :lazy-render="false">
      <van-picker show-toolbar
                  :item-height="itemHeight"
                  :columns="highEducationColumns"
                  value-key="label"
                  @cancel="handleHighEducationCancelClick"
                  @confirm="handleHighEducationConfirmClick"></van-picker>
    </van-popup>

    <van-popup v-model="showTeacherTitle1"
               position="bottom"
               :lazy-render="false">
      <van-picker show-toolbar
                  :item-height="itemHeight"
                  :columns="title1Columns"
                  value-key="label"
                  @cancel="handleTeacherTitle1CancelClick"
                  @confirm="handleTeacherTitle1ConfirmClick"></van-picker>
    </van-popup>

    <van-popup v-model="showTeacherTitle2"
               position="bottom"
               :lazy-render="false">
      <van-picker show-toolbar
                  :item-height="itemHeight"
                  :columns="title2Columns"
                  value-key="label"
                  @cancel="handleTeacherTitle2CancelClick"
                  @confirm="handleTeacherTitle2ConfirmClick"></van-picker>
    </van-popup>

    <van-popup v-model="showJoinPartyPicker"
               position="bottom"
               :lazy-render="false">
      <van-datetime-picker
        v-show="showJoinPartyPicker"
        v-model="joinPartyTime"
        type="date"
        class="time-picker"
        @cancel="handleJoinPartyTimeCancel"
        @confirm="handleJoinPartyTimeConfirm"
        :item-height="pickerItemHeight"
        :min-date="minDate">
      </van-datetime-picker>
    </van-popup>

    <van-popup v-model="showTitleAcquire1"
               position="bottom"
               :lazy-render="false">
      <van-datetime-picker
        v-show="showTitleAcquire1"
        v-model="teacherAcquireDate1"
        type="date"
        class="time-picker"
        @cancel="handleTitleAcquire1Cancel"
        @confirm="handleTitleAcquire1Confirm"
        :item-height="pickerItemHeight"
        :min-date="minDate">
      </van-datetime-picker>
    </van-popup>

    <van-popup v-model="showTitleAcquire2"
               position="bottom"
               :lazy-render="false">
      <van-datetime-picker
        v-show="showTitleAcquire2"
        v-model="teacherAcquireDate2"
        type="date"
        class="time-picker"
        @cancel="handleTitleAcquire2Cancel"
        @confirm="handleTitleAcquire2Confirm"
        :item-height="pickerItemHeight"
        :min-date="minDate">
      </van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'EditInfo',
    data () {
      return {
        type: this.$route.params.type,
        itemHeight: 60,
        pickerItemHeight: 70,
        joinPartyTime: new Date(),
        teacherAcquireTime1: new Date(),
        teacherAcquireDate1: new Date(),
        teacherAcquireTime2: new Date(),
        teacherAcquireDate2: new Date(),
        sexColumns: this.$enums.Sex.list,
        politicsColumns: this.$enums.PoliticsType.list,
        title1Columns: this.$enums.TeacherTitleType.list,
        title2Columns: this.$enums.TeacherTitleType.list,
        highEducationColumns: this.$enums.EducationType.list,
        showSexPicker: false,
        showPoliticsPicker: false,
        showJoinPartyPicker: false,
        showHighEducationPicker: false,
        showTitleAcquire1: false,
        showTitleAcquire2: false,
        showTeacherTitle1: false,
        showTeacherTitle2: false,
        submitBtnTitle: '提交',
        teacherTitle1: null,
        teacherTitle2: null,
        minDate: new Date(),
        teacher: {}
      }
    },
    methods: {
      getJobStatus (jobStatus) {
        if (jobStatus === 'DIMISSION') {
          return '离职'
        } else if (jobStatus === 'SERVING') {
          return '在职'
        } else {
          return '--'
        }
      },
      getPoliticsStatus (politicsStatus) {
        switch (politicsStatus) {
          case 'YOUNG_PIONEER':
            return '少先队员'
          case 'LEAGUE_MEMBER':
            return '共青团员'
          case 'COMMUNIST':
            return '共产党员'
          case 'MASSES':
            return '群众'
          default:
            return ''
        }
      },
      getEducation (education) {
        switch (education) {
          case 'JUNIOR_COLLEGE':
            return '专科'
          case 'REGULAR_COLLEGE':
            return '本科'
          case 'POSTGRADUATE':
            return '硕士研究生'
          case 'DOCTORAL_CANDIDATE':
            return '博士研究生'
          default:
            return ''
        }
      },
      getJobTitle (jobTitle) {
        switch (jobTitle) {
          case 'NOVICIATE':
            return '见习'
          case 'RANK_UNDECIDED':
            return '未评'
          case 'SECOND_GRADE':
            return '中小学二级教师'
          case 'FIRST_GRADE':
            return '中小学一级教师'
          case 'HIGHER_GRADE':
            return '中小学高级教师'
          default:
            return jobTitle
        }
      },
      getAge (strBirthday) {
        if (!strBirthday) {
          return '--'
        }
        strBirthday = new Date(strBirthday).Format('yyyy-MM-dd')
        let returnAge
        // 根据生日计算年龄（"1995-09-25"）
        // 以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
        let strBirthdayArr = strBirthday.split('-')
        let birthYear = strBirthdayArr[0]
        let birthMonth = strBirthdayArr[1]
        let birthDay = strBirthdayArr[2]

        let d = new Date()
        let nowYear = d.getFullYear()
        let nowMonth = d.getMonth() + 1
        let nowDay = d.getDate()

        if (nowYear == birthYear) {
          returnAge = '0'
        } else {
          let ageDiff = nowYear - birthYear //年之差
          if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
              let dayDiff = nowDay - birthDay//日之差
              if (dayDiff < 0) {
                returnAge = ageDiff - 1
              }
              else {
                returnAge = ageDiff
              }
            }
            else {
              let monthDiff = nowMonth - birthMonth//月之差
              if (monthDiff < 0) {
                returnAge = ageDiff - 1
              }
              else {
                returnAge = ageDiff
              }
            }
          }
          else {
            returnAge = '--'// 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge // 返回周岁年龄
      },
      getSex (sex) {
        switch (sex) {
          case 'Male':
            return '男'
          case 'Female':
            return '女'
          default:
            return '--'
        }
      },
      getEntryType (entryType) {
        switch (entryType) {
          case 'PAPER':
            return '论文'
          case 'COMPETITION':
            return '赛课及指导学生'
          case 'TOPICS':
            return '课题、课程'
          case 'ACADEMIC':
            return '经验交流及学术报告'
          default:
            return '--'
        }
      },
      handleSexClick () {
        this.showSexPicker = true
      },
      handleSexCancelClick () {
        this.showSexPicker = false
      },
      handleSexConfirmClick (item) {
        this.teacher.sex = item.value
        this.showSexPicker = false
      },
      handlePoliticsClick () {
        this.showPoliticsPicker = true
      },
      handlePoliticsCancelClick () {
        this.showPoliticsPicker = false
      },
      handlePoliticsConfirmClick (item) {
        this.teacher.politicsStatus = item.value
        this.showPoliticsPicker = false
      },
      handleJoinPartyTime () {
        this.joinPartyTime = this.teacher.joinPartyTime
        this.showJoinPartyPicker = true
      },
      handleJoinPartyTimeCancel () {
        this.showJoinPartyPicker = false
      },
      handleJoinPartyTimeConfirm () {
        this.teacher.joinPartyTime = this.joinPartyTime.Format('yyyy-MM-dd 00:00:00')
        this.showJoinPartyPicker = false
      },
      handleTeacherTitle1Click () {
        this.showTeacherTitle1 = true
      },
      handleTeacherTitle1CancelClick () {
        this.showTeacherTitle1 = false
      },
      handleTeacherTitle1ConfirmClick (item) {
        this.teacherTitle1 = item.value
        this.showTeacherTitle1 = false
      },
      handleTeacherTitle2Click () {
        this.showTeacherTitle2 = true
      },
      handleTeacherTitle2CancelClick () {
        this.showTeacherTitle2 = false
      },
      handleTeacherTitle2ConfirmClick (item) {
        this.teacherTitle2 = item.value
        this.showTeacherTitle2 = false
      },
      handleTitleAcquire1Click () {
        this.showTitleAcquire1 = true
      },
      handleTitleAcquire1Cancel () {
        this.showTitleAcquire1 = false
      },
      handleTitleAcquire1Confirm () {
        this.teacherAcquireTime1 = this.teacherAcquireDate1
        this.showTitleAcquire1 = false
      },
      handleTitleAcquire2Click () {
        this.showTitleAcquire2 = true
      },
      handleTitleAcquire2Cancel () {
        this.showTitleAcquire2 = false
      },
      handleTitleAcquire2Confirm () {
        this.teacherAcquireTime2 = this.teacherAcquireDate2
        this.showTitleAcquire2 = false
      },
      handleHighEducationClick () {
        this.showHighEducationPicker = true
      },
      handleHighEducationCancelClick () {
        this.showHighEducationPicker = false
      },
      handleHighEducationConfirmClick (item) {
        this.teacher.highestEducation = item.value
        this.showHighEducationPicker = false
      },
      async handleSubmitClick () {
        if (!this.teacher.name || this.teacher.name.length === 0) {
          this.$toast.fail('请输入姓名')
          return
        }
        if (!this.teacher.idCard || this.teacher.idCard.length === 0) {
          this.$toast.fail('请输入身份证号')
          return
        }
        if (!this.teacher.phone || this.teacher.phone.length === 0) {
          this.$toast.fail('请输入联系电话')
          return
        }
        // 拼接数据
        this.teacher.teacherTitleList = []
        if (this.teacherTitle1 && this.teacherTitle1.length > 0) {
          if (!this.teacherAcquireTime1) {
            this.$toast.fail('请选择职称1的评定时间')
          } else {
            this.teacher.teacherTitleList.push({
              title: this.teacherTitle1,
              acquireTime: this.teacherAcquireTime1.Format('yyyy-MM-dd 00:00:00')
            })
          }
        }
        if (this.teacherTitle2 && this.teacherTitle2.length > 0) {
          if (!this.teacherAcquireTime2) {
            this.$toast.fail('请选择职称2的评定时间')
          } else {
            this.teacher.teacherTitleList.push({
              title: this.teacherTitle2,
              acquireTime: this.teacherAcquireTime2.Format('yyyy-MM-dd 00:00:00')
            })
          }
        }
        console.log(1111111111)
        this.teacher.firstEducation = 'REGULAR_COLLEGE'
        await this.$api.teacher.updateTeacher(this.teacher)
        this.$toast.success('提交成功')
        this.$router.back()
      },
    },
    async created () {
      this.loading = true
      this.teacher = await this.$api.teacher.getTeacherDetail({})
      this.loading = true
    }
  }
</script>

<style scoped lang="sass">
  .info-edit
    padding-bottom: $default-gap
    .wrapper
      height: calc(100vh - 80px)
</style>
