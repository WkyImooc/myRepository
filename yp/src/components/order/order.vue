<template>
    <div class="order">
      <div class="order-header">
        <img @click="back" width="40" height="40" src="./left.png">
        <span class="name">我的订单</span>
      </div>
      <div class="order-tab">
        <span class="tab"></span>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          tab: [
            {
              name: '全部订单'
            },

          ]
        }
      },
      methods: {
        back () {
          this.$router.go(-1);
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .order
    position: fixed
    top: 0
    bottom: 0
    left: 0
    width: 100%
    background-color: white
    .order-header
      display: flex
      flex-direction: row
      align-items: center


</style>
