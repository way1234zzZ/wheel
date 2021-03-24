import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/common.css'
import plugin from './plugin.js'
Vue.config.productionTip = false
//在原型上定义它们使其在每个 Vue 的实例中可用。原型扩展
//侵入性太强，不知道原来有没有这个属性
// Vue.prototype.$toast = () => {
//   console.log("我是toast")
// }

Vue.use(plugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
