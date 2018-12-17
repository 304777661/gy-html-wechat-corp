<template>
  <div class="bulletin-detail">
    <my-loading v-model="loading"/>
    <div v-show="!loading">
      <p class="bulletin-detail__title">{{article.title}}</p>
      <p class="bulletin-detail__time">{{article.issueTime | ymd}}</p>
      <hr>
      <div class="bulletin-detail__content">
        {{article.content}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: true,
        article: {
          title: 'ZHE SHI BIAO TI ....',
          issueTime: '2018-09-09',
          issueMan: 'MAX WELL',
          readCount: 55,
          content: ' 这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要进行编译，然后再插入到document中。每一个阶段都会有一个钩子函数，方便开发者在不同阶段处理不同逻辑。\n' +
          '\n' +
          '一般可以在created函数中调用ajax获取页面初始化所需的数据。\n' +
          '\n' +
          '\n' +
          '实例生命周期\n' +
          '每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子 ，这就给我们提供了执行自定义逻辑的机会。例如，created 这个钩子在实例被创建之后被调用：\n' +
          '\n' +
          'var vm = new Vue({\n' +
          'data: {\n' +
          'a: 1\n' +
          '},\n' +
          'created: function () {\n' +
          '// `this` 指向 vm 实例\n' +
          'console.log(\'a is: \' + this.a)\n' +
          '}\n' +
          '})\n' +
          '// -> "a is: 1"\n' +
          '也有一些其它的钩子，在实例生命周期的不同阶段调用，如 mounted、 updated 、destroyed 。钩子的 this 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。\n' +
          '\n' +
          '生命周期图示\n' +
          '下图说明了实例的生命周期。你不需要立马弄明白所有的东西，不过以后它会有帮助。这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要进行编译，然后再插入到document中。每一个阶段都会有一个钩子函数，方便开发者在不同阶段处理不同逻辑。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'一般可以在created函数中调用ajax获取页面初始化所需的数据。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'实例生命周期\\n\' +\n' +
          '          \'每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子 ，这就给我们提供了执行自定义逻辑的机会。例如，created 这个钩子在实例被创建之后被调用：\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'var vm = new Vue({\\n\' +\n' +
          '          \'data: {\\n\' +\n' +
          '          \'a: 1\\n\' +\n' +
          '          \'},\\n\' +\n' +
          '          \'created: function () {\\n\' +\n' +
          '          \'// `this` 指向 vm 实例\\n\' +\n' +
          '          \'console.log(\\\'a is: \\\' + this.a)\\n\' +\n' +
          '          \'}\\n\' +\n' +
          '          \'})\\n\' +\n' +
          '          \'// -> "a is: 1"\\n\' +\n' +
          '          \'也有一些其它的钩子，在实例生命周期的不同阶段调用，如 mounted、 updated 、destroyed 。钩子的 this 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'生命周期图示\\n\' +\n' +
          '          \'下图说明了实例的生命周期。你不需要立马弄明白所有的东西，不过以后它会有帮助。这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要进行编译，然后再插入到document中。每一个阶段都会有一个钩子函数，方便开发者在不同阶段处理不同逻辑。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'一般可以在created函数中调用ajax获取页面初始化所需的数据。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'实例生命周期\\n\' +\n' +
          '          \'每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子 ，这就给我们提供了执行自定义逻辑的机会。例如，created 这个钩子在实例被创建之后被调用：\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'var vm = new Vue({\\n\' +\n' +
          '          \'data: {\\n\' +\n' +
          '          \'a: 1\\n\' +\n' +
          '          \'},\\n\' +\n' +
          '          \'created: function () {\\n\' +\n' +
          '          \'// `this` 指向 vm 实例\\n\' +\n' +
          '          \'console.log(\\\'a is: \\\' + this.a)\\n\' +\n' +
          '          \'}\\n\' +\n' +
          '          \'})\\n\' +\n' +
          '          \'// -> "a is: 1"\\n\' +\n' +
          '          \'也有一些其它的钩子，在实例生命周期的不同阶段调用，如 mounted、 updated 、destroyed 。钩子的 this 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'生命周期图示\\n\' +\n' +
          '          \'下图说明了实例的生命周期。你不需要立马弄明白所有的东西，不过以后它会有帮助。这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要进行编译，然后再插入到document中。每一个阶段都会有一个钩子函数，方便开发者在不同阶段处理不同逻辑。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'一般可以在created函数中调用ajax获取页面初始化所需的数据。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'实例生命周期\\n\' +\n' +
          '          \'每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子 ，这就给我们提供了执行自定义逻辑的机会。例如，created 这个钩子在实例被创建之后被调用：\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'var vm = new Vue({\\n\' +\n' +
          '          \'data: {\\n\' +\n' +
          '          \'a: 1\\n\' +\n' +
          '          \'},\\n\' +\n' +
          '          \'created: function () {\\n\' +\n' +
          '          \'// `this` 指向 vm 实例\\n\' +\n' +
          '          \'console.log(\\\'a is: \\\' + this.a)\\n\' +\n' +
          '          \'}\\n\' +\n' +
          '          \'})\\n\' +\n' +
          '          \'// -> "a is: 1"\\n\' +\n' +
          '          \'也有一些其它的钩子，在实例生命周期的不同阶段调用，如 mounted、 updated 、destroyed 。钩子的 this 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'生命周期图示\\n\' +\n' +
          '          \'下图说明了实例的生命周期。你不需要立马弄明白所有的东西，不过以后它会有帮助。这是它的一个生命周期钩子函数，就是一个vue实例被生成后调用这个函数。一个vue实例被生成后还要绑定到某个html元素上，之后还要进行编译，然后再插入到document中。每一个阶段都会有一个钩子函数，方便开发者在不同阶段处理不同逻辑。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'一般可以在created函数中调用ajax获取页面初始化所需的数据。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'实例生命周期\\n\' +\n' +
          '          \'每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子 ，这就给我们提供了执行自定义逻辑的机会。例如，created 这个钩子在实例被创建之后被调用：\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'var vm = new Vue({\\n\' +\n' +
          '          \'data: {\\n\' +\n' +
          '          \'a: 1\\n\' +\n' +
          '          \'},\\n\' +\n' +
          '          \'created: function () {\\n\' +\n' +
          '          \'// `this` 指向 vm 实例\\n\' +\n' +
          '          \'console.log(\\\'a is: \\\' + this.a)\\n\' +\n' +
          '          \'}\\n\' +\n' +
          '          \'})\\n\' +\n' +
          '          \'// -> "a is: 1"\\n\' +\n' +
          '          \'也有一些其它的钩子，在实例生命周期的不同阶段调用，如 mounted、 updated 、destroyed 。钩子的 this 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。\\n\' +\n' +
          '          \'\\n\' +\n' +
          '          \'生命周期图示\\n\' +\n' +
          '          \'下图说明了实例的生命周期。你不需要立马弄明白所有的东西，不过以后它会有帮助。'
        }
      }
    },
    async created () {
      // this.article = await this.$api.teacher.getNoticeInfoDetail(this.$route.params.id)
      this.loading = false
    }
  }
</script>

<style lang="sass" scoped>
  .bulletin-detail
    padding: 14px
    &__title
      font-size: $font-large
      line-height: 24px
    &__time
      font-size: 13px
      line-height: 18px
      color: #ccc
      margin-top: 8px
      padding-bottom: 2px
    &__content
      margin-top: 10px
      line-height: 1.5
</style>
