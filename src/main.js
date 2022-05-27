import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import '@/assets/global.less'

// 导入 axios
import axios from '@/http/index.js'

// 引入 Element
import ElementUI from 'element-ui'
// 引入 Element 的全局样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 将 Element 安装为 Vue 的插件
Vue.use(ElementUI)

// 全局注册富文本编辑器
Vue.use(VueQuillEditor)

// 在 Vue 原型上添加 axios，将来在组件中可以使用 this.$http 访问 axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
