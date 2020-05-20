<template>
    <div>
      <ul class="more-content">
        <li class="inline" v-for="item in list">
          <div class="inline-content">
            <div class="text">
              <h2 class="name">{{item.name}}</h2>
              <span class="price">￥{{item.price}}</span>
            </div>
            <img width="100%" height="145px" src="./zc.png" :class="{'border' : border}">
          </div>
        </li>
      </ul>
    </div>
</template>
<script type="text/ecmascript-6">
  // import MoreHeader from 'base/more-tops/more-tops'
    export default {
    components: {
      // MoreHeader
    },
      data () {
        return {
          list: [
            {
              name: '须眉四刀头剃须刀(往复式)',
              price: '269'
            },
            {
              name: '须眉四刀头剃须刀(往复式)',
              price: '269'
            }
          ]
        }
      },
      props: {
        border: {
          type: Boolean,
          default: true
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .more-content
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    .inline
      width: 49.8%
      position: relative
      .text
        position: absolute
        top: 20px
        left: 10px
        .name
          font-size: 12px
          color: rgb(51, 51, 51)
        .price
          font-size: 14px
          color: rgb(192, 67, 67)

      img
        &.border
          border-bottom: solid 2px rgb(246, 143, 12)
</style>
