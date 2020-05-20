<template>
  <div id="app">
    <tag></tag>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tag from 'components/tag/tag'
  export default {
    components: {
      Tag
    },
    data () {
      return {

      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
