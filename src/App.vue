<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
import Vue from 'vue';

function formatLayoutName(name) {
  return 'layout-' + name.toLowerCase();
}
// 自动注册layout组件
const requireContext = require.context('./layouts', false, /\.vue$/);

const registeredComponentNames = requireContext.keys().reduce((prev, fileName) => {
  const componentConfig = requireContext(fileName);
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
  const layoutName = formatLayoutName(componentName);
  Vue.component(layoutName, componentConfig.default || componentConfig);

  prev.push(componentName.toLowerCase());
  return prev;
}, []);

export default {
  name: 'app',
  created() {
    this.$store.commit('layout/setComponentNames', registeredComponentNames);
  },
  computed: {
    layout() {
      const layoutRoute = this.$route.matched[0];
      if (layoutRoute) {
        const componentName = layoutRoute.components.default.layout;
        if (componentName && registeredComponentNames.indexOf(componentName.toLowerCase()) > -1) {
          return formatLayoutName(componentName);
        } else {
          const defaultName = this.$store.state.layout.defaultName;
          return formatLayoutName(defaultName);
        }
      } else {
        return ''
      }
    }
  }
};
</script>

<style>
#app {
  height: 100vh;
  min-width: 1230px;
}
</style>
