<template>
  <div class="common-index">
    <more-header></more-header>
    <img class="k" width="100%" src="./k.png">
    <ul class="list-content">
      <li class="list" v-for="(item, index) in lists"  :class="(index + 1) % 2 === 0 ? '' : 'border'">
        <div class="img-wrap">
          <img class="img" width="116" height="116" src="./zc.jpg">
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
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import MoreHeader from 'base/more-header/more-header'

  export default {
    components: {
      MoreHeader
    },
    data() {
      return {
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
          }
        ]
      }
    },
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .k
    display: block
  .list-content
    display: flex
    flex-flow: row wrap
    justify-content: space-between
    align-items: center
    margin-top: -1px
    width: 100%
    .list
      width: 49.47%
      margin-right: 0
      &.border
        border-right: 4px solid rgb(239, 239, 239)
      .img-wrap
        text-align: center
        width: 100%
      .desc
        position: relative
        display: flex
        flex-direction: column
        height: 58px
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
            margin: 3px 0 4px 8px
            line-height: 14px
          .price
            font-size: 13px
            color: rgb(182, 9, 9)
            line-height: 14px
            margin: 0 0 3px 8px
            .slider
              vertical-align: top
              color: white
              padding: 0 2px
              font-size: 10px
              background-color: rgb(182, 9, 9)
</style>
