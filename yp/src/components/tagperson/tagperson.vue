<template>
  <div class="tag">
    <router-link v-for="(item) in tag" tag="div" class="content" :to="item.path">
      <img class="image" width="38" height="38" src="./personal_icon_assets.png">
      <span class="text">{{item.name}}</span>
    </router-link>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        tag: [
          {
            path: '/power',
            name: '我的资产'
          },
          {
            path: '/collection',
            name: '我的收藏'
          },
          {
            path: '/address',
            name: '地址管理'
          },
          {
            path: '/news',
            name: '消息中心'
          },
        ]
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
