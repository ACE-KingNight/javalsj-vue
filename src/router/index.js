import Vue from 'vue'
import Router from 'vue-router'
import DemoLogin from '@/components/home/DemoLogin'
import DemoHome from '@/components/home/DemoHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/index',
      name:'DemoIndex',
      component: DemoHome
    }, {
      path:'/login',
      name:'DemoLogin',
      component:DemoLogin
    }, {
      path:'/manage',
      redirect:'/login'
    }
  ]
})
