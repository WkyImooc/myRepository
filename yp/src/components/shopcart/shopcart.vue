<template>
  <div class="shopcart">
    <div class="shopcart-header">
      <img @click="back" class="image" width="39" height="48" src="./left.png"/>
      <span class="title">购物车</span>
      <span @click="selectEdit" v-show="edit && goods.length" class="edit">编辑</span>
      <span @click="selectEdit" v-show="finish && goods.length" class="edit">完成</span>
    </div>
    <div v-show="!user" class="shopcart-content">
      <div class="null">
        <img width="91" class="85" src="./null.png">
        <div class="desc">
          <span class="title">登录后才能看到购物车商品哦 ~</span>
          <span class="login" @click="selectLogin">立即登录</span>
        </div>
      </div>
    </div>
    <div v-show=" user && !goods.length" class="shopcart-content">
      <div class="null">
        <img width="91" class="85" src="./cart.png">
        <div v-show="user" class="desc">
          <span class="title">购物车还没有商品哦 ~</span>
          <span class="login" @click="selectGo">去逛逛</span>
        </div>
      </div>
    </div>
    <div v-show="user && goods.length" class="shopcart-content">
      <!--<div class="header">-->
        <!--<div class="left">-->
          <!--<img @click="selectAll" class="circle" width="18" height="18"-->
               <!--:src="selectedAll?'/static/selected.png':'/static/circle.png'">-->
          <!--<span class="text">有品配送</span>-->
        <!--</div>-->
        <!--<div class="right" v-show="free">-->
          <!--<img class="circle" width="15" height="15" src="./circleshopcart.png">-->
          <!--<img v-show="edit" class="circle" width="17" height="17" src="./selected.png"-->
          <!--<span class="right-text">满99.00元免运费</span>-->
        <!--</div>-->
      <!--</div>-->
      <div v-for="(item,index) in goods" :key="item.id" v-show="item.state === 1" class="content">
        <img @click="select(index,item)" class="circle" width="18" height="18"
             :src="item['selected']?'/static/selected.png':'/static/circle.png'">
        <div class="desc">
          <img class="pic" width="80" height="80" :src="item.bygoods['imgs']">
          <div class="desc-content">
            <h2 class="title">{{item['bygoods']['name'] + '&nbsp&nbsp' + item['color'] + '&nbsp&nbsp' + item['spec'] + '&nbsp&nbsp' + item['size']}}</h2>
            <div class="price">小计: {{item.bygoods['price']}}.00元</div>
            <div class="prices">
              <span class="price-a">￥{{item.bygoods['price']}}</span>
              <div class="count">
                <img @click="minus(item)" width="24" height="24" src="./minus.png">
                <span class="num">{{item.num}}</span>
                <img @click="add(item)" width="24" height="24" src="./count.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-show="edit">
        <div class="left">
          <div class="all-select">
            <img @click="selectAll" class="circle" width="18" height="18"
                 :src="selectedAll?'/static/selected.png':'/static/circle.png'">
            <span class="text">全选</span>
          </div>
          <div class="total">
            <span class="text">合计 : </span>
            <span class="total-price">￥{{total}}</span>
          </div>
        </div>
        <div class="right">
          <span class="name">去结算</span>
        </div>
      </div>
      <div class="bottom delete" v-show="finish">
        <div class="left">
          <div class="all-select">
            <img @click="selectAll" class="circle" width="18" height="18"
                 :src="selectedAll?'/static/selected.png':'/static/circle.png'">
            <span class="text">全选</span>
          </div>
        </div>
        <div class="right">
          <span @click="del" class="name">删除所选</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getLocalStroge, setLocalStroge} from "../../common/js/localStore";
  import axios from 'axios'
  import {rootUrl} from "../../common/js/config";

  export default {
    data() {
      return {
        goods: [],
        selectedAll: false,
        edit: true,
        finish: false,
        free: true,
        num: '1',
        user: null,
      }
    },
    created() {
      this.user = getLocalStroge('user', 'json');
      this.getCart()
    },
    computed: {
      total() {
        let price = 0;
        for (let i = 0; i < this.goods.length; i++) {
          if (this.goods[i]['selected']) {
            price += this.goods[i].bygoods.price * this.goods[i].num
          }
        }
        return price
      }
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      selectLogin() {
        this.$router.push({
          path: 'log'
        })
      },
      selectGo () {
        this.$router.push({
          path: 'index'
        })
      },
      selectEdit() {
        this.edit = !this.edit;
        this.free = !this.free;
        this.finish = !this.finish;
        for (let i = 0; i < this.goods.length; i++) {
          this.goods[i]['selected'] = false
        }
      },
      del() {
        let ids = []
        for (let i = 0; i < this.goods.length; i++) {
          if (this.goods[i]['selected']) {
            this.goods[i]['state'] = -1;
            ids.push(this.goods[i].id)
          }
        }
        //console.log(ids)
        this.del_cart(ids)
      },
      add(item) {
        this.numChange('add', item)
      },
      minus(item) {
        if (item.num > 1)
          this.numChange('cat', item)
      },

      select(index, item) {
        item['selected'] = !item['selected']
        /*let goods = item
        goods['selected'] = !goods['selected']
        this.$set(this.goods, index, goods)*/

      },
      selectAll() {
        for (let i = 0; i < this.goods.length; i++) {
          if (this.selectedAll) {
            this.goods[i]['selected'] = false
          } else {
            this.goods[i]['selected'] = true
          }
        }
        this.selectedAll = !this.selectedAll
      },

      /**
       * 数量自增,或自减
       * @param type
       * @param id
       */
      numChange(type, item) {
        let count = 0;
        let url = rootUrl + '/YouPin/public/index.php/cartManage'
        let param = null
        if (type === 'add') {
          param = {
            manage_type: 'inc',
            data: {
              id: item.id
            }
          }
          count = ++item['num'];
        }
        else if (type === 'cat') {
          param = {
            manage_type: 'dec',
            data: {
              id: item.id
            }
          }
          count = --item['num'];
        }
        item['num'] = count

        axios.post(url, param).then(res => {
          if (res.data.status === 1) {
              item.num = count
          } else {
            alert('err')
          }
        }).catch(res => {
          console.log(res)
        })

      },

      /**
       * 删除购物车商品
       */
      del_cart(ids) {
        let url = rootUrl + '/YouPin/public/index.php/cartManage'
        let param = null
        ids.forEach(id => {
          param = {
            manage_type: 'delete',
            data: {
              id: id
            }
          }
          axios.post(url, param).then(res => {
          })
          this.goods.forEach((item, index)=>{
            if(item.id === id){
              this.goods.splice(index,1)
            }
          })
        })
      },

      /**
       * 初始化数据
       */
      getCart() {
        let url = rootUrl + '/YouPin/public/index.php/getCartInfo?user_id=' + this.user.id
        axios.get(url).then(res => {
          let data = res.data
          //console.log(res.data)
          if (data.status === 1) {
            /*let arr = data.data
            for (let i=0;i<arr.length;i++){
              arr[i]['selected'] = false
            }*/
            this.goods = data.data
            let shopcartnum = this.goods.length
            setLocalStroge('shopcartnum',shopcartnum)
            // console.log(this.goods)
            //alert(data.message)
          } else if (data.status === 0) {
            alert(data.message)
          }
        }).catch(res => {
          console.log(res)
        })
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    top: 0
    left: 0
    bottom: 0
    width: 100%
    z-index: 20
    .shopcart-header
      display: flex
      align-items: center
      justify-content: center
      height: 45px
      position: relative
      border-bottom: 1px solid rgb(191, 191, 192)
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
      .edit
        position: absolute
        right: 0
        padding: 6px 12px 2px 12px
        height: 12px
        background-color: rgba(0, 0, 0, 0.04)
        font-size: 12px

    .shopcart-content
      position: fixed
      top: 46px
      left: 0
      overflow: scroll
      background-color: rgb(243, 243, 243)
      width: 100%
      height: 100%
      .null
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        //border-tops: 1px solid rgb(191, 191, 192)
        width: 100%
        height: 148px
        background-color: rgb(250, 250, 250)
        //z-index: 100
        .desc
          display: flex
          flex-direction: column
          margin-left: 25px
          .title
            font-size: 14px
            color: rgb(152, 131, 120)
            margin-bottom: 12px
          .login
            display: flex
            align-items: center
            justify-content: center
            width: 77px
            height: 23px
            font-size: 14px
            color: white
            background-color: rgb(226, 115, 104)

      .header
        background-color: white
        height: 42px
        padding: 0 15px
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid rgb(191, 191, 192)
        .left, .right
          display: flex
          flex-direction: row
          align-items: center
          .text
            color: rgb(51, 51, 51)
            font-size: 13px
          .circle
            margin-right: 3px
        .right
          .right-text
            font-size: 12px
            color: rgb(153, 153, 153)
      .content
        display: flex
        flex-direction: row
        padding: 0 18px 0 15px
        align-items: center
        //justify-content: center
        background-color: white
        .desc
          flex: 1
          display: flex
          //align-items: center
          //justify-content: center
          margin-left: 10px
          padding: 13px 0
          .pic
            border: 1px solid rgb(230, 230, 230)
            margin-right: 5px
          .desc-content
            flex: 1
            .title
              font-size: 13px
              color: rgb(51, 51, 51)
              line-height: 17px
            .price
              font-size: 12px
              color: rgb(153, 153, 153)
              line-height: 14px
              margin: 5px 0
            .prices
              display: flex
              flex-direction: row
              align-items: center
              justify-content: space-between
              .price-a
                font-size: 15px
                color: rgb(182, 9, 9)
                line-height: 18px
              .count
                width: 120px
                display: flex
                align-items: center
                justify-content: space-between
                border: 1px solid rgb(191, 191, 192)
                flex-direction: row

    .bottom
      position: fixed
      bottom: 0
      left: 0
      height: 54px
      display: flex
      flex-direction: row
      background-color: white
      align-items: center
      width: 100%
      .left
        flex: 0 0 275px
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        margin-right: 3px
        .all-select
          display: flex
          flex-direction: row
          padding-left: 20px
          align-items: center
          .circle
            margin-right: 8px
          .text
            font-size: 13px
        .total
          font-size: 12px
          .total-price
            color: rgb(182, 9, 9)
      .right
        display: flex
        align-items: center
        justify-content: center
        width: 100px
        height: 54px
        //margin-left: 3px
        background-color: rgb(182, 9, 9)
        .name
          color: white
          font-size: 13px
</style>
