<template>
    <div class="reg">
      <div class="header">
        <h1 class="title">注册小米帐号</h1>
      </div>
      <div class="content">
        <div class="area">
          <span class="name">中国</span>
          <img width="12" height="12" src="./right_arrow.png">
        </div>
        <span class="points">成功注册账号后,国家/地区将不能被修改</span>
        <div class="phone">
          <span class="num">+86</span>
          <img width="12" height="12" src="./right_arrow.png">
          <input class="tel" placeholder="请输入手机号码">

        </div>
        <input @click="reg()" type="submit" class="immediate" value="立即注册">

      </div>
      <div class="agreement">
        <img width="12" height="12" src="./right_arrow.png">
        <span class="desc">注册账号表示您同意并认可小米的用户政策黑隐私</span>
      </div>
      <div class="bottom">
        <span class="text">简体</span>
        |
        <span class="text">繁体</span>
        |
        <span class="text">English</span>
        |
        <span class="text">常见问题</span>
        |
        <span class="text">隐私政策</span>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
      methods: {
        reg() {
          alert('暂未开放')
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .reg
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
      margin-top: 35px
      padding: 0 28px
      .area
        height: 40px
        display: flex
        align-items: center
        justify-content: space-between
        flex-direction: row
        border-bottom: 1px solid #d3d3d3
        margin-bottom: 5px
      .points
        display: block
        font-size: 10px
        color: #9b9b9b
        margin-bottom: 30px
      .phone
        height: 40px
        display: flex
        flex-direction: row
        align-items: center
        border-bottom: 1px solid #d3d3d3
        .num
          color: #555
          padding-right: 3px
        .tel
          border: none
          outline: medium
          padding: 8px
      .immediate
        margin: 30px 0
        height: 40px
        text-align: center
        border-radius: 8px
        width: 100%
        color: white
        background-color: #ff6700


    .agreement
      padding: 0 20px
      display: flex
      flex-direction: row
      align-items: center
      .desc
        margin-left: 6px
        display: block
        font-size: 10px
        color: #9b9b9b
    .bottom
      position: fixed
      bottom: 0
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
