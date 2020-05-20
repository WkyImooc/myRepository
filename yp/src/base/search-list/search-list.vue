<template>
  <div class="search-list">
    <ul>
      <li class="list"></li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import Search from 'base/search/search'

  export default {
    components: {
      Search
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      back() {
        this.detailShow = false
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .detail-wrap
    display: flex
    flex-direction: row
    align-items: center
    height: 45px
    padding: 0 15px
    .icon-back
      flex: 0 0 39px
      width: 39px
    .search-w
      flex: 1
    .text
      padding-left: 20px
      color: rgb(102, 102, 102)
      font-size: 13px

</style>
