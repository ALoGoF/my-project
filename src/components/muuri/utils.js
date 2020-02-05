export const EVENT = {
  LAYOUT_START: 'layoutStart',
  LAYOUT_END: 'layoutEnd',
  ADD: 'add',
  REMOVE: 'remove',
  SHOW_START: 'showStart',
  SHOW_END: 'showEnd',
  HIDE_START: 'hideStart',
  HIDE_END: 'hideEnd',
  FILTER: 'filter',
  SORT: 'sort',
  MOVE: 'move',
  SEND: 'send',
  BEFORE_SEND: 'beforeSend',
  RECEIVE: 'receive',
  BEFORE_RECEIVE: 'beforeReceive',
  DRAG_INIT: 'dragInit',
  DRAG_START: 'dragStart',
  DRAG_MOVE: 'dragMove',
  DRAG_SCROLL: 'dragScroll',
  DRAG_END: 'dragEnd',
  DRAG_RELEASE_START: 'dragReleaseStart',
  DRAG_RELEASE_END: 'dragReleaseEnd',
  DESTROY: 'destroy' 
}

export function isDiff(newVal, oldVal) {
  if (newVal.length !== oldVal.length) {
    return true;
  } else {
    let result = false;
    for (let i = 0, l = oldVal.length; i < l; i ++) {
      if (oldVal[i].key !== newVal[i].key) {
        result = true;
        break;
      }
    }
    return result;
  }
}

export function defaultItem(h) {
  return h('div', {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '12px 14px',
      fontSize: '18px',
      color: '#ccc',
      border: '1px solid #ccc'
    }
  }, '暂无 slot');
};