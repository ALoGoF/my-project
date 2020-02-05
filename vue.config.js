const path = require('path');
const server = require('./server'); 

const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'echarts': 'echarts',
  'element-ui': 'ELEMENT'
}

const cdn = {
  dev: {
    css: [],
    js: []
  },
  build: {
    css: [],
    js: [
      'https://cdn.bootcss.com/vue/2.5.2/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
      'https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js',
      'https://cdn.bootcss.com/element-ui/2.12.0/index.js'
    ]
  }
}

const aliasMap = {};

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  assetsDir: './',
  productionSourceMap: false,
  devServer: {
    // host: 'localhost',
    // port: 8080,
    // https: false,
    // open: true,
    // proxy: {
    //   '/url': {
    //     target: 'http://115.236.68.205:8080/',
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/url': ''
    //     }
    //   }
    // },
    before(app) {
      server(app);
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData:  `@import "@/assets/style/theme.scss";@import "@/assets/style/layout.scss";`
      }
    }
  },
  configureWebpack: config => {
    const myConfig = {};
    if (process.env.NODE_ENV === 'production') {
      // 生产环境npm包转CDN
      myConfig.externals = externals;
    }
    return myConfig;
  },
  chainWebpack: config => {
    Object.keys(aliasMap).forEach(key => {
      config.resolve.alias.set(key, resolve(aliasMap[key]));
    });
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config
      .plugin('html')
      .tap(args => {
        if (process.env.NODE_ENV === 'production') {
          args[0].cdn = cdn.build
        }
        if (process.env.NODE_ENV === 'development') {
          args[0].cdn = cdn.dev
        }
        return args
      })
    /**
     * 添加SVG配置
     */ 
    config.module.rule('svg-sprite').use('svgo-loader').loader('svgo-loader'); 
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}