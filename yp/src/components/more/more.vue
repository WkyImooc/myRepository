<template>
  <div class="more">
    <more-header></more-header>
    <div class="more-content">
      <img width="100%" class="first" src="./k.png">
      <div class="second">
        <img width="49.8%"  class="left" src="./a.png">
        <img width="49.8%" class="right" src="./a.png">
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import MoreHeader from 'base/more-header/more-header'
  export default {
    components: {
      MoreHeader
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .more-content
    width: 100%
    .first
      display: block
      margin-bottom: 1px
    .second
      display: flex
      flex-direction: row
      justify-content: space-between
      height: 145px
</style>
