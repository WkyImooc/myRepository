<template>
  <div class="tag">
    <router-link v-for="(item,index) in tags" :key="item.name" tag="div" class="tag-item" :to="item.path" >
      <div width="24" height="24" class="img" :class="'img'+index">
        <!--<span class="number" v-show="user && index ===3 && shopcartnum">{{shopcartnum}}</span>-->
      </div>
      <span class="tag-link">{{ item.name}}</span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getLocalStroge} from "../../common/js/localStore";

  export default {
    data () {
      return {
        tags: [
          {
            path: '/index',
            name: '首页'
          },
          {
            path: '/category',
            name: '分类'
          },
          {
            path: '/video',
            name: '推荐'
          },
          {
            path: '/shopcart',
            name: '购物车'
          },
          {
            path: '/personal',
            name: '个人'
          }
        ],
        // showNum: false,
        // null: '',
        shopcartnum: [],
        user: null,
      }
    },
    created () {
      this.user = getLocalStroge('user','json')
      this.shopcartnum = getLocalStroge('shopcartnum')

      // console.log(this.shopcartnum)
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .tag
    //z-index: -9
    position: fixed
    left : 0
    bottom: 0
    display: flex
    width: 100%
    height: 50px
    font-size: 14px
    background-color: white
    .tag-item
      flex: 1
      display: inline-flex
      flex-direction: column
      align-items center
      justify-content: space-around
      height 100%
      .img
        position: relative
        width: 24px
        height: 24px
        background-image: url("./img.png")
        background-size: 100%
        background-repeat: no-repeat
      .img0
        background-position: 0% 0%
      .img1
        background-position: 0% 22%
      .img2
        background-position: 0% 44%
      .img3
        background-position: 0% 66%
      .img4
        background-position: 0% 88.5%
      &.router-link-active
        .img0
          background-position: 0% 11%
        .img1
          background-position: 0% 33%
        .img2
          background-position: 0% 55%
        .img3
          background-position: 0% 77.5%
        .img4
          background-position: 0% 99.5%

        .tag-link
          color: rgb(132, 95, 63)

      .number
        position: absolute
        top: 0
        right: -7px
        display: flex
        align-items: center
        justify-content: center
        width: 14px
        height: 14px
        border-radius: 50%
        font-size: 7px
        color: white
        background-color: rgb(255, 59, 48)
      .tag-link
        color: rgb(127, 127, 127)
        /*&:nth-child(4)*/


</style>
