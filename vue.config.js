const { defineConfig } = require('@vue/cli-service')
var path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  pages:{
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.module.rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  },
  configureWebpack: {
    resolve:{
      alias: {
        examples: path.resolve(__dirname, './examples'),
        packages: path.resolve(__dirname, './packages'),
        utils: path.resolve(__dirname, './src/utils'),
        assets: path.resolve(__dirname, './src/assets'),
        'qy-ui': path.resolve(__dirname, './'),
      }
    },
    // externals: {
    //   vue: 'Vue',
    // }
  }
})
