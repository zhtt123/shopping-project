const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //让map文件不打包
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave: false,  //关闭eslint
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
