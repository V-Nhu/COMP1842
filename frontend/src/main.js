import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'semantic-ui-css/semantic.min.css'
import './assets/styles/theme.css'
import VueFlashMessage from 'vue-flash-message'
import 'vue-flash-message/dist/vue-flash-message.min.css'

Vue.use(VueFlashMessage)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')