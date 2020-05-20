<template>
  <div class="more">
    <div class="more-header">
      <span class="title"></span>
      <div class="right">
        <span class="morer">更多</span>
        <img width="5" height="10" class="right-arrow" src="./right_arrow.png" @click="showDetail">
      </div>
      <div class="detail" v-show="detailShow">
        <div class=" detail-header">
          <img @click="back" class="image" width="39" height="48" src="./left.png"/>
          <h2 class="title">有品推荐</h2>
        </div>
        <div class="detail-content">
          <ul class="list-content">
            <li class="list" v-for="(item, index) in lists" :class="(index + 1) % 2 === 0 ? '' : 'border'">
              <div class="img-wrap">
                <img class="img" width="167" src="./zc.jpg">
              </div>
              <div class="desc">
                <span class="new">{{item.new}}</span>
                <div class="background">
                  <span class="name">{{item.name}}</span>
                  <span class="price">￥{{item.price}}元
                    <span class="slider">{{item.slider}}</span>
                  </span>
                </div>
              </div>
            </li>
            <div class="bottom">
              <span class="border"></span>
              <span class="text">底线在此,不能更低了</span>
              <span class="border"></span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getLocalStroge} from "../../common/js/localStore";

  export default {
    data() {
      return {
        detailShow: false,
        lists: [
          {
            new: '6g+128g 直降400元',
            name: '小米note 3',
            price: '1799',
            slider: '直降'
          },
          {
            new: '6g+128g 直降400元',
            name: '小米note 3',
            price: '1799',
            slider: '直降'
          },
          {
            new: '6g+128g 直降400元',
            name: '小米note 3',
            price: '1799',
            slider: '直降'
          },
          {
            new: '6g+128g 直降400元',
            name: '小米note 3',
            price: '1799',
            slider: '直降'
          },
          {
            new: '6g+128g 直降400元',
            name: '小米note 3',
            price: '1799',
            slider: '直降'
          },
          {
            new: '6g+128g 直降400元',
            name: '小米note 3',
            price: '1799',
            slider: '直降'
          },
          {
            new: '6g+128g 直降400元',
            name: '小米note 3',
            price: '1799',
            slider: '直降'
          },
          {
            new: '6g+128g 直降400元',
            name: '小米note 3',
            price: '1799',
            slider: '直降'
          }
        ],
        data: [],
      }
    },
    created () {
      this.data = getLocalStroge('theme', 'json')
      console.log(this.data)
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .more-header
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0 10px
    font-size: 0
    height: 46px
    border-top: 5px solid rgb(244, 244, 244)
    .title
      display: inline-block
      font-size: 15px
    .morer
      display: inline-block
      font-size: 14px
      color: rgb(153, 153, 153)
      margin-right: 5px
    .right-arrow
      display: inline-block
      width: 10px
      font-size: 14px

  .detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    background: white
    .detail-header
      display: flex
      align-items: center
      justify-content: center
      height: 45px
      width: 100%
      position: fixed
      top: 0
      left: 0
      z-index: 100
      background-color: #fff
      border-bottom: 1px solid rgb(191, 191, 192)
      padding-bottom: 2px
      .image
        position: absolute
        left: 0
      .title
        color: rgb(51, 51, 51)
        font-size: 16px

    .list-content
      display: flex
      flex-flow: row wrap
      justify-content: space-between
      align-items: center
      margin-top: 47px
      width: 100%
      overflow: scroll
      height: 100%
      -webkit-overflow-scrolling: touch
      &::-webkit-scrollbar
        display none
      .list
        width: 49.47%
        margin-right: 0
        border-top: 1px solid rgb(191, 191, 192)
        &.border
          border-right: 4px solid rgb(239, 239, 239)
        .img-wrap
          text-align: center
          width: 100%
        .desc
          position: relative
          display: flex
          flex-direction: column
          height: 65px
          width: 100%
          .new
            position: absolute
            top: 0
            left: 10px
            font-size: 12px
            color: rgb(130, 95, 63)
          .background
            display: flex
            flex-direction: column
            position: absolute
            top: 20px
            width: 100%
            background-color: rgb(247, 247, 247)
            z-index: -1
            .name
              font-size: 12px
              color: rgb(51, 51, 51)
              margin: 6px 8px 4px 8px
              line-height: 14px
              overflow: hidden;
              text-overflow: ellipsis
            .price
              font-size: 13px
              color: rgb(182, 9, 9)
              line-height: 14px
              margin: 0 0 6px 8px
              .slider
                vertical-align: top
                color: white
                padding: 0 2px
                font-size: 10px
                background-color: rgb(182, 9, 9)
      .bottom
        display: flex
        align-items: center
        justify-content: center
        border-bottom: 1px solid rgb(211, 211, 211)
        font-size: 0
        width: 100%
        height: 160px
        background-color: rgb(242, 242, 242)
        .border
          height: 1px
          width: 50px
          background-color: rgb(211, 211, 211)
        .text
          color: rgb(153, 153, 153)
          margin: 0 6px
          font-size: 13px
</style>
