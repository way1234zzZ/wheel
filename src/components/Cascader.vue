<template>
  <div class="cascader" v-click-outside="close">
    <div class="trigger" @click="toggle">
      {{result || '请选择'}}
    </div>
    <div class="popOver" v-if="popoverVisible">
      <g-cascader-item :loadingItem="loadingItem" :items="source" :height="popoverHeight" :selected="selected" @update:selected="onUpdateSelected" :loadData="loadData"></g-cascader-item>
    </div>
  </div>
</template>
<script>
import gCascaderItem from './cascader-item'
import ClickOutside from '@/click-outside.js'
export default {
  name: 'gCascader',
  directives: {
    ClickOutside
  },
  props: {
    source: {
      type: Array
    },
    popoverHeight: {
      Type: String,
    },
    selected: {
      type: Array,
      default: () => {
        return []
      }
    },
    loadData: {
      type: Function
    }
  },
  data() {
    return {
      popoverVisible: false,
      loadingItem: {}
    }
  },
  computed: {
    result() {
      return this.selected.map((item) => item.name).join('/')
    }
  },
  components: {
    gCascaderItem
  },
  methods: {
    onUpdateSelected(newSelected) {
      this.$emit('update:selected', newSelected)
      let lastItem = newSelected[newSelected.length - 1]
      let simplest = (children, id) => {
        return children.filter(item => item.id === id)[0]
      }
      let complex = (children, id) => {
        let noChildren = []
        let hasChildren = []
        children.forEach(item => {
          if (item.children) {
            hasChildren.push(item)
          } else {
            noChildren.push(item)
          }
        })
        let found = simplest(noChildren, id)
        if (found) {
          return found
        } else {
          found = simplest(hasChildren, id)
          if (found) { return found }
          else {
            for (let i = 0; i < hasChildren.length; i++) {
              found = complex(hasChildren[i].children, id)
              if (found) {
                return found
              }
            }
            return undefined
          }
        }
      }
      let updateSource = (result) => {
        this.loadingItem = {}
        let copy = JSON.parse(JSON.stringify(this.source))
        let toUpdate = complex(copy, lastItem.id)
        toUpdate.children = result
        this.$emit('update:source', copy)
      }
      if (!lastItem.isLeaf && this.loadData) {
        this.loadData(lastItem, updateSource) // 回调:把别人传给我的函数调用一下
        // 调回调的时候传一个函数,这个函数理论应该被调用
        this.loadingItem = lastItem
      }
    },
    toggle() {
      if (this.popoverVisible === true) {
        this.close()
      } else {
        this.open()
      }
    },
    open() {
      this.popoverVisible = true
    },
    close() {
      this.popoverVisible = false
    },
  }
}
</script>
<style lang="scss" scoped>
.cascader {
  position: relative;
  .trigger {
    border: 1px solid #ddd;
    height: 32px;
    min-width: 10em;
    display: inline-flex;
    align-items: center;
    padding: 0 1em;
    border-radius: 4px;
  }
  .popOver {
    position: absolute;
    top: 100%;
    margin-top: 4px;
    //弹出窗加颜色盖住原本的字体 不然弹出窗的内容与本来的重叠
    background: white;
    left: 0;
    display: flex;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
}
</style>