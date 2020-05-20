<template>
  <div class="join">
    <div class="left">
      <span class="number">6100</span><span class="word">人参与</span>
      <i class="icon-arrow_lift"></i>
    </div>
    <div class="right">
      <span class="persent">610%</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .join
    margin-top: 0
    display: flex
    align-items: center
    justify-content: space-between
    font-size: 0
    padding: 10px
    //border-tops: solid 2px rgb(246, 143, 12)
    border-right: solid 1px rgb(244, 244, 244)
    .left
      display: inline-block
      font-size: 14px
      line-height: 18px
      .number
        color: rgb(192, 67, 67)
      .word
        color: rgb(102, 102, 102)
        margin-right: 1px
      .icon-arrow_lift
        font-size: 11px
    .right
      display: inline-block
      font-size: 14px
      color: rgb(192, 67, 67)
      line-height: 18px

</style>
