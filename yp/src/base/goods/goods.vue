<template>
  <div class="goods-wrap" ref="goodsW">
    <div class="goods">
      <div class="swiper-container" ref="container">
        <div class="swiper-wrapper" ref="wrapper">
          <img ref="image" width="100%" height="375px" class="needsclick swiper-slide" v-for="item in newPic" :src="item"/>
        </div>
        <div class="swiper-pagination" ref="pagination"></div>
      </div>
      <div class="icon">
        <img width="48" height="48" src="./left.png" @click="back">
        <img width="48" height="48" src="./home.png" @click="home">
      </div>
      <div class="middle">
        <div class="one">
          <h1 class="title">{{goods.name}}</h1>
          <span class="desc">
            <span class="red"></span>{{goods.desc}}</span>
          <div class="prices">
            <span class="red">￥</span>
            <span class="price">{{goods.price}}</span>
            <span class="red">起</span>
          </div>
        </div>
        <ul class="two">
          <li class="content">
            <span class="left">已选 :</span>
            <span class="select">请选择颜色 型号分类</span>
            <img @click="reDetail" width="18" height="18" class="right" src="./more.png">
          </li>
          <li class="contentSecond">
            <span class="left">促销 :</span>
            <span class="give">赠品</span>
            <span class="select">小米无线充电器</span>
          </li>
          <li class="content three">
            <span class="left">送至 :</span>
            <span class="select">北京市海淀区</span>
            <img @click="reDetails" width="18" height="18" class="right" src="./more.png">
          </li>
          <border></border>
          <div class="contentFour">
            <div class="jp">
              <img class="image" width="12" height="12" src="./promise_icon.png">
              <span class="name">有品甄选精品</span>
            </div>
            <div class="jp">
              <img class="image" width="12" height="12" src="./promise_icon.png">
              <span class="name">由 小米 发货并提供售后</span>
            </div>
          </div>
          <border></border>
          <div class="contentFive">
            <img width="50" height="50" :src="seller? seller.logo : '/static/brand.jpg'">
            <div class="right">
              <h2 class="title">{{seller? seller.name : '小米自营产品'}}</h2>
              <span class="desc">{{seller? seller.desc : '为发烧而生'}}</span>
            </div>
          </div>
          <border></border>
        </ul>
        <!--&lt;!&ndash;评价&ndash;&gt;-->
        <!--<div class="evaluate">-->
          <!--<div class="evaluate-h">-->
            <!--<span class="user-e">用户评价</span>-->
            <!--<div class="right">-->
              <!--<span class="satisfied">满意</span>-->
              <!--<img width="13" height="13" src="./right_arrow.png">-->
            <!--</div>-->
          <!--</div>-->
          <!--<ul class="e-content">-->
            <!--<li class="content-wrap">-->
              <!--<div class="left">-->
                <!--<img width="40" height="40" src="./evaluation_icon_user.png">-->
                <!--<div class="middle-user">-->
                  <!--<h2 class="username">111</h2>-->
                  <!--<img class="star" width="9" height="9" src="./evaluation_start.png">-->
                <!--</div>-->
              <!--</div>-->
              <!--<span class="desc">不错东西包装可以</span>-->
              <!--<span class="right">2018.12.23.4.5</span>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->

        <!--<border></border>-->
        <!---->
        <!--<div class="recommends">-->
          <!--<div class="header">-->
            <!--<div class="left" v-for="item in recommends">-->
              <!--<span class="recommend">{{item.name}}</span>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="lists">-->
            <!--<div class="list">-->
              <!--<img width="108" height="108" src="./five.png">-->
              <!--<h2 class="name">小米AI</h2>-->
              <!--<span class="desc">听音乐,语音遥控</span>-->
              <!--<span class="price">299</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash;推荐 &ndash;&gt;-->
        <border></border>
        <div class="oneTwo">
          <img width="38" height="38" src="./luke.jpg">
          <div class="right">
            <h2 class="name">鹿客</h2>
            <span class="desc">做一流设计和体验的智能家居产品</span>
          </div>
        </div>
        <border></border>
        <div class="intraduce">
          <div class="header">
            <span v-show="goods['detail']" @click="tab" class="title" :class="this.colorIndex===1?'active':''">概述</span>
            <span v-show="goods['param']" @click="tab" class="title" :class="this.colorIndex===2?'active':''">参数</span>
            <span v-show="goods['steup']" @click="tab" class="title" :class="this.colorIndex===3?'active':''">安装</span>
            <span v-show="goods['question']" @click="tab" class="title"
                  :class="this.colorIndex===4?'active':''">常见问题</span>
            <span v-show="goods['Test Report']" @click="tab" class="title"
                  :class="this.colorIndex===5?'active':''">检测报告</span>
          </div>
          <div class="content-detail" v-html="detail"></div>
        </div>
      </div>
      <div class="detail-show dz" v-show="showDetailT" ref="detail">
        <div class="top" @click="reDetails" ref="top"></div>
        <div class="middle-contentT">
          <div class="header" ref="header">
            <div class="title">
              <span class="name">所在地区</span>
              <img class="image" width="15" height="15" src="./error.png">
            </div>
          </div>
          <div class="address_select">
            <div class="item" v-for="(item, index) in address">
              <img @click="address_select(index)" width="18" height="18"
                   :src="selectedIndex===index?'/static/selected.png':'/static/circle.png'">
              <div class="content">
                <p><span>{{item.name}}</span><span>{{item.phone}}</span></p>
                <p>{{item.city + item.address}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-show ys" v-show="showDetail">
        <div class="top" @click="reDetail"></div>
        <div class="middle-content">
          <div class="header">
            <img width="70" height="70" class="image" :src="goods.imgs">
            <div class="desc">
              <h2 class="title">{{goods.name}}</h2>
              <span class="price">{{goods.price}}</span>
            </div>
          </div>
          <div class="contentC">
            <div v-show="color.length" class="color">
              <h2 class="title">颜色</h2>
              <div class="select">
                <span class="type" @click="selectColor(index,item)" :class="{'active' :currentIndex === index}"
                      v-for="(item, index) in color">{{item}}</span>
              </div>
            </div>
            <div  class="color">
              <h2 class="title">型号</h2>
              <div class="select">
                <span class="type" @click="selectType(index,item)" :class="{'active' :nowIndex === index}"
                      v-for="(item, index) in spec">{{item}}</span>
              </div>
            </div>
            <div v-show="size.length" class="color">
              <h2 class="title">大小</h2>
              <div class="select">
                <span class="type" @click="selectSize(index,item)" :class="{'active' :twoIndex === index}"
                      v-for="(item, index) in size">{{item}}</span>
              </div>
            </div>

          </div>
        </div>
        <div class="red" v-show="isShow">
          <span class="text">请选择颜色,分类</span>
        </div>
        <div class="redShow" v-show="bottomShow">
          <span @click="confirmOrder" class="redShow-buy">立即购买</span>
          <span @click=" add_shopcart" class="redShow-buy add">加入购物车</span>
        </div>
        <!--<div class="icon">-->
        <!--<img width="48" height="48" src="./left.png" @click="back">-->
        <!--<img width="48" height="48" src="./home.png">-->
        <!--</div>-->
      </div>
      <div class="bottom">
        <div class="bottom-wrap">
          <img width="20" height="20" src="./calculate.png">
          <span class="collection">收藏</span>
        </div>
        <div @click="goShopcart" class="bottom-wrap">
          <img width="20" height="20" src="./shop_cart.png">
          <span class="shopcart">购物车</span>
          <!--<div v-show="showNum" class="shopcartnum">
            <span class="num">{{num}}</span>
          </div>-->
        </div>
        <span @click="buy" class="color buy">立即购买</span>
        <span @click=" add_shopcart" class="color cart">加入购物车</span>
      </div>
      <div v-show="success" class="message">添加购物车成功!</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Border from 'base/border/border'
  import BScroll from 'better-scroll'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {getLocalStroge} from "../../common/js/localStore"
  import axios from 'axios'
  import {rootUrl} from "../../common/js/config";

  export default {
    components: {
      Border,
    },
    data() {
      return {
        goods: [],
        showDetail: false,
        showDetailT: false,
        bottomShow: false,
        currentIndex: null,
        nowIndex: null,
        twoIndex: null,
        selectedIndex: 0, // 地址选择下标
        isShow: true,
        city: '',
        recommends: [
          {
            name: '相关推荐'
          },
          {
            name: '排行榜'
          }
        ],
        colorIndex: 1,
        showNum: false,
        num: '',
        newPic: [],
        color: [],
        spec: [],
        size: [],
        detail: '',
        address: [],
        shop_cart: {
          user_id: '',
          goods_id: '',
          num: 1,
          spec: '',
          color: '',
          size: ''
        },
        success: false, //添加购物车成功提示
        shopcartnum: [] //购物车数量
      }
    },
    created() {
      if (!this.dataHub.goodsData) {
        this.$router.push({
          path: '/index'
        });
        return
      }
      this.goods = this.dataHub.goodsData;
      this.seller = this.dataHub.sellerData ? this.dataHub.sellerData : null;
      // console.log(this.goods)

      //轮播图获取
      let pics = this.goods.pics;//字符串
      if (pics && pics !== '') {
        this.newPic = pics.split(",");
      }
      setTimeout(() => {
        var swiperObj = new Swiper((this.$refs.container), {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
            // 'this.$refs.pagination'
          },
          autoplay: true,
          speed: 600,
          observer: true,
          observeParents: true
        })
      }, 200);
      //轮播图获取

      //颜色数组获取
      let older = this.goods.color;//字符串
      if (older && older !== '') {
        this.color = older.split(",");
        // console.log(this.color)
      }
      //颜色数组获取

      //版本数组获取
      let old = this.goods.spec;//字符串
      if (old && old !== '') {
        this.spec = old.split(",");
        // console.log(this.spec)
      }
      //console.log(this.spec);
      //版本数组获取

      //尺码数组获取
      let sizes = this.goods.size;//字符串
      if (sizes && sizes !== '') {
        this.size = sizes.split(",");
        // console.log(this.size)
      }
      //console.log(this.spec);
      //尺码数组获取

      this.detail = this.goods.detail;
      //console.log(this.detail)
      this.address = getLocalStroge('address', 'json');
      //console.log(this.address)
      this.user = getLocalStroge('user', 'json')
      this.shopcartnum = getLocalStroge('shopcartnum','json')

    },
    mounted() { //style报错
      this.$nextTick(() => {
        this.$refs.goodsW.style['height'] = window.screen.height + 'px';
      })
    },
    methods: {
      back() {
        this.$router.back(-1)
      },
      home() {
        this.$router.push({
          path: '/index'
        })
      },
      reDetail() {
        this.showDetail = !this.showDetail;
      },
      reDetails() {
        this.showDetailT = !this.showDetailT;
      },
      buy () {
        this.showDetail = true;
      },
      confirmOrder () {
        alert('暂未开放')
        /*this.$router.push({
          path: '/confirmorder'
        })*/
      },

      // 大小
      selectSize(index, item) {
        this.twoIndex = index;
        this.bottomShow = true;
        this.isShow = false;
        this.shop_cart.size = item
      },
      // 颜色
      selectColor(index, item) {
        this.currentIndex = index;
        this.bottomShow = true;
        this.isShow = false;
        this.shop_cart.color = item
      },
      // 规格
      selectType(index, item) {
        this.nowIndex = index;
        this.shop_cart.spec = item
        this.bottomShow = true;
        this.isShow = false;
      },
      tab(event) {
        let des = event.target.innerText;
        let dom = document.getElementsByClassName('content-detail')[0];
        if (des === '概述') {
          dom.innerHTML = this.goods.detail;
          this.colorIndex = 1
        } else if (des === '参数') {
          dom.innerHTML = this.goods.param;
          this.colorIndex = 2
        } else if (des === '安装') {
          dom.innerHTML = this.goods.steup;
          this.colorIndex = 3
        } else if (des === '常见问题') {
          dom.innerHTML = this.goods.question;
          this.colorIndex = 4
        } else if (des === '检测报告') {
          dom.innerHTML = this.goods['Test Report'];
          this.colorIndex = 5
        }
      },
      address_select(index) {

        this.selectedIndex = index;

        //item.selected = 1

        // for (let i = 0; i< this.address.length; i++) {
        //
        // }
      },
      add_shopcart() {
        if (!this.user || !this.user.id) {
          alert('请先登陆');
          this.$router.push({
            path: '/log'
          });
          return;
        }
        //console.log(this.shop_cart)
        if ((this.goods.size && !this.shop_cart.size) ||
          (this.goods.spec && !this.shop_cart.spec) ||
          (this.goods.color && !this.shop_cart.color)) {
          alert('请选择规格');
          return
        }
        this.showDetail = false;
        this.shop_cart.user_id = this.user.id;
        this.shop_cart.goods_id = this.goods.id;

        let url = rootUrl + '/YouPin/public/index.php/cartManage';
        let param = {
          manage_type: 'add',
          data: this.shop_cart
        }
        axios.post(url, param).then(res => {
          let data = res.data
          if (data.status === 1) {
            this.showNum = true;
            this.num++;

            this.success = true;
            this.timer = setTimeout(() => {
              this.success = false;
            },2000);
            this.clearTimeout();

          } else if (data.status === 0) {
            alert(data.message)
          }
        }).catch(res => {
          console.log(res)
        })
        //console.log(this.shop_cart);
      },
      goShopcart () {
        this.$router.push({
          path: '/shopcart'
        })
      }
    },

  }
