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
        <span>历史</span>
        <img slot="icon"
             slot-scope="props"
             :src="props.active ? iconHistory.active : iconHistory.normal">
      </van-tabbar-item>
    </van-tabbar>

    <week v-show="active === 0"></week>
    <history v-show="active === 1"></history>
  </div>
</template>

<script>
  import Week from './Week'
  import History from './History'

  export default {
    components: {
      Week, History
    },
    data () {
      return {
        active: parseInt(sessionStorage.getItem('interActive')) || 0,
        iconWeek: {
          normal: require('IMAGE/week-normal.png'),
          active: require('IMAGE/week-active.png')
        },
        iconHistory: {
          normal: require('IMAGE/history-normal.png'),
          active: require('IMAGE/history-active.png')
        }
      }
    },
    watch: {
      active (newVal) {
        sessionStorage.setItem('interActive', newVal)
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
