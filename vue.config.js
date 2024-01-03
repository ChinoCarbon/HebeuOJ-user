module.exports = {
  devServer: {
   //proxy: "http://47.122.7.238:8080"
   proxy: "http://localhost:8080/"
  },
  chainWebpack: config => {
    config.module
        .rule('')
        .test(/\.md$/)
        .use('html-loader')
        .loader('html-loader')
        .end()
        .use('markdown-loader')
        .loader('markdown-loader')
        .end()
  }
}

