<template>
  <el-menu
    default-active="2"
    :collapse="isCollapse"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 v-show="!isCollapse">@管理系统1.1版本</h3>
    <h3 v-show="isCollapse">zyd</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in nochild"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu index="1" v-for="item in haschild" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="a.path"
          v-for="a in item.children"
          :key="a.path"
          @click="clickMenu(a)"
        >
          <i :class="'el-icon-' + a.icon"></i>
          <span slot="title">{{ a.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    nochild() {
      return this.menu.filter((item) => !item.children)
    },
    haschild() {
      return this.menu.filter((item) => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menu() {
      return this.$store.state.tab.menu
    },
  },
  methods: {
    // 会把这里的item值传递给selectMenu中的参数二
    clickMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    },
  },
  data() {
    return {
      // 这个静态数据不需要了
      // asideMenu: [
      //   {
      //     path: '/',
      //     label: '首页',
      //     icon: 'user',
      //     name: 'home'
      //   },
      //   {
      //     path: '/video',
      //     label: '视频管理',
      //     icon: 'user',
      //     name: 'video'
      //   },
      //   {
      //     path: '/user',
      //     label: '用户管理',
      //     icon: 'user',
      //     name: 'user'
      //   },
      //   {
      //     label: '其他管理',
      //     icon: 'other',
      //     child: [
      //       {
      //         path: '/page1',
      //         label: '页面1',
      //         icon: 'setting',
      //         name: 'page1'
      //       },
      //       {
      //         path: '/page2',
      //         label: '页面2',
      //         icon: 'setting',
      //         name: 'page2'
      //       }
      //     ]
      //   }
      // ]
    }
  },
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100vh;
  border: 0;
  h3 {
    font-size: 20px;
    line-height: 30px;
    color: aliceblue;
    text-align: center;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
