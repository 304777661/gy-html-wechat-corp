<template>
  <div class="student-detail">
    <div class="student-detail-header">
      <p class="student-detail-header__text">
        <span>{{student.name}}</span>
      </p>
      <img :src="student.avatar | defaultAvatar" :alt="student.name" class="student-detail-header__avatar">
    </div>
    <van-cell-group>
      <van-cell title="班级学号" :value="student.classStudentNo || '--'"></van-cell>
      <van-cell title="全国学籍号" :value="student.nationStudentNo || '--'"></van-cell>
      <van-cell title="身份证号" :value="student.idCard || '--'"></van-cell>
      <van-cell title="出生日期" :value="student.birthday | ymd"></van-cell>
      <van-cell title="民族" :value="student.nationName || '--'"></van-cell>
      <van-cell title="户口性质" :value="$enums.ResidentType.getName(student.residentType) || '--'"></van-cell>
      <van-cell title="政治面貌" :value="$enums.PoliticsType.getName(student.politicsStatus) || '--'"></van-cell>
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
</template>

<script>

  export default {
    data () {
      const id = this.$route.query.id
      return {
        id,
        show: ['1'],
        student: {},
        fatherName: null,
        fatherPhone: null,
        motherName: null,
        motherPhone: null,
        guardianName: null,
        guardianPhone: null,
      }
    },
    async created () {
      this.student = await this.$api.teacher.getStudent({'id': this.id})
      if (this.student.father) {
        this.fatherName = this.student.father.name + '(父亲)'
        this.fatherPhone = this.student.father.phone
      }
      if (this.student.mother) {
        this.motherName = this.student.mother.name + '(母亲)'
        this.motherPhone = this.student.mother.phone
      }
      if (this.student.guardian) {
        this.guardianName = this.student.guardian.name + '(监护人)'
        this.guardianPhone = this.student.guardian.phone
      }
    },
    methods: {}
  }
</script>

<style lang="sass">
  .student-detail
    padding-bottom: 60px
    .van-collapse
      margin: 0 15px
      .van-cell
        padding-left: 0
        padding-right: 0
    &-header
      width: 100%
      height: 140px
      background: url("~IMAGE/student-info-bg.jpg") no-repeat bottom / cover
      @include ver-center-center
      &__avatar
        @include circle(65px)
      &__text
        margin-top: 8px
        color: #fff
        font-size: 18px
        line-height: 25px
        margin-bottom: 10px
        @include hor-center-center
        .icon
          margin-left: $default-gap
          padding: 3px
          font-size: 9px
          border-radius: 50%
          &.icon-male
            background: $blue
          &.icon-female
            background: $pink
</style>
