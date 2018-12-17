<template>
  <div class="my-button">
    <van-button class="btn"
                @click="btnClick">{{content}}
    </van-button>
  </div>
</template>

<script>
  export default {
    name: 'MyButton',
    props: {
      content: {
        Type: String,
        default: ''
      }
    },
    methods: {
      btnClick () {
        this.$emit('btnClick')
      }
    }
  }
</script>

<style scoped lang="sass">
  .my-button
    $btn-width: 90vw
    $btn-height: 45px
    .btn
      position: fixed
      left: 50%
      color: $white
      bottom: $default-gap
      width: $btn-width
      height: $btn-height
      line-height: $btn-height
      margin-left: -$btn-width / 2
      border-radius: 4px
      background: $dark-blue
      font-size: 17px
</style>
