<template>
  <div class="curriculum">
    <p class="curriculum__semester">{{termName}}</p>

    <div class="curriculum__table">
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
        sectionList: [],
        // courseList: [],
        weekList: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
      }
    },
    created () {
      this.getSectionList()
    },
    methods: {
      async getSectionList () {
        this.sectionList = await this.$api.teacher.queryCourseSectionSetList()
        this.getCurriculumList()
      },
      async getCurriculumList () {
        this.loading = true
        let data = await this.$api.parent.queryClassTimetable({})
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
      background: white
      font-weight: bold
      box-shadow: $default-shadow
    &__picker
      margin-top: 10px
      @include hor-around-center
    &__table
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
      //&:before, &:after
        content: ''
        position: absolute
        left: 0
        bottom: -8px
        width: 100%
        height: 8px
        background: #fff
        border-radius: $border-radius
        z-index: 1
      th, td
        height: 55px
        min-height: 55px
        max-height: 55px
        border-right: 1px dashed $gray-light
        border-top: 1px solid $gray-light
        &:last-child
          border-right: none
      th
        background: #f3faff
        border-top: none
      td
        background-size: 90%
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
