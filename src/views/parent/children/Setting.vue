<template>
  <div class="children">
    <div class="children-list">
      <div class="children-list-item" v-for="child in childrenList" :key="child.id">
        <!--<div :class="['children-body',{'selected':selectedIdx === children.studentId }]"-->
        <div class="children-list-item-person" @click="handleChildrenClick(child.id)">
          <img class="children-list-item-person-avatar" :src="child.avatar | defaultAvatar"/>
          <div class="children-list-item-person-tag" v-show="child.isCurrent === 'YES'">
            <img src="../../../assets/images/main-children.png"/>
            <span>主</span>
          </div>
          <p>{{child.name}}</p>
          <p>{{child.className}}</p>
        </div>
      </div>
    </div>
    <p class="tips">注：<br>有多个子女时，须选择其中一个作为主查询，选择后其余应用也都将显示该子女的相关信息。</p>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        childrenList: []
      }
    },
    methods: {
      handleChildrenClick (id) {
        this.$router.push(`/parent/children/detail?id=${id}`)
      }
    },
    async created () {
      this.childrenList = await this.$api.parent.queryStudentList({})
    },
  }
</script>

<style lang="sass" scoped>
  .children
    &-list
      display: flex
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
