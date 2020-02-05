<template>
  <div class="muuri-item">
    <div class="muuri-item-content">
      <item-content :item-data="itemData"></item-content> 
    </div>
  </div>
</template>

<script>
  import { addListener, removeListener } from 'resize-detector';
  import { debounce } from '@/utils';
  import { defaultItem } from '../utils';

  import ItemContent from './ItemContent';

  export default {
    components: {
      ItemContent
    },
    props: {
      itemKey: {
        type: [Number, String],
        required: true
      },
      itemData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    mounted() {
      this._item = this.$parent._grid.add(this.$el)[0];
      this._item.setData(this.itemData);

      // 监听尺寸变化触发布局重新排列
      addListener(this.$el, this._refreshGridLayout);
    },
    beforeDestroy() {
      removeListener(this.$el, this._refreshGridLayout);
      this.$parent._grid.remove(this._item, { removeElements: true });
    },
    methods: {
      _refreshGridLayout: debounce(function() {
        this.$parent._grid.refreshItems().layout(true);;
      }, 150)
    }
  };
</script>

<style lang="scss" scoped>
.muuri-item {
  position: absolute;
  z-index: 1;
  &.muuri-item-dragging {
    z-index: 5;
  }
  &.muuri-item-releasing {
    z-index: 2;
  }
  &.muuri-item-placeholder {
    margin: 0 !important;
    z-index: 1;
  }
  &.muuri-item-hidden {
    z-index: 0;
  }
  .muuri-item-content {
    position: relative;
    width: 100%;
    height: 100%;
    transition: all .3s;
    z-index: 2;
  }
}
</style>