</script>
<style>
  .middle .intraduce .content-detail img {
    width: 100%;
  }
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .goods-wrap
    //position fixed
    //left: 0
    //bottom: 53px
    width 100%
    background-color white
    //z-index: 20
    .goods
      position: relative
      width: 100%
      height: 100%
      overflow: scroll
      -webkit-overflow-scrolling: touch
      &::-webkit-scrollbar
        display: none
      .swiper-container
        width: 100%
        height: 375px;
        //height: 65%
        //position: relative
        //position: absolute
        //top: 65%
      .icon
        position: fixed
        top: 0
        left: 0
        right: 0
        display: flex
        z-index: 30
        justify-content: space-between
      .middle
        //position: absolute
        //top: 65%
        //left: 0
        width: 100%
        //tops: 10px
        //margin-bottom: 20px
        .one
          display: flex
          flex-direction: column
          padding: 10px 16px 0
          border-bottom: 2px solid rgb(229, 229, 229)
          .title
            margin: 6px 0
            color: rgb(51, 51, 51)
            font-size: 16px
          .desc
            font-size: 13px
            color: rgb(153, 153, 153)
            font-family: "Helvetica Neue", STHeiTi, sans-serif
            line-height: 18px
            .red
              font-family: "Helvetica Neue", STHeiTi, sans-serif;
              color: rgb(182, 9, 9)
          .prices
            font-size: 0
            font-family: Avenir-Roman
            color: rgb(204, 54, 60)
            margin: 6px 0
            line-height: 28px
            .price
              font-size: 24px
            .red
              font-size: 14px

        .content
          display: flex
          justify-content: space-between
          align-items: center
          padding: 12px 17px
          color: rgb(51, 51, 51)
          font-size: 13px
          border-bottom: 1px solid rgb(229, 229, 229)
          .left
            justify-content: flex-start
            margin-right: 3px
          .select
            flex: 1
          &.three
            border-bottom: none
            .left
              color: rgba(0, 0, 0, 0.5)

        .contentSecond
          font-size: 13px
          border-bottom: 1px solid rgb(229, 229, 229)
          padding: 0 17px
          .left
            display: inline-block
            margin: 10px 0
            color: rgba(0, 0, 0, 0.5)
          .give
            font-family: "Helvetica Neue", STHeiTi, sans-serif
            font-size: 12px
            margin: 0 3px
            border: 1px solid rgb(204, 54, 60)
            color: rgb(204, 54, 60)
          .give, .middle
            display: inline-block
            margin-top: 10px
            line-height: 14px
            margin-bottom: 5px

        .contentFour
          display: flex
          flex-direction: row
          padding: 0 17px
          font-size: 13px
          margin: 8px 0
          .jp
            display: flex
            flex-direction: row
            align-items: center
            margin-right: 20px
            .image
              margin-right: 4px
            .name
              font-size: 13px
              color: rgba(0, 0, 0, 0.8)
              line-height: 22px

        .contentFive
          display: flex
          flex-direction: row
          padding: 10px 18px
          .right
            display: flex
            flex-direction: column
            justify-content: center
            padding: 0 10px
            .title
              font-size: 14px
              height: 17px
              line-height: 17px
              color: rgba(0, 0, 0, 0.88)
            .desc
              margin-top: 6px
              font-size: 13px
              color: rgb(102, 102, 102)
              line-height: 15.6px
        .evaluate
          margin-top: 10px
          .evaluate-h
            display: flex
            flex-direction: row
            align-items: center
            margin: 0 10px
            height: 54px
            .user-e
              color: rgb(51, 51, 51)
              font-size: 15px
              line-height: 18px
            .right
              flex: 1
              display: flex
              align-items: center
              justify-content: flex-end
              color: rgb(102, 102, 102)
              font-size: 12px
              line-height: 14px
          .content-wrap
            position: relative
            padding: 15px 0
            border-top: 1px solid rgb(229, 229, 229)
            margin: 0 17px
            .left
              display: flex
              flex-direction: row
              align-items: center
            .middle-user
              margin-left: 15px
              .star
                margin: 8px 4px 0 0
            .desc
              display: inline-block
              margin-top: 10px
              color: rgb(51, 51, 51)
              font-size: 13px
              line-height: 20px
            .right
              position: absolute
              right: 10px
              top: 30px
              color: rgb(153, 153, 153)
              font-size: 10px
              line-height: 12px
        .recommends
          .header
            display: flex
            height: 55px
            .left
              flex: 1
              display: flex
              align-items: center
              justify-content: center
              .recommend
                font-size: 14px
                line-height: 16px
                color: rgb(159, 128, 82)
                border-bottom: 3px solid rgb(159, 130, 87)
          /*&:first-child
            border-bottom: none
            color: rgb(51, 51, 51)*/
          .lists
            display: flex
            flex-direction: row
            .list
              display: flex
              flex-direction: column
              align-items: center
              justify-content: center

        .oneTwo
          height: 58px
          padding: 0 14px
          display: flex
          flex-direction: row
          align-items: center
          .right
            padding: 0 5px
            display: flex
            flex-direction: column
            .name
              font-size: 14px
              color: rgba(0, 0, 0, 0.88)
              margin-bottom: 3px
            .desc
              font-size: 13px
              color: rgb(102, 102, 102)

        .intraduce
          .header
            height: 40px
            display: flex
            flex-direction: row
            align-items: center
            justify-content: space-around
            .title
              color: rgb(102, 102, 102)
              &.active
                color: rgb(159, 130, 87)
          .content-detail
            width: 100%
            img
              width: 100%
      .detail-show
        position: fixed
        z-index: 200
        top: 0
        left: 0
        bottom: 0
        width: 100%
        height: 100%
        .top
          height: 40%
          background-color: black
          opacity: 0.5
        .middle-content
          position: absolute
          left: 0
          top: 40%
          bottom: 53px
          width: 100%
          background-color: white
          overflow: auto
          .header
            display: flex
            flex-direction: row
            align-items: center
            border-bottom: 1px solid rgb(232, 232, 232)
            .image
              border: 1px solid rgb(232, 232, 232)
              margin: 5px 13px
            .desc
              color: rgb(51, 51, 51)
              font-size: 13px
              .price
                display: inline-block
                margin-top: 8px
                color: rgb(204, 54, 60)
          .contentC
            /*height: 192px*/
            overflow: auto
            .color
              padding: 16px 16px 0 16px
              //border-bottom: 1px solid rgb(213, 213, 213)
              //height: 80px
              &:last-child
                border-bottom: none
              .title
                color: rgb(51, 51, 51)
                margin-bottom: 10px
              .select
                display: inline-flex
                flex-flow: row wrap
                align-items: center
                font-size: 0
                .type
                  margin: 4px 6px 2px 0
                  font-size: 13px;
                  color: rgba(0, 0, 0, 0.9)
                  padding: 8px 16px
                  border: 1px solid rgb(213, 213, 213)
                  border-radius: 2px
                  &.active
                    color: rgb(204, 54, 60)
                    border: 1px solid rgb(204, 54, 60)

        .middle-contentT
          position: absolute
          bottom: 0
          top: 40%
          width: 100%
          height 60%
          background-color: white
          .header
            height: 16%
            //border-bottom: 1px solid rgb(229, 229, 229)
            .title
              position: relative
              display: flex
              justify-content: center
              align-items: center
              height: 40px
              padding: 0 15px
              .name
                font-size: 14px
                color: rgba(0, 0, 0, 0.6)
              .image
                background-color: transparent
                position: absolute
                right: 15px
                display: inline-block
          .address_select
            overflow: scroll
            height 82%
            &::-webkit-scrollbar
              display none
            .item
              display: flex
              flex-direction row
              align-items: center
              justify-content space-around
              border-bottom: 1px solid rgb(229, 229, 229)
              .content
                width 84%
                p
                  line-height 28px
                  &:last-child
                    color #666666
                  &:first-child
                    display flex
                    justify-content space-between
        .red
          position: absolute
          bottom: 0
          left: 0
          display: flex
          align-items: center
          justify-content: center
          width: 100%
          height: 53px
          color: white
          font-size: 14px
          background-color: rgb(204, 54, 60)
        .redShow
          position: absolute
          bottom: 0
          left: 0
          width: 100%
          display: flex
          align-items center
          justify-content: center
          color: white
          .redShow-buy
            flex: 1
            display: flex
            align-items center
            justify-content: center
            height: 53px
            background-color: rgb(204, 54, 60)
            &.add
              height: 53px
              background-color: rgb(223, 176, 126)
      .bottom
        display: flex
        position: fixed
        bottom: 0
        left: 0
        //margin-tops: 20px
        width: 100%
        background-color: rgb(242, 242, 242)
        .bottom-wrap
          position: relative
          height: 53px
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          width: 70px
          border-right: 1px solid rgb(191, 191, 192)
          .collection, .shopcart
            margin-top: 4px
            display: block
            font-size: 10px
            color: rgb(122, 122, 122)
            line-height: 12px
          .shopcartnum
            position: absolute
            right: 0
            top: 1px
            //z-index 10
            display: flex
            align-items: center
            justify-content: center
            width: 14px
            height: 14px
            border-radius: 50%
            font-size: 7px
            color: white
            background-color: rgb(255, 59, 48)

        .color
          flex: 1
          display: flex
          flex-direction: row
          align-items: center
          justify-content center
          color: white
          height: 53px
          &.buy
            background-color: rgb(204, 54, 60)
          &.cart
            background-color: rgb(223, 176, 126)
      .message
        display: flex
        align-items: center
        justify-content: center
        position: absolute
        top: 50%
        left: 37%
        z-index: 100
        color: white
        width: 120px
        height: 30px
        font-size: 16px
        background-color: black
        opacity: 0.5
</style>
