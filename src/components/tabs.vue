<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'gTabs',
  props: {
    selected: {
      type: String,
      required: true//必须要这个属性
    },
    direction: {
      type: String,
      default: 'horizontal',//横向，
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) >= 0
      }
    }
  },
  data() {
    return {
      eventBus: new Vue()
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  mounted() {
    this.$children.forEach((vm) => {
      if (this.$children.length === 0) {
        //如果console console.warn存在 有的浏览器不存在
        console && console.warn && console.warn('tabs的子组件应该是tabs-hea和tabs-body，但你没有写子组件')
      }
      if (vm.$options.name === 'gTabsHead') {
        vm.$children.forEach((childVm) => {
          //childVm.name是childVm里props里的name
          if (childVm.$options.name === "gTabsItem" && childVm.name === this.selected) {
            //console.log(childVm.$el)
            this.eventBus.$emit('update:selected', this.selected, childVm)
          }
        })
      }
    })
    //这是emit事件
    //this.$emit('update:selected', '这是this $emit出来的数据')
    //这是eventBus事件 不一样
    //告诉子孙们选中的是哪个
    //this.eventBus.$emit('update:selected', this.selected)
    // console.log(this.eventBus)
    // console.log(this)y

  }
}
</script>
<style scoped>
</style>