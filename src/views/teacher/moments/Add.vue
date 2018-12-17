<template>
  <div class="moment-add">
    <div class="top">
      <!--<van-cell-group>-->
      <van-cell title="已选择"
                :value="classText"
                is-link
                @click="doOpenClassPopup"
                v-if="!isSchool"/>

      <van-popup v-model="classShow" position="right">
        <div class="popup-right popup-right--student">
          <ul class="class-list">
            <li class="class-list__li"
                v-for="cls in classList"
                :key="'class' + cls.classId"
                :class="{'class-list__li--active': cls.active}"
                @click="doSelectClass(cls)">
              {{cls.className}}
            </li>
          </ul>
        </div>
        <van-button type="primary" class="btn-primary" @click="doConfirmClass">确定</van-button>
      </van-popup>
      <!--</van-cell-group>-->

      <textarea class="top__textarea"
                rows="5"
                placeholder="这一刻的想法..."
                v-model="submit.content"></textarea>

      <picture-map upload :pictures="submit.imageList"/>

      <ul class="top-tags">
        <li class="top-tags__letter">常用标签:</li>
        <li class="top-tags__tag"
            v-for="(tag, idx) in tagList"
            :key="idx"
            :class="{'top-tags__tag--active': tag.active}"
            @click="doSelectTag(tag)">
          {{tag.label}}
        </li>
      </ul>
    </div>

    <van-checkbox v-model="checked" class="moment-add__checkbox">
      同时发布至{{isSchool ? '班级圈' : '校园风采'}}
    </van-checkbox>

    <van-button type="primary" class="btn-primary" @click="doSubmit">发布</van-button>
  </div>
</template>

<script>
  import PictureMap from 'COMPONENT/PictureMap'

  export default {
    components: {
      PictureMap
    },
    data () {
      let {type} = this.$route.query
      return {
        type,
        classShow: false,
        classList: [],
        selectedClassList: [],
        pictures: [],
        submit: {
          content: null,
          imageList: []
        },
        tagList: [{
          label: '校园风采',
          active: false
        }, {
          label: '年级风采',
          active: false
        }, {
          label: '班级风采',
          active: false
        }],
        curTag: '校园风采',
        checked: false
      }
    },
    computed: {
      isSchool () {
        return this.type === 'school'
      },
      classText () {
        return this.selectedClassList.map(cls => cls.className).join(', ')
      }
    },
    async created () {
      let classData = await this.$api.teacher.queryTeachingClassList()
      classData.forEach(cls => {
        cls.active = false
      })
      this.classList = classData
    },
    watch: {
      checked (newVal) {
        if (!newVal) return
        if (!this.isSchool) return
        this.doOpenClassPopup()
      }
    },
    methods: {
      doSelectTag (tag) {
        tag.active = !tag.active
      },
      doOpenClassPopup () {
        this.classShow = true
      },
      doSelectClass (cls) {
        cls.active = !cls.active
      },
      doConfirmClass () {
        this.selectedClassList = this.classList.filter(cls => cls.active)
        this.classShow = false
      },
      async doSubmit () {
        this.submit.isSync = this.checked ? 'YES' : 'NO'
        this.submit.classIdList = this.selectedClassList.map(cls => cls.classId)
        this.submit.tagList = this.tagList.filter(tag => tag.active).map(tag => tag.label)
        await this.$api.teacher.addMienInfoSchool(this.submit)
        this.$toast.success('发布成功')
        this.$router.back()
      }
    }
  }
</script>

<style lang="sass">
  .moment-add
    .top
      padding: 0 $default-gap $default-gap
      background: #fff
      &__textarea
        margin-top: $default-gap
      .van-cell
        padding: 10px 0
        &:after
          left: 0
      &-tags
        margin-top: $default-gap
        padding-top: $default-gap
        border-top: 1px solid $gray-light
        @include hor-start-center
        color: $gray
        font-size: $font-small
        &__letter
          margin-right: 20px
        &__tag
          $h: 20px
          width: 75px
          height: $h
          text-align: center
          line-height: $h
          text-indent: -8px
          background-repeat: no-repeat
          background-size: 100% 100%
          background-position: center
          background-image: url("~IMAGE/tag-off.png")
          & + .top-tags__tag
            margin-left: $default-gap
          &--active
            color: $blue
            background-image: url("~IMAGE/tag-on.png")
    &__checkbox
      margin: $default-gap

    .van-popup--right
      width: 92%
      height: 100%
      .btn-primary
        margin: 0 auto
      .popup-right
        padding: $default-gap $default-gap 0
        margin-bottom: $default-gap
        height: calc(100% - #{$default-gap * 2 + 35px})
        overflow-y: auto
        .class-list__li
          @include rightPopupItem(3, 2%)
</style>
