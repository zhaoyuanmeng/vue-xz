module.exports = {
  devServer: {
    port: 3333,
    open: true
  },
  // 关闭eslint
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        // data变为prependData 还没遇到坑   @是相对路径模式
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}
