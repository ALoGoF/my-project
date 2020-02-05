<script>
import { Message } from 'element-ui';
import { addListener, removeAllListeners } from '@/utils/vnode';

const hasAuth = false;

export default {
  functional: true,
  render(h, context) {
    const vnode = context.children;

    if (hasAuth) {
      return vnode;
    } else {
      if (context.props.type === 'warn') {
        if (Array.isArray(vnode)) {
          vnode.forEach(n => {
            removeAllListeners(n);
            addListener(n, 'click', () => Message.warning('无权限'));
          });
        } else {
          removeAllListeners(vnode);
          addListener(vnode, 'click', () => Message.warning('无权限'));
        }
        return vnode;
      } else {
        return null;
      }
    }
  }
};
</script>