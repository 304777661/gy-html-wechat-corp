<template>
  <div class="loading" v-show="loading">
    <van-loading class="icon-size"></van-loading>
    <span class="loading__text">{{text}}</span>
  </div>
</template>

<script>
  export default {
    name: 'MyLoading',
    props: {
      text: {
        type: String,
        default: '加载中...'
      },
      loading: Boolean
    },
    model: {
      prop: 'loading'
    },
    data () {
      return {}
    }
  }
</script>

<style lang="sass">
  .loading
    display: flex
    align-items: center
    justify-content: center
    line-height: 50px
    font-size: 13px
    color: $gray
    .icon-size
      font-size: 15px
    &__text
      margin-left: 5px
</style>
