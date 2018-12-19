<template>
  <div class="info">
    <div :class="(curTabIndex ===1 || curTabIndex ===2) ? 'wrapper':''">
      <my-tabs :tabs="tabs" @tabChanged="handleTabChanged"></my-tabs>
      <div class="info-basic" v-show="curTabIndex === 0">
        <!--基本信息-->
        <van-cell-group>
          <van-cell title="基本信息" class="info-sticky">
          <span @click="handleInfoClick()">
            <img src="../../../assets/images/edit.png"/>
            编辑
          </span>
          </van-cell>
          <van-cell title="姓名" :value="teacher.name || '--'"></van-cell>
          <van-cell title="性别" :value="getSex(teacher.sex) || '--'"></van-cell>
          <van-cell title="当前状态" :value="getJobStatus(teacher.jobStatus) || '--'"></van-cell>
          <van-cell-group v-for="(course,index) in teacher.courseList" :key="'course'+index">
            <van-cell :title="(teacher.courseList.length === 1) ? '教授科目' : ('教授科目'+(index +1))"
                      :value="course.name || '--'">
            </van-cell>
          </van-cell-group>
          <van-cell-group v-for="(organ,index) in teacher.orgList" :key="'organ'+index">
            <van-cell :title="(teacher.orgList.length === 1) ? '所属部门':('所属部门'+(index+1))"
                      :value="organ.name || '--'">
            </van-cell>
          </van-cell-group>
          <van-cell title="年级" :value="teacher.grade || '--'"></van-cell>
          <van-cell title="身份证号" :value="teacher.idCard || '--'"></van-cell>
          <van-cell title="联系电话" :value="teacher.phone || '--'"></van-cell>
          <van-cell title="出生年月" :value="teacher.birthday | ymd"></van-cell>
          <van-cell title="年龄" :value="(getAge(teacher.birthday) || '--')+'岁'"></van-cell>
          <van-cell title="民族" :value="teacher.folk || '--'"></van-cell>
          <van-cell title="籍贯" :value="teacher.residence || '--'"></van-cell>
          <van-cell title="政治面貌" :value="getPoliticsStatus(teacher.politicsStatus) || '--'"></van-cell>
          <van-cell title="加入时间" :value="teacher.joinPartyTime | ymd"></van-cell>
          <van-cell title="第一学历" :value="getEducation(teacher.firstEducation) || '--'"></van-cell>
          <van-cell title="最高学历" :value="getEducation(teacher.highestEducation) || '--'"></van-cell>
          <van-cell title="毕业时间" :value="teacher.graduateTime | ymd"></van-cell>
          <van-cell title="毕业学校" :value="teacher.graduateSchool || '--'"></van-cell>
          <van-cell title="参加工作时间" :value="teacher.joinWorkTime | ymd"></van-cell>
          <van-cell title="工龄" :value="(teacher.workYears  || '--') +'年'"></van-cell>
          <van-cell title="来校时间" :value="teacher.joinSchoolTime | ymd"></van-cell>
          <van-cell title="原工作单位" :value="teacher.lastWorkUnit || '--'"></van-cell>
          <div v-for="(position,index) in teacher.teacherTitleList" :key="'position'+index">
            <van-cell :title="(teacher.teacherTitleList.length ===1) ? '职称':('职称'+(index+1))"
                      :value="getJobTitle(position.title) || '--'">
            </van-cell>
            <van-cell title="评定时间" :value="position.acquireTime | ymd">
            </van-cell>
          </div>
        </van-cell-group>

        <!--家庭信息-->
        <van-cell-group>
          <van-cell title="家庭信息" class="info-sticky">
           <span @click="handleInfoClick()">
            <img src="../../../assets/images/edit.png"/>
            编辑
          </span>
          </van-cell>
          <van-cell title="家庭电话" :value="teacher.homeTel || '--'"></van-cell>
          <div class="info-basic-children" v-for="(child,index) in teacher.teacherChildList" :key="'child'+index">
            <van-cell :title="'子女信息'+(index+1)" class="info-basic-children-title"></van-cell>
            <van-cell title="姓名" :value="child.name || '--'"></van-cell>
            <van-cell title="性别" :value="getSex(child.sex) || '--'"></van-cell>
            <van-cell title="年龄" :value="(child.age || '--')+'岁'"></van-cell>
            <van-cell title="学校或单位" :value="child.unit || '--'"></van-cell>
            <van-cell title="备注" :value="child.remark || '--'"></van-cell>
          </div>
        </van-cell-group>
      </div>
      <div class="info-work" v-show="curTabIndex === 1">
        <!--工作经历-->
        <van-cell-group>
          <div v-for="(resume,index) in resumeList" :key="'resume'+index">
            <van-cell :title="resumeList.length === 1 ? '工作经历':('工作经历'+(index+1))"
                      class="info-sticky">
           <span @click="handleResumeClick(index)">
            <img src="../../../assets/images/edit.png"/>
            编辑
          </span>
            </van-cell>
            <van-cell title="开始时间" :value="resume.startTernName || '--'"></van-cell>
            <van-cell title="结束时间" :value="resume.endTermName || '--'"></van-cell>
            <van-cell title="教授科目" :value="resume.courseName || '--'"></van-cell>
            <van-cell title="年级" :value="resume.gradeName || '--'"></van-cell>
            <van-cell title="班级" :value="resume.className || '--'"></van-cell>
            <van-cell title="是否班主任" :value="resume.isAdviser === 'YES' ? '是':'否'"></van-cell>
          </div>
        </van-cell-group>
      </div>
      <div class="info-awards" v-show="curTabIndex === 2">
        <!--获奖情况-->
        <div v-for="(research,index) in researchList" :key="'research'+index">
          <van-cell :title="researchList.length === 1 ? '获奖情况':('获奖情况'+(index+1))"
                    class="info-sticky">
           <span @click="handleResearchClick(index)">
            <img src="../../../assets/images/edit.png"/>
            编辑
          </span>
          </van-cell>
          <van-cell-group>
            <van-cell title="项目名称" :value="research.entryName || '--'"></van-cell>
            <van-cell title="类型" :value="getEntryType(research.entryType) || '--'"></van-cell>
            <van-cell title="颁奖单位" :value="research.awardUnit || '--'"></van-cell>
            <van-cell title="获奖等级或获得的成绩" :value="research.achievement || '--'"></van-cell>
            <van-cell title="获奖时间" :value="research.obtainTime || ymd"></van-cell>
            <van-cell title="证明材料"
                      :value="(research.attachments && research.attachments.length>0)? '已上传':'未上传'">
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>
    <my-button :content="getAddBtnTitle()" @btnClick="handleAddClick"
               v-show="curTabIndex ===1 || curTabIndex ===2">
    </my-button>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data () {
      return {
        curTabIndex: 0,
        tabs: [{
          id: 0,
          label: '基本情况',
        }, {
          id: 1,
          label: '工作经历',
        }, {
          id: 2,
          label: '获奖情况',
        }],
        teacher: {
          'teacherInfoId': 1 /*教师信息Id*/,
          'userId': 1 /*教师用户Id*/,
          'name': '张三' /*姓名*/,
          'sex': 'Female' /*性别0男1女：ALL|Male|Female*/,
          'avatar': 'avatar' /*头像*/,
          'idCard': '4301222' /*身份证号*/,
          'phone': '13487317051' /*手机号*/,
          'email': 'email' /*邮箱*/,
          'position': 'position' /*职位*/,
          'gradeId': 1 /*教学年级Id*/,
          'grade': '三年级' /*教学年级*/,
          'jobStatus': 'SERVING' /*工作状态0离职1在职：ALL|DIMISSION|SERVING*/,
          'homeTel': 'homeTel' /*家庭电话*/,
          'birthday': '2018-12-19 09:29:02' /*出生年月*/,
          'folk': '汉族' /*民族*/,
          'residence': '长沙' /*籍贯*/,
          'politicsStatus': 'MASSES' /*政治面貌1团员2共产党员3民主党派4群众：ALL|LEAGUE|COMMUNIST|DEMOCRATIC|MASSES*/,
          'joinPartyTime': '2018-12-19 09:29:02' /*加入组织时间*/,
          'firstEducation': 'DOCTORAL_CANDIDATE' /*第一学历：ALL|JUNIOR_COLLEGE|REGULAR_COLLEGE|POSTGRADUATE|DOCTORAL_CANDIDATE*/,
          'highestEducation': 'DOCTORAL_CANDIDATE' /*最高学历：ALL|JUNIOR_COLLEGE|REGULAR_COLLEGE|POSTGRADUATE|DOCTORAL_CANDIDATE*/,
          'graduateTime': '2018-12-19 09:29:02' /*毕业时间*/,
          'graduateSchool': '高级中学' /*毕业学校*/,
          'joinWorkTime': '2018-12-19 09:29:02' /*参加工作时间*/,
          'workYears': 1 /*工龄*/,
          'joinSchoolTime': '2018-12-19 09:29:02' /*来校时间*/,
          'lastWorkUnit': '元公司做' /*原工作单位*/,
          'isGradeLeader': 'NO' /*是否年级组长：ALL|YES|NO*/,
          'isAdviser': 'NO' /*是否班主任：ALL|YES|NO*/,
          'courseList': [
            {
              'id': 1 /**/,
              'name': '语文' /*课程名称*/,
              'courseType': 'OPTIONAL' /*课程类型1必修课2选修课：ALL|REQUIRED|OPTIONAL*/,
              'isDelete': 'NO' /*删除标识0否1是：ALL|YES|NO*/,
              'createdTime': '2018-12-19 09:29:02' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
              'updatedTime': '2018-12-19 09:29:02' /*更新时间 默认值：CURRENT_TIMESTAMP*/
            }
          ],
          'orgList': [
            {
              'id': 1 /**/,
              'name': '超级部门' /*名称*/,
              'orgType': 'PARENT_ORG' /*机构类型0根部门1行政部门2教研组3家长组：ALL|ROOT_ORG|ADMIN_ORG|TEACH_ORG|PARENT_ORG*/,
              'parentOrgId': 1 /*父级机构Id*/,
              'orderNum': 1 /*排序号*/,
              'isDelete': 'NO' /*是否删除0否1是：ALL|YES|NO*/,
              'createdTime': '2018-12-19 09:29:02' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
              'updatedTime': '2018-12-19 09:29:02' /*更新时间 默认值：CURRENT_TIMESTAMP*/
            }
          ],
          'teacherTitleList': [
            {
              'id': 1 /**/,
              'userId': 1 /*教师用户Id*/,
              'title': 'HIGHER_GRADE' /*职称类型：ALL|NOVICIATE|RANK_UNDECIDED|SECOND_GRADE|FIRST_GRADE|HIGHER_GRADE*/,
              'acquireTime': '2018-12-19 09:29:02' /*评定时间*/,
              'createdTime': '2018-12-19 09:29:02' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
              'updatedTime': '2018-12-19 09:29:02' /*更新时间 默认值：CURRENT_TIMESTAMP*/
            }
          ],
          'teacherPositionList': [
            {
              'id': 1 /**/,
              'teacherId': 1 /*教师ID*/,
              'createdTime': '2018-12-19 09:29:02' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
              'updatedTime': '2018-12-19 09:29:02' /*更新时间 默认值：CURRENT_TIMESTAMP*/
            }
          ],
          'teacherChildList': [
            {
              'id': 1 /**/,
              'userId': 1 /*教师用户Id*/,
              'name': 'name' /**/,
              'sex': 'Female' /*性别0男1女：ALL|Male|Female*/,
              'age': 1 /*年龄*/,
              'unit': 'unit' /*学校或单位*/,
              'remark': 'remark' /*备注*/,
              'createdTime': '2018-12-19 09:29:02' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
              'updatedTime': '2018-12-19 09:29:02' /*更新时间 默认值：CURRENT_TIMESTAMP*/
            }
          ]
        },
        resumeList: [{
          'id': 1 /**/,
          'userId': 1 /*教师用户Id*/,
          'startTermId': 1 /*开始学期Id*/,
          'startTernName': 'startTernName' /*开始学期时间*/,
          'endTermId': 1 /*结束学期Id*/,
          'endTermName': 'endTermName' /*结束学期时间*/,
          'courseId': 1 /*教授课程Id*/,
          'courseName': 'courseName' /*教授课程名称*/,
          'gradeId': 1 /*年级Id*/,
          'gradeName': 'gradeName' /*年级名称*/,
          'className': 'className' /*班级名称*/,
          'isAdviser': 'NO' /*是否班主任0否1是：ALL|YES|NO*/
        }],
        researchList: [
          {
            'id': 1 /*主键id*/,
            'teacherId': 1 /*教师id*/,
            'teacherName': 'teacherName' /*教师名称*/,
            'sex': 'Female' /*性别：ALL|Male|Female*/,
            'entryName': 'entryName' /*项目名称*/,
            'entryType': 'ACADEMIC' /*项目类型：ALL|PAPER|COMPETITION|TOPICS|ACADEMIC*/,
            'awardUnit': 'awardUnit' /*颁奖单位*/,
            'achievement': 'achievement' /*成绩*/,
            'obtainTime': '2018-12-19 09:29:02' /*获奖时间*/,
            'examineResult': 'NOT_PASS' /*审核结果：ALL|UNAUDITED|ADOPT|NOT_PASS*/,
            'score': 1.0 /*评分*/,
            'attachments': [
              {
                'fileName': 'fileName' /*文件名*/,
                'fileUrl': 'fileUrl' /*文件路径*/
              }
            ],
            'orgName': 'orgName' /*扩展属性(拼接字符串)*/,
            'organizations': [
              {
                'id': 1 /**/,
                'name': 'name' /*名称*/,
                'orgType': 'PARENT_ORG' /*机构类型0根部门1行政部门2教研组3家长组：ALL|ROOT_ORG|ADMIN_ORG|TEACH_ORG|PARENT_ORG*/,
                'parentOrgId': 1 /*父级机构Id*/,
                'orderNum': 1 /*排序号*/,
                'isDelete': 'NO' /*是否删除0否1是：ALL|YES|NO*/,
                'createdTime': '2018-12-19 09:29:02' /*创建时间 默认值：CURRENT_TIMESTAMP*/,
                'updatedTime': '2018-12-19 09:29:02' /*更新时间 默认值：CURRENT_TIMESTAMP*/
              }
            ]
          }
        ],
      }
    },
    methods: {
      getAddBtnTitle () {
        if (this.curTabIndex === 1) {
          return '增加工作经历'
        } else if (this.curTabIndex === 2) {
          return '增加获奖情况'
        }
      },
      initData () {

      },
      handleAddClick () {
        if (this.curTabIndex === 1) {
          this.$router.push(`teacher/resume/add`)
        } else if (this.curTabIndex === 2) {
          this.$router.push(`teacher/research/add`)
        }
      },
      handleTabChanged (tabIndex) {
        if (this.curTabIndex === tabIndex) {
          return
        }
        this.curTabIndex = tabIndex
      },
      getJobStatus (jobStatus) {
        if (jobStatus === 'DIMISSION') {
          return '离职'
        } else if (jobStatus === 'SERVING') {
          return '在职'
        } else {
          return '--'
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
          default:
            return '--'
        }
      },
      getEducation (education) {
        switch (education) {
          case 'JUNIOR_COLLEGE':
            return '专科'
          case 'REGULAR_COLLEGE':
            return '本科'
          case 'POSTGRADUATE':
            return '硕士研究生'
          case 'DOCTORAL_CANDIDATE':
            return '博士研究生'
          default:
            return '--'
        }
      },
      getJobTitle (jobTitle) {
        switch (jobTitle) {
          case 'NOVICIATE':
            return '见习'
          case 'RANK_UNDECIDED':
            return '未评'
          case 'SECOND_GRADE':
            return '中小学二级教师'
          case 'FIRST_GRADE':
            return '中小学一级教师'
          case 'HIGHER_GRADE':
            return '中小学高级教师'
          default:
            return '--'
        }
      },
      getAge (strBirthday) {
        if (!strBirthday) {
          return '--'
        }
        strBirthday = new Date(strBirthday).Format('yyyy-MM-dd')
        let returnAge
        // 根据生日计算年龄（"1995-09-25"）
        // 以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
        let strBirthdayArr = strBirthday.split('-')
        let birthYear = strBirthdayArr[0]
        let birthMonth = strBirthdayArr[1]
        let birthDay = strBirthdayArr[2]

        let d = new Date()
        let nowYear = d.getFullYear()
        let nowMonth = d.getMonth() + 1
        let nowDay = d.getDate()

        if (nowYear == birthYear) {
          returnAge = '0'
        } else {
          let ageDiff = nowYear - birthYear //年之差
          if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
              let dayDiff = nowDay - birthDay//日之差
              if (dayDiff < 0) {
                returnAge = ageDiff - 1
              }
              else {
                returnAge = ageDiff
              }
            }
            else {
              let monthDiff = nowMonth - birthMonth//月之差
              if (monthDiff < 0) {
                returnAge = ageDiff - 1
              }
              else {
                returnAge = ageDiff
              }
            }
          }
          else {
            returnAge = '--'// 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge // 返回周岁年龄
      },
      getSex (sex) {
        switch (sex) {
          case 'Male':
            return '男'
          case 'Female':
            return '女'
          default:
            return '--'
        }
      },
      getEntryType (entryType) {
        switch (entryType) {
          case 'PAPER':
            return '论文'
          case 'COMPETITION':
            return '赛课及指导学生'
          case 'TOPICS':
            return '课题、课程'
          case 'ACADEMIC':
            return '经验交流及学术报告'
          default:
            return '--'
        }
      },
      handleInfoClick () {
        // todo 编辑教师信息

      },
      handleChildrenClick () {
        // todo 编辑
      },
      handleResumeClick () {},
      handleResearchClick () {}
    },
    async created () {
      // this.teacher = await this.$api.teacher.getTeacherDetail({})
      // this.resumeList = await this.$api.teacher.queryTeacherResumeList({})
      this.researchList = await this.$api.teacher.queryTeachingResearchList({})
    }
  }
