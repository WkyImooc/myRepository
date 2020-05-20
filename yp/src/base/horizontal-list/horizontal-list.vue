<template>
  <div class="horizontal-list">
    <div class="top" ref="top">
      <img @click="back" class="image" width="39" height="48" src="./left.png"/>
      <span class="title">购物车</span>
    </div>
    <div class="container-header" ref="header">
      <div class="header-lists">
        <span ref="lists" @click="selectList(index, item)" :class="{'active' :currentIndex === index}" class="list"
              v-for="(item, index) in type.item">{{item.name}}</span>
      </div>
    </div>
    <div class="container-content" ref="contentScroll">
      <div class="content-type" ref="type">
        <ul class="content">
          <li @click="sendgood(it)" ref="contentList" class="content-list" :class="{'activeL' :index % 2 ===0, 'activeR' :index % 2 !==0}"
              v-for="(it, index) in list.by_goods">
            <img width="169.5" height="169.5" :src="it.imgs">
            <span class="desc">
              <span class="desc-text">{{it.desc}}</span>
            </span>
            <span class="name">{{it.name}}</span>
            <span class="price">￥{{it.price}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  // import Tops from 'base/tops/tops'
  import {getLocalStroge} from "../../common/js/localStore";
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        currentIndex: 0,
        list: [],
        type: []
      }
    },
    created() {
      this.type = this.dataHub.goodsType;
      let name = this.dataHub.child_name;
      //console.log(this.type);
      this.type.item.forEach((it,index) => {
        if (it.name === name) {
          this.list = it;
          this.currentIndex = index
        }
      });
      //console.log(this.list);
    },
    methods: {
      selectList(index, item) {
        this.currentIndex = index;
        this.list = item;
        //console.log(this.list)
      },
      back() {
        this.$router.go(-1);
      },
      sendgood (it) {
        this.dataHub.goodsData = it;
        this.$router.push({
          path: '/goods'
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .horizontal-list
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background-color: white
    .top
      display: flex
      align-items: center
      justify-content: center
      height: 45px
      position: relative
      .image
        position: absolute
        left: 0
      .title
        display: flex
        align-items: center
        justify-content: center
        height: 45px
        color: rgb(51, 51, 51)
        font-size: 16px
    .container-header
      //height: 40px
      padding: 0 13px
      margin-bottom: 15px
      border-bottom: 1px solid rgb(230, 230, 230) //rgb(132, 95, 63)
      //width: 100% 如果加上这个，右边的padding将会看不见
      .header-lists
        height: 40px
        display: flex
        align-items: center
        white-space: nowrap
        overflow: scroll
        -webkit-overflow-scrolling: touch
        &::-webkit-scrollbar
          display none
        .list
          display: flex
          align-items: center
          justify-content: center
          height: 40px
          color: rgb(105, 105, 105)
          font-size: 12px
          padding: 0 13px
          &.active
            color: rgb(132, 95, 63)
            border-bottom: 2px solid rgb(132, 95, 63)
    .container-content
      /*display: flex*/
      /*flex-direction: row*/
      /*flex-flow: wrap*/
      /*padding: 0 15px*/
      display: flex
      flex-direction: row
      flex-flow: wrap
      height: 100%
      overflow: scroll
      -webkit-overflow-scrolling: touch
      &::-webkit-scrollbar
        display none
      .content-type
        display: flex
        flex-direction: row
        flex-flow: wrap
        .content
          display: flex
          flex-direction: row
          flex-flow: wrap
          padding-left: 13px
        .content-list
          display: flex
          flex-direction: column
          &.activeL
            margin-right: 3px
          &.activeR
            margin-left: 3px
          .desc
            display: flex
            align-items: center
            width: 169.5px

            height: 30px
            background-color: rgb(245, 242, 240)
            .desc-text
              width: 165px
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
              color: rgb(102, 102, 102)
              font-size: 10px
          .name
            margin-top: 10px
            line-height: 16px
            font-size: 13px
            color: rgb(51, 51, 51)
            width: 169.5px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
          .price
            line-height: 19px
            font-size: 16px
            color: rgb(182, 9, 9)


</style>
