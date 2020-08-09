import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   component: () => import(`@/views/Main.vue`),
  //   children:[
  //     {
  //     path: '/',
  //     name:'home',
  //     component: () => import(`@/views/home/Home.vue`)
  //     },
  //     {
  //       path: '/video',
  //       name:'video',
  //       component: () => import(`@/views/video/Video.vue`)
  //     },
  //     {
  //       path: '/user',
  //       name:'user',
  //       component: () => import(`@/views/user/User.vue`)
  //     },
  //     {
  //       path: '/page1',
  //       name:'page1',
  //       component: () => import(`@/views/other/pageone.vue`)
  //     },
  //     {
  //       path: '/page2',
  //       name:'page2',
  //       component: () => import(`@/views/other/pagetwo.vue`)
  //     }


  // ]
  // },
  {
    path: '/login',
    name:'login',
    component: () => import(`@/views/login/Login`),
  }
]
const router = new VueRouter({
  routes
})
// 解决高版本重复点击的bug
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router
