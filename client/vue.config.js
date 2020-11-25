const webpack = require('webpack')

module.exports = {
    publicPath: '/',
    filenameHashing: false,
    css: {
      loaderOptions: {
        sass: {
          additionalData: `@import "~@/scss/main.scss";`
        }
      }
    },
    chainWebpack: config => {
      config
      .plugin('provide')
      .use(webpack.ProvidePlugin, [{
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'window.Swal': 'sweetalert2',
        Swal: 'sweetalert2',
        axios: 'axios',
      }])
    },
}