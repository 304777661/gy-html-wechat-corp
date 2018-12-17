<template>
  <div class="comment-detail">
    <my-loading v-model="loading"/>
    <no-data v-show="!loading && noData" />
    <div class="card-group" v-for="record in interactRecord"
         :key="record.interactRecordId"
          v-show="!loading && !noData">
      <p>{{record.courseName}}</p>
      <card v-for="tagRecord in record.interactTagRecords" :key="tagRecord.tagRecordId">
        <div :class="['dot',{'advantage':tagRecord.tagType === 'PRAISE'},{'inactive':tagRecord.tagType === 'CRITICISM'}]">
          <p>{{tagRecord.tagName}}</p>
        </div>
        <div class="namelist">
          <span v-for="student in tagRecord.students" :key="student.studentId">{{student.studentName}}</span>
        </div>
        <div class="card-cell">
          <div>
            <span class="cell-span-left">评语：</span>
            <span class="cell-span-right">{{tagRecord.remark}}</span>
          </div>
        </div>

      </card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        interactRecord: {}
      }
    },
    async created () {
      this.loading = true
      this.interactRecord = await this.$api.parent.queryInteractRecordList(this.$route.params.date)
      this.noData = this.interactRecord.every(inter => {
        return !(inter.interactTagRecords && inter.interactTagRecords.length)
      })
      this.loading = false
    }
  }
</script>

<style lang="sass">
  .comment-detail
    .card-group
      padding: $default-gap $default-gap 0
      .dot
        position: relative
        margin-left: 20px
        &:before
          content: ''
          $dot-wh: 8px
          position: absolute
          left: -20px
          top: 5px
          background: $green
          width: $dot-wh
          height: $dot-wh
          border-radius: 50%
        &.inactive:before
          background: $red
        &.advantage:before
          background: $green
        p
          color: $black
          font-size: $font-normal
          font-weight: bold
      .namelist
        padding: $default-gap/2 0
        border-bottom: 1px dashed #ddd
        span
          color: $blue
          border-radius: 10px
          border: 1px solid $blue
          padding: 2px 8px
          font-size: $font-small
          margin-right: 5px
          line-height: 2.4
      .card
        margin: 10px auto
        & + .card
          margin: 22px auto
      .card-cell
        margin-top: 10px
        .cell-span-right
          font-size: $font-normal - 1px
          color: $black
        .cell-span-left
          font-size: $font-small
          color: $gray
</style>
