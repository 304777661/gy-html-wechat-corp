<template>
  <diV class="children">
    <div class="children-list">
      <div class="children-list-item" v-for="children in childrenList" :key="children.studentId">
        <!--<div :class="['children-body',{'selected':selectedIdx === children.studentId }]"-->
        <div class="children-list-item-person" @click="handleChildrenClick(children.id)">
          <img class="children-list-item-person-avatar" :src="children.avatar | defaultAvatar"/>
          <div class="children-list-item-person-tag" v-show="selectedIdx === children.id">
            <img src="../../../assets/images/main-children.png"/>
            <span>主</span>
          </div>
          <p>{{children.name}}</p>
          <p>{{children.className}}</p>
        </div>
      </div>
    </div>
    <p class="tips">注：<br>有多个子女时，须选择其中一个作为主查询，选择后其余应用也都将显示该子女的相关信息。</p>
  </diV>
</template>

<script>

  export default {
    data () {
      return {
        selectedIdx: null,
        childrenList: []
      }
    },
    async created () {
      this.childrenList = await this.$api.parent.queryStudentList({})
      for (let child of this.childrenList) {
        if (child.isPrimary) {
          this.selectedIdx = child.id
        }
      }
    },
    methods: {
      async handleChildrenClick (id) {
        // this.selectedIdx = index
        // await this.$api.parent.setCurrentChild({'studentId': index})
        // this.$toast.success('设置成功')
        this.$router.push(`/parent/children/detail/${id}`)
      }
    }
  }
</script>

<style lang="sass">
  .children
    &-list
      display: flex
      flex-flow: row
      align-items: center
      flex-wrap: wrap
      border-bottom: 1px solid #eee
      background: $dark-blue
      &-item
        @include fixed-width(50%)
        height: 160px
        @include hor-center-center
        &-person
          $personW: 80px
          position: relative
          width: $personW
          color: $white
          text-align: center
          &-avatar
            height: $personW
            overflow: hidden
            border: 1px solid $gray
            border-radius: 8px
          &-tag
            position: absolute
            top: 8px
            right: -3px
            width: 22px
            height: 14px
            img
              position: absolute
            span
              position: absolute
              z-index: 2
              font-size: 11px
              left: 14px
              top: 1px
          p
            margin-top: 8px
            font-size: 16px
            &:last-child
              font-size: 12px

    .tips
      font-size: 13px
      line-height: 1.5
      margin: 14px
      color: $gray

</style>
