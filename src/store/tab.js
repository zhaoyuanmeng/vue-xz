import { Collapse } from 'element-ui'
import Cookie from 'js-cookie'
export default {
  // 公共的状态数据
  state: {
    isCollapse: false,
    menu: [],
    dianjiMenu: {},
    tabs: [
      {
        path: '/',
        label: '首页',
        icon: 'user',
        name: 'home',
      },
    ],
  },
  mutations: {
    // 参数1是固定的 参数二是传过来的值
    // 这里面还控制tab
    selectMenu(state, val) {
      // 过滤掉home
      if (val.name !== 'home') {
        // 判断是否放进去过tab 查重
        let res = state.tabs.findIndex((item) => item.name === val.name)
        res === -1 ? state.tabs.push(val) : ''
        state.dianjiMenu = val
      } else {
        state.dianjiMenu = null
      }
    },
    // 动态设置菜单
    setMenu(state, val) {
      state.menu = val
      //cookie只能存放数据 所以要把他们字符串化
      Cookie.set('menu', JSON.stringify(val))
    },

    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu'))
      console.log('222')
      state.menu = menu
      let currentMenu = [
        {
          path: '/',
          component: () => import(`@/views/Main`),
          children: [],
        },
      ]

      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`@/views/${item.url}`)
            console.log(item)
            return item
          })
          // ...是展开里面的属性在Push进去 因为父级没用

          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })

      router.addRoutes(currentMenu)
    },

    // 清除菜单
    clearMenu(state) {
      state.menu = []
      //cookie只能存放数据 所以要把他们字符串化
      Cookie.remove('menu')
    },
    // 关闭标签
    closeTab(state, val) {
      // 找到要关闭的tab的索引值
      let res = state.tabs.findIndex((item) => item.name === val.name)
      // 删除tab
      state.tabs.splice(res, 1)
      // 删除点击
      state.dianjiMenu = null
    },
    collapsMenu(state) {
      state.isCollapse = !state.isCollapse
    },
  },
  actions: {},
  modules: {},
}
