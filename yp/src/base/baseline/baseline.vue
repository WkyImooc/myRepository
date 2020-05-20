<template>
  <div class="baseline">
      <span class="border"></span>
      <span class="text">底线在此,不能更低了</span>
      <span class="border"></span>
    <!--<div class="power">-->
     <!--<span class="text">Copyright © 小米通讯技术有限公司 版权所有</span>-->
     <!--<span class="phone">京IC备17028681号-1 联系电话: 010-60606666</span>-->
    <!--</div>-->
    <!--.power-->
    <!--display: flex-->
    <!--align-items: center-->
    <!--justify-content: center-->
    <!--flex-direction: column-->
    <!--padding: 10px 0-->
    <!--.text, .phone-->
    <!--color: rgb(153, 153, 153)-->
    <!--font-size: 13px-->
    <!--.phone-->
    <!--margin-top: 6px-->
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .baseline
    display: flex
    align-items: center
    justify-content: center
    border-bottom: 1px solid rgb(211, 211, 211)
    font-size: 0
    width: 100%
    height: 160px
    background-color: rgb(242, 242, 242)
    .border
      height: 1px
      width: 50px
      background-color: rgb(211, 211, 211)
    .text
      color: rgb(153, 153, 153)
      margin: 0 6px
      font-size: 13px

</style>
