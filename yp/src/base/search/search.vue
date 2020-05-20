<template>
  <div class="search" ref="search">

    <div class="search-header" ref="search_header">
      <img width="39" height="48" class="icon-back" src="./left.png" @click="back">
      <div class="search-box">
        <img width="17" height="17" class="icon-search" src="./home_search.png">
        <input v-model="query" class="box" placeholder="Redmi K30 Pro"/>
        <img @click="clear" v-show="query" width="17" height="17" src="./error.png" class="icon-dismiss">
      </div>
      <span class="text">搜索</span>
    </div>

    <div class="search-hot">
      <span class="title">热门搜索</span>
      <ul class="list-wrapper">
        <li @click="hotSearch" class="lists" v-for="(item, index) in lists" :class="'lists' + index">{{item.desc}}</li>
      </ul>
    </div>

    <ul class="showDetail" v-show="data.length" ref="show">
      <li class="lists" v-for="item in data" @click="goods(item)">
        <span class="list">{{item.name}}</span>
      </li>
    </ul>
   <!-- <div class="history">
      <div class="title">
        <span class="name" style="display: block">历史记录</span>
        <img width="12" height="12" src="./empty_all.png">
      </div>
      <div class="content">
        <span class="name"></span>
      </div>
    </div>-->
  </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {rootUrl} from "../../common/js/config";

  export default {
    props: {
      placeholder: {
        type: String,
        default: 'Redmi K30 Pro'
      },
    },
    data() {
      return {
        query: '',
        // detailShow: true,
        data: {
          default: []
        },
        lists: [
          {
            desc: 'Ticwatch'
          },
          {
            desc: 'Redmi'
          },
          {
            desc: '手环'
          },
          {
            desc: 'Note3'
          },
          {
            desc: 'MIX'
          },
          {
            desc: '洗衣机'
          },
          {
            desc: 'adolbook'
          },
          {
            desc: '电视'
          },
          {
            desc: '笔记本'
          },
        ], //热门搜索默认数据
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.show.style.height = window.screen.height - this.$refs.search_header.clientHeight + 'px';
      })
    },
    methods: {
      back () {
        this.$refs.search.style['display'] = 'none'
      },
      clear() {
        this.query = '';
        this.data = []
      },
      hotSearch (event) {
        let name = event.target.innerText
        this.query = name;
      },
      goods(item) {
        this.dataHub.goodsData = item;
        this.$router.push(
          {
            path: '/goods'
          }
        )
      }
    },
    watch: {
      query(name, old_name) {
        if (name === '') {
          return
        }
        let url = rootUrl + '/YouPin/public/index.php/search'
        let param = {
          name: name
        };
        //console.log(param);
        axios.post(url, param).then((res) => {
          // console.log(res)
          if (res.data.status = 1) {
            this.data = res.data.data;
          } else if (res.data.status = 0) {
            alert(res.data.message);
          }
        }).catch(function (err) {
          alert(err);
        })
      }
    }

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .search
    display: flex
    flex-direction: column
    .search-header
      display: flex
      flex-direction: row
      align-items: center
      .search-box
        position: relative
        display: flex
        flex: 1
        flex-direction: row
        align-items: center
        height: 30px
        background-color: rgb(244, 244, 244)
        .icon-search
          color: rgb(204, 204, 204)
          margin: 0 3px 0 9px
        .box
          font-size: 16px
          background-color: rgb(244, 244, 244)
          color: rgb(204, 204, 204)
          border: none
          outline: medium
          caret-color: rgb(204, 204, 204)
        .icon-dismiss
          position: absolute
          right: 8px

      .text
        margin: 0 10px
        font-size: 13px
        color: rgb(102, 102, 102)
    .search-hot
      padding: 0 15px
      .title
        display: inline-block
        margin: 18px 0 10px
        font-size: 13px
        color: rgb(153, 153, 153)
      .lists
        display: inline-block
        margin: 0 10px 10px 0
        font-size: 13px
        color: rgb(103, 103, 103)
        padding: 8px
      .lists0
        background-color: rgb(235, 242, 251)
      .lists1
        background-color: rgb(250, 246, 236)
      .lists2
        background-color: rgb(250, 242, 231)
      .lists3
        background-color: rgb(244, 249, 239)
      .lists4
        background-color: rgb(255, 230, 230)
      .lists5
        background-color: rgb(235, 242, 251)
      .lists6
        background-color: rgb(252, 255, 237)

    .showDetail
      overflow: scroll
      width: 100%
      position: fixed
      background-color: white
      top: 50px
      left: 0
      &::-webkit-scrollbar
        display: none
      .lists
        display: flex
        align-items: center
        padding: 0 17px
        height: 42px
        border-bottom: 1px solid rgba(0, 0, 0, 0.05)
        .list
          font-size: 13px
          color: rgba(0, 0, 0, 0.9)
</style>
