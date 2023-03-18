const packageJSON = require("./package.json");
module.exports = {
  devServer: {
    compress: true
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].VUE_APP_VERSION = `"${packageJSON.version}"`
      return args
    });
    config.plugin('html').tap(args => {
      args[0].title = packageJSON.title;
      return args
    });
  },
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    extract: { ignoreOrder: true },
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/main.scss";`
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",
    output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[contenthash].js',
  },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',  
      }
    }
  }
}
