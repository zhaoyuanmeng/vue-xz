<template>
  <div style="padding: 20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
		// 点击登录的触发操作
    login() {
      this.$http.post('api/permission/getMenu', this.form).then(res => {
				res = res.data
				// 这时候把成功的数据也就是左边的路由数据保存到vuex里面
        if (res.code === 20000) {
					// 避免二次登录
					this.$store.commit('clearMenu')
					console.log(res.data.menu)
          this.$store.commit('setMenu', res.data.menu)
				  this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        } else {
					//警告信息 这是引入饿了么组件就注册的全局
          this.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 50%;
  margin: auto;
  padding: 45px;
  height: 450px;
  background-color: #fff;
}
</style>
