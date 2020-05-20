<template>
  <div class="three-c">
    <ul>
      <li class="three">
        <div class="left">
          <div class="text">
            <h2 class="name">须眉四刀头剃须刀(往复式)</h2>
            <span class="price">￥298</span>
          </div>
          <img width="100%" height="292px" src="./c.png">
        </div>
        <div class="right">
          <div class="text">
            <h2 class="name">须眉四刀头剃须刀(往复式)</h2>
            <span class="price">￥298</span>
          </div>
          <img width="100%" height="145px" src="./zc.png">
          <div class="text1">
            <h2 class="name">须眉四刀头剃须刀(往复式)</h2>
            <span class="price">￥298</span>
          </div>
          <img width="100%" height="145px" src="./zc.png">
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import GoldBorder from 'base/gold-border/gold-border'
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 .three
    display: flex
    flex-direction: row
    justify-content: space-between
    width: 100%
    .right, .left
      width: 49.8%
      height: 292px
      position: relative
      .text
        position: absolute
        top: 20px
        left: 15px
        .name
          font-size: 12px
          color: rgb(51, 51, 51)
        .price
          font-size: 14px
          color: rgb(192, 67, 67)
      .text1
        position: absolute
        top: 165px
        left: 15px
        .name
          font-size: 12px
          color: rgb(51, 51, 51)
        .price
          font-size: 14px
          color: rgb(192, 67, 67)


</style>
