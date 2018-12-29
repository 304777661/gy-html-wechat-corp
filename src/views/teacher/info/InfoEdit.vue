<template>
  <div class="info-edit">
    <div class="wrapper">
      <!--基本信息-->
      <van-cell-group>
        <van-field label="姓名" v-model="teacher.name" placeholder="请输入" clearable input-align="right"></van-field>
        <van-cell title="性别" :value="teacher.sex | sexLabel" is-link @click="handleSexClick"></van-cell>
        <van-cell title="当前状态" :value="$enums.JobStatus.getName(teacher.jobStatus) || '--'"></van-cell>
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
        <van-cell title="政治面貌" :value="$enums.PoliticsType.getName(teacher.politicsStatus)" is-link
                  @click="handlePoliticsClick"></van-cell>
        <van-cell title="加入时间" :value="teacher.joinPartyTime | ymd" is-link @click="handleJoinPartyTime"></van-cell>
        <van-cell title="第一学历" :value="$enums.EducationType.getName(teacher.firstEducation) || '--'"></van-cell>
        <van-cell title="最高学历" :value="$enums.HighestEducation.getName(teacher.highestEducation) || '请选择'" is-link
                  @click="handleHighEducationClick"></van-cell>
        <van-cell title="毕业时间" :value="teacher.graduateTime | ymd"></van-cell>
        <van-cell title="毕业学校" :value="teacher.graduateSchool || '--'"></van-cell>
        <van-cell title="参加工作时间" :value="teacher.joinWorkTime | ymd"></van-cell>
        <van-cell title="工龄" :value="teacher.workYears ? (teacher.workYears +'年') : '--'"></van-cell>
        <van-cell title="来校时间" :value="teacher.joinSchoolTime | ymd"></van-cell>
        <van-cell title="原工作单位" :value="teacher.lastWorkUnit || '--'"></van-cell>
      </van-cell-group>

      <van-cell-group>
        <van-cell title="职称信息" class="info-edit-sticky">
          <van-icon class="info-edit-sticky__add icon-size" name="add" color="#24A197" @click="handleAddClick()">
          </van-icon>
        </van-cell>

        <div class="info-edit-item"
             v-for="(teacherTitle,index) in teacher.teacherTitleList"
             :key="'teacherTitle'+index">
          <van-cell :title="'职称'+(index+1)" class="child-edit-item-title">
            <van-icon class="info-edit-item__del icon-size" name="delete" color="#ccc"
                      @click="handleDeleteClick(index)">
            </van-icon>
          </van-cell>
          <van-cell title="职称" :value="$enums.TeacherTitleType.getName(teacherTitle.title)" is-link
                    @click="handleTeacherTitleClick(index)">
          </van-cell>
          <van-cell title="评定时间" :value="teacherTitle.acquireTime | ymd" is-link
                    @click="handleTitleAcquireClick(index)">
          </van-cell>
        </div>
      </van-cell-group>
    </div>
    <my-button :content="'提交'" @btnClick="handleSubmitClick"></my-button>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar
                  :columns="columns"
                  value-key="label"
                  @cancel="handlePickerCancelClick"
                  @confirm="handlePickerConfirmClick">
      </van-picker>
    </van-popup>

    <van-popup v-model="showDatePicker" position="bottom" :lazy-render="false">
      <van-datetime-picker
        v-model="dateTime"
        type="date"
        @cancel="handleDatePickerCancel"
        @confirm="handleDatePickerConfirm"
        :max-date="maxDate"
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
        sexColumns: this.$enums.Sex.list,
        politicsColumns: this.$enums.PoliticsType.list,
        titleColumns: this.$enums.TeacherTitleType.list,
        highEducationColumns: this.$enums.HighestEducation.list,
        columns: [],
        teacherAcquireTime1: null,
        teacherAcquireTime2: null,
        teacherAcquireDate1: new Date(),
        teacherAcquireDate2: new Date(),
        showPicker: false,
        showDatePicker: false,
        teacherTitle1: null,
        teacherTitle2: null,
        minDate: new Date(1970, 1, 1),
        maxDate: new Date(),
        pickType: '',
        dateTime: null,
        teacher: {},
        titleIndex: -1,
        titleAcquireIndex: -1
      }
    },
    methods: {
      handleSexClick () {
        this.pickType = 'SEX'
        this.columns = this.sexColumns
        this.showPicker = true
      },
      handlePoliticsClick () {
        this.pickType = 'POLITICS'
        this.columns = this.politicsColumns
        this.showPicker = true
      },
      handleHighEducationClick () {
        this.pickType = 'HIGH_EDUCATION'
        this.columns = this.highEducationColumns
        this.showPicker = true
      },
      handlePickerCancelClick () {
        this.pickType = ''
        this.columns = []
        this.showPicker = false
      },
      handleJoinPartyTime () {
        this.pickType = 'JOIN_PARTY_DATE'
        this.dateTime = this.teacher.joinPartyTime ? new Date(this.teacher.joinPartyTime) : new Date()
        this.showDatePicker = true
      },
      handleTeacherTitleClick (index) {
        this.titleIndex = index
        this.pickType = 'TITLE' + index
        this.columns = this.titleColumns
        this.showPicker = true
      },
      handleTitleAcquireClick (index) {
        this.titleAcquireIndex = index
        this.pickType = 'TITLE_ACQUIRE_DATE' + index
        this.dateTime = this.teacher.teacherTitleList[index].acquireTime ? new Date(this.teacher.teacherTitleList[index].acquireTime) : new Date()
        this.showDatePicker = true
      },
      handleDatePickerCancel () {
        this.pickType = ''
        this.dateTime = null
        this.showDatePicker = false
      },
      handleDatePickerConfirm () {
        this.showDatePicker = false
        switch (this.pickType) {
          case 'JOIN_PARTY_DATE':
            this.teacher.joinPartyTime = this.dateTime
            break
          case 'TITLE_ACQUIRE_DATE' + this.titleAcquireIndex:
            this.teacher.teacherTitleList[this.titleAcquireIndex].acquireTime = this.dateTime
            break
        }
        this.dateTime = null
      },
      handlePickerConfirmClick (item) {
        this.showPicker = false
        switch (this.pickType) {
          case 'SEX':
            this.teacher.sex = item.value
            break
          case 'POLITICS':
            this.teacher.politicsStatus = item.value
            break
          case 'TITLE' + this.titleIndex:
            this.teacher.teacherTitleList[this.titleIndex].title = item.value
            this.titleIndex = -1
            break
          case 'HIGH_EDUCATION':
            this.teacher.highestEducation = item.value
            break
        }
        this.columns = []
      },
      handleAddClick () {
        if (!this.teacher.teacherTitleList) {
          this.teacher.teacherTitleList = []
        }
        this.teacher.teacherTitleList.push({
          title: '',
          acquireTime: null
        })
      },
      handleDeleteClick (index) {
        this.$dialog.confirm({
          title: `是否删除该职称信息？`
        }).then(() => {
          this.teacher.teacherTitleList.splice(index, 1)
        }, () => {
          console.log('用户取消')
        })
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
      async handleSubmitClick () {
        if (!this.teacher.name || this.teacher.name.length === 0) {
          this.$toast.fail('请输入姓名')
          return
        }
        if (!this.teacher.idCard || this.teacher.idCard.length === 0) {
          this.$toast.fail('请输入身份证号')
          return
        }
        if (!this.$idCardUtil.checkIdCard(this.teacher.idCard)) {
          this.$toast.fail('身份证号不正确')
          return
        }
        if (!this.teacher.phone || this.teacher.phone.length === 0) {
          this.$toast.fail('请输入联系电话')
          return
        }
        await this.$api.teacher.updateTeacher(this.teacher)
        this.$toast.success('提交成功')
        this.$router.back()
      },
    },
    async created () {
      this.loading = true
      this.teacher = await this.$api.teacher.getTeacherDetail({})
      if (this.teacher && this.teacher.teacherTitleList) {
        if (this.teacher.teacherTitleList.length >= 1) {
          this.teacherTitle1 = this.teacher.teacherTitleList[0].title
          this.teacherAcquireTime1 = new Date(this.teacher.teacherTitleList[0].acquireTime)
        } else if (this.teacher.teacherTitleList.length >= 2) {
          this.teacherTitle2 = this.teacher.teacherTitleList[1].title
          this.teacherAcquireTime2 = new Date(this.teacher.teacherTitleList[1].acquireTime)
        }
      }
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .info-edit
    padding-bottom: $default-gap
    margin-bottom: 70px
    .icon-size
      font-size: 18px
    &-item
      margin-top: 10px
      &__del
        top: 4px
        right: 2px
    &-sticky
      margin-top: 10px
      color: #24A197
      &__add
        top: 4px

</style>
