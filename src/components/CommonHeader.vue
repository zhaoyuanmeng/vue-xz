<template>
  <header>
    <div class="l-content">
      <el-button type="plain"
                 icon="el-icon-s-grid"
                 size="mini"
                 @click="collapsMenu" >
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path"
                            v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <span class="demonstration">Zyd</span>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="imgUrl"
               alt=""
               class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <!-- 使用原生的click -->
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>

    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      current: (state) => state.tab.dianjiMenu,
    }),
  },
  data () {
    return {
      imgUrl: require('../assets/imgs/tx.jpg'),
    }
  },
  methods: {
    collapsMenu() {
      this.$store.commit('collapsMenu')
    },
    logout(){
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      location.reload()
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 10px;
  }
}
.r-content {
  display: flex;
  align-items: center;
  .userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: blue;
  font-size: 20px;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: rgba(131, 10, 50, 0.925);
}
</style>
