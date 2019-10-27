const webpack = require('webpack');

// @ts-ignore
module.exports = {
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
      ]
    }
  }