<template>
  <div class="audit">
    <div class="audit-header">
      <van-icon name="info-o" class="audit-header__icon"></van-icon>
      <p class="audit-header__title">审核结果：{{$enums.AuditStatus.getName(audit.auditStatus)}}</p>
    </div>
    <van-cell-group v-if="audit.passList && audit.passList.length > 0">
      <van-cell title="已通过部分" class="audit-sticky"></van-cell>
      <div v-for="(pass,index) in audit.passList" :key="'pass'+index">
        <van-cell :title="'原:'+$enums.ChangeType.getName(pass.changeType)" :value="pass.origValue"></van-cell>
        <van-cell :title="'新:'+$enums.ChangeType.getName(pass.changeType)" :value="pass.newValue"></van-cell>
      </div>
    </van-cell-group>

    <van-cell-group v-if="audit.notPassList && audit.notPassList.length > 0">
      <van-cell title="未通过部分" class="audit-sticky"></van-cell>
      <div v-for="(pass,index) in audit.notPassList" :key="'pass'+index">
        <van-cell :title="'原:'+$enums.ChangeType.getName(pass.changeType)" :value="pass.origValue"></van-cell>
        <van-cell :title="'新:'+$enums.ChangeType.getName(pass.changeType)" :value="pass.newValue"></van-cell>
      </div>
    </van-cell-group>

    <van-cell-group v-if="audit.remark">
      <van-cell title="未通过原因" class="audit-sticky"></van-cell>
      <van-field v-model="audit.remark" type="textarea"></van-field>
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        id: this.$route.params.id,
        audit: {}
      }
    },
    methods: {},
    async created () {
      this.loading = true
      this.audit = await this.$api.teacher.getStudentChangeRecord({'id': this.id})
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .audit
    &-header
      height: 100px
      @include ver-center-center
      background: $dark-blue
      color: $white
      &__icon
        font-size: 45px
      &__title
        margin-top: 10px
    &-sticky
      margin-top: 10px
      color: #24A197
</style>
