<template>
  <div class="detail">

    <nav class="detail-tabs">
      <span class="detail-tabs__li"
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{'detail-tabs__li--active': curTab === index}"
            @click="doChangeTab(index)">
        {{tab.label}}
      </span>
      <span class="detail-tabs__line" :style="[tabsLineTranslateX]"></span>
    </nav>

    <!--基本信息-->
    <van-collapse v-model="basicInfoActiveNames" v-show="this.curTab==0">
      <van-collapse-item title="基本信息" name="1">
        <van-cell-group :border="false">
          <van-cell title="姓名" :value="teacher.studentNo || '--'"/>
          <van-cell title="性别" :value="teacher.studentNo || '--'"/>
          <van-cell title="当前状态" :value="teacher.studentNo || '--'"/>
          <van-cell title="教授科目" :value="teacher.studentNo || '--'"/>
          <van-cell title="所属部门" :value="teacher.studentNo || '--'"/>
          <van-cell title="年级" :value="teacher.studentNo || '--'"/>
          <van-cell title="身份证号" :value="teacher.studentNo || '--'"/>
          <van-cell title="联系电话" :value="teacher.studentNo || '--'"/>
          <van-cell title="出生年月" :value="teacher.studentNo || '--'"/>
          <van-cell title="年龄" :value="teacher.studentNo || '--'"/>
          <van-cell title="民族" :value="teacher.studentNo || '--'"/>
          <van-cell title="籍贯" :value="teacher.studentNo || '--'"/>
          <van-cell title="政治面貌" :value="teacher.studentNo || '--'"/>
          <van-cell title="加入时间" :value="teacher.studentNo || '--'"/>
          <van-cell title="第一学历" :value="teacher.studentNo || '--'"/>
          <van-cell title="最高学历" :value="teacher.studentNo || '--'"/>
          <van-cell title="毕业时间" :value="teacher.studentNo || '--'"/>
          <van-cell title="毕业学校" :value="teacher.studentNo || '--'"/>
          <van-cell title="参加工作时间" :value="teacher.studentNo || '--'"/>
          <van-cell title="工龄" :value="teacher.studentNo || '--'"/>
          <van-cell title="来校时间" :value="teacher.studentNo || '--'"/>
          <van-cell title="原工作单位" :value="teacher.studentNo || '--'"/>
          <van-cell title="职称1" :value="teacher.studentNo || '--'"/>
          <van-cell title="评定时间" :value="teacher.studentNo || '--'"/>
          <van-cell title="职称2" :value="teacher.studentNo || '--'"/>
          <van-cell title="评定时间" :value="teacher.studentNo || '--'"/>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>

    <!--家庭信息-->
    <van-collapse v-model="basicInfoActiveNames" v-show="this.curTab==0">
      <van-collapse-item title="家庭信息" name="2">
        <van-cell-group :border="false">
          <van-cell title="家庭电话" :value="teacher.studentNo || '--'"/>
          <van-cell title="子女信息" :value="teacher.studentNo || '--'"/>
          <div v-for="child in teacher.children">
            <van-cell title="姓名" :value="child.name || '--'"/>
            <van-cell title="性别" :value="child.name || '--'"/>
            <van-cell title="年龄" :value="child.name || '--'"/>
            <van-cell title="学校或单位" :value="child.name || '--'"/>
            <van-cell title="备注" :value="child.name || '--'"/>
          </div>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>

    <!--工作经历-->
    <van-collapse v-model="experienceActiveNames" v-show="this.curTab==1">
      <van-collapse-item title="工作经历" name="1">
        <van-cell-group :border="false">
          <van-cell title="开始时间" :value="teacher.studentNo || '--'"/>
          <van-cell title="结束时间" :value="teacher.studentNo || '--'"/>
          <van-cell title="教授科目" :value="teacher.studentNo || '--'"/>
          <van-cell title="年级" :value="teacher.studentNo || '--'"/>
          <van-cell title="班级" :value="teacher.studentNo || '--'"/>
          <van-cell title="是否班主任" :value="teacher.studentNo || '--'"/>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>

    <!--获奖情况-->
    <van-collapse v-model="awardsActiveNames" v-show="this.curTab==2">
      <van-collapse-item title="获奖情况" name="1">
        <van-cell-group :border="false">
          <van-cell title="项目名称" :value="teacher.studentNo || '--'"/>
          <van-cell title="类型" :value="teacher.studentNo || '--'"/>
          <van-cell title="颁奖单位" :value="teacher.studentNo || '--'"/>
          <van-cell title="获奖等级或获得的成绩" :value="teacher.studentNo || '--'"/>
          <van-cell title="获奖时间" :value="teacher.studentNo || '--'"/>
          <van-cell title="证明材料" :value="teacher.studentNo || '--'"/>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>

  </div>
</template>

<script>
  export default {
    name: 'Detail',

    data () {
      return {
        curTab: 0,
        tabs: [{
          label: '基本情况',
          value: 'BASIC'
        }, {
          label: '工作经历',
          value: 'EXPERIENCE'
        }, {
          label: '获奖情况',
          value: 'AWARDS'
        }],
        teacher: {
          studentNo: '--',
          children: [
            {
              name: 'max'
            },
            {
              name: 'max0101'
            },
          ]
        },
        basicInfoActiveNames: ['2'],
        experienceActiveNames: ['1'],
        awardsActiveNames: ['1']
      }
    },
    methods: {
      initData () {

      },
      doChangeTab (idx) {
        if (idx === this.curTab) return
        this.curTab = idx
        this.initData(true)
      },
    },
    computed: {
      tabsLineTranslateX () {
        let itemWidth = 100 / 3
        return {transform: `translateX(${((this.curTab) * itemWidth) + itemWidth / 2 + '%'})`}
      },
    }
  }
</script>

<style scoped lang="sass">

  .detail
    padding-bottom: $default-gap
    .van-collapse
      margin: 0 15px
    .van-cell
      padding-left: 0
      padding-right: 0
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
