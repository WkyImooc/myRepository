<template>
  <div class="index">
    <div v-if="isLoading" style="position: fixed;left: 0;top: 0; z-index: 1;display: flex;justify-content: center;
                          align-items: center;width: 100%; height: 100%; background-color: rgba(0,0,0,0.8)">
      <img style="border-radius: 10px;" src="/static/loading1.gif">
    </div>
    <div class="header">
      <img width="78" height="34" class="icon" src="./title_icon.png">
      <div class="search-box" @click="search" :placeholder = 'query'>
        <img width="15" height="15" class="icon-search" src="./home_search.png">
        <span ref="query" class="box">{{query}}</span>
      </div>
      <img @click="shoppingMessage" width="38" height="38" class="message" src="./message.png">
    </div>
    <div class="index-wrapper">
      <div class="index-content">
        <!--<div class="banner-wrapper">-->
        <div class="swiper-container" ref="container">
          <div class="swiper-wrapper">
            <img @click="selectGoods(item.by_goods)" width="100%" class="needsclick swiper-slide" v-for="item in banner" :src="item.img"/>
          </div>
          <div class="swiper-pagination" ref="pagination"></div>
        </div>
        <!--</div>-->
        <div class="nav">
          <div @click="selectItem(item)" class="item" v-for="item in theme.menus" >
            <img width="100%" height="80" :src="item.logo"/>
          </div>
          <!--<navigater @select="selectNavigater" :menus="theme.menus"></navigater>-->
        </div>

        <!--<router-view></router-view>-->

        <div class="theme-wrap" v-for="item in theme.theme" v-if="item.theme_by_goods.length">
          <div class="theme-header">
            <span class="left">{{item.title}}</span>
            <div @click="displayMore(item)" class="right">
              <span class="more">更多</span>
              <img width="10" height="10" src="./right_arrow.png"/>
            </div>
          </div>

          <div class="theme-content">
            <!--<span v-show="0">{{provisional_x_num=0}}{{provisional_y_num=0}}</span>-->

            <div class="content">
              <div class="items" v-for="it in item.theme_by_goods" :class="{'horizon' :it.horizontal_img}">
                <img class="horizontal" @click="selectGood(it)" v-show="it.horizontal_img"
                     width="100%"
                     height="150"
                     :src="it.horizontal_img">
                <img @click="selectGood(it)" v-show="it.vertical_img && !it.horizontal_img"
                     width="186" height="295"
                     :src="it.vertical_img">
                <div @click="selectGood(it)" class="block" v-show="!it.horizontal_img">
                  <!--有横图就不显示-->
                  <img
                    v-show="!(it.horizontal_img) && !(it.vertical_img)"
                    class="image" width="100%" height="169" :src="it.imgs">
                  <div class="text" v-show="!it.horizontal_img">
                    <div class="desc-wrap">
                      <span class="desc">{{it.desc}}</span>
                    </div>
                    <div class="desc-content">
                      <span class="name">{{it.name}}</span>
                      <span class="price">￥{{it.price}}</span>
                    </div>
                  </div>
                </div>
                <!--<span v-show="0">{{it.horizontal_img ? provisional_x_num++ : ''}}{{it.vertical_img ? provisional_y_num++ : ''}}</span>-->
              </div>
            </div>
          </div>

        </div>
        <baseline></baseline>
        <div class="power">
          <span class="text">Copyright © 小米通讯技术有限公司 版权所有</span>
          <span class="phone">京IC备17028681号-1 联系电话: 010-60606666</span>
        </div>
      </div>
    </div>
    <div class="showMore detail" v-show="more">
      <div class="showMore-header">
        <img class="leftIco" @click="backs" width="40" height="40" src="./left.png">
        <span class="title">{{data.title}}</span>
      </div>
      <div class="showMomre-content">
        <ul class="lists">
          <li @click="selectGoods(item)" :class="{'last':(index + 1) % 2 ===0 }" class="list"
              v-for="(item, index) in data.theme_by_goods">
            <img width="100%" height="169" :src="item.imgs">
            <div class="desc-wrap">
              <span class="desc">{{item.desc}}</span>
            </div>
            <div class="desc-content">
              <span class="name">{{item.name}}</span>
              <span class="price">￥{{item.price}}</span>
            </div>
          </li>
        </ul>
        <baseline></baseline>
      </div>
    </div>
    <search class="detail" style="display: none"  ref="search_wrapper"></search>
  </div>
