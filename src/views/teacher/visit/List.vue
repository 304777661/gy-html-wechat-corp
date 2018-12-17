<template>
  <div class="visit">
    <div class="visit-search">
      <search v-model="keywords" @search="onSearch"></search>
    </div>
    <no-data v-show=" !loading && !visitList.length"/>
    <div ref="wrapper" class="visit-wrapper">
      <van-list v-model="loading"
                :finished="finished"
                @load="onLoad">
        <div class="visit-wrapper-item van-hairline--bottom"
             v-for="(item,index) in visitList"
             :key="index"
             @click="goToDetail(item.id)">
          <img :src="item.avatar | defaultAvatar" class="visit-wrapper-item__avatar">
          <span class="visit-wrapper-item-name">{{item.name}}</span>
          <span class="visit-wrapper-item-date">最近家访时间:{{item.date|| ymd}}</span>
        </div>
      </van-list>
    </div>

    <van-button type="primary"
                class="btn-primary visit-btn"
                square="false"
                @click="checkAll">查看班级课表
    </van-button>
  </div>
</template>

<script>
  import Search from 'COMPONENT/Search'
  import BScroll from 'better-scroll'

  export default {
    name: 'List',
    data () {
      return {
        loading: false,
        finished: false,
        visitList: [
          {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          },
          {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          },
          {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          },
          {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          },
          {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          }, {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          }, {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          }, {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          }, {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          }, {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          }, {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          }, {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          }, {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          }, {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          },
          {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          },
          {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          },
          {
            id: 23,
            name: 'MAX',
            avatar: 'http://www.car136.com/photo/mmp/55/3995/b/1221794056424240183.jpg',
            date: '2018-09-09'
          },
        ],
        keywords: null
      }
    },
    methods: {
      onLoad () {

      },
      onSearch () {},
      goToDetail (id) {
        console.log('gotodetail')
        this.$router.push(`visit/${id}`)
      },
      checkAll () {}
    },
    created () {

    },
    mounted () {
      this.scroll = new BScroll(this.$refs.wrapper, {click: true})
    }
  }
</script>

<style scoped lang="sass">
  .visit
    height: 100vh
    /deep/ .van-hairline--bottom
      &:after
        left: 12px
    &-search
      padding: $default-gap
      background: $white
      margin-bottom: 10px
    &-btn
      position: absolute
      left: 50%
      bottom: -15px
      transform: translate(-50%, 0)
    &-wrapper
      position: absolute
      left: 0
      right: 0
      bottom: 60px
      top: 64px
      height: calc(100vh - 72px - 64px)
      overflow: hidden
      &-item
        height: 59px
        line-height: 59px
        padding: 0 12px
        background: $white
        @include hor
        align-items: center
        &__avatar
          @include circle(40px)
        &-name
          color: $black
          margin-left: 14px
          font-size: 17px
        &-date
          color: #9B9B9B
          font-size: 12px
          position: absolute
          right: 0
          padding-right: 14px

</style>
