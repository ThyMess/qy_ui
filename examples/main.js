import Vue from 'vue'
import App from './App.vue'

import qy_ui from '../src/index.js'
import '../packages/theme-chalk/index.scss'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(qy_ui)
Vue.use(Element)

new Vue({
  render: h => h(App),
}).$mount('#app')
