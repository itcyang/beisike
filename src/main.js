
import Vue from 'vue'
import App from './App'
import router from './router'

import "@/common/css/index.scss"
import 'lib-flexible/flexible.js'

// 引入core.config.js
import core from "@/core/core.config"
Vue.use(core);


//引入vuex数据仓库
import store from "@/core/store/index"
import 'font-awesome/css/font-awesome.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
