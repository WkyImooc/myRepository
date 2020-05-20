<template>
  <div class="menu-pz">
    <div>
      <div ref="topWrap" class="top" v-show="data.name !== '上新' && data.name !== '众筹'">
      <div class="top-wrap" v-for="(item, index) in data.theme_by_goods" @click="selectItem(index)">
        <span class="title" :class="{'active' :currentIndex === index, 'first' :index ===0}">{{item.title}}</span>
      </div>
    </div>
    </div>
  <div class="detail pz" ref="detailWrap" v-show="data.name === '品质家具'">
    <div class="detail-wrap">
      <div class="bk" v-for="item in data.theme_by_goods" ref="detailOne">
        <div class="title">
          <span class="name">- {{item.title}} -</span>
        </div>
        <div class="lists-wrap">
          <div @click="selectGoods(it)" class="lists" v-show="it.imgs" v-for="(it, index) in item.theme_by_goods">

            <img class="horizontal" v-if="index === 0 && it.horizontal_img" width="100%" height="156"
                 :src="it.horizontal_img">
            <img v-else width="169" height="169"
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
        //pzlistHeight: []
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];//0 1  1 2  2 3  3 4 4 5
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    methods: {
      selectItem(index) {
        //console.log(index)
        //爆款影音
        let detailOne = this.$refs.detailOne;
        let el = detailOne[index];
        this.detailScroll.scrollToElement(el, 300)
        //爆款影音

        // //品质家具
        // let pzdetailOne = this.$refs.pzdetailOne;
        // let pzel = pzdetailOne[index];
        // this.pzdetailScroll.scrollToElement(pzel, 300)
        // //品质家具
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

        // //品质家具
        // this.pzdetailScroll = new BScroll(this.$refs.pzdetailWrap, {
        //   click: true,
        //   probeType: 3
        // });
        // this.pzdetailScroll.on('scroll', (pos) => {
        //   this.scrollY = Math.abs(Math.round(pos.y)) // 实时变化的Y值的位置
        //   //console.log(this.scrollY)
        // });
        // //品质家具

      },

      _calculateHeight() {

        let detailWrap = this.$refs.detailWrap;
        let detailOne = this.$refs.detailOne;

        // //品质家具
        // let pzdetailWrap = this.$refs.pzdetailWrap;
        // let pzdetailOne = this.$refs.pzdetailOne;
        // for (let i = 0; i < pzdetailOne.length; i++) {
        //   let item = pzdetailOne[i]; // 获得每一个foodsList
        //   //console.log(item)
        //   height = height + item.clientHeight; // clientHeight:当前视口的高度 // 获得每一个foodsList高度(一个高度累加过程,例: [0,300, 380(当前的height+前一个height), 420,])
        //   //console.log(height)
        //   this.pzlistHeight.push(height)
        // }
        // //品质家具

        let height = 0; // 定义一个临时变量
        // this.pzlistHeight.push(height)
        this.listHeight.push(height); // 第一个区间的高度

        for (let i = 0; i < detailOne.length; i++) {
          let item = detailOne[i]; // 获得每一个foodsList
          height = height + item.clientHeight; // clientHeight:当前视口的高度 // 获得每一个foodsList高度(一个高度累加过程,例: [0,300, 380(当前的height+前一个height), 420,])
          //console.log(height)
          this.listHeight.push(height)
        }

        let topWrap = this.$refs.topWrap.clientHeight;
        detailWrap.style.height = window.screen.height - topWrap  + 'px' //爆款影音
        // pzdetailWrap.style.height = window.screen.height - topWrap  + 'px'   //品质家具
        //console.log(topWrap + ' ' + detailWrap.style.height + ' ' + window.screen.height )
      },

    },
    created() {
      if (!this.dataHub.menuData) {
        this.$router.push('/index');
        return
      }
      this.data = this.dataHub.menuData; //获取来自menu的信息
      console.log(this.data)
      //console.log(this.data)
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight()
      })
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .menu-pz
    position: fixed
    //z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    width: 100%
    background-color: white
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
    .detail
      position: fixed
      top: 36px
      left: 0
      bottom: 0
      width: 100%
      //margin-top: 34px
      .detail-wrap
        padding-bottom: 100px
      .bk
        width: 100%
        display: flex
        flex-direction: column
        .title
          display: flex
          align-items: center
          justify-content: center
          padding: 15px 0 10px 0
          .name
            color: #333
            font-size: 14px
        .lists-wrap
          display: flex
          flex-direction: row
          flex-flow: row wrap
          .lists
            display: flex
            flex-direction: column
            .desc
              display: flex
              flex-direction: column
              background-color: rgb(246, 246, 246)
              padding: 3px 0 3px 6px
              .text
                width: 181px
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
                width: 169px
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

</style>
