<template>
  <div class="login">
    <div class="top">
      <div class="header">
        <img width="48" height="48" class="image" src="./logo@2x.png">
        <h4 class="title">小米账号登录</h4>
      </div>
      <div class="content">

        <div class="input" v-show="clickShow">
          <div class="tel">
            <span class="country-code">+86</span>
            <img width="12" height="12" src="./right_arrow.png">
            <input v-validate="'required|mobile'" name="phone" class="phone" type="text" v-model="phone" placeholder="手机号码">
          </div>
          <div class="tel">
            <input class="shortMessage" v-model="code" placeholder="短信验证码">
            <input type="button" @click="sms" class="get" value="获取验证码">
          </div>
        </div>

        <div class="usernameReg"  v-show="isShow">
          <div class="tel" >
            <input v-model="account_num" class="phonenum" placeholder="邮箱/手机号码/小米ID">
          </div>
          <div class="tel" >
            <input v-model="pwd" type="password" class="shortMessage" placeholder="密码">
          </div>
        </div>
        <span class="prompt" v-show="errors.has('phone')"  >{{ errors.first('phone') }}</span>

        <div class="button">
          <input @click="login" type="submit" class="register" value="立即登录/注册"/>
        </div>
        <input @click="select" type="submit" class="link" value="手机短信登录/注册"/>
        <!--<input @click="select" type="submit" class="link" value="手机短信登录/注册"/>-->


        <div class="little">
          <span @click="reg" class="text">立即注册</span>
          <span>|</span>
          <span @click="password" class="text">忘记密码 ?</span>
        </div>

        <!--<div class="other">
          <span class="line"></span>
          <span class="text">其他方式登录</span>
          <span class="line"></span>
        </div>
        <div class="background">
            <span class=" qq">
              <i class="icon"></i>
            </span>
          <span class=" qq wb">
              <i class="icon wb"></i>
            </span>
          <span class="qq">
              <i class="icon zf"></i>
            </span>
        </div>-->
      </div>
    </div>
    <!--<div class="bottom">
      <span class="text">简体</span>
      |
      <span class="text">繁体</span>
      |
      <span class="text">English</span>
      |
      <span class="text">常见问题</span>
      |
      <span class="text">隐私政策</span>
    </div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios'
  import {setLocalStroge} from "../../common/js/localStore"
  import {rootUrl} from "../../common/js/config";

  export default {
    data () {
      return {
        isShow: true,
        clickShow: false,
        phone: '',
        code: '',
        account_num: '13999999999',
        pwd: '123'
      }
    },
    methods: {
      select () {
        alert('暂未开放')
        return;
        this.isShow = !this.isShow ;
        this.clickShow = !this.clickShow;
      },
      reg () {
        this.$router.push({
          path: 'reg'
        })
      },
      password () {
        this.$router.push({
          path: 'password'
        })
      },
      sms (event) {

        // 验证码延时效果 -- start
        let outTime = 60;
        let dom = event.target;
        this.timer = setInterval(()=>{
          dom.value = outTime--;
          if(outTime<0){
            dom.removeAttribute('disabled');
            dom.value = '获取验证码';
            clearInterval(this.timer);
          }
        },1000);
        dom.setAttribute('disabled','disabled');
        // 验证码延时效果 -- end

        // 异步获取手机验证码 -- start
        let url = rootUrl + '/YouPin/public/index.php/sms';
        let data = {
          phone: this.phone
        };
        axios.post(url, data).then((res) => {
          let data = res.data
          if (data.status === 1) {
            alert(data.message)
          }
        }).catch((res)=>{
          console.log(res)
          alert('请稍后再试')
       })
        // 异步获取手机验证码 -- end
      },
      login () {
        let url = rootUrl + '/YouPin/public/index.php/login';
        /*let data = {
          phone: this.phone,
          sms_code: this.code
        };*/
        let data = {
          account_num: this.account_num,
          pwd: this.pwd
        };
        axios.post(url, data).then((res) => {
          let data = res.data
          if (data.status === 1) {
            let user = data.data
            setLocalStroge('user', user);
            alert(data.message)
            this.$router.push({
              path: '/personal'
            })
          } else if(data.status === 0) {
            alert(data.message)
          }
        }).catch((res) => {
          alert('请稍后再试')

        })
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
    position: fixed
    top: 0
    left: 0
    bottom: 0
    width: 100%
    background-color: white
    .top
      margin: 0 auto 30px
      padding: 0 28px

    .header
      width: 100%
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      padding: 30px 0 10px
      .image
        margin: 0 auto 15px
      .title
        flex: 1
        font-size: 18px
        color: #000

    .content
      padding-bottom: 20px
      margin-top: 10%;
      .tel
        position: relative
        display: flex
        flex-direction: row
        align-items: center
        border-bottom: 1px solid #d3d3d3
        .country-code
          font-size: 18px
          margin-right: 2px
          color: #9b9b9b
        //line-height: 18px
        .phonenum
          padding: 16px 0
          border: none
          outline: medium
          //margin-left: 18px
          color: #9b9b9b
          font-size: 18px
          &::-webkit-input-placeholder
            color: #9b9b9b
        .phone
          padding: 16px 0
          border: none
          outline: medium
          margin-left: 18px
          color: #9b9b9b
          font-size: 18px
          &::-webkit-input-placeholder
            color: #9b9b9b
        .shortMessage
          padding: 16px 0
          border: none
          outline: medium
          display: block
          font-size: 18px
          &::-webkit-input-placeholder
            color: #9b9b9b
        .get
          position: absolute
          right: 0
          flex: 1
          font-size: 16px
          padding: 10px 20px
          color: #2ea5e5
          background-color #cfcfcf

      .button
        padding-top: 35px
        .register
          display: block
          padding: 10px 0
          width: 100%
          color: white
          text-align: center
          border-radius: 6px
          font-size: 15px
          background-color: #ff6700
          margin-bottom: 14px
      .link
        background-color: white
        width: 100%
        display: block
        padding: 10px 0
        margin-bottom: 14px
        text-align: center
        border-radius: 6px
        margin-top: 20px
        border: 1px solid #d3d3d3
        font-size: 15px
        color: #000
        outline: medium
      .little
        display: block
        text-align: center
        color: #646464
        line-height: 25px;
        font-size: 13px
        .text
          padding: 0 9px
      .other
        text-align: center
        margin-top: 40px
        display: block
        margin-bottom: 10px
        .line
          width: 20%
          height: 5px
          display: inline-block
          border-top: 1px solid #f2f2f2
        .text
          font-size: 12px
          color: #b0b0b0
          width: 80px

      .background
        padding-top: 10px
        text-align: center
        .qq
          display: inline-block
          margin: 0 10px
          width: 30px
          height 30px
          border-radius: 50%
          background-color: #72c7db
          &.wb
            background-color: #ed9090
          .icon
            display: block
            width: 18px
            background-position: -19px 0
            height: 18px
            color: white
            margin: 5px auto 0
            //background-size: 100%
            background-repeat: no-repeat
            background-image: url("./wx.png")
            &.wb
              background-position: -38px 0
            &.zf
              background-position: -57px 0

    .bottom
      text-align: center
      height: 100px
      color: #9b9b9b
      .text
        display: inline-block
        font-size: 14px
        padding: 0 10px
        &:last-child
          padding-left: 10px
        &:first-child
          color: #4a4a4a
</style>
