<template>
  <transition name="slide">
    <div class="g-slides-item" v-if="visible" :class="{reverse}">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'gSlidesItem',
  data() {
    return {
      selected: undefined,
      reverse: false
    }
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    visible() {
      // console.log(`我的name是${this.name}`)
      // console.log(`我的方向是${this.reverse ? '反向' : '正向'}`)
      return this.selected === this.name
    }
  }
}
</script>
 <style lang="scss" scoped>
.g-slides-item {
}
.slide-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  // background: red !important;
  // border: 10px solid red;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter.reverse {
  transform: translateX(-100%);
}
.slide-leave-to.reverse {
  transform: translateX(100%);
}
</style>