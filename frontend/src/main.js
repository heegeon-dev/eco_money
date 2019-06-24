// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Layouts
import Maincontent from '@/layouts/MainContent.vue'
import store from './store'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import ToggleButton from 'vue-js-toggle-button'
import DateRangePicker from '@gravitano/vue-date-range-picker'
import VueJsModal from 'vue-js-modal'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueJsModal, {
  dialog: true,
  dynamic: true,
  dynamicDefaults: {
    foo: 'foo'
  }
})
Vue.use(DateRangePicker)
Vue.use(ToggleButton)
Vue.use(VueMomentJS, moment)
// Vue.prototype.$Http = axios
Vue.$http = axios
Vue.use(Vuex)

Vue.component('maincontent-layout', Maincontent)
Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
