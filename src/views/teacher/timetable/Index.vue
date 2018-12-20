<template>
  <div class="timetable">
    <section-picker :content="curTerm.name" @previousClick="handlePreviousClick()"
                    @nextClick="handleNextClick()"></section-picker>

    <no-data v-show="!loading && !courseList.length"/>
    <my-loading v-model="loading"/>

    <div class="timetable-container" v-show="!loading && courseList.length">
      <div class="timetable-container-section">
        <p v-for="(item,index) in sections" :key="index" class="timetable-container-section__label">{{item}}</p>
      </div>
      <div class="timetable-container__table">
        <table>
          <tr>
            <th v-for="week in weekList"
                :key="week">{{$enums.DayOfWeek.getName(week)}}
            </th>
          </tr>
          <tr v-for="(section, sectionIdx) in courseList" :key="'section' + sectionIdx">
            <td v-for="(course, courseIdx) in section" :key="'course' + courseIdx">
              <div class="td" :class="[showEvenCourse(course) ? 'td-split-line' : '']"
                   :style="[generateColorAndBgColor(course.courseName)]">
                <p v-show="!showEvenCourse(course)">{{course.courseName}}</p>
                <p class="td-class-name" v-show="!showEvenCourse(course)">{{course.className}}</p>
                <div class="td-single-class-name" v-show="showEvenCourse(course)">
                  <p>{{course.courseName}}</p>
                  <p>单</p>
                </div>
                <div class="td-even-class-name" v-show="showEvenCourse(course)">
                  <p>双</p>
                  <p>{{course.courseNameEven}}</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <my-button :content="'查看班级课表'" @btnClick="goAll"></my-button>
  </div>
</template>

<script>
  import SectionPicker from 'COMPONENT/SectionPicker'

  export default {
    components: {SectionPicker},
    name: 'TimeTable',
    data () {
      return {
        loading: false,
        termName: null,
        classList: [],
        curTerm: {},
        curTermIndex: -1,
        termList: null,
        sections: [
          '一',
          '二',
          '三',
          '四',
          '五',
          '六',
          '七',
          '八',
          '九',
        ],
        sectionList: [],
        courseList: [],
        weekList: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
      }
    },

    async created () {
      this.loading = true
      // 查学期
      this.termList = await this.$api.teacher.querySchoolTermList({})
      if (this.termList) {
        this.curTermIndex = this.termList.length - 1
        this.curTerm = this.termList[this.curTermIndex]
        await this.loadData()
      }
      // 处理课程
      this.courseList = new Array(this.sections.length) //9节课
      for (let i = 0; i < this.courseList.length; i++) {
        this.courseList[i] = new Array(this.weekList.length)
        for (let j = 0; j < this.courseList[i].length; j++) {
          this.courseList[i][j] = {}
        }
      }

      for (let i = 0; i < this.sectionList.length; i++) {
        const course = this.sectionList[i]
        let sectionIndex = this.sections.indexOf(course.sectionName.substr(1, 1))
        let weekIndex = this.weekList.indexOf(course.dayOfWeek)
        if (sectionIndex > -1 && weekIndex > -1) {
          this.courseList[sectionIndex][weekIndex] = course
        }
      }
      this.loading = false
    },
    methods: {
      generateColorAndBgColor (timetable) {
        switch (timetable) {
          case '语文':
            return {
              color: '#ffffff',
              backgroundColor: '#138BED'
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
          default:
            return {
              color: '#F8FAFC',
              backgroundColor: '#F8FAFC'
            }
        }
      },
      handlePreviousClick () {
        if (this.curTermIndex - 1 < 0) {
          this.$toast.fail('已无其他学期')
          return
        }
        this.curTermIndex--
        this.curTerm = this.termList[this.curTermIndex]
        this.loadData()
      },
      handleNextClick () {
        if (this.curTermIndex + 1 > this.termList.length) {
          this.$toast.fail('已是最新的学期')
          return
        }
        this.curTermIndex++
        this.curTerm = this.termList[this.curTermIndex]
        this.loadData()
      },
      goAll () {
        this.$router.push(`/teacher/timetable/class`)
      },
      async loadData () {
        if (!this.curTerm) {
          this.$toast.fail('学期数据错误')
          return
        }
        this.sectionList = await this.$api.teacher.queryTeacherTimetableList({'termId': this.curTerm.id})
      },
      showEvenCourse (course) {
        return course && course.courseIdEven > 0
      }
    }
  }
</script>

<style lang="sass">
  .timetable
    $td-default-bg: #F8FAFC
    display: flex
    flex-direction: column
    height: 100vh
    background: #F5F5F5
    &__picker
      padding: 10px 0
      background: #fff
      @include hor-around-center
    &-container
      flex: 1
      $td-height: 56px
      $th-height: 35px
      display: flex
      flex-direction: row
      position: relative
      &-section
        width: 30px
        color: $black
        height: $td-height
        line-height: $td-height
        margin-top: $th-height
        &__label
          text-align: center
      &__table
        flex: 1
        padding: 0 $default-gap $default-gap 0
        table
          $border-radius: 10px
          position: relative
          width: 100%
          text-align: center
          vertical-align: middle
          border-radius: $border-radius
          // $shadow-color: #bccaec
          // box-shadow: 0 0 20px 4px $shadow-color, 0 10px 0 -3px #fff, 0 11px 20px -3px $shadow-color, 0 20px 0 -6px #fff, 0 21px 20px -6px $shadow-color
          z-index: 2
          overflow: hidden
        td
          height: $td-height
          min-height: $td-height
          max-height: $td-height
          border-top: none
        th
          line-height: $th-height
          border-top: none
        .td-split-line
          background: linear-gradient(to top left, transparent 48.2%, $td-default-bg 49.5%, $td-default-bg 50.5%, transparent 51.8%) no-repeat
        .td
          $w: 98%
          width: $w
          height: $w
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
          margin: (100% - $w) / 2
          border-radius: 3px
          border: 1px solid $gray-light
          position: relative
          &-class-name
            margin-top: 5px
            font-size: $font-smaller
          &-single-class-name
            position: absolute
            left: 5px
            top: 3px
            p
              &:first-child
                font-size: 13px
                line-height: 20px
              &:last-child
                line-height: 10px
                font-size: 9px
                text-align: start
          &-even-class-name
            position: absolute
            bottom: 3px
            right: 5px
            p
              &:first-child
                font-size: 9px
                text-align: end
                line-height: 10px
              &:last-child
                line-height: 20px
                font-size: 13px
</style>
