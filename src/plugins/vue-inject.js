import Vue from 'vue';
import _get from 'lodash/get';
import fmtTime from '../utils/date';
import $axios from '../utils/axios';

Vue.prototype.$val = _get;
Vue.prototype.$time = fmtTime;
Vue.prototype.$axios = $axios;