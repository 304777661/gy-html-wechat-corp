<template>
  <div class="survey-vote">
    <card chain>
      <div class="card-cell">
        <input type="text" :placeholder="text.title" v-model="query.title">
      </div>
      <van-field v-model="query.content"
                 type="textarea"
                 :border="false"
                 :placeholder="text.content"/>
      <p class="textarea-length">{{query.content.length}}/300</p>

      <picture-map v-model="query.imageList" upload/>
    </card>

    <card chain v-if="pageType === 'vote'">
      <div class="card-cell">
        <p>选项设置</p>
      </div>
      <div class="card-cell"
           v-for="(option, optionIdx) in query.surveyOptionList"
           :key="optionIdx">
        <input type="text"
               :placeholder="optionIdx | placeholderNum2Abc"
               v-model="query.surveyOptionList[optionIdx]">
        <span class="icon icon-close" @click="doDelOption(optionIdx)"></span>
      </div>

      <div class="card-add">
        <span class="icon icon-add"></span>
        <span @click="doAddOption">添加选项</span>
      </div>
    </card>

    <card>
      <van-cell-group :border="false">
        <van-switch-cell v-if="pageType === 'vote'"
                         v-model="multipleChecked"
                         title="允许多选"
                         class="cell border"/>

        <van-cell title="结束时间"
                  :value="query.endDate"
                  class="cell border"
                  is-link
                  @click="show = true"/>

        <van-switch-cell v-if="pageType === 'certify'"
                         v-model="publicChecked"
                         title="公开提交记录"
                         class="cell border"/>
      </van-cell-group>

      <div class="cell">
        <div style="float:left;">可见范围</div>
        <van-checkbox v-model="allChecked" class="checkbox ml10">全选</van-checkbox>
      </div>

      <div class="checkbox-group"
           v-if="classList.length">
        <van-checkbox v-for="item in classList"
                      :key="item.classId"
                      v-model="item.checked"
                      class="checkbox">
          {{item.className}}
        </van-checkbox>
      </div>
    </card>

    <van-button type="primary" class="btn-primary" @click="doSubmit">{{text.button}}</van-button>

    <van-popup
      v-model="show"
      position="bottom"
      :lazy-render="false">
      <van-datetime-picker
        ref="picker"
        v-model="currentDate"
        type="datetime"
        :item-height="itemHeight"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="doEndDateConfirm"
        @cancel="doEndDateCancel"
      />
    </van-popup>

  </div>
</template>

<script>
  export default {
    computed: {
      content () {
        return this.query.content
      }
    },
    data () {
      let date = new Date()
      let pageType = this.$route.path.split('/')[3]
      return {
        pageType,
        text: {
          title: pageType === 'vote' ? '投票标题' : pageType === 'certify' ? '签字证明标题' : '问卷调查标题',
          content: pageType === 'vote' ? '投票说明(可选)' : pageType === 'certify' ? '签字证明说明(可选)' : '问卷调差说明(可选)',
          button: pageType === 'vote' ? '发布投票' : pageType === 'certify' ? '发布' : '添加问题'
        },
        radio: 1,
        publicChecked: false,
        allChecked: false,
        multipleChecked: false,
        currentDate: date,
        minDate: date,
        maxDate: new Date(date.getFullYear() + 1, 11, 31),
        show: false,
        itemHeight: null,
        query: {
          title: '',
          content: '',
          endDate: date.Format('yyyy-MM-dd hh:mm:ss'),
          isMultiple: undefined,
          imageList: [],
          surveyOptionList: pageType === 'vote' ? [''] : undefined,
          classIdList: []
        },
        classList: []
      }
    },
    watch: {
      content (newVal, oldVal) {
        if (newVal.length <= 300) return
        this.$toast.fail('说明文字长度不能超过300')
        this.query.content = oldVal
      },
      show (newVal) {
        if (!newVal) return
        this.$nextTick(() => {
          this.itemHeight = this.$refs.picker.$el.children[0].clientHeight
        })
      },
      multipleChecked: {
        handler: function (newVal) {
          if (this.pageType !== 'vote') return
          this.query.isMultiple = newVal ? 'YES' : 'NO'
        },
        immediate: true
      },
      allChecked (newVal) {
        this.classList.forEach(c => {
          c.checked = newVal
        })
      }
    },
    async created () {
      let classList = await this.$api.teacher.queryTeachingClassList()
      classList.forEach(c => {
        c.checked = false
      })
      this.classList = classList
    },
    methods: {
      formatter (type, value) {
        let suffix = ''
        switch (type) {
          case 'year':
            suffix = '年'
            break
          case 'month':
            suffix = '月'
            break
          case 'day':
            suffix = '日'
            break
          case 'hour':
            suffix = '时'
            break
          case 'minute':
            suffix = '分'
            break
        }
        return value + suffix
      },
      doAddOption () {
        this.query.surveyOptionList.push('')
      },
      doDelOption (idx) {
        if (this.query.surveyOptionList.length === 1) {
          this.$toast('必须保留一个选项')
          return
        }
        this.query.surveyOptionList.splice(idx, 1)
      },
      doEndDateConfirm (value) {
        this.query.endDate = value.Format('yyyy-MM-dd hh:mm:ss')
        this.show = false
      },
      doEndDateCancel () {
        this.show = false
      },
      async doSubmit () {
        this.classList.forEach(item => {
          if (item.checked) {
            this.query.classIdList.push(item.classId)
          }
        })
        if (!this.query.title) {
          this.$toast('请先填写标题')
          return
        } else if (!this.query.classIdList.length) {
          this.$toast('请先选择可见范围')
          return
        } else if (!this.query.endDate) {
          this.$toast('请选择结束时间')
          return
        }

        switch (this.pageType) {
          case 'vote':
            const hasEmptyString = this.query.surveyOptionList.some(item => {
              return item === ''
            })
            if (hasEmptyString) {
              this.$toast('不能有空的选项')
              return
            }
            await this.$api.teacher.addSurveyVote(this.query)
            this.$toast.success('新增成功')
            this.$router.back()
            break
          case 'certify':
            this.query.isPublic = this.publicChecked ? 'YES' : 'NO'
            await this.$api.teacher.addSurveyCertify(this.query)
            this.$toast.success('新增成功')
            this.$router.back()
            break
          case 'psq':
            sessionStorage.setItem('问卷调查', JSON.stringify(this.query))
            this.$router.push('psq/next')
            break
        }
      }
    }
  }
</script>

<style lang="sass">
  .survey-vote
    padding: $default-gap $default-gap 20px
    .textarea-length
      text-align: right
      color: $gray
    .border
      border-bottom: 1.5px dashed $gray-light
    .ml10
      margin-left: 10px
    .van-field
      padding-left: 0
      padding-right: 0
    .checkbox
      float: left
    .cell
      $h: 50px
      padding: 0
      height: $h
      line-height: $h
      .van-cell__right-icon
        line-height: $h
    .card
      padding-top: 0
      & + .card
        margin-top: 10px
</style>
