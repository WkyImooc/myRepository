<template>
  <div class="address">
    <div class="header">
      <img @click="back" class="image" width="40" height="40" src="./left.png">
      <h1 class="title">收货地址</h1>
    </div>
    <div class="content" v-show="!addressArr.length">
      <img width="83" height="83" src="./null.png">
      <span class="desc">您还没有收货地址,请点击下方+新建</span>
      <div @click="newpage" class="add-bottom">
        <span class="add">+ 添加地址</span>
      </div>
    </div>
    <div class=" address-user" v-show="addressArr.length">
      <div v-for="(item,index) in addressArr" :key="item.id" class="address-item">
        <div class="left">
          <div class="left-header">
            <span class="username">{{item.name}}</span>
            <span class="userphone">{{item.phone}}</span>
          </div>
          <div class="area">
            <div v-show="item.selected" class="default">
              <span class="text"> 默认</span>
            </div>
            <span class="desc">{{item.city + item.address}}</span>
          </div>
        </div>
        <div class="right">
          <img @click="edit(item)" width="17" height="17" src="./editor.png">
        </div>
      </div>
      <div @click="newpage" class="bottom">
        <span class="add">+ 添加地址</span>
      </div>
    </div>
    <div class="new-address" v-show="newAddress">
      <div class="header">
        <img @click="noShow" class="image" width="40" height="40" src="./left.png">
        <h1 class="title">新增地址</h1>
        <h2 @click="del" class="del">删除</h2>
      </div>
      <div class="container">
        <div class="list">
          <span class="left">收货人姓名: </span>
          <input v-validate="'required'" v-model="name" name="name" placeholder="请输入姓名">
        </div>
        <span v-show="errors.has('name')" class="tip">{{ errors.first('name') }}</span>
        <div class="list">
          <span class="left">手机号码: </span>
          <input v-validate="'required|mobile'" v-model="phone" name="phone" placeholder="请输入手机号码">
        </div>
        <span v-show="errors.has('phone')" class="tip">{{ errors.first('phone') }}</span>
        <div class="list">
          <span class="left">所在地区: </span>
          <span>{{area}}</span>
          <img @click="selectArea" class="arrow-down" width="15" height="10" src="./arrow_down.png">
        </div>
        <div class="detail-show" v-show="showDetailT" ref="detail">
          <div class="top" @click="reDetails" height="260px" ref="top"></div>
          <div class="middle-contentT">
            <div class="area-header" ref="header">
              <div class="title">
                <span class="name">所在地区</span>
                <img class="erro" width="15" height="15" src="./error.png">
              </div>

            </div>
            <v-distpicker @selected="onSelected"></v-distpicker>
          </div>
        </div>
        <div class="list">
          <span class="left">街道地址: </span>
          <input v-validate="'required'" v-model="street" name="street" placeholder="请输入街道地址">
        </div>
        <span v-show="errors.has('street')" class="tip">{{ errors.first('street') }}</span>
        <div class="list">
          <span class="left">邮政编码: </span>
          <input v-validate="'required|regex:6'" v-model="postal" name="postal" placeholder="请输入邮编">
        </div>
        <span v-show="errors.has('postal')" class="tip">{{ errors.first('postal') }}</span>
        <div class="list">
          <img @click="select" class="circle" width="18" height="18" :src="selected?'/static/selected.png':'/static/circle.png'">
          <span class="left">设为默认地址</span>
        </div>
        <div class="bottom">
          <span @click="submit" class="add">保存</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import VDistpicker from 'v-distpicker'
  import axios from 'axios'
  import {setLocalStroge, getLocalStroge} from "../../common/js/localStore"
  import {rootUrl} from "../../common/js/config";

  export default {
    data() {
      return {
        newAddress: false,
        showDetailT: false,
        user: null,
        addressArr: [],
        address_id: '', // 地址id
        name: '',    // 姓名
        phone: '',   // 电话
        area: '',   // 城市
        street: '',  // 街道
        postal: '',  // 邮编
        selected: false,// 设为默认地址
        circle: true,
      }
    },
    created() {
      this.user = getLocalStroge('user', true);
      if (!this.user) {
        alert('请先登录')
        this.$router.back();
      }
      let url = rootUrl + '/YouPin/public/index.php/getAddressInfo?user_id=' + this.user.id
      axios.get(url).then(res => {
        let data = res.data
        if (data.status === 1) {
          this.addressArr = data.data
          this.setLocalAddress(data.data)
        } else if (data.status === 0) {
          alert(data.message)
        }
      })
    },
    watch: {},
    methods: {
      onSelected(data) {
        this.area = data.province.value + ' ' + data.city.value + ' ' + data.area.value;
      },
      setLocalAddress(data) {
        setLocalStroge('address',data)
      },
      back() {
        this.$router.go(-1);
      },
      newpage() {
        this.newAddress = true
        this.address_id = ''
        this.name = ''
        this.phone = ''
        this.area = ''
        this.street = ''
        this.postal = ''
        this.selected = false
      },
      noShow() {
        this.newAddress = false
      },
      selectArea() {
        this.showDetailT = true
      },
      reDetails() {
        this.showDetailT = false
      },
      select() {
        this.selected = !this.selected;
      },
      submit() {
        if (this.area === '')
          alert("请将地区信息选择完整!")
        this.$validator.validate().then(result => {
          if (result) {
            // 如果地址id为空则为添加操作
            if (this.address_id === '') {
              let url = rootUrl + '/YouPin/public/index.php/address'
              let param = {
                user_id: this.user.id,
                manage_type: 'add',
                data: {
                  user_id: this.user.id,
                  name: this.name,
                  phone: this.phone,
                  city: this.area,
                  address: this.street,
                  postal: this.postal,
                  selected: this.selected ? 1 : 0
                }
              }
              axios.post(url, param).then(res => {
                let data = res.data
                if (data.status === 1) {
                  this.addressArr = data.data
                  //alert(data.message)
                  this.setLocalAddress(data.data)
                  this.newAddress = false
                } else if (data.status === 2) {
                  alert(data.message)
                }
              }).catch(err => {
                console.log(err)
              })
            }
            // 否则为修改
            else {
              let url = rootUrl + '/YouPin/public/index.php/address'
              let param = {
                address_id: this.address_id,
                manage_type: 'update',
                data: {
                  user_id: this.user.id,
                  name: this.name,
                  phone: this.phone,
                  city: this.area,
                  address: this.street,
                  postal: this.postal,
                  selected: this.selected ? 1 : 0
                }
              }
              axios.post(url, param).then(res => {
                let data = res.data
                if (data.status === 1) {
                  this.addressArr = data.data
                  //alert(data.message)
                  this.setLocalAddress(data.data)
                  this.newAddress = false
                } else if (data.status === 2) {
                  alert(data.message)
                }
              }).catch(err => {
                console.log(err)
              })
              this.address_id = ''
            }
          }
          else {}
        })
      },
      del() {
        let url = rootUrl + '/YouPin/public/index.php/address'
        let param = {
          address_id: this.address_id,
          manage_type: 'delete',
          data: {
            user_id:  this.user.id,
          }
        }
        axios.post(url, param).then(res => {
          let data = res.data
          if (data.status === 1) {
            this.addressArr = data.data
            //alert(data.message)
            this.setLocalAddress(data.data)
            this.newAddress = false
          } else if (data.status === 2) {
            alert(data.message)
          }
        }).catch(err => {
          console.log(err)
        })
        this.address_id = ''
      },
      edit(item) {
        this.newAddress = true
        this.address_id = item.id
        this.name = item.name
        this.phone = item.phone
        this.area = item.city
        this.street = item.address
        this.postal = item.postal
        this.selected = item.selected
      }
    },
    components: {
      VDistpicker,
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .address
    background-color: rgb(247, 247, 247)
    .header
      background-color: white
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
      .del
        position absolute
        right 12px
   .content
      width: 100%
      position: fixed
      top: 47px
      bottom: 0
      background-color: rgb(247, 247, 247)
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      .desc
        margin-top: 20px
        font-size: 13px
        color: rgb(153, 153, 153)
      .add-bottom
        position: absolute
        bottom: 30px
        width: 90%
        height: 40px
        border: 1px solid rgb(132, 95, 63)
        color: rgb(132, 95, 63)
        background-color: white
        text-align: center
        .add
          display: block
          margin-top: 10px

    .address-user
      display: flex
      flex-direction: column
      //align-items: center
      width: 100%
      position: fixed
      top: 47px
      bottom: 0
      background-color: rgb(247, 247, 247)
      .address-item
        display: flex
        padding: 14px 0 10px 10px
        flex-direction: row
        justify-content: space-around
        .left
          flex: 0 0 300px
          height: 100px
          .left-header
            display: flex
            justify-content: space-between
          .area
            display: flex
            flex-direction: row
            align-items: center
            //justify-content: center
            margin-top: 5px
            .default
              display: flex
              flex-direction: column
              align-items: flex-start
              justify-content center
              width: 36px
              height: 30px
              .text
                border: 1px solid rgb(182, 9, 9)
                font-size: 13px
                color: rgb(182, 9, 9)
                padding 1.5px
            .desc
              line-height: 30px
              float-wrap: wrap
              font-size: 12px
              color: rgb(102, 102, 102)
        .right
          img
            margin-top 20px
      .bottom
        position: absolute
        bottom: 30px
        width: 90%
        height: 40px
        border: 1px solid rgb(132, 95, 63)
        color: rgb(132, 95, 63)
        background-color: white
        text-align: center
        margin-left: 5%
        .add
          display: block
          margin-top: 10px
    .new-address
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      left: 0
      .container
        display: flex
        flex-direction: column
        width: 100%
        position: fixed
        top: 47px
        bottom: 0
        background-color: rgb(247, 247, 247)
        .list
          position: relative
          background-color: white
          height: 50px
          padding: 0 20px
          display: flex
          align-items: center
          margin-bottom: 2px
          input
            width: 255px
            height: 30px
          .left
            width: 80px
            font-size: 13px
            margin-right: 20px
          .arrow-down
            position: absolute
            right: 20px

        .detail-show
          position: fixed
          z-index: 200
          top: 47px
          left: 0
          bottom: 0
          width: 100%
          //height: 100%
          .top
            height: 260px
            background-color: black
            opacity: 0.5
          .middle-contentT
            position: absolute
            bottom: 0
            top: 260px
            width: 100%
            background-color: white
            .area-header
              position: relative
              height: 80px
              display: flex
              align-items: center
              justify-content: center
              //border-bottom: 1px solid rgb(229, 229, 229)
              .title
                display: flex
                flex-direction: row
                align-items: center
                height: 40px
                //padding: 0 15px
                .name
                  flex: 1
                  font-size: 14px
                  color: rgba(0, 0, 0, 0.6)
                .erro
                  background-color: transparent
                  position: absolute
                  right: 15px
        .tip
          display block
          color #e22
          width 100%
          text-align center
        .bottom
          position: fixed
          bottom: 0
          width: 90%
          height: 40px
          border: 1px solid rgb(132, 95, 63)
          color: rgb(132, 95, 63)
          background-color: white
          text-align: center
          margin-left: 5%
          .add
            display: block
            margin-top: 10px
</style>
