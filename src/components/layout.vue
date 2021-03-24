<template>
  <div class="layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "gLayout",
  data() {
    return {
      layoutClass: {
        hasSider: false
      }
    }
  },
  mounted() {
    this.$children.forEach(vm => {
      //要在组件里设定name属性才行
      // console.log(vm.$options.name)
      if (vm.$options.name == 'gSider') {
        this.layoutClass.hasSider = true
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  //如果自己是个子组件
  flex: 1;
  flex-direction: column;
  // height: 100vh;
  &.hasSider {
    flex-direction: row;
  }
}
</style>
