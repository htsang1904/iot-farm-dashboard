var path = require('path')
module.exports = {
    outputDir: undefined,
    assetsDir: 'assets',
    runtimeCompiler: undefined,
    productionSourceMap: false,
    parallel: undefined,

    configureWebpack:{
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                src: path.resolve(__dirname, 'src')
            },
            extensions: ['*', '.js', '.vue', '.json']
        },
        module: {
            rules: [
              {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
              }
            ]
        }
    },
    css: {
      loaderOptions: {
        css: {
          url: false
        }
      }
    }
};
