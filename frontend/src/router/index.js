import Vue from 'vue'
import Router from 'vue-router'
import PrivatePage from '@/components/PrivatePage'
import MainPage from '@/layouts/MainContent'
import PublicPage from '@/components/PublicPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/private',
      name: 'privatepage',
      component: PrivatePage
    },
    {
      path: '/public',
      name: 'publicpage',
      component: PublicPage
    }
  ]
})
