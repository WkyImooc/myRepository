import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import More from 'components/more/more'
import Category from 'components/category/category'
import Shopcart from 'components/shopcart/shopcart'
import Personal from 'components/personal/personal'
import Grade from 'components/grade/grade'
import NavigaterDetail from 'base/navigater-detail/navigater-detail'
import Goods from 'base/goods/goods'
import Log from 'components/log/log'
import Reg from 'base/reg/reg'
import Password from 'base/password/password'
import Address from 'components/address/address'
import HorizontalList from 'base/horizontal-list/horizontal-list'
import Order from 'components/order/order'
import Confirmorder from 'components/confirmorder/confirmorder'
import Video from 'components/video/Video'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', // 根组件
      redirect: '/Index' // 默认一进来就显示排行页面
    },
    {
      path: '/index',
      component: Index,
      // children: [
      //   {
      //     path: 'NavD',
      //     component: NavigaterDetail,
      //   }
      // ]
    },
    {
      path: '/NavD',
      component: NavigaterDetail,
    },
    {
      path: '/more',
      component: More
    },
    {
      path: '/category',
      component: Category
    },
    /*{
      path: '/grade',
      component: Grade
    },*/
    {
      path: '/video',
      component: Video
    },
    {
      path: '/shopcart',
      component: Shopcart,
    },
    {
      path: '/personal',
      component: Personal,
    },
    {
      path: '/order',
      component: Order,
    },
    {
      path: '/confirmorder',
      component: Confirmorder
    },
    {
      path: '/address',
      component: Address,
    },
    {
      path: '/goods',
      component: Goods
    },

    {
      path: '/reg',
      component: Reg,

    },
    {
      path: '/log',
      component: Log,
    },

    {
      path: '/reg',
      component: Reg
    },
    {
      path: '/password',
      component: Password
    },
    {
      path: '/horizontalList',
      component: HorizontalList
    },

    // {
    //   path: '/navigater-detail',
    //   component: NavigaterDetail
    // },
  ]
})
