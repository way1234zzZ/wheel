<template>
  <div class="g-slides" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
    <div class="g-slides-window">
      <div class="g-slides-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="g-slides-dots">
      <span @click="onClickPre">
        <g-icon name="left"></g-icon>
      </span>

      <span v-for="n in childrenLength" :key="n" :class="{active: selectedIndex === n-1}" @click="select(n-1)">
        {{n}}
      </span>
      <span @click="onClickNext">
        <g-icon name="right"></g-icon>
      </span>
    </div>
  </div>
</template>
<script>
import gIcon from '@/components/icon.vue'
export default {
  name: 'gSlides',
  components: {
    gIcon
  },
  data() {
    return {
      childrenLength: 0,
      lastSelectedIndex: undefined,
      timerId: undefined,
      startTouch: undefined
    }
  },
  computed: {
    selectedIndex() {
      let index = this.names.indexOf(this.selected)
      return index == -1 ? 0 : index
    },
    names() {
      return this.items.map(vm => vm.name) || 0
    },
    items() {
      return this.$children.filter(vm => vm.$options.name === 'gSlidesItem')
    }
  },
  props: {
    selected: {
      type: String
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.playAutomatically()
    // this.updateChildren()
    this.childrenLength = this.items.length
  },
  updated() {
    this.updateChildren()
  },
  methods: {
    onClickPre() {
      this.select(this.selectedIndex - 1)
    },
    onClickNext() {
      this.select(this.selectedIndex + 1)
    },
    onTouchStart(e) {
      this.pause()
      this.startTouch = e.touches[0]
    },
    onTouchMove() {
    },
    onTouchEnd(e) {
      //两个指头滑动等
      if (e.touches.length > 1) {
        return
      }
      let endTouch = e.changedTouches[0]
      let { clientX: x1, clientY: y1 } = this.startTouch
      let { clientX: x2, clientY: y2 } = endTouch
      let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      let deltaY = Math.abs(y2 - y1)
      let rate = distance / deltaY
      if (rate > 2) {
        if (x2 > x1) {
          this.select(this.selectedIndex - 1)
        } else {
          this.select(this.selectedIndex + 1)
        }
      } else {
        console.log('没滑')
      }
      this.$nextTick(() => {
        this.playAutomatically()
      })
    },
    onMouseLeave() {
      this.playAutomatically()
      console.log('leave')
    },
    onMouseEnter() {
      this.pause()
    },
    select(newIndex) {
      if (newIndex === -1) {
        newIndex = this.names.length - 1
      }
      if (newIndex === this.names.length) {
        newIndex = 0
      }
      this.lastSelectedIndex = this.selectedIndex
      this.$emit("update:selected", this.names[newIndex])
    },
    getSelected() {
      let first = this.items[0]
      let selected = this.selected || first.name
      return selected
    },
    updateChildren() {
      //children找子组件
      this.items.forEach((vm) => {
        vm.reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
        if (this.timerId) {
          if (this.lastSelectedIndex === this.items.length - 1 && this.selectedIndex === 0) {
            vm.reverse = false
          }
          if (this.lastSelectedIndex === 0 && this.selectedIndex === this.items.length - 1) {
            vm.reverse = true
          }
        }
        this.$nextTick(() => {
          vm.selected = this.getSelected()
        })
      })
    },
    playAutomatically() {
      if (this.timerId) {
        return
      }
      let run = () => {
        let index = this.names.indexOf(this.getSelected())
        let newIndex = index + 1
        this.select(newIndex)
        this.timerId = setTimeout(run, 3000)
      }
      this.timerId = setTimeout(run, 3000)
    },
    pause() {
      window.clearTimeout(this.timerId)
      this.timerId = undefined
    }
  }
}
</script>
 <style lang="scss" scoped>
.g-slides {
  &-window {
    overflow: hidden;
  }
  &-wrapper {
    position: relative;
  }
  &-dots {
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #ddd;
      margin: 0 8px;
      font-size: 12px;
      &:hover {
        cursor: pointer;
      }
      &.active {
        background: black;
        color: white;
        cursor: default;
      }
    }
  }
}
</style>