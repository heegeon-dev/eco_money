import Vue from 'vue'
import Router from 'vue-router'
import PrivatePage from '@/components/PrivatePage'
import Login from '@/components/Login'
import PublicPage from '@/components/PublicPage'
import Join from '@/components/Join'
import MainContent from '@/layouts/MainContent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/MainContent',
      name: 'maincontent-layout',
      component: MainContent
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
    },
    {
      path: '/Join',
      name: 'Join',
      component: Join
    }
  ]
})
