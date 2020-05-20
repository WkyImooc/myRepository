<template>
  <div class="categary">
    <div class="categary-header" ref="top">
      <div @click="search" class="search-box">
        <img width="17" height="17" class="icon-search" src="./home_search.png">
        <span ref="query" class="text">小米6</span>
      </div>
    </div>

    <div class="categary-content">
      <div class="left">
        <ul class="left-wrap">
          <li @click="selectItem(index)" :class="{'active' :currentIndex === index}" class="menu-item"
              v-for="(item, index) in category" :key="index">
            <span class="item">{{item.name}}</span>
          </li>
        </ul>
      </div>

      <div class="right-content" ref="rightContent">
        <div class="right-container">
          <div class="content" v-for="(item, index) in category" :key="index" ref="content">
            <div class="right">
              <div class="image">
                <img width="100%" height="135" :src="item.logo">
              </div>
              <ul class="right-wrap">
                <li @click="selectgoods(item, it)" class="right-item" v-for="(it,index) in item.item"
                    :class="{'none' :(index+1)%3 === 0}">
                  <img width="100%" height="70" :src="it.logo">
                  <span class="text">{{it.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <search class="detail" style="display: none"  ref="search_wrapper"></search>
  </div>
</template>
<script type="text/ecmascript-6">
  //const ERR_OK = 200;
  import BScroll from 'better-scroll';
  import axios from 'axios'
  import {getLocalStroge,setLocalStroge} from "../../common/js/localStore";
  import Search from 'base/search/search'
  import {rootUrl} from "../../common/js/config";

  export default {

    components: {
      Search,
    },
    data() {
      return {
        //currentIndex: 0,
        listHeight: [], // 定义一个数组变量,装每一个区间的高度
        scrollY: 0, // Y轴的变化
        category: [],
        // nowIndex: 0,
        detailShow: false, // 搜索显示
        lists: [
          {
            desc: '热门搜索'
          },
          {
            desc: '热门搜索'
          },
          {
            desc: '热门搜索'
          },
          {
            desc: '热门搜索'
          },
          {
            desc: '热门搜索'
          },
          {
            desc: '热门搜索'
          },
        ], //热门搜索默认数据
      }
    },
    computed: {
      currentIndex() {
        //console.log(this.scrollY);
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
            console.log(i);
          }
        }
        return 0
      }
    },
    created() {

    },
    mounted () {
      this._initData()
      /*this.$nextTick(() => {
        //let _this = this;
        setTimeout(() => {
          this._initScroll();
          this._calculateHeight();
        },2000);

      })*/
    },
    watch: {
      category: function () {
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        })
      },
    },

    methods: {
      _initData() {
        if (getLocalStroge('category') !== '' && getLocalStroge('category') !== null && getLocalStroge('category') !== 'undefined') {
          this.category = getLocalStroge('category','json')
        } else {
          axios.get(rootUrl + '/YouPin/public/index.php/category').then((res) => {
            let data = res.data;
            if (data.status === 1) {
              setLocalStroge('category', data.data);
              this.category = getLocalStroge('category','json')
            }
          })
        }
      },
      selectItem(index) {
        let content = this.$refs.content;
        let el = content[index];
        this.rightScroll.scrollToElement(el, 800);
      },
      search () {
        this.$refs.search_wrapper.$el.style['display'] = 'block'
      },
      selectgoods(items, it) {
        this.dataHub.goodsType = items;
        if (it['by_goods'].length === 1) {
          this.dataHub.goodsData = it.by_goods[0];
          // console.log(this.dataHub.goodsData)
          this.$router.push({
            path: '/goods',
          });
          return;
        } else if (it['by_goods'].length > 1) {
          this.dataHub.goodsType = items;
          this.dataHub.child_name= it.name;
          // console.log(this.dataHub.goodsType)
          this.$router.push({
            path: '/horizontalList',
          })
          //console.log(item.by_goods.length);
        }
      },
      _initScroll() {
        if ( !this.rightScroll )
        {
          this.rightScroll = new BScroll(this.$refs.rightContent, {
            click: true,
            probeType: 3
          });
          this.rightScroll.on('scroll', (pos) => {
            let sy = Math.abs(Math.round(pos.y))
            this.scrollY = sy // 实时变化的Y值的位置
          })
        }else {
          this.rightScroll.refresh();
        }

      },
      _calculateHeight() {
        let content = this.$refs.content;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < content.length; i++) {
          let item = content[i];
          height = height + item.clientHeight;
          this.listHeight.push(height)
        }
        //alert('1: '+window.outerHeight)
        //alert('2: '+window.innerHeight)
        let topHeight = this.$refs.top.clientHeight;
        let bottomHeight = document.getElementsByClassName('tag')[0].clientHeight;
        this.$refs.rightContent.style.height = window.innerHeight - topHeight - bottomHeight + 'px'
      },

    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .categary
    position: fixed
    top: 0
    bottom: 50px
    left: 0
    width: 100%
    //z-index: -10


    .categary-header
      display: flex
      justify-content: center
      line-height 34px
      background-color: rgb(244, 244, 244)
      padding: 10px 10px
      .search-box
        display: flex
        flex-direction: row
        align-items: center
        background-color: rgb(255, 255, 255)
        height: 27px
        width: 100%
        .icon-search
          margin-left: 8px
        .text
          color: rgb(204, 204, 204)


        /*.shopping-header
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
            color: rgb(51, 51, 51)
            font-size: 16px*/
        /*.search-hot
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
    .categary-content
      display: flex
      flex-direction: row
      position: fixed
      top: 47px
      left: 0
      bottom: 50px
      width: 100%
      overflow: hidden //会影响底部导航栏的显示
      .left
        display: flex
        flex: 0 0 75px
        width: 75px
        border-right: 1px solid rgb(244, 244, 244)
        padding-top: 13px
        position: relative
        overflow-y: scroll
        overflow-x: hidden
        -webkit-overflow-scrolling: touch
        &::-webkit-scrollbar
          display none
        .left-wrap
          display: flex
          flex-direction: column
          align-items: center
          width: 100%
          .recommend
            color: rgb(51, 51, 51)
            font-size: 12px
          .menu-item
            width: 100%
            margin-bottom: 20px
            height: 24px
            text-align: center
            &.active
              /*margin-left: 2px*/
              color: rgb(132, 95, 63)
              border-left: 6px solid rgb(132, 95, 63)
            .item
              display: block
              line-height: 24px
              color: rgb(51, 51, 51)
              font-size: 12px
              font-weight: 300

      .right-content
        flex: 1
        display: flex
        flex-direction: column
        overflow: hidden
        .right-container
          //padding-bottom: 300px
        .content
          margin: 0 15px
          margin-bottom: 20px
        .right
          //z-index: -10
          display: flex
          flex: 1
          flex-direction: column
          width: 100%
          .image
            margin-top: 13px
          .right-wrap
            display: flex
            flex-flow: row wrap
            align-items: center
            .right-item
              display: flex
              flex-direction: column
              align-items: center
              justify-content: center
              margin-bottom: 13px
              width: 28%
              margin-right: 20px
              &.none
                margin-right: 0
              .text
                font-size: 11px
                margin-top: 5px
                color: rgb(102, 102, 102)


    .detail //搜索浮层
      position: fixed
      //z-index: 100
      top: 0
      bottom: 0
      left: 0
      width: 100%
      overflow: auto
      background-color: white
      /*.detail-header
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
          font-size: 13px*/
</style>
