<template>
  <div class="confirmorder">
    <div class="top">
      <img @click="back" width="40" height="40" src="./left.png">
      <span class="title">我的订单</span>
    </div>
    <div class="header" v-for="item in address">
      <!--<div class="left">-->
      <div class="left-header">
        <span class="username">收货人 : {{item.name}}</span>
        <span class="userphone">{{item.phone}}</span>
      </div>
      <div class="area">
        <div v-show="item.selected" class="default">
          <span class="text"> 默认</span>
        </div>
        <span class="desc">收货地址 : {{item.city + item.address}}</span>
      </div>
      <!--</div>-->
    </div>
    <div class="content"></div>
    <div class="bottom">
      <span class="name">合计:</span>
      <span class="total-price">￥</span>
      <span class="submit">提交订单</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getLocalStroge} from "../../common/js/localStore";

  export default {
    data() {
      return {
        address: [],
      }
    },
    created() {
      this.address = getLocalStroge('address', 'json')
      console.log(this.address)
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .confirmorder
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    top: 0
    background-color: white
    .top
      display: flex
      flex-flow: row
      align-items: center
      justify-content: flex-start

    .header
      margin-top: 20px
      padding: 0 20px
      flex: 0 0 300px
      height: 100px
      .left-header
        display: flex
        justify-content: space-between
      .area
        display: flex
        flex-direction: row
        align-items: center
        //justify-content: center
        margin-top: 5px
        .default
          display: flex
          flex-direction: column
          align-items: flex-start
          justify-content center
          width: 36px
          height: 30px
          .text
            border: 1px solid rgb(182, 9, 9)
            font-size: 13px
            color: rgb(182, 9, 9)
            padding 1.5px
        .desc
          line-height: 30px
          float-wrap: wrap
          font-size: 12px
          color: rgb(102, 102, 102)
    .content
      width: 100%
    .bottom
      position: fixed
      bottom: 0
      right: 0
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      .name
        color: #666
      .total-price
        color: #f56e30
        font-size: 14px
        margin: 0 8px 0 6px
      .submit
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        background-color: #f56e30
        color: white
        font-size: 16px
        width: 100px
        height: 40px
        //border-radius: 4px
</style>
