<template>
  <div class="curriculum">
    <p class="curriculum__semester">{{termName || '2017-2018学年下学期'}}</p>
    <div class="curriculum__picker">
      <select-picker type="grade"
                     @confirm="onGradeConfirm"/>
      <select-picker :columns="classList"
                     @confirm="onClassConfirm"/>
    </div>

    <no-data v-show="!loading && !sectionList.length"/>
    <my-loading v-model="loading"/>

    <div class="curriculum__table" v-show="!loading && sectionList.length">
      <table>
        <tr>
          <th></th>
          <th v-for="week in weekList"
              :key="week">{{$enums.DayOfWeek.getName(week)}}</th>
        </tr>
        <tr v-for="(section, sectionIdx) in sectionList"
            :key="'section' + sectionIdx">
          <td>
            <p>{{section.sectionName}}</p>
            <p class="gray">{{section.startTime | hm}}</p>
            <p class="gray rotate90">~</p>
            <p class="gray">{{section.endTime | hm}}</p>
          </td>
          <td v-for="(course, courseIdx) in section.courseList"
              :key="'course' + courseIdx">
            <div class="td"
                 :style="[generateColorAndBgColor(course.courseName)]">
              <p>{{course.courseName}}</p>
              <!--<p class="td-class-name">{{course.className}}</p>-->
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: true,
        termName: null,
        classList: [],
        sectionList: [],
        courseList: [],
        weekList: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
      }
    },
    created () {
      this.getSectionList()
    },
    methods: {
      async getSectionList () {
        this.sectionList = await this.$api.teacher.queryCourseSectionSetList()
      },
      async getClassList (gradeId) {
        let data = await this.$api.teacher.queryGradeClassList(gradeId)
        if (!data || !data.length) {
          this.$toast('该年级下没有班级, 请切换年级')
          this.classList = [{
            label: '无班级信息',
            id: null
          }]
          return
        }
        this.classList = data.map(cls => {
          return {
            label: cls.className,
            id: cls.id
          }
        })
        this.getCurriculumList(this.classList[0].id)
      },
      async getCurriculumList (classId) {
        this.loading = true
        let data = await this.$api.teacher.queryClassTimetable(classId)
        this.termName = data.termName
        let courseData = data.courseTimetableDetails
        for (let i = 0; i < this.sectionList.length; i++) {
          let section = this.sectionList[i]
          section.courseList = Array.apply(null, Array(5)).map(() => {
            return {}
          })
          for (let j = 0; j < courseData.length; j++) {
            let course = courseData[j]
            if (section.sectionSeq === course.sectionSeq) {
              section.courseList[this.weekList.indexOf(course.dayOfWeek)] = course
            }
          }
        }
        this.loading = false
      },
      onGradeConfirm (grade) {
        this.getClassList(grade.id)
      },
      onClassConfirm (cls) {
        if (!cls) return
        this.getCurriculumList(cls.id)
      },
      generateColorAndBgColor (curriculum) {
        switch (curriculum) {
          case '语文':
            return {
              color: '#f76167',
              backgroundColor: '#ffd8d6'
            }
          case '数学':
            return {
              color: '#4e7ad8',
              backgroundColor: '#d4f1ff'
            }
          case '英语':
          case '外语':
            return {
              color: '#7157b5',
              backgroundColor: '#dadefc'
            }
          case '历史':
            return {
              color: '#ff46a9',
              backgroundColor: '#ffd6f1'
            }
          case '生物':
            return {
              color: '#21ad86',
              backgroundColor: '#c3ffd8'
            }
          case '地理':
            return {
              color: '#a46f3e',
              backgroundColor: '#efe0c6'
            }
          case '化学':
            return {
              color: '#2ab0c4',
              backgroundColor: '#b7ebfe'
            }
          case '物理':
            return {
              color: '#',
              backgroundColor: '#'
            }
          case '音乐':
            return {
              color: '#7dbc68',
              backgroundColor: '#bdf0b6'
            }
          case '体育':
            return {
              color: '#718180',
              backgroundColor: '#d0dbe0'
            }
        }
      }
    }
  }
</script>

<style lang="sass">
  .curriculum
    &__semester
      line-height: 35px
      text-align: center
      color: $gray
      font-weight: bold
      background: #fff
    &__picker
      padding: 10px 0
      background: #fff
      @include hor-around-center
    &__table
      $td-height: 57.5px
      width: 100%
      padding: $default-gap $default-gap 30px
      table
        $border-radius: 10px
        position: relative
        width: 100%
        text-align: center
        vertical-align: middle
        border-radius: $border-radius
        $shadow-color: #bccaec
        box-shadow: 0 0 20px 4px $shadow-color, 0 10px 0 -3px #fff, 0 11px 20px -3px $shadow-color, 0 20px 0 -6px #fff, 0 21px 20px -6px $shadow-color
        z-index: 2
        overflow: hidden
      th, td
        height: $td-height
        min-height: $td-height
        max-height: $td-height
        border-right: 1px dashed $gray-light
        border-top: 1px solid $gray-light
        &:last-child
          border-right: none
      th
        background: #f3faff
        border-top: none
      .td
        $w: 90%
        width: $w
        height: $w
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column
        margin: (100% - $w) / 2
        &-class-name
          margin-top: 5px
          font-size: $font-smaller
      .gray
        color: $gray
        font-size: $font-small
      .rotate90
        line-height: .5
        transform: rotate(90deg)
</style>
