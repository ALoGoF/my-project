import axios from 'axios';
import Cookie from 'js-cookie';
import router from '../router';
import store from '../store';

const BASE_URL = process.env.VUE_APP_BASE_URL;

const $axios = axios.create({
  timeout: 10000,
  baseURL: BASE_URL,
  withCredentials: true
});

$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

$axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

$axios.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      if (error.message.includes('timeout')) {
        // 网络超时
      } else {
        // 断网状态
      }
      return;
    }
    const status = error.response.status;
    switch (status) {
      case 401:
        // 无权限
        break;
      case 403:
        // 登录信息过期，请重新登录
        Cookie.remove('access_token');
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 600);
        break;
      case 404:
        // 网络请求不存在
        break;
      default:
        // 其他错误
    }
    return Promise.reject(error);
  }
);

function fetch(options = {}) {
  let opts = Object.assign({
    autoCancel: true,
    cancelToken: true,
    autoErrorRes: true,
    autoGetData: true
  }, options);

  if (opts.autoCancel) {
    opts.cancelToken = store.state.fetchSource.token;
  }
  if (/{|}/.test(opts.url)) {
    opts.url = opts.url.replace(/\{.*?\}/g, tempStr => {
      const paramKey = tempStr.replace(/{|}/g, '');
      const paramVal = opts.params[paramKey];
      delete opts.params[paramKey]
      return paramVal;
    });
  }
  if (opts.paramsStr) {
    opts.url = opts.url + '?' + opts.paramsStr;
  }
  if (opts.autoErrorRes) {
    opts.validateStatus = status => {
      return status >= 200 && status < 300;
    };
  }
  return $axios(opts).then(res => {
    if (opts.autoGetData) {
      return res.data;
    }
  }).catch(error => {
    return Promise.reject(error);
  })
}

function storageFetch (type, options = {}, outTime = 60000) {
  let storageKey = JSON.stringify(options);
  let storageVal = window[type + 'Storage'].getItem(storageKey);
  if (storageVal) {
    storageVal = JSON.parse(storageVal);
    if (new Date().getTime() - storageVal.lastTime <= outTime) {
      return Promise.resolve(storageVal.data);
    }
  } else {
    return fetch(options).then(_ => {
      const data = options.autoGetData ? _ : _.data;
      window[type + 'Storage'].setItem(storageKey, {
        lastTime: new Date().getTime(),
        data
      });
      return _;
    });
  }
};

function sessionFetch(options, outTime) {
  return storageFetch('session', options, outTime)
}

function localFetch(options, outTime) {
  return storageFetch('local', options, outTime)
}

$axios.fetch = function(url) {
  return function(options) {
    return fetch({
      url,
      ...options
    });
  }
};

$axios.sessionFetch = function(url) {
  return function(options) {
    return sessionFetch({
      url,
      ...options
    });
  }
};

$axios.localFetch = function(url) {
  return function(options) {
    return localFetch({
      url,
      ...options
    });
  }
};

export default $axios;