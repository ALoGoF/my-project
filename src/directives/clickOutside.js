// 点击元素外部
export default {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      let show = el.style.display !== 'none';
      if (el.contains(e.target)) {
        return;
      }
      if (binding.expression && show) {
        binding.value(e);
      }
    }
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind(el) {
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
}
