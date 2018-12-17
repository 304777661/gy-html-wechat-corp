<template>
  <div class="class-table">
    <section-picker :content="termTitle" @previousClick="handlePreviousClick()"
                    @nextClick="handleNextClick()"></section-picker>

    <no-data v-show="!loading && !courseList.length"/>
    <!--<my-loading v-model="loading"/>-->

    <div class="class-table-header">
      <span class="class-table-header-class-name">{{curClass.className || '--'}}</span>
      <span class="class-table-header-class-picker" @click="onClassPicker">选择班级</span>
    </div>

    <div class="class-table-container" v-show="!loading && courseList.length">
      <div class="class-table-container-section">
        <p v-for="(item,index) in sections" :key="index" class="class-table-container-section__label">{{item}}</p>
      </div>
      <div class="class-table-container__table">
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

    <van-button type="primary"
                class="btn-primary" @click="goTeacherTimeTable">查看班级课表
    </van-button>

    <van-popup v-model="showPopup" position="bottom" :overlay="true" lazy-render close-on-click-overlay>
      <van-picker :columns="columns"
                  @change="onChange"
                  show-toolbar
                  @cancel="onCancel"
                  @confirm="onConfirm"
                  :item-height="popupItemHeight"
                  value-key="label"
                  :loading="gradeLoading" ref="picker"/>

    </van-popup>
  </div>
</template>