</template>


<script type="text/ecmascript-6">

  import Search from 'base/search/search'
  import axios from 'axios'
  import {getLocalStroge, setLocalStroge} from "../../common/js/localStore";
  import Baseline from 'base/baseline/baseline'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {rootUrl} from "../../common/js/config";

  const ERR_OK = 200;
  export default {
    components: {
      Search,
      Baseline
    },
    data() {
      return {
        isLoading: true,
        query: 'Redmi K30 Pro',
        banner: [],
        theme: [],
        more: false, //浮层显示？
        data: [],

        detailShow: false,
        showMessage: false,
        // border: false,
        provisional_x_num: 0, // 临时变量，用于控制主页横图商品显示数量
        provisional_y_num: 0, // 临时变量，用于控制主页长图商品显示数量
      }
    },
    watch: {
      provisional_x_num(x) {
        console.log(x)
      },
      provisional_y_num(y) {
        console.log(y)
      },
    },
    methods: {
      //跳转到menue
      selectItem (item) {
        this.dataHub.menuData = item;
        this.$router.push({
          path: '/NavD'
        })
      },
      //跳转到搜索
      search () {
        this.$refs.search_wrapper.$el.style['display'] = 'block'
      },

      // // 父子组件通信
      // change (item) {
      //   this.detailShow = item
      // },
      // //父子组件通信

      shoppingMessage() {
        this.showMessage = true
      },
      //更多
      displayMore(item) {
        this.more = true;
        this.data = item;
        // console.log(item)
      },
      backs() {
        this.more = false;
      },
      selectGoods(item) {
        this.$router.push({
          path: 'goods'
        });
        this.dataHub.goodsData = item;
      },
      selectGood(it) {
        this.$router.push({
          path: 'goods'
        });
        this.dataHub.goodsData = it;
      }
    },
    created() {
      if (getLocalStroge('banner') !== '' && getLocalStroge('banner') !== null && getLocalStroge('banner') !== 'undefined') {
        this.banner = getLocalStroge('banner', 'json')
        //this.isLoading = false
        //console.log(this.banner);
      } else {
        axios.get(rootUrl + '/YouPin/public/index.php/banner').then(res => {
          let data = res.data
          if (data.status === 1) {
            setLocalStroge('banner', data.data);
            this.banner = getLocalStroge('banner', 'json')
            //this.isLoading = false
            // console.log(banner)
          }
        })
      }
      if (getLocalStroge('theme') !== '' && getLocalStroge('theme') !== null && getLocalStroge('theme') !== 'undefined') {
        //this.theme = JSON.parse(getLocalStroge('theme'))
        this.theme = getLocalStroge('theme', 'json')
        this.isLoading = false
      } else {
        axios.get(rootUrl + '/YouPin/public/index.php/theme').then((response) => {
          let data = response.data
          if (data.status === 1) {
            setLocalStroge('theme', data.data);
            this.theme = getLocalStroge('theme', 'json')
            this.isLoading = false
            //console.log(theme)
          }
        }).catch((res) => {
          console.log(res)
        })
      }


    },
    mounted () {
      setTimeout(() => {
        var swiper = new Swiper((this.$refs.container), {
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
      },2000);
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .index
    position: fixed
    top: 0
    bottom: 50px  //
    left: 0
    width: 100%
    .header
      width: 100%
      display: flex
      flex-direction: row
      align-items: center
      height: 45px
      .icon
        flex: 0 0 78px
        width: 78px
        text-align: center
        margin-left: 15px
      .search-box
        display: flex
        flex: 1
        flex-direction: row
        align-items: center
        height: 30px
        background-color: rgb(244, 244, 244)
        margin-left: 5px
        .icon-search
          color: rgb(204, 204, 204)
          margin: 0 3px 0 9px
        .box
          font-size: 15px
          background-color: rgb(244, 244, 244)
          color: rgb(204, 204, 204)
      /*.detail
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
          flex-direction: row
          align-items: center
          justify-content: center
          height: 45px
          padding: 0 15px 0 0
          border-bottom: 1px solid rgb(244, 244, 244)
          padding-bottom: 3px
          !*.icon-back*!
          !*flex: 0 0 10px*!
          .detail-wrap
            flex: 1
            height: 30px
            line-height: 30px
            .search
              display: flex
            .search-box
              display: flex
              flex: 1
              flex-direction: row
              align-items: center
              height: 30px
              background-color: rgb(244, 244, 244)
              .icon-search
                color: rgb(204, 204, 204)
                margin: 0 3px 0 9px
              .box
                font-size: 16px
                background-color: rgb(244, 244, 244)
                color: rgb(204, 204, 204)
                border: none
                outline: medium
                caret-color: rgb(204, 204, 204)
          .text
            margin-left: 15px
            color: rgb(102, 102, 102)
            font-size: 13px
        .shopping-header
          display: flex
          align-items: center
          justify-content: center
          height: 45px
          position: relative
          border-bottom: 1px solid rgb(191, 191, 192)
          .image
            position: absolute
            left: 0
          .titile
            color: rgb(51, 51, 51)
            font-size: 16px
        .search-hot
          padding: 0 15px
          .title
            display: inline-block
            margin: 18px 0 10px
            font-size: 13px
            color: rgb(153, 153, 153)
          .lists
            display: inline-block
            margin: 0 10px 10px 0
            font-size: 13px
            color: rgb(103, 103, 103)
            padding: 8px
          .lists0
            background-color: rgb(235, 242, 251)
          .lists1
            background-color: rgb(250, 246, 236)
          .lists2
            background-color: rgb(250, 242, 231)
          .lists3
            background-color: rgb(244, 249, 239)
          .lists4
            background-color: rgb(255, 230, 230)
          .lists5
            background-color: rgb(235, 242, 251)
          .lists6
            background-color: rgb(252, 255, 237)
*/
    .index-wrapper
      position: fixed
      //z-index: 0
      width: 100%
      top: 45px
      bottom: 50px
      -webkit-transform: translateZ(0)
      .index-content
        height: 100%
        width: 100%
        overflow: scroll
        -webkit-overflow-scrolling: touch
        &::-webkit-scrollbar
          display none
        /*.banner-wrapper*/
          /*width: 100%*/
          /*height: 150px*/
          //overflow: hidden
        .swiper-container
          width: 100%
          //height: 35%
        /*position: relative*/
        .nav
          width: 100%
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          .item
            flex: 1
        .theme-wrap
          width: 100%
          border-top: 5px solid rgb(242, 242, 242)
          .theme-header
            height: 38px
            padding: 0 10px 0 5px
            display: flex
            flex-direction: row
            align-items: center
            justify-content: space-between
            //border-top: 5px solid
            .left
              font-size: 15px
              color: rgb(51, 51, 51)
            .right
              display: flex
              align-items: center
              flex-direction: row
              font-size: 13px
              color: rgb(153, 153, 153)

          .theme-content
            width: 100%
            .content
              display: flex
              flex-direction: column
              flex-flow: wrap
              width: 100%
              //justify-content: center
              .items
                display: flex
                flex-direction: row
                flex-flow: wrap
                margin: 0 6px 0 8px
                width: 46%
                &.horizon
                  width: 100%
                  margin: 0
                .horizontal
                  width: 100%
                .block
                  display: flex
                  flex-direction: column
                  width: 100%
                  .text
                    display: flex
                    flex-direction: column
                    width: 100%

                    .desc-wrap
                      display: flex
                      align-items: center
                      width: 100%
                      height: 26px
                      //padding: 3px 0 3px 3px
                      background-color: rgb(245, 242, 240)
                      .desc
                        width: 100%
                        white-space: nowrap
                        overflow: hidden
                        text-overflow: ellipsis
                        color: rgb(102, 102, 102)
                        font-size: 10px
                        line-height: 12px
                    .desc-content
                      display: flex
                      flex-direction: column
                      margin-left: 15px
                      .name
                        width: 90%
                        white-space: nowrap
                        overflow: hidden
                        text-overflow: ellipsis
                        margin-top: 10px
                        font-size: 13px
                        color: rgb(51, 51, 51)
                        height: 16px
                      .price
                        font-size: 16px
                        color: rgb(182, 9, 9)
                        margin-top: 3px
                        margin-bottom: 10px

        .power
          background-color: rgb(242, 242, 242)
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
          padding: 10px 0
          .text, .phone
            color: rgb(153, 153, 153)
            font-size: 13px
          .phone
            margin-top: 6px

        .pic-wrapper
          width: 100%
          .pic-list
            white-space: nowrap
            overflow scroll
            font-size: 0
            .pic-item
              display: inline-block
              width: 40%
              margin-right: 1px
              &:last-child
                margin: 0

        .content-wrapper
          padding-left: 10px
          .list
            display: flex
            align-items: center
            .image
              flex: 0 0 130px
            .right
              flex: 1
              display: flex
              flex-direction: column
              .title
                font-size: 13px
                color: rgb(51, 51, 51)
              .desc
                font-size: 11px
                color: rgb(153, 153, 153)
                margin-top: 6px
              .price
                font-size: 13px
                margin-top: 15px
                color: rgb(182, 9, 9)
                .slider
                  vertical-align: top
                  color: white
                  padding: 0 2px
                  font-size: 10px
                  background-color: rgb(182, 9, 9)

        .bottom
          width: 100%
          background-color: rgb(242, 242, 242)
          .low
            display: flex
            align-items: center
            justify-content: center
            border-bottom: 1px solid rgb(211, 211, 211)
            height: 160px
            font-size: 0
            .border
              height: 1px
              width: 50px
              background-color: rgb(211, 211, 211)
            .text
              color: rgb(153, 153, 153)
              margin: 0 6px
              font-size: 13px
          .power
            display: flex
            align-items: center
            justify-content: center
            flex-direction: column
            padding: 10px 0
            .text, .phone
              color: rgb(153, 153, 153)
              font-size: 13px
            .phone
              margin-top: 6px
    .showMore
      position: fixed
      top: 0
      left: 0
      bottom: 0
      width: 100%
      background-color: white
      .showMore-header
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        border-bottom: 1px solid rgb(191, 191, 192)
        height: 44px
        .leftIco
          position: absolute
          left: 0
      .showMomre-content
        width: 100%
        position: fixed
        top: 47px
        bottom: 0
        overflow: scroll
        -webkit-overflow-scrolling: touch
        &::-webkit-scrollbar
          display none
        //background-color: rgb(238, 238, 238)
        .lists
          padding: 0 10px
          display: flex
          flex-direction: row
          justify-content: space-between
          flex-flow: wrap
          .list
            display: flex
            flex-direction: column
            /*margin: 0 5px 0 8px*/
            width: 49%
            .desc-wrap
              display: flex
              align-items: center
              width: 100%
              height: 30px
              //vertical-align: middle
              background-color: rgb(245, 242, 240)
              .desc
                width: 100%
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                color: rgb(102, 102, 102)
                font-size: 10px
                line-height: 12px
            .desc-content
              margin-left: 8px
              display: flex
              flex-direction: column
            .name
              width: 100%
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
              margin-top: 10px
              font-size: 13px
              color: rgb(51, 51, 51)
              height: 16px
            .price
              font-size: 16px
              color: rgb(182, 9, 9)
              margin-top: 3px
              margin-bottom: 10px

            &.last
              margin-right: 0

    .detail //搜索浮层
      position: fixed
      top: 0
      bottom: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background-color: white
</style>
