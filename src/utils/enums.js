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
  }
  // ---------------- 通讯类人员类型  结束 -------------------
}