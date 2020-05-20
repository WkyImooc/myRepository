<template>
  <div class="password">
    <div class="header">
      <h1 class="title">重置密码</h1>
    </div>
    <div class="content">
      <h5 class="input">请输入注册的邮箱地址,手机号码或小米帐号 :</h5>
      <div class="emails">
        <input class="tel" placeholder="邮箱/手机号码/小米帐号">
      </div>
      <div class="slider">
        <Slider></Slider>
      </div>
      <!--<div class="identifying">-->
      <!--<input class="identify" placeholder="图片验证码">-->
      <!--</div>-->
      <div class="desc">
        <span class="text">用户输入手机号码时请正确选择区域前缀,如 : 台湾 : +8869******,香港 : +8526******</span>
        <a class="help">帮助</a>
      </div>
      <div class="button">
        <input @click="next" class="next" type="submit" value="下一步"/>
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  //import Form from 'base/form/form'
  import Slider from '../identify/slider'

  export default {
    components: {
      Slider,
      //Form
    },
    methods: {
      next () {
        alert('暂未开放')
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .password
    position: fixed
    top: 0
    left: 0
    width: 100%
    bottom: 0
    background-color: white
    .header
      text-align: center
      padding: 35px 0 20px
      .title
        font-size: 20px
    .content
      padding: 0 28px
      .input
        color: #9b9b9b
        font-size: 14px
        margin: 10px 0 25px
      .emails
        height: 35px
        margin-bottom: 20px
        border-bottom: 1px solid #d3d3d3
        .tel
          font-size: 18px
          border: none
          outline: medium
          padding: 4px 0
      .slider
        margin-bottom: 20px
        //border-bottom: 1px solid #d3d3d3
      .identifying
        margin-bottom: 20px
        height: 35px
        border-bottom: 1px solid #d3d3d3
        .identify
          border: none
          outline: medium
          padding: 3px 0
          color: #9b9b9b
          font-size: 14px
      .desc
        position: relative
        .text
          display: inline-block
          font-size: 15px
          color: #c5c5c5
          line-height: 20px
        .help
          color: #46639c
          font-size: 16px
          text-decoration: underline
          position: absolute
          top: 30px
          right: 0


      .button
        padding-top: 24px
      .next
        padding: 10px 0
        width: 100%
        color: white
        text-align: center
        border-radius: 6px
        font-size: 18px
        background-color: #ff6700
        margin-bottom: 14px

</style>
