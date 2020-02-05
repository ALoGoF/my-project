import { defaultItem } from '../utils';

export default {
  functional: true,
  props: {
    itemData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  render(h, context) {
    const parent = context.parent.$parent;
    const slotName = context.props.itemData.slotName ? context.props.itemData.slotName : 'item';
    return parent.$scopedSlots[slotName] ? parent.$scopedSlots[slotName](context.props.itemData) : defaultItem(h, {
      key: context.props.itemData.key
    });
  }
}