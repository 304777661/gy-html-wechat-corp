<!--选择访问学生-->
<template>
  <div class="select-student">
    <search v-model="keywords" @search="onSearch"></search>
    <no-data v-show="!loading && !studentList.length"/>
    <!--<div v-if="studentList && studentList.length>0">-->
    <div ref="wrapper" class="select-student-wrapper">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad">
        <div class="select-student-wrapper-item van-hairline--bottom"
             v-for="(item,index) in studentList"
             :key="index"
             @click="handleItemClick(item,index)">
          <img :src="item.avatar | defaultAvatar" class="select-student-wrapper-item__avatar">
          <span class="select-student-wrapper-item-name">{{item.name}}</span>
          <van-icon name="checked" class="icon-size" color="#4A77AF" v-show="item.isSelected"></van-icon>
        </div>
      </van-list>
    </div>
    <!--</div>-->
    <my-button :content="'确定'" @btnClick="handleOkClick"></my-button>
  </div>
</template>

<script>
  export default {
    name: 'Students',
    data () {
      return {
        loading: false,
        finished: true,
        studentList: [],
        keywords: null
      }
    },
    watch: {
      keywords (newVal) {
        if (!newVal) {
          this.loadData()
        }
      }
    },
    methods: {
      onSearch () {
        this.loadData()
      },
      onLoad () {
        this.loadData()
      },
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
        this.loading = true
        let studentList = await this.$api.teacher.queryStudentListByAdviser({'keywords': this.keywords})
        for (let i = 0; i < studentList.length; i++) {
          studentList[i].isSelected = false
        }
        this.studentList = studentList
        this.loading = false
      }
    },
    async created () {
      await this.loadData()
    }
  }
</script>

<style scoped lang="sass">
  .select-student
    .icon-size
      font-size: 20px
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
