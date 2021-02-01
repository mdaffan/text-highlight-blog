import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Typography from '@/components/Typography.vue'
import Empty from '@/components/Empty.vue'
import store from './store'
import './styles/base.scss'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false
Vue.component('Typography', Typography)
Vue.component('Empty', Empty)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
