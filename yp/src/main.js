// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'

Validator.extend('mobile', {
  messages: {
    zh_CN:field => '必须是11位手机号码',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

Validator.addLocale(zh)

const config = {
  locale: 'zh_CN'
}



Vue.use(VeeValidate,config)


Vue.config.productionTip = false;

Vue.prototype.dataHub = {};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // 或components: { App },
  // template: '<App/>'
});
