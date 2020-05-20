<template>
  <div class="grade">
    <div class="grade-header">
      <h1 class="title">品位</h1>
    </div>
    <div class="grade-wrap">
      <ul class="grade-content">
        <li class="content" v-for="item in grades">
          <img class="image" width="361" height="197" src="./k.png">
          <div class="desc">
            <span class="title">{{item.title}}</span>
            <span class="middle">{{item.middle}}</span>
            <span class="bottom">{{item.bottom}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        grades: [
          {
            title: '每个时尚男生衣柜里少不了它',
            middle: '有女朋友的更要多买几件哦',
            bottom: '去发现'
          },
          {
            title: '每个时尚男生衣柜里少不了它',
            middle: '有女朋友的更要多买几件哦',
            bottom: '去发现'
          },
          {
            title: '每个时尚男生衣柜里少不了它',
            middle: '有女朋友的更要多买几件哦',
            bottom: '去发现'
          },
          {
            title: '每个时尚男生衣柜里少不了它',
            middle: '有女朋友的更要多买几件哦',
            bottom: '去发现'
          },
          {
            title: '每个时尚男生衣柜里少不了它',
            middle: '有女朋友的更要多买几件哦',
            bottom: '去发现'
          },
          {
            title: '每个时尚男生衣柜里少不了它',
            middle: '有女朋友的更要多买几件哦',
            bottom: '去发现'
          },
          {
            title: '每个时尚男生衣柜里少不了它',
            middle: '有女朋友的更要多买几件哦',
            bottom: '去发现'
          },
          {
            title: '每个时尚男生衣柜里少不了它',
            middle: '有女朋友的更要多买几件哦',
            bottom: '去发现'
          }
        ]
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .grade-header
    display: flex
    align-items: center
    justify-content: center
    height: 45px
    padding: 0 45px
    border-bottom: 1px solid rgb(191, 191, 192)
  .grade-wrap
    position: fixed
    width: 100%
    top: 46px
    bottom: 50px
    .grade-content
      width: 100%
      height: 100%
      overflow: scroll
      -webkit-overflow-scrolling : touch
      &::-webkit-scrollbar
        display none
      .content
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        width: 100%
        border-bottom: 4px solid rgb(191, 191, 192)
        .image
          flex: 1
          padding: 10px 7px 0 7px
        .desc
          flex: 1
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          width: 100%
          margin-top: 20px
          .title
            color: rgb(51, 51, 51)
            font-size: 16px
            line-height: 20px
          .middle
            font-size: 13px
            margin-top: 12px
            line-height: 14px
            color: rgb(153, 153, 153)
          .bottom
            display: flex
            align-items: center
            justify-content: center
            width: 66px
            height: 27px
            font-size: 13px
            background-color: rgb(209, 191, 167)
            border-radius: 2px
            margin-top: 15px
            margin-bottom: 22px
            color: rgb(255, 255, 255)


</style>
