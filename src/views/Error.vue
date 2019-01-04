<template>
  <div class="error">
    <img src="../assets/images/info.png" class="icon-info">
    <p class="desc">请在企业微信客户端打开链接</p>
  </div>
</template>

<script>
  export default {
    name: 'Error',
    data () {
      return {}
    },
    created () {
    }
  }
</script>

<style scoped lang="sass">
  .error
    @include ver-center-center
    .icon-info
      margin: 200px 0 20px
      width: 80px
      height: 80px
    .desc
      font-size: 18px
      color: #9B9B9B
</style>