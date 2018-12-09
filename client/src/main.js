import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vue-simple-svg'
import './plugins/vuetify'
import './plugins/vue-analytics'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment-timezone'

Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
