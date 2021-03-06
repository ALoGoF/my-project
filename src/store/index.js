import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const requireContext = require.context('./modules', false, /\.js$/);

const modules = requireContext.keys().reduce((prev, fileName) => {
  const moduleConfig = requireContext(fileName);
  const moduleName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
  const module = moduleConfig.default || moduleConfig;
  module.namespaced = true;
  prev[moduleName] = moduleConfig.default || moduleConfig;
  return prev;
}, {});

export default new Vuex.Store({
  modules,
  state: () => ({
    fetchSource: null
  }),
  mutations: {
    setFetchSource (state, payload) {
      state.fetchSource = payload;
    }
  },
  actions: {}
});
