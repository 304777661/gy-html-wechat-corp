<template>
  <div class="week">
    <week-picker @changeDay="doChangeDay"
                 @changeWeek="doChangeWeek"/>
    <my-loading v-model="loading"/>
    <no-data v-show="!loading && !homeworkList.length"/>

    <div class="card-group" v-for="(workrecord,idx) in homeworkList" :key="'section' + idx">
      <card sharpen :tag="workrecord.courseName">

        <div class="card-group__body" v-for="tagrecord in  workrecord.interactTagRecords" :key="tagrecord.tagId">
          <div :class="['dot',{'advantage':tagrecord.tagType === 'PRAISE'},{'inactive':tagrecord.tagType === 'CRITICISM'}]">
            <div>
              <span class="tag green">{{tagrecord.tagName}}</span>
              <span v-for="student in tagrecord.students" :key="student.studentId">{{student.studentName}}</span>
            </div>
            <div class="secondline">
              <span class="gray">评语：</span>
              <span>{{tagrecord.remark}}</span>
            </div>
          </div>
        </div>

        <!--<div class="card-group__body">-->
          <!--<div class="inactive dot">-->
            <!--<div>-->
              <!--<span class="red">调皮捣蛋：</span>-->
              <!--<span>刘一男</span>-->
            <!--</div>-->
            <!--<div class="secondline">-->
              <!--<span class="gray">评语：</span>-->
              <!--<span>不听课不听课不听课不听课不听课不听课不听课不听课不听课不听课不听课</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

        <div class="card-cell">
          <div>
            <span class="icon icon-teacher"></span>
            <span class="cell-span-left">授课老师：</span>
            <span class="cell-span-right">{{workrecord.teacherName}}</span>
          </div>
        </div>
        <div class="card-cell" v-for="interactMat in workrecord.interactMats" :key="interactMat.interactMatId">
          <div>
            <span class="icon icon-teach-plan"></span>
            <span class="cell-span-left">教案：</span>
            <span class="cell-span-right">{{interactMat.fileName}}</span>
          </div>
        </div>
        <div class="card-cell">
          <div>
            <span class="icon icon-evaluate"></span>
            <span class="cell-span-left">课堂整体评价：</span>
            <span class="cell-span-right">{{workrecord.interactContent}}</span>
          </div>
        </div>

      </card>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        homeworkList: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      async initData (day = new Date()) {
        this.loading = true
        this.homeworkList = []
        this.homeworkList = await this.$api.parent.queryInteractRecordList(day.Format('yyyy-MM-dd hh:mm:ss'))
        console.log(this.homeworkList)
        this.loading = false
      },
      doChangeDay (day) {
        this.initData(day)
      },
      doChangeWeek (weekLists, idx) {
        this.initData(weekLists[idx].date)
      },
      goAdd () {
        this.$router.push('homework/add')
      }
    }
  }
</script>

<style lang="sass">
  .week
    .card-group
      padding: 0 $default-gap
      margin-bottom: 30px
      &__body
        padding: 10px 10px 10px $default-gap*2
        border-top: 1px solid $gray-light
        .dot
          position: relative
          margin-left: 25px
          .tag
            margin-right: 10px
          &:before
            content: ''
            $dot-wh: 8px
            position: absolute
            left: -20px
            top: 5px
            background: $green
            width: $dot-wh
            height: $dot-wh
            border-radius: 50%
          &.inactive:before
            background: $red
          &.advantage:before
            background: $green
          .secondline
            margin-top: 10px
          .red
            color: $red
          .green
            color: $green
          .gray
            color: $gray
    .card
      margin: $default-gap auto
      & + .card
        margin: 22px auto
    .icon
      margin-right: 6px
    .cell-span-right
      color: $black
    .cell-span-left
      color: $gray
</style>
