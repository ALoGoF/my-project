<template>
  <div class="muuri-grid" style="position: relative;">
    <template v-if="instantiated">
      <muuri-item 
        v-for="item in items" 
        :key="item.key"
        :item-key="item.key"
        :item-data="item"
      ></muuri-item>
    </template>
  </div>
</template>

<script>
  import 'web-animations-js';
  import Muuri from 'muuri';
  import './plugins';

  import { addListener, removeListener } from 'resize-detector';
  import { debounce } from '@/utils';
  import { EVENT, isDiff } from './utils';

  import MuuriItem from './item/Item';
  
  export default {
    components: {
      MuuriItem
    },
    props: {
      value: {
        type: Array,
        required: true
      },
      options: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        instantiated: false,
        items: []
      }
    },
    watch: {
      value: {
        handler(newVal) {
          if (newVal) {
            const oldVal = this._grid ? this._grid.getItems().map(item => item.getData()) : [];
            if (isDiff(newVal, oldVal)) {
              this._updateItems(newVal);
              this.$emit('change', newVal);
            } 
          }
        },
        immediate: true
      }
    },
    mounted() {
      let options = this._initOptions(this.options);
      this._grid = new Muuri(this.$el, options);

      // 监听尺寸变化触发布局重新排列
      addListener(this.$el, this._layout);
      // 监听item变化同步数据
      this._bindSyncDataEvts();
      // 通过组件绑定的事件
      this._bindComponentEvts();

      // 初始化完成
      this.instantiated = true;
      this.$emit('loaded', this._grid);
    },
    beforeDestroy() {
      removeListener(this.$el, this._layout);
      this._unbindAllEvts();
      this._grid.destroy();
    },
    methods: {
      // 有bug，使用filter会导致拖拽卡住
      // filter(predicate, options) {
      //   this._grid.filter(predicate, options);
      // },
      sort(comparer, options) {
        this._grid.sort(comparer, options);
      },
      layout(instant, callback) {
        this._grid.layout(instant, callback)
      },
      changeLayout(layoutSettings) {
        this._grid._settings.layout = layoutSettings;
        this._grid.layout();
      },
      _initOptions(opts) {
        let newOpts = Object.assign({}, opts);
        if (opts.dragContainer && !opts.dragContainer.nodeName) {
          Object.assign(newOpts, {
            dragContainer: document.querySelector(opts.dragContainer)
          })
        }
        return newOpts;
      },
      _updateItems(data) {
        this.items = [...data];
      },
      _updateData() {
        const newData = this._grid.getItems().map(item => item.getData());
        this.$emit('input', newData);
        this.$emit('change', newData);
      },
      _bindSyncDataEvts() {
        this._grid.on(EVENT.DRAG_RELEASE_END, this._updateData);
        this._grid.on(EVENT.SORT, this._updateData);
        this._grid.on(EVENT.SEND, this._updateData);
        this._grid.on(EVENT.RECEIVE, this._updateData);
      },
      _bindComponentEvts() {
        Object.keys(this.$listeners).forEach(evtName => {
          this._grid.on(evtName, this.$listeners[evtName]);
        })
      },
      _unbindAllEvts() {
        this._grid.off(EVENT.DRAG_RELEASE_END, this._updateData);
        this._grid.off(EVENT.SORT, this._updateData);
        this._grid.off(EVENT.SEND, this._updateData);
        this._grid.off(EVENT.RECEIVE, this._updateData);

        Object.keys(this.$listeners).forEach(evtName => {
          this._grid.off(evtName, this.$listeners[evtName]);
        })
      },
      _layout: debounce(function() {
        this._grid.layout();
      }, 150)
    }
  };
</script>

<style lang="scss" scoped>
.muuri-grid {
  min-height: 20px;
}
</style>