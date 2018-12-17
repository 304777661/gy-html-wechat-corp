<template>
  <div class="search">
    <input type="search" class="search__input"
           :placeholder="placeholder"
           :value="value"
           @input="onInput"
           @keydown.enter="search">
    <van-icon name="search" class="search__icon" />
  </div>
</template>

<script>
  export default {
    name: 'search',
    props: {
      placeholder: {
        type: String,
        default: '请输入关键字'
      },
      value: String
    },
    model: {
      prop: 'value',
      event: 'input'
    },
    data () {
      return {}
    },
    methods: {
      onInput (e) {
        this.$emit('input', e.target.value)
      },
      search () {
        event.preventDefault()
        this.$emit('search')
      }
    }
  }
</script>

<style lang="sass">
  .search
    position: relative
    &__input
      width: 100%
      height: $search-input-height
      line-height: $search-input-height
      padding-left: 30px
      background: #f2f2f2
      border-radius: 2px
    &__icon
      position: absolute
      left: 10px
      top: 50%
      transform: translateY(-50%)
      color: $black
      font-size: $font-normal
      font-weight: bold
</style>
