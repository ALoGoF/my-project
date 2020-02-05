<script>
import { debounce } from '@/utils';
import { getListener, addListener, removeListener } from '@/utils/vnode';

const default_event = 'click';

function replaceDebounceEvts(vnode, debounceEvts, time) {
  if (Array.isArray(debounceEvts)) {
    debounceEvts.forEach(evt => {
      const handle = getListener(vnode, evt);
      if (handle) {
        removeListener(vnode, evt);
        const debounceHandle = debounce(handle, time);
        addListener(vnode, evt, debounceHandle);
      }
    })
  } else {
    const handle = getListener(vnode, debounceEvts);
    if (handle) {
      removeListener(vnode, debounceEvts);
      const debounceHandle = debounce(handle, time);
      addListener(vnode, debounceEvts, debounceHandle);
    }
  }
}

export default {
  functional: true,
  props: {
    time: {
      type: Number,
      default: 400
    },
    event: {
      type: [Array, String],
      default: default_event
    }
  },
  render(h, context) {
    const vnode = context.children;
    const debounceEvts = context.props.event;
    if (Array.isArray(vnode)) {
      vnode.forEach(n => {
        replaceDebounceEvts(n, debounceEvts, context.props.time);
      });
    } else {
      replaceDebounceEvts(vnode, debounceEvts, context.props.time);
    }
    return vnode;
  }
}
</script>