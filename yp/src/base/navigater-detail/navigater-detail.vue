<template>
  <div class="detail">
    <!--<img class="back" width="30" height="30" @click="back" src="./left.png"/>-->
    <div>
      <div ref="topWrap" class="top" v-show="data.name !== '上新' && data.name !== '众筹'">
        <div class="top-wrap" v-for="(item, index) in data.theme_by_goods" @click="selectItem(index)">
          <span class="title" :class="{'active' :currentIndex === index, 'first' :index ===0}">{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="detail-sx" v-show="data.name === '上新'">
      <div class="sx-header">
        <img width="100%"  :src="data.top_pic">
        <img width="100%"  :src="data.imgs">
      </div>
      <div class="sx">
        <div v-show="item.imgs" class="content" v-for="item in data.theme_by_goods">
          <div class="image">
            <img width="100%" height="169" :src="item.imgs" @click="selectGoods(item)">
            <span class="text">{{item.desc}}</span>
          </div>
          <div class="desc">
            <span class="name">{{item.name}}</span>
            <span class="price">￥{{item.price}}
              <span class="low">元</span>
            </span>
          </div>
        </div>
        <!--<div class="bottom">-->
        <!--<span class="name">{{item.name}}</span>-->
        <!--<span class="price">{{item.price}}-->
        <!--<span class="low">元</span>-->
        <!--</span>-->
        <!--<i class="icon-shopping_cart"></i>-->
        <!--</div>-->
      </div>
    </div>

    <div class="detail-zc" v-show="data.name === '众筹'">
      <div class="zc" v-show="item.horizontal_img" v-for="item in data.theme_by_goods">
        <div class="image">
          <img @click="selectGoods(item)" width="100%" height="156" :src="item.horizontal_img">
          <span class="text">{{item.desc}}</span>
        </div>
        <div class="desc">
          <span class="name">{{item.name}}</span>
          <span class="price">￥{{item.price}}
              <span class="low">元</span>
            </span>
        </div>
      </div>
    </div>

    <div class="detail bk" ref="detailWrap" v-show="data.name === '爆款影音'">
      <div class="detail-wrap">
        <div class="bk" v-for="item in data.theme_by_goods" ref="detailOne">
          <div class="title">
            <span class="name">- {{item.title}} -</span>
          </div>
          <div class="lists-wrap">
            <div @click="selectGoods(it)" class="lists" v-show="it.imgs" v-for="(it, index) in item.theme_by_goods" :class="{'horizon' :index === 0 && it.horizontal_img}">

              <img class="horizontal" v-if="index === 0 && it.horizontal_img" width="100%" height="156"
                   :src="it.horizontal_img">
              <img v-else height="169" width="100%"
                   :src="it.imgs">

              <div class="desc" v-if="!(index === 0 && it.horizontal_img)">
                <span class="name">{{it.name}}</span>
                <span class="text">{{it.desc}}</span>
                <span class="price">{{it.price}}
                  <span class="low">元</span>
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail pz" ref="pzdetailWrap" v-show="data.name === '品质家具'">
      <div class="detail-wrap">
        <div class="bk" v-for="item in data.theme_by_goods" ref="pzdetailOne">
          <div class="title">
            <span class="name">- {{item.title}} -</span>
          </div>
          <div class="lists-wrap">
            <div @click="selectGoods(it)" class="lists" v-show="it.imgs" v-for="(it, index) in item.theme_by_goods" :class="{'horizon' :index === 0 && it.horizontal_img}" >

              <img class="horizontal" v-if="index === 0 && it.horizontal_img" width="100%" height="156"
                   :src="it.horizontal_img">
              <img v-else height="169" width="100%"
                   :src="it.imgs">

              <div class="desc" v-if="!(index === 0 && it.horizontal_img)">
                <span class="name">{{it.name}}</span>
                <span class="text">{{it.desc}}</span>
                <span class="price">{{it.price}}
                  <span class="low">元</span>
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail jk" ref="jkdetailWrap" v-show="data.name === '健康出行'">
      <div class="detail-wrap">
        <div class="bk" v-for="item in data.theme_by_goods" ref="jkdetailOne">
          <div class="title">
            <span class="name">- {{item.title}} -</span>
          </div>
          <div class="lists-wrap">
            <div @click="selectGoods(it)" class="lists" v-show="it.imgs" v-for="(it, index) in item.theme_by_goods" :class="{'horizon' :index === 0 && it.horizontal_img}">

              <img class="horizontal" v-if="index === 0 && it.horizontal_img" width="100%" height="156"
                   :src="it.horizontal_img">
              <img v-else  height="169" width="100%"
                   :src="it.imgs">

              <div class="desc" v-if="!(index === 0 && it.horizontal_img)">
                <span class="name">{{it.name}}</span>
                <span class="text">{{it.desc}}</span>
                <span class="price">{{it.price}}
                  <span class="low">元</span>
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="img_bottom" v-show="data.name === '上新'">
      <img width="100%" src="./bottomb.png">
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    data() {
      return {
        data: [],
        listHeight: [], // 定义一个数组变量,装每一个区间的高度
        scrollY: 0, // Y轴的变化
        pzlistHeight: [],
        jklistHeight: [],
      }
    },
    computed: {
        currentIndex() {
          if(this.data.name === '爆款影音') {

            for (let i = 0; i < this.listHeight.length; i++) {
              let height1 = this.listHeight[i];//0 1  1 2  2 3  3 4 4 5
              let height2 = this.listHeight[i + 1];
              if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                // console.log(height1 +' '+height2)
                // console.log(this.listHeight.length)
                return i
              }
            }
          } else if (this.data.name === '品质家具') {
            for (let i = 0; i < this.pzlistHeight.length; i++) {
              let height1 = this.pzlistHeight[i];//0 1  1 2  2 3  3 4 4 5
              let height2 = this.pzlistHeight[i + 1];
              if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                //console.log(height1 +' '+height2)
                //console.log(this.listHeight.length)
                return i
              }
            }
          } else if (this.data.name === '健康出行') {
            for (let i = 0; i < this.jklistHeight.length; i++) {
              let height1 = this.jklistHeight[i];//0 1  1 2  2 3  3 4 4 5
              let height2 = this.jklistHeight[i + 1];
              if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                return i
              }
            }
          }
        return 0
      }
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      selectItem(index) {
        //console.log(index)
        //爆款影音
        let detailOne = this.$refs.detailOne;
        let el = detailOne[index];
        this.detailScroll.scrollToElement(el, 300)
        //爆款影音

        //品质家具
        let pzdetailOne = this.$refs.pzdetailOne;
        let pzel = pzdetailOne[index];
        this.pzdetailScroll.scrollToElement(pzel, 300)
        //品质家具

        //健康出行
        let jkdetailOne = this.$refs.jkdetailOne;
        let jkel = jkdetailOne[index];
        this.jkdetailScroll.scrollToElement(jkel, 300)
        //健康出行
      },

      // 跳转到商品详情页
      selectGoods(item) {
        this.dataHub.goodsData = item;
        this.dataHub.showTag = true;
        this.$router.push({
          path: '/goods',
        })
      },
      // 跳转到商品详情页

      //初始化
      _initScroll() {
        this.detailScroll = new BScroll(this.$refs.detailWrap, {
          click: true,
          probeType: 3
        });
        this.detailScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)) // 实时变化的Y值的位置
          //console.log(this.scrollY)
        });

        //品质家具
        this.pzdetailScroll = new BScroll(this.$refs.pzdetailWrap, {
          click: true,
          probeType: 3
        });
        this.pzdetailScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)) // 实时变化的Y值的位置
          //console.log(this.scrollY)
        });
        //品质家具

        //健康出行
        this.jkdetailScroll = new BScroll(this.$refs.jkdetailWrap, {
          click: true,
          probeType: 3
        });
        this.jkdetailScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)) // 实时变化的Y值的位置
          // console.log(this.scrollY)
        });
        //健康出行
        // console.log(this.jkdetailScroll)
      },

      _calculateHeight() {

        let detailWrap = this.$refs.detailWrap;
        let detailOne = this.$refs.detailOne;
        let height = 0; // 定义一个临时变量
        this.pzlistHeight.push(height) //品质家具
        this.jklistHeight.push(height) //健康出行
        this.listHeight.push(height); // 第一个区间的高度

        //品质家具
        let pzdetailWrap = this.$refs.pzdetailWrap;
        let pzdetailOne = this.$refs.pzdetailOne;
        //console.log(pzdetailOne)
        for (let i = 0; i < pzdetailOne.length; i++) {
          let item = pzdetailOne[i]; // 获得每一个foodsList
          height = height + item.clientHeight; // clientHeight:当前视口的高度 // 获得每一个foodsList高度(一个高度累加过程,例: [0,300, 380(当前的height+前一个height), 420,])
          this.pzlistHeight.push(height)
        }
        //品质家具

        //健康出行
        let jkdetailWrap = this.$refs.jkdetailWrap;
        let jkdetailOne = this.$refs.jkdetailOne;
        for (let i = 0; i < jkdetailOne.length; i++) {
          let item = jkdetailOne[i]; // 获得每一个foodsList
          //console.log(item)
          height = height + item.clientHeight; // clientHeight:当前视口的高度 // 获得每一个foodsList高度(一个高度累加过程,例: [0,300, 380(当前的height+前一个height), 420,])
          //console.log(height)
          this.jklistHeight.push(height)
        }
        //健康出行


        for (let i = 0; i < detailOne.length; i++) {
          let item = detailOne[i]; // 获得每一个foodsList
          height = height + item.clientHeight; // clientHeight:当前视口的高度 // 获得每一个foodsList高度(一个高度累加过程,例: [0,300, 380(当前的height+前一个height), 420,])
          //console.log(height)
          this.listHeight.push(height)
        }

        let topWrap = this.$refs.topWrap.clientHeight;
        detailWrap.style.height = window.screen.height - topWrap  + 'px' //爆款影音
        pzdetailWrap.style.height = window.screen.height - topWrap  + 'px'   //品质家具
        jkdetailWrap.style.height = window.screen.height - topWrap  + 'px'   //健康出行
        //console.log(topWrap + ' ' + detailWrap.style.height + ' ' + window.screen.height )
      },

    },
    created() {
      if (!this.dataHub.menuData) {
        this.$router.push({
          path: '/index'
        });
        return
      }
      this.data = this.dataHub.menuData; //获取来自menu的信息
      // console.log(this.data)
      //console.log(this.data)
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight()
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .back
    position: absolute
    top: 2 px
    left: 5px
    z-index: 100
    background-color: rgba(210, 210, 210, 0.8)
    border-radius: 50%
  .detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    width: 100%
    background-color: white
    overflow: scroll
    -webkit-overflow-scrolling: touch
    &::-webkit-scrollbar
      display none
    .top
      display: inline-flex
      align-items: center
      justify-content: center
      white-space: nowrap
      position: fixed
      top: 0
      left: 0
      right: 0
      z-index: 10
      background-color: rgb(246, 246, 246)
      //margin-bottom: 34px
      //overflow: scroll
      //&::-webkit-scrollbar
      //display none
      .top-wrap
        flex: 1
        text-align: center
        .title
          display: block
          padding: 6px 5px 6px
          border-radius: 3px
          font-size: 12px
          margin: 5px
          &.active
            color: rgb(255, 255, 255)
            background-color: rgb(205, 49, 61)
          &.first
            margin: 6px
    .detail-sx
      width: 100%
      .sx
        display: flex
        flex-flow: row wrap
        justify-content: space-between
        padding: 0 10px
        .content
          display: flex
          flex-direction: column
          width: 49%
          .image
            width: 100%
            .text
              display: block
              width: 100%
              background-color: #f5f2f0
              line-height: 26px
              color: #666
              font-size: 12px
              text-overflow: ellipsis
              overflow: hidden
              white-space: nowrap
          .desc
            display: flex
            flex-direction: column
            .name
              display: block
              width: 100%
              text-overflow: ellipsis
              overflow: hidden
              white-space: nowrap
              margin-bottom: 3px
              color: #333
              font-size: 13px
              line-height: 19px
            .price
              display: inline-block
              font-size: 18px
              margin-right: 3px
              color: #eb5800
              height: 32px
              .low
                font-size: 10px

    .detail-zc
      width: 100%
      .zc
        width: 100%
        .image
          position: relative
          .text
            position: absolute
            bottom: 0
            left: 0
            width: 100%
            background-color: rgba(0, 0, 0, .5)
            line-height: 30px
            color: #fff
            font-size: 12px
            text-overflow: ellipsis
            overflow: hidden
            white-space: nowrap
        .desc
          display: flex
          flex-direction: column
          margin-top: 10px
          margin-left: 5px
          .name
            display: block
            width: 100%
            text-overflow: ellipsis
            overflow: hidden
            white-space: nowrap
            margin-bottom: 3px
            color: #333
            font-size: 14px
            line-height: 19px
          .price
            display: inline-block
            font-size: 18px
            margin-right: 3px
            color: #eb5800
            height: 32px
            .low
              font-size: 12px
    .detail
      position: fixed
      top: 36px
      left: 0
      bottom: 0
      width: 100%
      //margin-top: 34px
      .detail-wrap
        padding-bottom: 400px
      .bk
        width: 100%
        display: flex
        flex-direction: column
        .title
          display: flex
          align-item: center
          justify-content: center
          padding: 15px 0 10px 0
          .name
            color: #333
            font-size: 14px
        .lists-wrap
          display: flex
          flex-direction: row
          flex-flow: wrap
          .lists
            display: flex
            flex-direction: column
            width: 45%
            margin: 0 7px 0 9px
            &.horizon
              width: 100%
              margin: 0
            .desc
              display: flex
              flex-direction: column
              background-color: rgb(246, 246, 246)
              padding: 3px 0 3px 6px
              .text
                width: 100%
                //background-color: rgba(0, 0, 0, .5)
                //color: #fff
                color: #888
                font-size: 12px
                line-height: 18px
                text-overflow: ellipsis
                overflow: hidden
                white-space: nowrap
              .name
                display: block
                width: 100%
                text-overflow: ellipsis
                overflow: hidden
                white-space: nowrap
                margin-bottom: 3px
                color: #333
                font-size: 13px
                line-height: 19px
              .price
                display: inline-block
                font-size: 18px
                margin-right: 3px
                line-height: 30px
                color: #eb5800
                height: 32px
                .low
                  font-size: 10px

  /* .sx
     width: 100%
     overflow: hidden
     display: flex
     flex-flow: row wrap
     align-items: center
     .one
       width: 49.7%
       border-top:
       &:first, &:nth-first-child(2)
         border: none
       &.border
         border-right: 2px solid #eb66005c

   .bk
     width: 100%
     overflow: hidden
     //display: flex
     flex-flow: row wrap
     align-items: center
     .one-content
       display: flex
       flex-flow: row wrap
       align-items: center
       position: relative
       .title
         display: flex
         align-items: center
         justify-content: center
         border-top: 10px solid rgba(0, 0, 0, 0.1)
         //line-height: 20px
         padding: 10px 0
         width: 100%
         .name
           color: #333
           font-size: 14px
           line-height: 20px
       .one
         //width: 49.7%
         display: flex
         flex-flow: row wrap
         border-top: 1px solid rgba(0, 0, 0, 0.2)
         &.border
           border-right: 2px solid rgba(0, 0, 0, 0.2)
*/

</style>