<script>
  import SectionPicker from 'COMPONENT/SectionPicker'

  export default {
    components: {SectionPicker},
    name: 'class-table',
    computed: {
      termTitle () {
        return new Date(this.curTerm.startDate).getFullYear() + '-' + new Date(this.curTerm.endDate).getFullYear() + this.curTerm.name
      },
      query () {
        return {
          termId: this.curTerm.id,
          classId: this.curClass.id
        }
      }
    },
    data () {
      return {
        loading: false,
        termName: null,
        gradeList: [],
        curGrade: {},
        curClass: {},
        classList: [],
        curTerm: {},
        curTermIndex: -1,
        termList: null,
        showPopup: false,
        gradeLoading: false,
        popupItemHeight: 60,
        columns:
          [{
            values: [],
            className: 'class-table-popup-item'
          }, {
            values: [],
            className: 'class-table-popup-item'
          }],
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
        sectionList: [
          {
            'class-tableId': 1 /*课表Id*/,
            'sectionId': 1 /*课节Id*/,
            'sectionName': '一' /*课节*/,
            'dayOfWeek': 'FRIDAY' /*星期0星期日1星期一2星期二6星期六：ALL|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY*/,
            'courseId': 1 /*课程Id，当双周课程Id不为空时为单周课程Id*/,
            'courseName': '语文' /*课程名称*/,
            'courseIdEven': 0 /*双周课程Id*/,
            'courseNameEven': 'courseNameEven' /*双周课程名称*/,
            'teacherId': 1 /*教师Id,当双周教师Id字段不为空时表示单周教师Id*/,
            'teacherName': '刘德华' /*教师姓名*/,
            'teacherIdEven': 1 /*双周课教师Id*/,
            'teacherNameEven': '张学友' /*双周课教师姓名*/,
            'classId': 1 /*班级Id*/,
            'className': '第一班' /*班级名*/,
            'termId': 1 /*学期Id*/,
            'termName': '第一学期' /*学期名*/
          },
          {
            'class-tableId': 1 /*课表Id*/,
            'sectionId': 4 /*课节Id*/,
            'sectionName': '四' /*课节*/,
            'dayOfWeek': 'WEDNESDAY' /*星期0星期日1星期一2星期二6星期六：ALL|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY*/,
            'courseId': 1 /*课程Id，当双周课程Id不为空时为单周课程Id*/,
            'courseName': '语文' /*课程名称*/,
            'courseIdEven': 0 /*双周课程Id*/,
            'courseNameEven': 'courseNameEven' /*双周课程名称*/,
            'teacherId': 1 /*教师Id,当双周教师Id字段不为空时表示单周教师Id*/,
            'teacherName': '刘德华' /*教师姓名*/,
            'teacherIdEven': 1 /*双周课教师Id*/,
            'teacherNameEven': '周润发' /*双周课教师姓名*/,
            'classId': 1 /*班级Id*/,
            'className': '第一班' /*班级名*/,
            'termId': 1 /*学期Id*/,
            'termName': '第一学期' /*学期名*/
          }, {
            'class-tableId': 1 /*课表Id*/,
            'sectionId': 6 /*课节Id*/,
            'sectionName': '六' /*课节*/,
            'dayOfWeek': 'THURSDAY' /*星期0星期日1星期一2星期二6星期六：ALL|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY*/,
            'courseId': 1 /*课程Id，当双周课程Id不为空时为单周课程Id*/,
            'courseName': '语文' /*课程名称*/,
            'courseIdEven': 0 /*双周课程Id*/,
            'courseNameEven': 'courseNameEven' /*双周课程名称*/,
            'teacherId': 1 /*教师Id,当双周教师Id字段不为空时表示单周教师Id*/,
            'teacherName': '刘德华' /*教师姓名*/,
            'teacherIdEven': 1 /*双周课教师Id*/,
            'teacherNameEven': '张学友' /*双周课教师姓名*/,
            'classId': 1 /*班级Id*/,
            'className': '第一班' /*班级名*/,
            'termId': 1 /*学期Id*/,
            'termName': '第一学期' /*学期名*/
          }, {
            'class-tableId': 1 /*课表Id*/,
            'sectionId': 8 /*课节Id*/,
            'sectionName': '一' /*课节*/,
            'dayOfWeek': 'FRIDAY' /*星期0星期日1星期一2星期二6星期六：ALL|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY*/,
            'courseId': 1 /*课程Id，当双周课程Id不为空时为单周课程Id*/,
            'courseName': '语文' /*课程名称*/,
            'courseIdEven': 0 /*双周课程Id*/,
            'courseNameEven': 'courseNameEven' /*双周课程名称*/,
            'teacherId': 1 /*教师Id,当双周教师Id字段不为空时表示单周教师Id*/,
            'teacherName': '刘德华' /*教师姓名*/,
            'teacherIdEven': 1 /*双周课教师Id*/,
            'teacherNameEven': '张学友' /*双周课教师姓名*/,
            'classId': 1 /*班级Id*/,
            'className': '第一班' /*班级名*/,
            'termId': 1 /*学期Id*/,
            'termName': '第一学期' /*学期名*/
          },
          {
            'class-tableId': 1 /*课表Id*/,
            'sectionId': 3 /*课节Id*/,
            'sectionName': '二' /*课节*/,
            'dayOfWeek': 'WEDNESDAY' /*星期0星期日1星期一2星期二6星期六：ALL|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY*/,
            'courseId': 1 /*课程Id，当双周课程Id不为空时为单周课程Id*/,
            'courseName': '历史' /*课程名称*/,
            'courseIdEven': 1 /*双周课程Id*/,
            'courseNameEven': '数学' /*双周课程名称*/,
            'teacherId': 1 /*教师Id,当双周教师Id字段不为空时表示单周教师Id*/,
            'teacherName': '刘德华' /*教师姓名*/,
            'teacherIdEven': 1 /*双周课教师Id*/,
            'teacherNameEven': '张学友' /*双周课教师姓名*/,
            'classId': 1 /*班级Id*/,
            'className': '第一班' /*班级名*/,
            'termId': 1 /*学期Id*/,
            'termName': '第一学期' /*学期名*/
          },
          {
            'class-tableId': 1 /*课表Id*/,
            'sectionId': 4 /*课节Id*/,
            'sectionName': '一' /*课节*/,
            'dayOfWeek': 'MONDAY' /*星期0星期日1星期一2星期二6星期六：ALL|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY|SUNDAY*/,
            'courseId': 1 /*课程Id，当双周课程Id不为空时为单周课程Id*/,
            'courseName': '数学' /*课程名称*/,
            'courseIdEven': 0 /*双周课程Id*/,
            'courseNameEven': 'courseNameEven' /*双周课程名称*/,
            'teacherId': 1 /*教师Id,当双周教师Id字段不为空时表示单周教师Id*/,
            'teacherName': '刘德华' /*教师姓名*/,
            'teacherIdEven': 1 /*双周课教师Id*/,
            'teacherNameEven': '张学友' /*双周课教师姓名*/,
            'classId': 1 /*班级Id*/,
            'className': '第一班' /*班级名*/,
            'termId': 1 /*学期Id*/,
            'termName': '第一学期' /*学期名*/
          }
        ],
        courseList: [],
        weekList: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
      }
    },

    async created () {
      this.loading = true

      // 查班级年级列表
      this.gradeLoading = true
      this.gradeList = await this.$api.teacher.queryClassCascadeList({})
      this.columns[0].values = this.gradeList.map(item => {
        return {
          label: item.gradeName,
          value: item.gradeId,
        }
      })
      this.onChange(null, [this.columns[0].values[0], undefined])
      this.gradeLoading = false
      if (this.gradeList && this.gradeList.length > 0) {
        this.curGrade = this.gradeList[0]
        if (this.curGrade && this.curGrade.classInfoList && this.curGrade.classInfoList.length > 0) {
          this.curClass = this.curGrade.classInfoList[0]
        }
      }
      // 查学期
      this.termList = await this.$api.teacher.querySchoolTermList({})

      if (this.termList) {
        this.curTermIndex = this.termList.length - 1
        this.curTerm = this.termList[this.curTermIndex]
        this.request()
      }

      this.courseList = new Array(this.sections.length)
      for (let i = 0; i < this.courseList.length; i++) {
        this.courseList[i] = new Array(this.weekList.length)
        for (let j = 0; j < this.courseList[i].length; j++) {
          this.courseList[i][j] = {}
        }
      }

      for (let i = 0; i < this.sectionList.length; i++) {
        const course = this.sectionList[i]
        let sectionIndex = this.sections.indexOf(course.sectionName)
        let weekIndex = this.weekList.indexOf(course.dayOfWeek)
        if (sectionIndex > -1 && weekIndex > -1) {
          this.courseList[sectionIndex][weekIndex] = course
        }
      }
      console.log(this.courseList)
      this.loading = false
    },
    methods: {
      generateColorAndBgColor (classTable) {
        switch (classTable) {
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
      }
      ,
      handlePreviousClick () {
        if (this.curTermIndex - 1 < 0) {
          this.$toast.fail('已无其他学期')
          return
        }
        this.curTermIndex--
        this.curTerm = this.termList[this.curTermIndex]
        this.request()
      }
      ,
      handleNextClick () {
        if (this.curTermIndex + 1 > this.termList.length) {
          this.$toast.fail('已是最新的学期')
          return
        }
        this.curTermIndex++
        this.curTerm = this.termList[this.curTermIndex]
        this.request()
      }
      ,
      goTeacherTimeTable () {
        this.$router.push('timetable')
      }
      ,
      async request () {
        this.courseList = await this.$api.teacher.queryClassCascadeList(this.query)
      }
      ,
      showEvenCourse (course) {
        return course && course.courseIdEven > 0
      },
      onClassPicker () {
        if (this.columns && this.columns.length > 0) {
          this.showPopup = true
        }
      },
      onChange (picker, values) {
        let curGrade = this.gradeList.find(item => item.gradeId === values[0].value)
        this.columns[1].values = curGrade.classInfoList.map(item => {
          return {
            label: item.className,
            value: item.id,
          }
        })
        picker && picker.setColumnValues(1, this.columns[1].values)
      },
      onCancel () {
        this.showPopup = false
      },
      async onConfirm (value, index) {
        // console.log(`当前值：${value}, 当前索引：${index}`)
        console.log(index)
        this.curGrade = this.gradeList[index[0]]
        this.curClass = this.curGrade.classInfoList[index[1]]
        this.request()
        this.showPopup = false
      },
    }
  }
</script>

<style lang="sass">
  .class-table
    $td-default-bg: #F8FAFC
    display: flex
    flex-direction: column
    height: 100vh
    background: #F5F5F5
    &-popup-item
      line-height: 60px
      height: 60px
    &-header
      background: $dark-blue
      height: 24px
      position: relative
      $mb: 10px
      &-class-name
        position: absolute
        color: $white
        font-size: 18px
        line-height: 24px
        left: 14px
        bottom: $mb
      &-class-picker
        position: absolute
        right: 20px
        bottom: $mb
        font-size: 12px
        line-height: 17px
        color: #86B6F1
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
    &-container
      flex: 1
      $td-height: 53px
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
