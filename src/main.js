import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style/common.css'
import plugin from './plugin.js'
import gLayout from '@/components/layout.vue'
import gHeader from '@/components/header.vue'
import gSider from '@/components/sider.vue'
import gFooter from '@/components/footer.vue'
import gContent from '@/components/content.vue'
import gButton from '@/components/button.vue'
import buttonGroup from '@/components/button-group.vue'
import gInput from '@/components/input.vue'
import gRow from '@/components/row.vue'
import gCol from '@/components/col.vue'
import gTabs from '@/components/tabs.vue'
import gTabsBody from '@/components/tabs-body.vue'
import gTabsHead from '@/components/tabs-head.vue'
import gTabsItem from '@/components/tabs-item.vue'
import gTabsPanel from '@/components/tabs-panel.vue'
import gIcon from '@/components/icon.vue'
import gCollapse from '@/components/collapse.vue'
import gCollapseItem from '@/components/collapse-item.vue'
import gPopOver from '@/components/popOver.vue'
//import gCascader from '@/components/Cascader.vue'

import gSlides from '@/components/slides.vue'
import gSlidesItem from '@/components/slidesItem.vue'
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
Vue.component('g-layout', gLayout)
Vue.component('g-header', gHeader)
Vue.component('g-sider', gSider)
Vue.component('g-footer', gFooter)
Vue.component('g-content', gContent)
Vue.component('g-button', gButton)
Vue.component('button-group', buttonGroup)
Vue.component('g-input', gInput)
Vue.component('g-row', gRow)
Vue.component('g-col', gCol)
Vue.component('g-tabs', gTabs)
Vue.component('g-tabs-body', gTabsBody)
Vue.component('g-tabs-head', gTabsHead)
Vue.component('g-tabs-item', gTabsItem)
Vue.component('g-tabs-panel', gTabsPanel)
Vue.component('g-icon', gIcon)
Vue.component('g-collapse', gCollapse)
Vue.component('g-collapse-item', gCollapseItem)
Vue.component('g-slides', gSlides)
Vue.component('g-slides-item', gSlidesItem)
Vue.component('g-pop-over', gPopOver)
