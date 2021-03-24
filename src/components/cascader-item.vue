<template>
  <div class="cascader-item" :style="{height:height}">
    <div class="left">
      <div class="label" v-for="(item,index) in items" :key="item+index" @click="onClickLabel(item)">
        <span class="name">{{item.name}}</span>
        <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <g-icon class="loading" name="loading"></g-icon>
          </template>
          <template v-else>
            <g-icon class="next" v-if="rightArrowVisible(item)" name="right"></g-icon>
          </template>
        </span>

      </div>
    </div>
    <div class="right" v-if="rightItems">
      <g-cascader-item :loading-item="loadingItem" :items="rightItems" :height="height" :level="level+1" :selected="selected" @update:selected="onUpdateSelected" :loadData="loadData"></g-cascader-item>
    </div>
  </div>
</template>
<script>
import gIcon from "./icon.vue"
export default {
  name: 'gCascaderItem',
  components: {
    gIcon
  },
  props: {
    items: {
      type: Array
    },
    height: {
      Type: String,
    },
    loadingItem: {
      type: Object,
      //返回空对象要有括号
      default: () => ({})
    },
    selected: {
      type: Array,
      default: () => {
        return []
      }
    },
    loadData: {
      type: Function
    },
    level: {
      type: Number,
      default: 0
    }
  },
  computed: {
    rightItems() {
      if (this.selected[this.level]) {
        let selected = this.items.filter((item) => item.name === this.selected[this.level].name)
        if (selected && selected[0].children && selected[0].children.length > 0) {
          return selected[0].children
        } else {
          return null
        }
      } else {
        return null
      }
    },
  },
  methods: {
    rightArrowVisible(item) {
      return this.loadData ? !item.isLeaf : item.children
    },
    onClickLabel(item) {
      //object key value
      //this.$set(this.selected, this.level, item)
      let copy = JSON.parse(JSON.stringify(this.selected))
      copy[this.level] = item
      //把level之后的值删掉 实现重新点击后面的隐藏
      copy.splice(this.level + 1)
      this.$emit('update:selected', copy)
    },
    onUpdateSelected(newSelected) {
      this.$emit('update:selected', newSelected)
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.cascader-item {
  display: flex;
  //align-items: flex-start;
  justify-content: flex-start;
  .left {
    padding: 0.3em 0;
    overflow: auto;
  }
  .right {
    //margin-top: -1px;
    border-left: 1px solid #ddd;
  }
  .label {
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
    > .name {
      margin-right: 1em;
      //不让选中，即不能全选复制那种
      user-select: none;
    }
  }
  .icons {
    margin-left: auto;
    .loading {
      animation: spin 2s infinite linear;
    }
    .next {
      //缩小0.5
      transform: scale(0.5);
    }
  }
}
</style>