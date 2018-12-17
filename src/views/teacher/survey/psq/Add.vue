<template>
  <div class="psq-add">
    <div class="psq-add-header">
      <div class="psq-add-header__btn" @click="doAddSelect">添加选择题</div>
      <div class="psq-add-header__btn" @click="doAddQuesAndAsk">添加问答题</div>
    </div>

    <div v-for="(item, idx) in query.surveyQuestionList"
         :key="idx">
      <div class="card-group"
           v-if="item.questionType === 'SINGLE' || item.questionType === 'MULTIPLE'">
        <card chain class="py0">
          <div class="card-cell">
            <span class="tag">选</span>
            <input type="text" placeholder="请输入问题名称" v-model="item.title">
            <span class="icon icon-close"></span>
          </div>
        </card>
        <card chain class="py0">
          <div class="card-cell"
               v-for="(option, optionIdx) in item.surveyOptionList"
               :key="'option' + optionIdx">
            <input type="text"
                   :placeholder="optionIdx | placeholderNum2Abc"
                   v-model="option.optionItem">
            <span class="icon icon-close" @click="doDelOption(idx, optionIdx)"></span>
          </div>

          <div class="card-add">
            <span class="icon icon-add"></span>
            <span @click="doAddOption(idx)">添加选项</span>
          </div>
        </card>
        <card class="radio-card">
          <label :for="'single' + idx" class="radio">
            <span class="radio-bg"
                  :class="{'radio-bg--on': item.questionType === 'SINGLE'}"></span>
            <input type="radio"
                   name="radio"
                   :id="'single' + idx"
                   value="SINGLE"
                   hidden
                   v-model="item.questionType"/>
            <span>单选</span>
          </label>

          <label :for="'multiple' + idx" class="radio">
            <span class="radio-bg"
                  :class="{'radio-bg--on': item.questionType === 'MULTIPLE'}"></span>
            <input type="radio"
                   name="radio"
                   :id="'multiple' + idx"
                   value="MULTIPLE"
                   hidden
                   v-model="item.questionType"/>
            <span>多选</span>
          </label>
        </card>
      </div>

      <div class="card-group"
           v-if="item.questionType === 'QUESTION'">
        <card>
          <div class="question-card">
            <span class="tag">问</span>
            <input type="text" placeholder="请输入问题名称" v-model="item.title">
            <span class="icon icon-close"></span>
          </div>
        </card>
      </div>
    </div>

    <van-button type="primary"
                class="btn-primary"
                v-show="query.surveyQuestionList.length"
                @click="doSubmit">
      发布问卷
    </van-button>
  </div>
</template>

<script>
  export default {
    data () {
      let query = JSON.parse(sessionStorage.getItem('问卷调查'))
      query.surveyQuestionList = []
      return {
        query
      }
    },
    methods: {
      doAddSelect () {
        this.query.surveyQuestionList.push({
          title: '',
          questionType: 'SINGLE',
          surveyOptionList: [{
            optionItem: ''
          }, {
            optionItem: ''
          }]
        })
      },
      doAddQuesAndAsk () {
        this.query.surveyQuestionList.push({
          title: '',
          questionType: 'QUESTION'
        })
      },
      doAddOption (idx) {
        this.query.surveyQuestionList[idx].surveyOptionList.push({
          optionItem: ''
        })
      },
      doDelOption (idx, optionIdx) {
        if (this.query.surveyQuestionList[idx].surveyOptionList.length <= 2) {
          this.$toast('选择题的选项不能少于2个')
          return
        }
        this.query.surveyQuestionList[idx].surveyOptionList.splice(optionIdx, 1)
      },
      async doSubmit () {
        let hasNull = this.query.surveyQuestionList.some(item => {
          if (!item.title) {
            this.$toast('标题不能为空')
            return true
          }
          if (item.surveyOptionList.length) {
            return item.surveyOptionList.some(option => {
              if (!option.optionItem) {
                this.$toast('选项不能为空, 请填写完整')
                return true
              }
            })
          }
        })
        if (hasNull) return
        this.$api.teacher.addSurveyPsq(this.query)
      }
    }
  }
</script>

<style lang="sass">
  .psq-add
    $header-height: 60px
    $header-btn-width: 156px
    $header-btn-height: 35px
    padding-bottom: 20px
    &-header
      height: $header-height
      background: #fff
      box-shadow: $default-shadow
      @include hor-around-center
      &__btn
        width: $header-btn-width
        height: $header-btn-height
        line-height: $header-btn-height
        text-align: center
        color: $blue
        background: #fff
        border: 1px solid $blue
        border-radius: $header-btn-height
    .card-group
      padding: $default-gap
      border-bottom: 1px solid $gray-light
      &:last-of-type
        border-bottom: none
      .card + .card
        margin-top: 10px
      .py0
        padding-top: 0
        padding-bottom: 0
      .card-add
        padding-bottom: $default-gap
      .tag
        display: inline-block
        margin-right: 10px
        $w: 22px
        @include circle($w)
        @include fixed-width($w)
        text-align: center
        line-height: $w
        color: $blue
        background: $gray-light
      .question-card
        @include hor-between-center
        .icon-close
          color: $red
          font-size: $font-small
      .radio-card
        @include hor-around-center
</style>
