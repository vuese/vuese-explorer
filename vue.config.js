module.exports = {
  baseUrl: '/vuese-explorer/',
  configureWebpack: {
    externals: {
      vue: 'Vue'
    },
    optimization: {
      runtimeChunk: true
    }
  }
}
