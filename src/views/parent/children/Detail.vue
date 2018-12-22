<template>
  <div class="child-detail">
    <div class="child-detail-header">
      <p class="child-detail-header__name">{{student.name}}</p>
      <div class="child-detail-header-wrapper">
        <img class="child-detail-header-wrapper__avatar" :src="student.avatar | defaultAvatar">
        <div class="child-detail-header-wrapper__tag" v-show="!showSetPrimary">
          <img src="../../../assets/images/main-children.png"/>
          <span>主</span>
        </div>
      </div>
      <div class="child-detail-header__setting" @click="handleSetPrimaryClick" v-show="showSetPrimary">设置主查询</div>
    </div>
    <my-tabs :tabs="tabs" @tabChanged="handleTabChange"></my-tabs>
    <div v-show="curTabIndex === 0" class="child-detail-tab">
      <van-cell-group :border="false">
        <van-cell title="班级学号" :value="student.classStudentNo || '--'"></van-cell>
        <van-cell title="全国学籍号" :value="student.nationStudentNo || '--'"></van-cell>
        <van-cell title="身份证号" :value="student.idCard || '--'"></van-cell>
        <van-cell title="出生日期" :value="student.birthday | ymd"></van-cell>
        <van-cell title="民族" :value="student.nationName || '--'"></van-cell>
        <van-cell title="户口性质" :value="getResidentType(student.residentType) || '--'"></van-cell>
        <van-cell title="政治面貌" :value="getPoliticsStatus(student.politicsStatus) || '--'"></van-cell>
        <van-cell title="家庭住址" :value="student.currentAddress || '--'"></van-cell>
        <van-collapse v-model="show" v-show="fatherName || motherName || guardianName">
          <van-collapse-item title="家长信息" name="1">
            <van-cell v-show="fatherName" :title="fatherName" :value="fatherPhone || '--'">
              <a :href="'tel:'+fatherPhone">{{fatherPhone || '--'}}</a>
            </van-cell>
            <van-cell v-show="motherName" :title="motherName" :value="motherPhone || '--'">
              <a :href="'tel:'+motherPhone">{{motherPhone || '--'}}</a>
            </van-cell>
            <van-cell v-show="guardianName" :title="guardianName" :value="guardianPhone || '--'">
              <a :href="'tel:'+guardianPhone">{{guardianPhone || '--'}}</a>
            </van-cell>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>
    </div>

    <div v-show="curTabIndex === 1" class="child-detail-tab prize">
      <div class="child-detail-tab-prize" v-for="(prize,index) in prizeList" :key="prize.id">
        <div class="child-detail-tab-prize-title van-hairline--bottom">
          <span>获奖情况{{index+1}}</span>
          <span @click="handlePrizeEdit(prize)"><img src="../../../assets/images/edit.png">编辑</span>
        </div>
        <van-cell-group :border="false">
          <van-cell title="奖项名称" :value="prize.prizeName || '--'"></van-cell>
          <van-cell title="获奖级别" :value="$enums.PrizeLevel.getName(prize.prizeLevel) || '--'"></van-cell>
          <van-cell title="举办单位" :value="prize.sponsor || '--'"></van-cell>
          <van-cell title="获奖时间" :value="prize.prizeDate | ymd"></van-cell>
          <van-cell title="证明材料" :value="prize.nationName || '--'"></van-cell>
        </van-cell-group>
      </div>

      <my-button :content="addPrizeBtnTitle" @btnClick="handleAddPrizeClick"></my-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChildrenDetail',
    data () {
      const id = this.$route.params.id
      return {
        id,
        curTabIndex: 0,
        loading: false,
        showSetPrimary: true,
        addPrizeBtnTitle: '增加获奖情况',
        tabs: [
          {
            id: 0,
            label: '基本信息'
          },
          {
            id: 1,
            label: '获奖情况'
          }
        ],
        show: ['1'],
        fatherName: null,
        fatherPhone: null,
        motherName: null,
        motherPhone: null,
        guardianName: null,
        guardianPhone: null,
        student: {
          'id': 1 /*主键*/,
          'classId': 1 /*班级Id*/,
          'className': 'className' /*班级名称*/,
          'name': 'name' /*姓名*/,
          'avatar': 'avatar' /*头像*/,
          'sex': 'Female' /*性别0男1女：ALL|Male|Female*/,
          'usedName': 'usedName' /*曾用名*/,
          'idCard': 'idCard' /*身份证号*/,
          'birthday': '2018-12-13 20:23:51' /*出生日期*/,
          'isSchoolRoll': 'NO' /*是否有学籍：ALL|YES|NO*/,
          'flowStudentNo': 'flowStudentNo' /*长沙市学籍号*/,
          'nationStudentNo': 'nationStudentNo' /*全国学籍号*/,
          'primaryStudentNo': 'primaryStudentNo' /*小学学籍号*/,
          'classStudentNo': 'classStudentNo' /*班级学号*/,
          'studentStatus': 'EXPEL' /*学生状态1在校生2转入3本校寄读4复学5保留学籍6转出7休学8外校寄读：ALL|INTERNAL_STUDENT|INTO|POST_READING|REENTRY|KEEP_STUDENT|OUT_OF|QUIT_SCHOOL|OUT_POST_READING|EXPEL*/,
          'studentNature': 'OTHER' /*学生性质：ALL|AT_SCHOOL|LEAVE_SCHOOL|GRADUATE|OTHER*/,
          'remark': 'remark' /*备注*/,
          'nativePlace': 'nativePlace' /*籍贯*/,
          'nationId': 1 /*民族Id*/,
          'nationName': 'nationName' /*民族*/,
          'residentType': 'VILLAGE' /*户口类型1城市2县城3农村：ALL|CITY|COUNTY|VILLAGE*/,
          'enrollType': 'OTHER_PLACES' /*入学方式1划片2外地：ALL|PLACE|OTHER_PLACES*/,
          'politicsStatus': 'MASSES' /*政治面貌1少先队员2团员3党员4群众：ALL|YOUNG_PIONEER|LEAGUE_MEMBER|COMMUNIST|MASSES*/,
          'isImmigrant': 'NO' /*是否外来人口0否1是：ALL|YES|NO*/,
          'situationStatus': 'DISTRICT_POVERTY' /*家庭状况1父母双残2本地贫困户3外来贫困户4区县贫困户：ALL|NONE|DISABILITY|POVERTY|OTHER_POVERTY|DISTRICT_POVERTY*/,
          'enrollmentSchool': 'enrollmentSchool' /*生源学校*/,
          'residentRegionCode': 'residentRegionCode' /*户口所在地区码*/,
          'residentRegion': 'residentRegion' /*户口所在地*/,
          'currentAddressCode': 'currentAddressCode' /*现住址地区码*/,
          'currentAddress': 'currentAddress' /*现住址*/,
          'speciality': 'speciality' /*特长*/,
          'isLeftover': 'NO' /*是否留守儿童0否1是：ALL|YES|NO*/,
          'disabilityStatus': 'AMENTIA' /*残疾状态1盲2聋哑3智障：ALL|NONE|BLIND|SURDIMUTISM|AMENTIA*/,
          'isMigrantWorker': 'NO' /*是否是外来务工人员：ALL|YES|NO*/,
          'isSingle': 'NO' /*是否独生子女0否1是：ALL|YES|NO*/,
          'isOverseas': 'NO' /*是否港澳台侨0否1是：ALL|YES|NO*/,
          'isStaffChild': 'NO' /*是否教职工子女0否1是：ALL|YES|NO*/,
          'migrantWorkType': 'OTHER' /*进城务工类型：ALL|WAGE|SMALL_CAPITAL|FACTORY|OTHER*/,
          'phone': '13487317051' /*联系电话*/,
          'isDelete': 'NO' /*是否删除0否1是：ALL|YES|NO*/,
          'createdTime': '2018-12-13 20:23:51' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
          'updatedTime': '2018-12-13 20:23:51' /*更新时间 默认值：CURRENT_TIMESTAMP*/,
          'fatherName': 'fatherName' /*父亲姓名*/,
          'fatherCompany': 'fatherCompany' /*父亲工作单位*/,
          'fatherPhone': 'fatherPhone' /*父亲联系电话*/,
          'motherName': 'motherName' /*母亲姓名*/,
          'motherCompany': 'motherCompany' /*母亲工作单位*/,
          'motherPhone': 'motherPhone' /*母亲联系电话*/,
          'guardianName': 'guardianName' /*监护人姓名*/,
          'guardianCompany': 'guardianCompany' /*监护人工作单位*/,
          'guardianPhone': 'guardianPhone' /*监护人联系电话*/,
          'father': {
            'id': 1 /*主键[可选]*/,
            'name': 'name' /*姓名*/,
            'company': 'company' /*工作单位[可选]*/,
            'phone': '13487317051' /*联系电话*/
          },
          'mother': {
            'id': 1 /*主键[可选]*/,
            'name': 'name' /*姓名*/,
            'company': 'company' /*工作单位[可选]*/,
            'phone': '13487317051' /*联系电话*/
          },
          'guardian': {
            'id': 1 /*主键[可选]*/,
            'name': 'name' /*姓名*/,
            'company': 'company' /*工作单位[可选]*/,
            'phone': '13487317051' /*联系电话*/
          }
        },
        prizeList: [
          {
            'id': 1 /*主键*/,
            'studentId': 1 /*学生Id*/,
            'parentUserId': 1 /*家长用户Id*/,
            'prizeName': '奖励1' /*奖励名称*/,
            'prizeDate': '2018-12-13 20:23:51' /*获奖时间*/,
            'prizeLevel': 'OTHER' /*奖励等级：ALL|COUNTRY|PROVINCE|CITY|COUNTY|DISTRICT|SCHOOL|OTHER*/,
            'sponsor': '共青团' /*举办单位*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 20:23:51' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 20:23:51' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          },
          {
            'id': 2 /*主键*/,
            'studentId': 1 /*学生Id*/,
            'parentUserId': 3 /*家长用户Id*/,
            'prizeName': '奖励2' /*奖励名称*/,
            'prizeDate': '2018-12-13 20:23:51' /*获奖时间*/,
            'prizeLevel': 'OTHER' /*奖励等级：ALL|COUNTRY|PROVINCE|CITY|COUNTY|DISTRICT|SCHOOL|OTHER*/,
            'sponsor': '少年团' /*举办单位*/,
            'isDelete': 'NO' /*是否删除：ALL|YES|NO*/,
            'createdTime': '2018-12-13 20:23:51' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
            'updatedTime': '2018-12-13 20:23:51' /*更新时间 默认值：CURRENT_TIMESTAMP*/
          },
        ]
      }
    },
    async created () {
      this.loading = true
      this.student = await this.$api.parent.getStudent({'id': this.id})
      this.prizeList = await this.$api.parent.queryStudentPrizeList({})
      // console.log(this.prizeList)
      if (this.student.father) {
        this.fatherName = this.student.father.name + '(父亲)'
        this.fatherPhone = this.student.father.phone
      }
      if (this.student.mother) {
        this.motherName = this.student.mother.name + '(母亲)'
        this.motherPhone = this.student.father.phone
      }
      if (this.student.guardian) {
        this.guardianName = this.student.guardian.name + '(监护人)'
        this.guardianPhone = this.student.guardian.phone
      }
      this.loading = false
    },
    methods: {
      getResidentType (residentType) {
        switch (residentType) {
          case 'CITY':
            return '城市'
          case 'COUNTY':
            return '县城'
          case 'VILLAGE':
            return '农村'
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
        }
      },
      handleTabChange (curTabIndex) {
        if (this.curTabIndex === curTabIndex) {
          return
        }
        this.curTabIndex = curTabIndex

      },

      handlePrizeEdit (prize) {

      },
      handleAddPrizeClick () {
        this.$router.push(`/parent/children/prize/add`)
      },
      async handleSetPrimaryClick () {
        this.loading = true
        await this.$api.parent.setCurrentChild({'studentId': this.id})
        this.loading = false
        this.$toast.success('设置成功')
        this.showSetPrimary = false
      }
    }
  }
</script>

<style scoped lang="sass">
  .child-detail
    .prize
      padding-bottom: 70px
    &-header
      height: 210px
      background: $dark-blue
      @include ver-center-center
      &__name
        color: $white
        font-size: 18px
        line-height: 25px
        text-align: center
      &-wrapper
        position: relative
        &__avatar
          margin-top: 20px
          @include circle(74px)
          border: 1px solid #FAFBFD
        &__tag
          position: absolute
          top: 25px
          right: -8px
          width: 25px
          height: 14px
          img
            position: absolute
          span
            position: absolute
            z-index: 2
            font-size: 11px
            left: 4px
            top: 2px
            color: $white
      &__setting
        color: $white
        margin-top: 20px
        font-size: 15px
        line-height: 21px
        background: #FFC500
        border-radius: 8px
        padding: 6px 25px
    &-tab
      margin-top: 10px
      &-prize
        position: relative
        &-title
          background: $white
          padding: 10px 16px
          @include hor-between-center
          span
            color: #24A197
            font-size: 13px
            line-height: 18px
          img
            width: 15px
            height: 15px
            margin-right: 8px

</style>
