<template>
  <div class="section-picker">
    <van-icon name="arrow-left" @click="handlePreviousClick()" color="#fff" size="26px"/>
    <span class="section-picker-content">{{content}}</span>
    <van-icon name="arrow" @click="handleNextClick()" color="#fff" size="26px"/>
  </div>
</template>

<script>
  export default {
    name: 'SectionPicker',
    props: {
      content: String
    },
    methods: {
      handlePreviousClick () {
        this.$emit('previousClick')
      },
      handleNextClick () {
        this.$emit('nextClick')
      }
    }
  }
</script>

<style scoped lang="sass">
  .section-picker
    background: $dark-blue
    $h: 80px
    height: $h
    line-height: $h
    @include hor-between-center
    padding: 0 60px
    &-content
      color: $white
      text-align: center
      line-height: 24px
      font-size: 17px

</style>
