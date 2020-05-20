<template>
  <div class="banner" ref="banner">
    <div class="banner-group" ref="bannerGroup">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  //import {addClass} from '../../common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'banner',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      setTimeout(()=>{
        this._initBanner();
        this._initWidth();
        this._initDot();
        if (this.autoPlay) {
          this._play()
        }
      },15000)
    },
    destroyed() {
      clearTimeout(this.timer)
    },
    methods: {
      _initWidth () {
        let banner_width = this.$refs.banner.offsetWidth
        this.children = this.$refs.bannerGroup.children;
        console.log(this.children);
        let width = 0;
        for(let i = 0; i<this.children.length; i++){
          this.children[i].style.width = banner_width + 'px';
          width += banner_width
        }
        this.$refs.bannerGroup.style.width = width + 'px';
      },
      _initBanner() {
        this.banner = new BScroll(this.$refs.banner, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop, // 循环
            threshold: 0.3,
            speed: 400 // 轮播间隔
          }
        });
        this.banner.on('scrollEnd', () => {
          let pageIndex = this.banner.getCurrentPage().pageX; // 获取页数
          this.currentPageIndex = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this._play()
          }
        })
      },
      _initDot () {
        this.dots = new Array(this.children.length - 2)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1;
        if(this.loop){
          pageIndex = pageIndex % this.dots.length
        }
        this.timer = setTimeout(() => {
          this.banner.goToPage(pageIndex, 0, 200)
        }, this.interval)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .banner
    position: relative
    overflow: hidden
    white-space: nowrap
    width 100%
    .banner-group
      /*box-sizing: border-box*/
      overflow: hidden
      text-align: center
      .banner-item
        display inline-block
        width 100%
        box-sizing: border-box
        text-align: center
        .needsclick
          display: block
          width: 100%
</style>
