import Vue from 'vue'
import Router from 'vue-router'
import api from '@/core/api/index'
// console.log(global.getParam())


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: resolve => require(['@/components/home'], resolve),
      redirect: "home",
      children: [{
        //首页
        path: 'home',
        name: 'home',
        meta: {
          keepAlive: true,
        },
        component: resolve => require(['@/components/main/homePage'], resolve)
      },
      //分类
      {
        path: 'classification',
        name: 'classification',
        component: resolve => require(['@/components/main/classification'], resolve),
      },
      //购物车
      {
        path: 'cart',
        name: 'cart',
        component: resolve => require(['@/components/main/cart'], resolve),
      },
      //我的
      {
        path: 'mine',
        name: 'mine',
        component: resolve => require(['@/components/main/mine'], resolve),
      },
      //详情页
      {
        path: 'show',
        name: 'show',
        component: resolve => require(['@/components/main/show'], resolve),
      }
      ]
    },

  ]
})



export default router;
