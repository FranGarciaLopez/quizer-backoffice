import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Secure from '../components/Secure.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {requiresAuth: true}
    
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    
  },
  {
    path: '/secure',
    name: 'secure',
    component: Secure,
    

  },
 
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next)=>{
  const loggedIn = localStorage.getItem('user')
  if(to.matched.some(record => record.meta.requiresAuth) && !loggedIn)  {
    next('/secure')
  }
  next()

})

export default router
