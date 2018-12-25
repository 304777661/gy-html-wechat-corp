<template>
  <div class="survey-detail" :class="editable ? '' : 'survey-detail-full'">
    <my-loading v-model="loading"/>
    <notice-detail :article="article" :endTime="article.endTime"></notice-detail>

    <div class="survey-detail-question" v-for="(item,index) in article.questionList" :key="item.id">
      <!--单选/多选-->
      <div v-if="item.questionType === 'RADIO' || item.questionType === 'MULTIPLE'">
        <p class="survey-detail-question-title">{{index + 1}}、{{item.title}}</p>
        <div class="survey-detail-question-option van-hairline--bottom">
          <div class="survey-detail-question-option-item"
               v-for="option in item.optionList" :key="option.id">
            <label @click="handleRadioOptionClick(item.questionType,item.optionList,option)">
              <van-icon :name="option.isSelected === 'YES' ? 'checked':'check'"
                        :color="option.isSelected === 'YES' ? '#108EE9' : '#CFCFCF'">
              </van-icon>
              {{option.optionTitle}}
            </label>
          </div>
        </div>
      </div>

      <!--填空题-->
      <div v-else-if="item.questionType === 'COMPLETION'" class="van-hairline--bottom">
        <p class="survey-detail-question-title">{{index + 1}}、{{item.title}}</p>
        <van-field v-model="item.answer"
                   type="textarea"
                   :border="true"
                   :autosize="textAreaAutoSize"
                   :readonly="!editable"
                   placeholder="请输入">
        </van-field>
      </div>
    </div>
    <my-button :content="'提交'" @btnClick="handleSubmit" v-show="editable"></my-button>
  </div>
</template>

<script>
  export default {
    name: 'SurveyDetail',
    data () {
      return {
        id: this.$route.query.id,
        isFinish: true,
        editable: false,
        loading: true,
        textAreaAutoSize: {
          minHeight: 100,
        },
        article: {}
      }
    },
    async created () {
      this.loading = true
      this.article = await this.$api.parent.getSurvey({'id': this.id})
      this.editable = !(this.article.isParticipated === 'YES' || this.article.isFinish === 'YES')
      this.loading = false
    },
    methods: {
      async handleSubmit () {
        // 数据校验
        if (this.article.questionList) {
          for (let i = 0; i < this.article.questionList.length; i++) {
            const item = this.article.questionList[i]
            if (item.questionType === 'COMPLETION') {
              if (item.answer === '' || item.answer === undefined || item.answer === null) {
                this.$toast.fail('第' + (i + 1) + '题未填写')
                return
              }
            }
            if (item.questionType === 'RADIO' || item.questionType === 'MULTIPLE') {
              let isEmpty = true
              for (let j = 0; j < item.optionList.length; j++) {
                let optionItem = item.optionList[j]
                if (optionItem.isSelected === 'YES') {
                  isEmpty = false
                  break
                }
              }
              if (isEmpty) {
                this.$toast.fail('第' + (i + 1) + '题未选择')
                return
              }
            }
          }
          // 提交
          await this.$api.parent.addSurveyRecord(this.getSubmitParams())
          this.$toast.success('提交成功')
          this.$router.back()
        }
      },
      handleRadioOptionClick (type, optionList, option) {
        if (!this.editable) {
          return
        }
        if (type === 'RADIO') {
          optionList.map((item) => {
            item.isSelected = 'NO'
          })
          option.isSelected = 'YES'
        }
        if (type === 'MULTIPLE') {
          option.isSelected = (option.isSelected === 'YES') ? 'NO' : 'YES'
        }
      },
      getSubmitParams () {
        return {
          surveyId: this.id,
          questionList: this.article.questionList
        }
      }
    }
  }
</script>
<style lang="sass" scoped>

  .survey-detail
    background: $white
    padding-bottom: 100px
    &-question
      padding: 10px 14px 0
      background: $white
      &-title
        font-size: 15px
        color: $black
        line-height: 21px
        font-weight: bold
        margin-bottom: 10px
      &-option
        padding-bottom: 10px
        &-item
          line-height: 28px
          font-size: 14px
          .van-icon
            top: 2px
            margin-right: 10px
      .van-cell
        padding: 4px 0 10px
</style>
