// 枚举合集
export default {

  // ---------------- UserType枚举  开始 -------------------
  UserType: {
    // 枚举列表
    list: [
      {label: '教师', value: 'TEACHER'},
      {label: '职工', value: 'EMPLOYEE'},
      {label: '非职员', value: 'NONCLERK'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'TEACHER':
          return '教师'
        case 'EMPLOYEE':
          return '职工'
        case 'NONCLERK':
          return '非职员'
        default:
          return val
      }
    }
  },
  // ---------------- UserType枚举  结束 -------------------

  // ---------------- YesNoStatus枚举  开始 -------------------
  YesNoStatus: {
    // 枚举列表
    list: [
      {label: '是', value: 'YES'},
      {label: '否', value: 'NO'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'YES':
          return '是'
        case 'NO':
          return '否'
        default:
          return val
      }
    }
  },
  // ---------------- YesNoStatus枚举  结束 -------------------

  // ---------------- ClassType枚举  开始 -------------------
  ClassType: {
    // 枚举列表
    list: [
      {label: '行政班', value: 'ADMINISTRATIVE'},
      {label: '走读班', value: 'EXTERN'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'ADMINISTRATIVE':
          return '行政班'
        case 'EXTERN':
          return '走读班'
        default:
          return val
      }
    }
  },
  // ---------------- ClassType枚举  结束 -------------------

  // ---------------- ClassStatus枚举  开始 -------------------
  ClassStatus: {
    // 枚举列表
    list: [
      {label: '肄业', value: 'STUDYING'},
      {label: '毕业', value: 'GRADUATED'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'STUDYING':
          return '肄业'
        case 'GRADUATED':
          return '毕业'
        default:
          return val
      }
    }
  },
  // ---------------- ClassStatus枚举  结束 -------------------

  // ---------------- CourseType枚举  开始 -------------------
  CourseType: {
    // 枚举列表
    list: [
      {label: '必修', value: 'REQUIRED'},
      {label: '选修', value: 'OPTIONAL'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'REQUIRED':
          return '必修'
        case 'OPTIONAL':
          return '选修'
        default:
          return val
      }
    }
  },
  // ---------------- CourseType枚举  结束 -------------------

  // ---------------- DayOfWeek枚举  开始 -------------------
  DayOfWeek: {
    // 枚举列表
    list: [
      {label: '星期一', value: 'MONDAY'},
      {label: '星期二', value: 'TUESDAY'},
      {label: '星期三', value: 'WEDNESDAY'},
      {label: '星期四', value: 'THURSDAY'},
      {label: '星期五', value: 'FRIDAY'},
      {label: '星期六', value: 'SATURDAY'},
      {label: '星期日', value: 'SUNDAY'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'MONDAY':
          return '星期一'
        case 'TUESDAY':
          return '星期二'
        case 'WEDNESDAY':
          return '星期三'
        case 'THURSDAY':
          return '星期四'
        case 'FRIDAY':
          return '星期五'
        case 'SATURDAY':
          return '星期六'
        case 'SUNDAY':
          return '星期日'
        default:
          return val
      }
    }
  },
  // ---------------- DayOfWeek枚举  结束 -------------------

  // ---------------- FileSource枚举  开始 -------------------
  FileSource: {
    // 枚举列表
    list: [
      {label: '本地上传', value: 'LOCAL'},
      {label: '教案上传', value: 'TEACH_MAT'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'LOCAL':
          return '本地上传'
        case 'TEACH_MAT':
          return '教案上传'
        default:
          return val
      }
    }
  },
  // ---------------- FileSource枚举  结束 -------------------

  // ---------------- CommentTagType枚举  开始 -------------------
  CommentTagType: {
    // 枚举列表
    list: [
      {label: '表扬', value: 'PRAISE'},
      {label: '批评', value: 'CRITICISM'},
      {label: '其他', value: 'OTHER'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'PRAISE':
          return '表扬'
        case 'CRITICISM':
          return '批评'
        case 'OTHER':
          return '其他'
        default:
          return val
      }
    }
  },
  // ---------------- CommentTagType枚举  结束 -------------------

  // ---------------- LeaveType枚举  开始 -------------------
  LeaveType: {
    // 枚举列表
    list: [
      {label: '病假', value: 'SICK_LEAVE'},
      {label: '事假', value: 'CASUAL_LEAVE'},
      {label: '其他', value: 'OTHER'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'SICK_LEAVE':
          return '病假'
        case 'CASUAL_LEAVE':
          return '事假'
        case 'OTHER':
          return '其他'
        default:
          return val
      }
    }
  },
  // ---------------- LeaveType枚举  结束 -------------------

  // ---------------- LeavePeriod枚举  开始 -------------------
  LeavePeriod: {
    // 枚举列表
    list: [
      {label: '上午', value: 'AM'},
      {label: '下午', value: 'PM'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'AM':
          return '上午'
        case 'PM':
          return '下午'
        default:
          return val
      }
    }
  },
  // ---------------- LeavePeriod枚举  结束 -------------------

  // ---------------- FileType枚举  开始 -------------------
  FileType: {
    // 枚举列表
    list: [
      {label: '目录', value: 'DIRECTORY'},
      {label: '文件', value: 'FILE'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'DIRECTORY':
          return '目录'
        case 'FILE':
          return '文件'
        default:
          return val
      }
    }
  },
  // ---------------- FileType枚举  结束 -------------------

  // ---------------- CommentType枚举  开始 -------------------
  CommentType: {
    // 枚举列表
    list: [
      {label: '评论', value: 'COMMENT'},
      {label: '收藏', value: 'FAVORITE'},
      {label: '点赞', value: 'PRAISE'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'COMMENT':
          return '评论'
        case 'FAVORITE':
          return '收藏'
        case 'PRAISE':
          return '点赞'
        default:
          return val
      }
    }
  },
  // ---------------- CommentType枚举  结束 -------------------

  // ---------------- MienType枚举  开始 -------------------
  MienType: {
    // 枚举列表
    list: [
      {label: '校园风采', value: 'SCHOOL'},
      {label: '班级圈', value: 'CLASS'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'SCHOOL':
          return '校园风采'
        case 'CLASS':
          return '班级圈'
        default:
          return val
      }
    }
  },
  // ---------------- MienType枚举  结束 -------------------

  // ---------------- NoticeType枚举  开始 -------------------
  NoticeType: {
    // 枚举列表
    list: [
      {label: '公告', value: 'NOTICE'},
      {label: '党建通知', value: 'PARTY'},
      {label: '通知', value: 'INFORM'},
      {label: '活动', value: 'ACTIVITY'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'NOTICE':
          return '公告'
        case 'PARTY':
          return '党建通知'
        case 'INFORM':
          return '通知'
        case 'ACTIVITY':
          return '活动'
        default:
          return val
      }
    }
  },
  // ---------------- NoticeType枚举  结束 -------------------

  // ---------------- NoticeTarget枚举  开始 -------------------
  NoticeTarget: {
    // 枚举列表
    list: [
      {label: '教师', value: 'TEACHER'},
      {label: '家长', value: 'PARENT'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'TEACHER':
          return '教师'
        case 'PARENT':
          return '家长'
        default:
          return val
      }
    }
  },
  // ---------------- NoticeTarget枚举  结束 -------------------

  // ---------------- Sex枚举  开始 -------------------
  Sex: {
    // 枚举列表
    list: [
      {label: '男', value: 'Male'},
      {label: '女', value: 'Female'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'Male':
          return '男'
        case 'Female':
          return '女'
        default:
          return val
      }
    }
  },
  // ---------------- Sex枚举  结束 -------------------

  // ---------------- FamilyMember枚举  开始 -------------------
  FamilyMember: {
    // 枚举列表
    list: [
      {label: '爸爸', value: 'FATHER'},
      {label: '妈妈', value: 'MOTHER'},
      {label: '家长', value: 'OTHER'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'FATHER':
          return '爸爸'
        case 'MOTHER':
          return '妈妈'
        case 'OTHER':
          return '家长'
        default:
          return val
      }
    }
  },
  // ---------------- FamilyMember枚举  结束 -------------------

  // ---------------- SurveyType枚举  开始 -------------------
  SurveyType: {
    // 枚举列表
    list: [
      {label: '投票', value: 'VOTE'},
      {label: '问卷调查', value: 'PSQ'},
      {label: '签字证明', value: 'CERTIFY'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'VOTE':
          return '投票'
        case 'PSQ':
          return '问卷调查'
        case 'CERTIFY':
          return '签字证明'
        default:
          return val
      }
    }
  },
  // ---------------- SurveyType枚举  结束 -------------------

  // ---------------- QuestionType枚举  开始 -------------------
  QuestionType: {
    // 枚举列表
    list: [
      {label: '单选', value: 'SINGLE'},
      {label: '多选', value: 'MULTIPLE'},
      {label: '问答', value: 'QUESTION'},
      {label: '图片', value: 'IMAGE'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'SINGLE':
          return '单选'
        case 'MULTIPLE':
          return '多选'
        case 'QUESTION':
          return '问答'
        case 'IMAGE':
          return '图片'
        default:
          return val
      }
    }
  },
  // ---------------- QuestionType枚举  结束 -------------------

  // ---------------- 奖励等级枚举  开始 -------------------
  PrizeLevel: {
    // 枚举列表
    list: [
      {label: '国家级', value: 'COUNTRY'},
      {label: '省级', value: 'PROVINCE'},
      {label: '市级', value: 'CITY'},
      {label: '县级', value: 'COUNTY'},
      {label: '区级', value: 'DISTRICT'},
      {label: '校级', value: 'SCHOOL'},
      {label: '其他', value: 'OTHER'},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'COUNTRY':
          return '国家级'
        case 'PROVINCE':
          return '省级'
        case 'CITY':
          return '市级'
        case 'DISTRICT':
          return '区级'
        case 'SCHOOL':
          return '校级'
        case 'OTHER':
          return '其他'
        default:
          return val
      }
    }
  },
  // ---------------- 奖励等级枚举  结束 -------------------

  // ---------------- 会议状态枚举  开始 -------------------
  MeetingStatus: {
    // 枚举列表
    list: [
      {label: '未召开', value: 'NOT_STARTED'},
      {label: '已召开', value: 'STARTED'},
      {label: '已取消', value: 'CANCELED'},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'NOT_STARTED':
          return '未召开'
        case 'STARTED':
          return '已召开'
        case 'CANCELED':
          return '已取消'
        default:
          return val
      }
    }
  },
  // ---------------- 会议状态枚举  结束 -------------------

  // ---------------- 通讯类人员类型  开始 -------------------
  OrganUserType: {
    // 枚举列表
    list: [
      {label: '机构', value: 'ORG'},
      {label: '用户', value: 'USER'},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'ORG':
          return '机构'
        case 'USER':
          return '用户'
        default:
          return val
      }
    }
  },
  // ---------------- 通讯类人员类型  结束 -------------------

  // ---------------- 教研活动类型  开始 -------------------
  ActivityType: {
    // 枚举列表
    list: [
      {label: '教研活动', value: 'ACTIVITY_TEACH_GROUP'},
      {label: '备课活动', value: 'ACTIVITY_PREPARE_LESSONS'},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'ACTIVITY_TEACH_GROUP':
          return '教研活动'
        case 'ACTIVITY_PREPARE_LESSONS':
          return '备课活动'
        default:
          return val
      }
    }
  },
  // ---------------- 教研活动类型  结束 -------------------

  // ---------------- 政治面貌类型  开始 -------------------
  // ---------------- PoliticsStatus枚举  开始 -------------------
  PoliticsType: {
    // 枚举列表
    list: [
      {label: '中共党员', value: 'COMMUNIST'},
      {label: '中共预备党员', value: 'COMMUNIST_PREPARE'},
      {label: '共青团员', value: 'LEAGUE'},
      {label: '民革党员', value: 'MINGGE'},
      {label: '民盟盟员', value: 'LEAGUE_MEMBERS'},
      {label: '民建会员', value: 'CIVIL_SERVICE_MEMBERS'},
      {label: '民进会员', value: 'DPP_MEMBER'},
      {label: '农工党党员', value: 'RURAL_LABOR_PARTY'},
      {label: '致公党党员', value: 'PUBLIC_INTEREST_PARTY'},
      {label: '九三学社社员', value: 'MEMBER_OF_JIUSAN_SOCIETY'},
      {label: '台盟盟员', value: 'TAIWAN_ALLIANCE_MEMBERS'},
      {label: '无党派人士', value: 'NON_PARTISANS'},
      {label: '群众', value: 'MASSES'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'COMMUNIST':
          return '中共党员'
        case 'COMMUNIST_PREPARE':
          return '中共预备党员'
        case 'LEAGUE':
          return '共青团员'
        case 'MINGGE':
          return '民革党员'
        case 'LEAGUE_MEMBERS':
          return '民盟盟员'
        case 'CIVIL_SERVICE_MEMBERS':
          return '民建会员'
        case 'DPP_MEMBER':
          return '民进会员'
        case 'RURAL_LABOR_PARTY':
          return '农工党党员'
        case 'PUBLIC_INTEREST_PARTY':
          return '致公党党员'
        case 'MEMBER_OF_JIUSAN_SOCIETY':
          return '九三学社社员'
        case 'TAIWAN_ALLIANCE_MEMBERS':
          return '台盟盟员'
        case 'NON_PARTISANS':
          return '无党派人士'
        case 'MASSES':
          return '群众'
        default:
          return val
      }
    }
  },
  // ---------------- PoliticsStatus枚举  结束 -------------------

  // ---------------- StudentPoliticsStatus枚举  开始 -------------------
  StudentPoliticsStatus: {
    // 枚举列表
    list: [
      {label: '少先队员', value: 'YOUNG_PIONEER'},
      {label: '共青团员', value: 'LEAGUE_MEMBER'},
      {label: '共产党员', value: 'COMMUNIST'},
      {label: '群众', value: 'MASSES'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'YOUNG_PIONEER':
          return '少先队员'
        case 'LEAGUE_MEMBER':
          return '共青团员'
        case 'COMMUNIST':
          return '共产党员'
        case 'MASSES':
          return '群众'
        default:
          return val
      }
    }
  },
  // ---------------- StudentPoliticsStatus枚举  结束 -------------------

  // ---------------- 职称类型  开始 -------------------
  TeacherTitleType: {
    // 枚举列表
    list: [
      {label: '无', value: 'NOTHING'},
      {label: '助理经济师', value: 'ASSISTANT_ECONOMIST'},
      {label: '初级经济师', value: 'JUNIOR_ECONOMIST'},
      {label: '初级医师', value: 'JUNIOR_PHYSICIAN'},
      {label: '执照医师', value: 'LICENSED_DOCTOR'},
      {label: '护士', value: 'NURSE'},
      {label: '助理会计师', value: 'ASSISTANT_ACCOUNTANT'},
      {label: '会计师', value: 'ACCOUNTANT'},
      {label: '中级会计师', value: 'INTERMEDIATE_ACCOUNTANT'},
      {label: '中级人力资源师', value: 'INTERMEDIATE_RESOURCES'},
      {label: '见习', value: 'PROBATION'},
      {label: '未评', value: 'NO_COMMENT'},
      {label: '未定职称', value: 'RANK_UNDECIDED'},
      {label: '中学一级教师', value: 'MIDDLE_FIRST_GRADE'},
      {label: '中学二级教师', value: 'MIDDLE_SECOND_GRADE'},
      {label: '中学高级教师', value: 'MIDDLE_SENIOR_GRADE'},
      {label: '小学一级教师', value: 'FIRST_GRADE'},
      {label: '小学二级教师', value: 'SECOND_GRADE'},
      {label: '小学高级教师', value: 'HIGHER_GRADE'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'NOTHING':
          return '无'
        case 'ASSISTANT_ECONOMIST':
          return '助理经济师'
        case 'JUNIOR_ECONOMIST':
          return '初级经济师'
        case 'JUNIOR_PHYSICIAN':
          return '初级医师'
        case 'LICENSED_DOCTOR':
          return '执照医师'
        case 'NURSE':
          return '护士'
        case 'ASSISTANT_ACCOUNTANT':
          return '助理会计师'
        case 'ACCOUNTANT':
          return '会计师'
        case 'INTERMEDIATE_ACCOUNTANT':
          return '中级会计师'
        case 'INTERMEDIATE_RESOURCES':
          return '中级人力资源师'
        case 'PROBATION':
          return '见习'
        case 'NO_COMMENT':
          return '未评'
        case 'RANK_UNDECIDED':
          return '未定职称'
        case 'MIDDLE_FIRST_GRADE':
          return '中学一级教师'
        case 'MIDDLE_SECOND_GRADE':
          return '中学二级教师'
        case 'MIDDLE_SENIOR_GRADE':
          return '中学高级教师'
        case 'FIRST_GRADE':
          return '小学一级教师'
        case 'SECOND_GRADE':
          return '小学二级教师'
        case 'HIGHER_GRADE':
          return '小学高级教师'
        default:
          return val
      }
    }
  },
  // ---------------- 职称类型  结束 -------------------

  // ---------------- Education枚举  开始 -------------------
  EducationType: {
    // 枚举列表
    list: [
      {label: '硕士研究生', value: 'POSTGRADUATE'},
      {label: '大学本科', value: 'FULL_COLLEGE'},
      {label: '大学专科', value: 'JUNIOR_COLLEGE'},
      {label: '大学专科（自考）', value: 'SELF_JUNIOR'},
      {label: '职高', value: 'VOCATIONAL_HIGH'},
      {label: '中技', value: 'INTERMEDIATE_TECHNOLOGY'},
      {label: '中专', value: 'SECONDARY_SPECIALIZED'},
      {label: '高中', value: 'HIGH_SCHOOL'},
      {label: '初中', value: 'JUNIOR_SCHOOL'},
      {label: '小学', value: 'PRIMARY_SCHOOL'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'POSTGRADUATE':
          return '硕士研究生'
        case 'FULL_COLLEGE':
          return '大学本科'
        case 'JUNIOR_COLLEGE':
          return '大学专科'
        case 'SELF_JUNIOR':
          return '大学专科（自考）'
        case 'VOCATIONAL_HIGH':
          return '职高'
        case 'INTERMEDIATE_TECHNOLOGY':
          return '中技'
        case 'SECONDARY_SPECIALIZED':
          return '中专'
        case 'HIGH_SCHOOL':
          return '高中'
        case 'JUNIOR_SCHOOL':
          return '初中'
        case 'PRIMARY_SCHOOL':
          return '小学'
        default:
          return val
      }
    }
  },
  // ---------------- Education枚举  结束 -------------------

  // ---------------- 项目类型  开始 -------------------
  ProjectType: {
    // 枚举列表
    list: [
      {label: '论文', value: 'PAPER'},
      {label: '赛课及指导学生', value: 'COMPETITION'},
      {label: '课题、课程', value: 'TOPICS'},
      {label: '经验交流及学术报告', value: 'ACADEMIC'},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'PAPER':
          return '论文'
        case 'COMPETITION':
          return '赛课及指导学生'
        case 'TOPICS':
          return '课题、课程'
        case 'ACADEMIC':
          return '经验交流及学术报告'
        default:
          return val
      }
    },
  },
  // ---------------- 项目类型  结束 -------------------

  // ---------------- 审核状态  开始 -------------------
  AuditStatus: {
    // 枚举列表
    list: [
      {label: '未审核', value: 'UNAUDITED'},
      {label: '全部通过', value: 'PASS'},
      {label: '部分通过', value: 'PART_PASS'},
      {label: '未通过', value: 'NOT_PASS'},
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'UNAUDITED':
          return '未审核'
        case 'PASS':
          return '全部通过'
        case 'PART_PASS':
          return '部分通过'
        case 'NOT_PASS':
          return '未通过'
        default:
          return val
      }
    },
  },
  // ---------------- 审核状态  结束 -------------------

  // ---------------- ChangeType枚举  开始 -------------------
  ChangeType: {
    // 枚举列表
    list: [
      {label: '姓名', value: 'NAME'},
      {label: '性别', value: 'SEX'},
      {label: '身份证号', value: 'ID_CARD'},
      {label: '户口性质', value: 'RESIDENT'},
      {label: '政治面貌', value: 'POLITICS'},
      {label: '家庭住址', value: 'ADDRESS'},
      {label: '父亲', value: 'FATHER'},
      {label: '母亲', value: 'MOTHER'},
      {label: '监护人', value: 'GUARDIAN'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'NAME':
          return '姓名'
        case 'SEX':
          return '性别'
        case 'ID_CARD':
          return '身份证号'
        case 'RESIDENT':
          return '户口性质'
        case 'POLITICS':
          return '政治面貌'
        case 'ADDRESS':
          return '家庭住址'
        case 'FATHER':
          return '父亲'
        case 'MOTHER':
          return '母亲'
        case 'GUARDIAN':
          return '监护人'
        default:
          return val
      }
    }
  },
  // ---------------- ChangeType枚举  结束 -------------------

  // ---------------- 变更类型  开始 -------------------
  AssessLevel: {
    // 枚举列表
    list: [
      {label: 'A', value: 'LEVEL_A'},
      {label: 'B', value: 'LEVEL_B'},
      {label: 'C', value: 'LEVEL_C'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'LEVEL_A':
          return 'A'
        case 'LEVEL_B':
          return 'B'
        case 'LEVEL_C':
          return 'C'
        default:
          return val
      }
    },
  },
  // ---------------- 变更类型  结束 -------------------

  // ---------------- HighestEducation枚举  开始 -------------------
  HighestEducation: {
    // 枚举列表
    list: [
      {label: '博士研究生', value: 'DOCTORAL_CANDIDATE'},
      {label: '硕士研究生', value: 'POSTGRADUATE'},
      {label: '硕士研究生（函授）', value: 'CORRESPONDENCE_POSTGRADUATE'},
      {label: '硕士研究生（在职）', value: 'JOB_POSTGRADUATE'},
      {label: '硕士研究生（脱产）', value: 'OUT_PRODUCTION_POSTGRADUATE'},
      {label: '大学本科', value: 'FULL_COLLEGE'},
      {label: '大学本科（自考）', value: 'SELF_COLLEGE'},
      {label: '大学本科（函授）', value: 'CORRESPONDENCE_COLLEGE'},
      {label: '大学本科（成教）', value: 'ADULT_COLLEGE'},
      {label: '大学本科（脱产）', value: 'OUT_PRODUCTION_COLLEGE'},
      {label: '大学专科', value: 'SPECIALTY'},
      {label: '大学专科（自考）', value: 'SELF_SPECIALTY'},
      {label: '大学专科（函授）', value: 'CORRESPONDENCE_SPECIALTY'},
      {label: '大学专科（在职）', value: 'JOB_SPECIALTY'},
      {label: '职高', value: 'VOCATIONAL_HIGH'},
      {label: '中专', value: 'SECONDARY_SPECIALIZED'},
      {label: '高中', value: 'HIGH_SCHOOL'},
      {label: '初中', value: 'JUNIOR_SCHOOL'},
      {label: '小学', value: 'PRIMARY_SCHOOL'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'DOCTORAL_CANDIDATE':
          return '博士研究生'
        case 'POSTGRADUATE':
          return '硕士研究生'
        case 'CORRESPONDENCE_POSTGRADUATE':
          return '硕士研究生（函授）'
        case 'JOB_POSTGRADUATE':
          return '硕士研究生（在职）'
        case 'OUT_PRODUCTION_POSTGRADUATE':
          return '硕士研究生（脱产）'
        case 'FULL_COLLEGE':
          return '大学本科'
        case 'SELF_COLLEGE':
          return '大学本科（自考）'
        case 'CORRESPONDENCE_COLLEGE':
          return '大学本科（函授）'
        case 'ADULT_COLLEGE':
          return '大学本科（成教）'
        case 'OUT_PRODUCTION_COLLEGE':
          return '大学本科（脱产）'
        case 'SPECIALTY':
          return '大学专科'
        case 'SELF_SPECIALTY':
          return '大学专科（自考）'
        case 'CORRESPONDENCE_SPECIALTY':
          return '大学专科（函授）'
        case 'JOB_SPECIALTY':
          return '大学专科（在职）'
        case 'VOCATIONAL_HIGH':
          return '职高'
        case 'SECONDARY_SPECIALIZED':
          return '中专'
        case 'HIGH_SCHOOL':
          return '高中'
        case 'JUNIOR_SCHOOL':
          return '初中'
        case 'PRIMARY_SCHOOL':
          return '小学'
        default:
          return val
      }
    }
  },
  // ---------------- HighestEducation枚举  结束 -------------------

  // ---------------- JobStatus枚举  开始 -------------------
  JobStatus: {
    // 枚举列表
    list: [
      {label: '离职', value: 'DIMISSION'},
      {label: '在职', value: 'SERVING'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'DIMISSION':
          return '离职'
        case 'SERVING':
          return '在职'
        default:
          return val
      }
    }
  },
  // ---------------- JobStatus枚举  结束 -------------------

  // ---------------- ResidentType枚举  开始 -------------------
  ResidentType: {
    // 枚举列表
    list: [
      {label: '城市', value: 'CITY'},
      {label: '县城', value: 'COUNTY'},
      {label: '农村', value: 'VILLAGE'}
    ],
    // 查询条件列表
    allList: function () {
      return [{label: '全部', value: null}].concat(this.list)
    },
    // 根据枚举值获取名称
    getName: function (val) {
      switch (val) {
        case 'CITY':
          return '城市'
        case 'COUNTY':
          return '县城'
        case 'VILLAGE':
          return '农村'
        default:
          return val
      }
    }
  },
  // ---------------- ResidentType枚举  结束 -------------------
}
