import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局配置
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
// @ 相当于从src路径下找

// 第三方包
import ElementUI from 'element-ui'
import http from '@/api/config'
import '@/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
// 相当于把http挂载在Vue的原型下面
Vue.prototype.$http = http
// 路由的周期函数
router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  // store.commit('getMenu')
  //  let token = store.state.user.token
  let token = Cookie.get('token')
  // 过滤登录页，防止死循环
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {

    http
      .post('api/permission/getMenu', { username: token, password: '123456' })
      .then((res) => {
        res = res.data
        // 这时候把成功的数据也就是左边的路由数据保存到vuex里面
        if (res.code === 20000) {
          store.commit('setMenu', res.data.menu)
          store.commit('addMenu', router)
        } else {
          //警告信息 这是引入饿了么组件就注册的全局
          message.warning(res.data.message)
        }
      })
    next()
  }
})
Vue.use(ElementUI)
new Vue({
  router,
  store,
  created() {
    store.commit('addMenu', router)
  },
  render: (h) => h(App),
}).$mount('#app')
