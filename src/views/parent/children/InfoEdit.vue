<template>
  <div class="info-edit">
    <div class="wrapper">
      <!--基本信息-->
      <van-cell-group>
        <van-field label="姓名" v-model="child.name" placeholder="请输入" clearable input-align="right"></van-field>
        <van-cell title="班级学号" :value="child.classStudentNo || '--'"></van-cell>
        <van-cell title="全国学籍号" :value="child.nationStudentNo || '--'"></van-cell>
        <van-field label="身份证号" v-model="child.idCard" placeholder="请输入" clearable input-align="right"></van-field>
        <van-cell title="出生年月" :value="child.birthday | ymd"></van-cell>
        <van-cell title="民族" :value="child.nationName || '--'"></van-cell>
        <van-cell title="户口性质" :value="$enums.ResidentType.getName(child.residentType)" is-link
                  @click="handleResidentClick">
        </van-cell>
        <van-cell title="政治面貌" :value="$enums.StudentPoliticsStatus.getName(child.politicsStatus)" is-link
                  @click="handlePoliticsClick">
        </van-cell>
        <van-field label="现居住地址" v-model="child.currentAddress" placeholder="请输入" clearable
                   input-align="right"></van-field>
        <van-collapse v-model="show">
          <van-collapse-item title="家长信息" name="1">
            <van-field label="父亲姓名" v-model="child.fatherName" placeholder="请输入" clearable
                       input-align="right"></van-field>
            <van-field label="父亲工作单位" v-model="child.fatherCompany" placeholder="请输入" clearable
                       input-align="right"></van-field>
            <van-field label="父亲电话" v-model="child.fatherPhone" placeholder="请输入" clearable
                       input-align="right"></van-field>
            <van-field label="母亲姓名" v-model="child.motherName" placeholder="请输入" clearable
                       input-align="right"></van-field>
            <van-field label="母亲工作单位" v-model="child.motherCompany" placeholder="请输入" clearable
                       input-align="right"></van-field>
            <van-field label="母亲电话" v-model="child.motherPhone" placeholder="请输入" clearable
                       input-align="right"></van-field>
            <van-field label="监护人姓名" v-model="child.guardianName" placeholder="请输入" clearable
                       input-align="right"></van-field>
            <van-field label="监护人工作单位" v-model="child.guardianCompany" placeholder="请输入" clearable
                       input-align="right" class="over-size"></van-field>
            <van-field label="监护人电话" v-model="child.guardianPhone" placeholder="请输入" clearable
                       input-align="right"></van-field>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>
    </div>
    <my-button :content="'提交'" @btnClick="handleSubmitClick"></my-button>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar
                  :columns="columns"
                  value-key="label"
                  @cancel="handleCancelClick"
                  @confirm="handleConfirmClick">
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'EditInfo',
    data () {
      return {
        id: this.$route.query.id,
        studentPoliticsColumns: this.$enums.StudentPoliticsStatus.list,
        residentTypeColumns: this.$enums.ResidentType.list,
        columns: [],
        showPicker: false,
        minDate: new Date(),
        child: {},
        pickerType: '',
        show: ['1'],
      }
    },
    methods: {
      handleCancelClick () {
        this.pickerType = ''
        this.columns = []
        this.showPicker = false
      },
      handleConfirmClick (item) {
        this.showPicker = false
        switch (this.pickerType) {
          case 'RESIDENT_TYPE':
            this.child.residentType = item.value
            break
          case 'STUDENT_POLITICS':
            this.child.politicsStatus = item.value
            break
        }
      },
      handleResidentClick () {
        this.pickerType = 'RESIDENT_TYPE'
        this.columns = this.residentTypeColumns
        this.showPicker = true
      },
      handlePoliticsClick () {
        this.pickerType = 'STUDENT_POLITICS'
        this.columns = this.studentPoliticsColumns
        this.showPicker = true
      },
      async handleSubmitClick () {
        if (!this.child.name || this.child.name.length === 0) {
          this.$toast.fail('请输入姓名')
          return
        }
        if (!this.child.idCard || this.child.idCard.length === 0) {
          this.$toast.fail('请输入身份证号')
          return
        }
        if (!this.$idCardUtil.checkIdCard(this.child.idCard)) {
          this.$toast.fail('身份证号不正确')
          return
        }
        if (!this.child.residentType || this.child.residentType.length === 0) {
          this.$toast.fail('请选择户口性质')
          return
        }
        if (!this.child.politicsStatus || this.child.politicsStatus.length === 0) {
          this.$toast.fail('请选择政治面貌')
          return
        }
        if (!this.child.currentAddress || this.child.currentAddress.length === 0) {
          this.$toast.fail('请输入现居住地')
          return
        }
        await this.$api.parent.addStudentChange(this.child)
        this.$toast.success('子女档案信息修改成功，请等待审核')
        this.$router.back()
      },
    },
    async created () {
      this.loading = true
      this.child = await this.$api.parent.getStudent({'id': this.id})
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .info-edit
    padding-bottom: $default-gap
    .wrapper
      height: calc(100vh - 80px)
    .over-size
      /deep/ .van-cell__title
        max-width: 120px
</style>
