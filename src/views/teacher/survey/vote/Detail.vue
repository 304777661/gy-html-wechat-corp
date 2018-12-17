<template>
  <div class="vote-detail">
    <survey-info-card/>

    <p class="vote-detail__total">投票结果</p>

    <!--TODO 投票结果展示-->
    <card>
      <div class="card-header">
        你一般在什么情况下上网?
      </div>
    </card>
  </div>
</template>

<script>
  export default {
    data () {
      const {id} = this.$route.params
      return {
        id,
        optionList: []
      }
    },
    async created () {
      this.optionList = await this.$api.teacher.getSurveyInfoVote(this.id)
    }
  }
</script>

<style lang="sass">
  .vote-detail
    padding: 0 $default-gap $default-gap
    &__total
      margin: $default-gap 0
      color: $gray
    .card
      margin-top: $default-gap
      // &-header
        padding-bottom: 10px
        font-weight: bold
        border-bottom: 1.5px dashed $gray-light
</style>
