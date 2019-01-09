module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue'
    },
    optimization: {
      runtimeChunk: true
    }
  }
}
