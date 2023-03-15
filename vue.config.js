const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8089',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      },
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  }
});
