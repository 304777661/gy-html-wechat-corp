<template>
  <div class="child-edit">
    <div class="wrapper">
      <van-cell-group>
        <van-field label="家庭电话" v-model="teacher.homeTel" placeholder="请输入" input-align="right" clearable></van-field>
      </van-cell-group>

      <van-cell-group>
        <van-cell title="子女信息" class="child-edit-sticky">
          <van-icon class="child-edit-sticky__add" name="add" size="40px" color="#24A197" @click="handleAddClick()">
          </van-icon>
        </van-cell>
      </van-cell-group>
      <div class="child-edit-item" v-for="(child,index) in teacher.teacherChildList" :key="'child'+index">
        <van-cell :title="'子女信息'+(index+1)" class="child-edit-item-title">
          <van-icon class="child-edit-item__del" name="delete" size="36px" color="#ccc"
                    @click="handleDeleteClick(index)">
          </van-icon>
        </van-cell>
        <van-field label="姓名" v-model="child.name" placeholder="请输入" input-align="right" clearable></van-field>
        <van-cell title="性别" :value="child.sex | sexLabel" is-link @click="handleSexClick(index)"></van-cell>
        <van-field label="年龄(岁)" v-model="child.age" placeholder="请输入" input-align="right" clearable>岁</van-field>
        <van-field label="学校或单位" v-model="child.unit" placeholder="请输入" input-align="right" clearable></van-field>
        <van-field label="备注" v-model="child.remark" placeholder="请输入" input-align="right" clearable></van-field>
      </div>
    </div>
    <my-loading v-model="loading"/>
    <van-popup v-model="showSexPicker"
               position="bottom"
               :lazy-render="false">
      <van-picker show-toolbar
                  :item-height="itemHeight"
                  :columns="sexColumns"
                  value-key="label"
                  @cancel="handleSexCancelClick"
                  @confirm="handleSexConfirmClick">
      </van-picker>
    </van-popup>

    <my-button :content="'提交'" @btnClick="handleSubmitClick"></my-button>
  </div>
</template>

<script>
  export default {
    name: 'ChildEdit',
    data () {
      return {
        loading: false,
        showSexPicker: false,
        modifyIndex: null,
        itemHeight: 60,
        sexColumns: this.$enums.Sex.list,
        teacher: {
          teacherChildList: []
        }
      }
    },
    methods: {
      handleSexClick (index) {
        this.modifyIndex = index
        this.showSexPicker = true
      },
      handleSexCancelClick () {
        this.showSexPicker = false
      },
      handleSexConfirmClick (item) {
        if (this.modifyIndex !== null || this.modifyIndex !== undefined) {
          this.teacher.teacherChildList[this.modifyIndex].sex = item.value
        }
        this.showSexPicker = false
      },
      handleAddClick () {
        if (!this.teacher.teacherChildList) {
          this.teacher.teacherChildList = []
        }
        this.teacher.teacherChildList.push({
          name: '',
          sex: 'Male',
          age: null,
          unit: '',
          remark: ''
        })
      },
      isNumber (value) {
        let patrn = /^(-)?\d+(\.\d+)?$/
        if (patrn.exec(value) == null || value == '') {
          return false
        } else {
          return true
        }
      },
      handleDeleteClick (index) {
        this.$dialog.confirm({
          title: `是否删除该子女信息？`
        }).then(() => {
          this.teacher.teacherChildList.splice(index, 1)
        }, () => {
          console.log('用户取消')
        })
      },
      async handleSubmitClick () {
        if (!this.teacher.homeTel || this.teacher.homeTel.length === 0) {
          this.$toast.fail('请输入家庭电话')
          return
        }
        if (this.teacher.teacherChildList && this.teacher.teacherChildList.length > 0) {
          for (let i = 0; i < this.teacher.teacherChildList.length; i++) {
            let child = this.teacher.teacherChildList[i]
            if (!child.name || child.name.length === 0) {
              this.$toast.fail('请输入子女信息' + (i + 1) + '的姓名')
              return
            }
            if (!child.age) {
              this.$toast.fail('请输入子女信息' + (i + 1) + '的年龄')
              return
            }
            if (child.age < 0 || !this.isNumber(child.age)) {
              this.$toast.fail('请输入子女信息' + (i + 1) + '的年龄不合法')
              return
            }
            if (!child.unit || child.unit.length === 0) {
              this.$toast.fail('请输入子女信息' + (i + 1) + '的学校或单位')
              return
            }
          }
        }
        await this.$api.teacher.updateTeacher(this.teacher)
        this.$toast.success('提交成功')
        this.$router.back()
      }
    },
    async created () {
      this.loading = true
      this.teacher = await this.$api.teacher.getTeacherDetail({})
      this.loading = false
    }
  }
</script>

<style scoped lang="sass">
  .child-edit
    .wrapper
      height: calc(100vh - 70px)
    &-item
      margin-top: 10px
      &__del
        top: 4px
        right: 2px
    &-sticky
      margin-top: 10px
      color: #24A197
      &__add
        top: 4px
</style>
