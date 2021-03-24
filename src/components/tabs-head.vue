<template>
  <div class="tabs-head" ref="head">
    <slot></slot>
    <div class="line" ref="line" v-show="x"></div>
    <!-- slot上不能加class -->
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gTabsHead',
  inject: ['eventBus'],
  data() {
    return {
      x: false
    }
  },
  mounted() {
    // console.log('爷爷给爸爸的eventbus')
    // console.log(this.eventBus)
    //vue的事件系统不会冒泡 不会触发父级tab组件的update事件
    //this.$emit('update:selected', '这是this $emit出来的数据')
    this.eventBus.$on('update:selected', (item, selectedVm) => {
      //对象的解构赋值
      //getBoundingClientRect是距离浏览器的可视范围的距离 不是父元素
      this.x = true
      // let { width, left } = vm.$el.getBoundingClientRect();
      // // console.log(typeof vm.$el.getBoundingClientRect())
      // //console.log(width, height, top, left)
      // this.$refs.line.style.width = `${width}px`
      // this.$refs.line.style.transform = `translateX(${left}px)`
      let { width, left } = selectedVm.$el.getBoundingClientRect()
      let { left: left2 } = this.$refs.head.getBoundingClientRect()
      this.$refs.line.style.width = `${width}px`
      this.$refs.line.style.left = `${left - left2}px`
    })
  }
}
</script>
<style lang="scss" scoped>
$tab-height: 40px;
$blue: blue;
.tabs-head {
  display: flex;
  height: $tab-height;
  justify-content: flex-start;
  position: relative;
  border-bottom: 1px solid #ddd;
  > .actions-wrapper {
    //前面三个item都是flex往左，这里加left auto就能实现在右边的效果
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
  }
  > .line {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid $blue;
    transition: all 350ms;
  }
}
</style>