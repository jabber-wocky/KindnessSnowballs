import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Admin from './views/admin'
import Login from './views/login'
import store from '@/store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (!store.getters.hasAuth) {
          next({ name: 'login', query: { returnTo: to.path } })
        }
        next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: (route) => ({ returnTo: route.query.returnTo })
    }
  ]
})
