const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath 默认值是 '/'，只能部署在服务器上才能看到页面效果，也就是要通过 http 协议才能访问。
  // 想要使用 file 协议在本地看到页面效果，需要将 publicPath 设置成 './' 或者 ''
  publicPath: './',
  // 去掉生产环境下的 soursemap
  productionSourceMap: false,
  // 完全关闭ESlint
  lintOnSave: false,
  // 在 vue-cli 中设置 webpack 配置项
  configureWebpack: {
    // 打包优化，添加打包时的排除项
    externals: {
      // 包名: 引入的 js 脚本文件中的名称
      echarts: 'echarts',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      'element-ui': 'ELEMENT',
      'vue-quill-editor': 'VueQuillEditor',
      axios: 'axios',
      dayjs: 'dayjs'
    }
  }
})
