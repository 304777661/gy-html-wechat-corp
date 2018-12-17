<template>
  <div class="tabs">
    <van-tabbar v-model="active">
      <van-tabbar-item>
        <span>本周</span>
        <img slot="icon"
             slot-scope="props"
             :src="props.active ? iconWeek.active : iconWeek.normal">
      </van-tabbar-item>
      <van-tabbar-item>
        <span>点评</span>
        <img slot="icon"
             slot-scope="props"
             :src="props.active ? iconComment.active : iconComment.normal">
      </van-tabbar-item>
      <van-tabbar-item>
        <span>教案</span>
        <img slot="icon"
             slot-scope="props"
             :src="props.active ? iconTeachPlan.active : iconTeachPlan.normal">
      </van-tabbar-item>
    </van-tabbar>

    <week v-if="active === 0"></week>
    <comment v-if="active === 1"></comment>
    <teach-plan v-if="active === 2"></teach-plan>
  </div>
</template>

<script>
  import Week from './Week'
  import Comment from './Comment'
  import TeachPlan from './TeachPlan'

  export default {
    components: {
      Week, Comment, TeachPlan
    },
    data () {
      return {
        active: parseInt(sessionStorage.getItem('parentInteractAction')) || 0,
        iconWeek: {
          normal: require('IMAGE/week-normal.png'),
          active: require('IMAGE/week-active.png')
        },
        iconComment: {
          normal: require('IMAGE/comment-normal.png'),
          active: require('IMAGE/comment-active.png')
        },
        iconTeachPlan: {
          normal: require('IMAGE/teachPlan-normal.png'),
          active: require('IMAGE/teachPlan-active.png')
        }
      }
    },
    watch: {
      active (newVal) {
        sessionStorage.setItem('parentInteractAction', newVal)
      }
    }
  }
</script>

<style lang="sass">
  .tabs
    padding-bottom: 50px
    .van-tabbar-item__icon img
      @include rect(20px)
</style>