</script>

<style scoped lang="sass">

  .info
    padding-bottom: $default-gap
    &-basic
      padding-bottom: 10px
      &-children
        background: $white
        padding: 5px 14px
        &-title
          color: #24A197
          font-size: 13px
        .van-cell
          background: #F7F8FA
          &:first-child
            border-top-left-radius: 4px
            border-top-right-radius: 4px
          &:last-child
            border-bottom-left-radius: 4px
            border-bottom-right-radius: 4px
    .wrapper
      height: calc(100vh - 80px)
    &-sticky
      margin-top: 10px
      color: #24A197
      font-size: 13px
      img
        width: 15px
        height: 15px
        margin-right: 8px
      span
        color: #24A197
        font-size: 13px
    &-tabs
      $h: 50px
      position: relative
      width: 100%
      height: $h
      line-height: $h
      color: #ccc
      background: $white
      font-size: 16px
      @include hor-start-center
      &__li
        flex: 1
        text-align: center
        transition: color $transition-duration ease
        &--active
          font-weight: bold
          color: $black
      &__line
        $w: 18px
        position: absolute
        left: 0
        bottom: 6px
        width: 100%
        height: 4px
        transition: transform $transition-duration ease
        transform: translateX((33.333% / 2))
        &:after
          content: ''
          display: block
          width: $w
          height: 4px
          background: $black
          transform: translateX(-50%)

</style>
