<!--选择访问学生-->
<template>
  <div class="select-student">
    <!--<div class="select-student-search">-->
    <!--<search v-model="query.keywords" @search="loadData"></search>-->
    <!--</div>-->

    <no-data v-show=" !loading && !studentList.length"/>
    <div ref="wrapper" class="select-student-wrapper">
      <van-list
        :loading="loading"
        :finished="true"
        @load="loadData">
        <div class="select-student-wrapper-item van-hairline--bottom"
             v-for="(item,index) in studentList"
             :key="index"
             @click="handleItemClick(item,index)">
          <img :src="item.avatar | defaultAvatar" class="select-student-wrapper-item__avatar">
          <span class="select-student-wrapper-item-name">{{item.name}}</span>
          <van-icon name="checked" size="40px" color="#4A77AF" v-show="item.isSelected"></van-icon>
        </div>
      </van-list>
    </div>

    <my-button :content="okBtnTitle" @btnClick="handleOkClick"></my-button>
  </div>
</template>

<script>
  export default {
    name: 'Students',
    data () {
      return {
        okBtnTitle: '确定',
        submitBtnTitle: '提交',
        studentList: [{
          'id': 1 /*主键*/,
          'name': 'name' /*姓名*/,
          'avatar': null /*头像*/,
          'sex': 'Female' /*性别0男1女：ALL|Male|Female*/,
          'classId': 1 /*班级Id*/,
          'className': 'className' /*班级名称*/,
          'gradeId': 1 /*年级Id*/,
          'grade': 'grade' /*年级*/
        }, {
          'id': 1 /*主键*/,
          'name': 'name' /*姓名*/,
          'avatar': null /*头像*/,
          'sex': 'Female' /*性别0男1女：ALL|Male|Female*/,
          'classId': 1 /*班级Id*/,
          'className': 'className' /*班级名称*/,
          'gradeId': 1 /*年级Id*/,
          'grade': 'grade' /*年级*/
        }, {
          'id': 1 /*主键*/,
          'name': 'name' /*姓名*/,
          'avatar': null /*头像*/,
          'sex': 'Female' /*性别0男1女：ALL|Male|Female*/,
          'classId': 1 /*班级Id*/,
          'className': 'className' /*班级名称*/,
          'gradeId': 1 /*年级Id*/,
          'grade': 'grade' /*年级*/
        }, {
          'id': 1 /*主键*/,
          'name': 'name' /*姓名*/,
          'avatar': null /*头像*/,
          'sex': 'Female' /*性别0男1女：ALL|Male|Female*/,
          'classId': 1 /*班级Id*/,
          'className': 'className' /*班级名称*/,
          'gradeId': 1 /*年级Id*/,
          'grade': 'grade' /*年级*/
        }],
        query: {
          keywords: null
        }
      }
    },
    methods: {
      handleOkClick () {
        // 数据校验
        let selectedIndex = -1
        for (let i = 0; i < this.studentList.length; i++) {
          if (this.studentList[i].isSelected) {
            selectedIndex = i
            break
          }
        }
        if (selectedIndex < 0) {
          this.$toast.fail('请选择学生')
          return
        }
        this.$eventBus.$emit('selectStudent', {
          id: this.studentList[selectedIndex].id,
          name: this.studentList[selectedIndex].name
        })
        this.$router.back()
      },

      handleItemClick (item, index) {
        for (let i = 0; i < this.studentList.length; i++) {
          this.studentList[i].isSelected = false
        }
        item.isSelected = true
        this.$set(this.studentList, index, item)
      },
      async loadData () {
        // this.studentList = await this.$api.teacher.queryStudentListByAdviser(this.query)
      }
    },
    async created () {
      this.loading = true
      this.loadData()
      for (let i = 0; i < this.studentList.length; i++) {
        this.studentList[i].isSelected = false
      }
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .select-student
    &-wrapper
      height: calc(100vh - 70px)
      &-item
        height: 59px
        line-height: 59px
        padding: 0 12px
        background: $white
        @include hor
        align-items: center
        &__avatar
          @include circle(40px)
        &-name
          color: $black
          flex: 1
          margin-left: 14px
          font-size: 17px
        .van-icon
          margin-right: 14px
</style>
