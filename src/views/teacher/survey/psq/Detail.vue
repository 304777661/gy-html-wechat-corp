<template>
  <div class="psq-detail">
    <header class="psq-detail-header">
      <img :src="avatar | defaultAvatar" class="psq-detail-header__avatar">
      <span class="psq-detail-header__name">{{name}}</span>
    </header>

    <div class="card-group"
         v-for="(item, idx) in surveyList"
         :key="item.id">
      <card v-if="item.questionType === 'QUESTION'">
        <p class="card-header">{{idx + 1}}.{{item.title}}</p>
        <div class="card-body">
          {{item.answer}}
        </div>
      </card>
      <card v-if="item.questionType === 'SINGLE' || item.questionType === 'MULTIPLE'">
        <p class="card-header">{{idx + 1}}.{{item.title}}</p>
        <div class="card-body">
          <div class="option-item"
               v-for="(option, optionIdx) in item.surveyOptionList"
               :key="optionIdx">
            <span>{{optionIdx | num2Abc}}、{{option.optionItem}}</span>
            <label class="radio">
              <span class="radio-bg"
                    :class="{'radio-bg--on': option.isSelected === 'YES'}"></span>
            </label>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import config from '@/config'

  export default {
    data () {
      const {surveyId, surveyRecordId} = this.$route.params
      let {avatar, name} = this.$route.query
      if (avatar === 'null' || avatar === '' || avatar === 'undefined') {
        avatar = null
      }
      return {
        avatar,
        name,
        query: {
          pageNo: 1,
          pageSize: config.pageSize,
          surveyId,
          surveyRecordId
        },
        surveyList: []
      }
    },
    async created () {
      this.surveyList = await this.$api.teacher.getSurveyInfoPsq(this.query)
    },
    methods: {
      num2Abc (idx) {
        return String.fromCharCode(idx + 65)
      }
    }
  }
</script>

<style lang="sass">
  .psq-detail
    padding-bottom: 20px
    &-header
      height: 112px
      @include ver-center-center
      color: #fff
      background: #4f78a9
      border-radius: 185px/75px
      border-top-left-radius: 0
      border-top-right-radius: 0
      &__avatar
        @include circle(52px)
      &__name
        margin-top: 10px
    .card-group
      padding: $default-gap $default-gap 0
      .card
        padding-top: 0
        // min-height: 190px
        &-header
          height: 50px
          line-height: 50px
          font-weight: bold
          border-bottom: 1.5px dashed $gray-light
        &-body
          padding-top: $default-gap
          line-height: 1.5
          color: $gray
          .option-item
            margin-bottom: 10px
            @include hor-between-center
            img
              @include fixed-width(15px)
</style>
