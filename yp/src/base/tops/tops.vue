<template>
  <div class="top">
    <img @click="back" class="image" width="39" height="48" src="./left.png"/>
    <span class="title">购物车</span>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      methods: {
        back(){
          this.$router.go(-1)
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .top
    display: flex
    align-items: center
    justify-content: center
    height: 45px
    position: relative
    //border-bottom: 1px solid rgb(191, 191, 192)
    .image
      position: absolute
      left: 0
    .title
      display: flex
      align-items: center
      justify-content: center
      height: 45px
      color: rgb(51, 51, 51)
      //vertical-align: center
      font-size: 16px
</style>
