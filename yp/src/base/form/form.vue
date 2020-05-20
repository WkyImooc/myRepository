<template>
  <div class="layui-form-item">
    <label class="layui-form-label">账户</label>
    <div class="layui-block">
      <input v-model="name" v-validate="'required|min:3|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" name="name" class="layui-input" placeholder="账户">
      <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
