<template>
  <div class="personal">
    <div class="header">
      <img class="icon" width="60" height="60" :src=" user ? (user_pic ?  user_pic : './static/person.png'): './static/person.png' ">
      <span class="text">{{user? user.name:'请登录'}}</span>
      <img v-show="!user" @click="log" class="right" width="18" height="18" src="./right_arrow.png">
    </div>
    <div class="border"></div>
    <div class="order">
      <div @click="order" class="top">
        <span class="me">我的订单</span>
        <img width="16" height="16" src="./right_arrow.png">
      </div>
      <div class="bottom">
        <div @click="detailPay" class="content">
          <img class="image" width="23" height="23" src="./personal_icon_paid.png">
          <span class="text">待付款</span>
        </div>
        <div class="content">
          <img width="23" height="23" src="./personal_icon_paid.png">
          <span class="text">待收货</span>
        </div>
        <div class="content">
          <img width="23" height="23" src="./personal_icon_paid.png">
          <span class="text">待评价</span>
        </div>
        <div class="content">
          <img width="23" height="23" src="./personal_icon_paid.png">
          <span class="text">退款订单</span>
        </div>
      </div>
    </div>
    <div class="border"></div>
    <div class="middle">
      <div class="content" @click="detailCoupon">
        <img class="image" width="38" height="38" src="./personal_icon_assets.png">
        <span class="text">我的资产</span>
        <span class="coupon">优惠券/积分</span>
        <img class="right" width="15" height="15" src="./right_arrow.png">
      </div>
      <div class="content">
        <img class="image" width="38" height="38" src="./personal_icon_assets.png">
        <span class="text">拼团订单</span>
        <img class="right" width="15" height="15" src="./right_arrow.png">
      </div>
      <div @click="detailCollection" class="content">
        <img class="image" width="38" height="38" src="./personal_icon_assets.png">
        <span class="text">我的收藏</span>
        <img class="right" width="15" height="15" src="./right_arrow.png">
      </div>
      <div @click="address" class="content">
        <img class="image" width="38" height="38" src="./personal_icon_assets.png">
        <span class="text">地址管理</span>
        <img class="right" width="15" height="15" src="./right_arrow.png">
      </div>
      <div @click="detailMessage" class="content">
        <img class="image" width="38" height="38" src="./personal_icon_assets.png">
        <span class="text">消息中心</span>
        <img class="right" width="15" height="15" src="./right_arrow.png">
      </div>
      <div class="content">
        <img class="image" width="38" height="38" src="./personal_icon_assets.png">
        <span class="text">帮助与反馈</span>
        <img class="right" width="15" height="15" src="./right_arrow.png">
      </div>
      <div v-show="user" @click="exit" class="bottom">退出</div>
      <div v-show="myCoupon" class="detail myCoupon">
        <div class="detail-header">
          <img @click="back" class="image" width="39" height="48" src="./left.png"/>
          <span class="title">我的资产</span>
        </div>
        <div class="middle">
          <div class="content" >
            <img class="image" width="38" height="38" src="./personal_icon_assets.png">
            <span class="text">积分</span>
            <img class="right" width="15" height="15" src="./right_arrow.png">
          </div>
          <div class="content">
            <img class="image" width="38" height="38" src="./personal_icon_assets.png">
            <span class="text">优惠券</span>
            <img class="right" width="15" height="15" src="./right_arrow.png">
          </div>
          <div class="content">
            <img class="image" width="38" height="38" src="./personal_icon_assets.png">
            <span class="text">F码</span>
            <img class="right" width="15" height="15" src="./right_arrow.png">
          </div>
          <div class="content">
            <img class="image" width="38" height="38" src="./personal_icon_assets.png">
            <span class="text">礼物码</span>
            <img class="right" width="15" height="15" src="./right_arrow.png">
          </div>
          <div class="content">
            <img class="image" width="38" height="38" src="./personal_icon_assets.png">
            <span class="text">小米分期</span>
            <img class="right" width="15" height="15" src="./right_arrow.png">
          </div>
        </div>
      </div>
      <div v-show="collection" class="detail collection">
        <div class="detail-header">
          <img @click="back" class="image" width="39" height="48" src="./left.png"/>
          <span class="title">我的收藏</span>
        </div>
        <div class="collection-content">
          <div class="null">
            <img width="91" class="85" src="./null.png">
            <div class="desc">
              <span class="title">亲您还没有收藏的商品哦!</span>
              <div class="login">
                <span class="text">去逛逛</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="message" class="detail message">
        <div class="detail-header">
          <img @click="back" class="image" width="39" height="48" src="./left.png"/>
          <span class="title">商城消息</span>
        </div>
        <div class="collection-content">
          <div class="null">
            <img width="91" class="85" src="./null.png">
            <div class="desc">
              <span class="title">列表内容为空!</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="pay" class="detail pay">
        <tops></tops>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getLocalStroge, removeLocalStroge} from "../../common/js/localStore";
  //import Tagperson from 'components/tagperson/tagperson'
  import Tops from 'base/tops/tops'
  export default {
    components: {
      Tops,
    },
    data() {
      return {
        second: [
          {
            type: '0',
            name: '我的资产',
            coupon: '优惠券/积分'
          },
          {
            type: '1',
            name: '拼团订单',
          },
          {
            type: '2',
            name: '我的收藏',
          },
          {
            type: '3',
            name: '地址管理',
          },
          {
            type: '4',
            name: '消息中心',
          },
          {
            type: '5',
            name: '帮助与反馈',
          },

        ],
        user: null,
        user_pic: '',

        myCoupon: false, //资产显示
        collection: false, //收藏显示
        message: false, //消息显示
        pay: false, //待付款
      }
    },
    created() {
      this.user = getLocalStroge('user', true)
      this.user_pic = this.user ? this.user.pic : ''
    },
    methods: {
      log() {
        this.$router.push({
          path: `/log`
        })
      },
      order () {
        this.$router.push({
          path: 'order'
        })
      },
      exit() {
        removeLocalStroge('user');
        this.user = null;
        this.pic = null;
      },
      address () {
        this.$router.push({
          path: 'address'
        })
      },
      detailCoupon () {
        this.myCoupon = true;
      },
      detailCollection () {
        this.collection = true;
      },
      detailMessage () {
        this.message = true;
      },
      //
      detailPay () {
        alert('暂未开放')
        //this.pay = true;
      },
      back () {
        this.myCoupon = false;
        this.collection = false;
        this.message = false;
        this.pay = false;
      }
    },
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .personal
    position: fixed
    left:0
    top: 0
    bottom: 50px
    width: 100%
    overflow: scroll
    .header
      display: flex
      flex-direction: row
      align-items: center
      width: 100%
      height: 100px
      background-image: url("./personal_top.png")
      .icon
        margin-left: 25px
        border-radius: 50%
      .text
        flex: 1
        color: white
        padding-left: 20px
      .right
        padding-right: 20px

    .border
      width: 100%
      //height: 5px
      background-color: rgb(243, 243, 243)
      border-top: 5px solid rgb(229, 229, 229)

    .order
      .top
        display: flex
        flex-direction: row
        align-items: center
        padding: 0 18px 0 20px
        height: 40px
        border-bottom: 1px solid rgb(229, 229, 229)
        .me
          font-size: 14px
          flex: 1
      .bottom
        display: flex
        height 69px
        .content
          flex: 1
          display: inline-flex
          align-items: center
          justify-content: center
          flex-direction: column
          .text
            color: rgba(0, 0, 0, 0.6)
            margin-top: 5px
            font-size: 12px

    .middle
      background-color: #eaeaea
      padding-bottom: 1px
      .content
        display: flex
        align-items: center
        flex-direction: row
        margin-right: 10px
        width: 100%
        height: 50px
        border-bottom: 1px solid rgb(229, 229, 229)
        background-color: #fff
        .image
          padding-left: 15px
        .coupon
          font-size: 12px
          color: rgb(153, 153, 153)
        .text
          font-size: 14px;
          color: rgb(51, 51, 51)
          flex: 1
        .right
          margin-right: 10px
        &:nth-child(3)
          margin-right: 0
          border-top: 5px solid rgb(229, 229, 229)
      .bottom
        margin: 10px auto;
        display: flex
        align-items: center
        justify-content: center
        border: 1px solid rgb(178, 178, 178)
        width: 80px
        height: 40px
      .detail
        position: fixed
        top: 0
        bottom: 0
        left: 0
        width: 100%
        z-index: 100
        background-color: white
        .detail-header
          display: flex
          align-items: center
          justify-content: center
          height: 45px
          position: relative
          border-bottom: 1px solid rgb(191, 191, 192)
          .image
            position: absolute
            left: 0
          .title
            display: flex
            align-items: center
            justify-content: center
            height: 45px
            color: rgb(51, 51, 51)
            //vertical-align: center
            font-size: 16px
        .collection-content
          position: fixed
          top: 46px
          left: 0
          bottom: 0
          overflow: scroll
          //display: flex
          //flex-direction: row
          //align-items: center
          //justify-content: center
          width: 100%
          //height: 100%
          .null
            position: absolute
            top: 150px
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            width: 100%
            .desc
              display: flex
              flex-direction: column
              align-items: center
              justify-content: center
              margin-top: 25px
              .title
                font-size: 14px
                color: rgb(153, 153, 153)
                margin-bottom: 25px
              .login
                display: flex
                align-items: center
                justify-content: center
                width: 100px
                height: 50px
                border: 1px solid rgb(153, 153, 153)
                border-radius: 20px
                font-size: 14px
                //background-color: rgb(226, 115, 104)




</style>
