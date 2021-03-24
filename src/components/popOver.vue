<template>
  <div class="popOver" ref="popOver">
    <!-- 防止冒泡 点content不会取消 content之外的document才行 -->
    <!-- v-show只改变样式 v-if改变是否存在在dom树中 -->
    <div ref="contentWrapper" class="content-wrapper" v-if="visible" :class="{[`position-${position}`]:true}">
      <slot name="content" :close="close"></slot>
    </div>
    <span ref="triggerWrapper" class="triggerWrapper">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'gPopOver',
  data() {
    return {
      visible: false
    }
  },
  computed: {
    openEvent() {
      if (this.trigger === 'click') {
        return 'click'
      } else {
        return 'mouseenter'
      }
    },
    closeEvent() {
      if (this.trigger === 'click') {
        return 'click'
      } else {
        return 'mouseleave'
      }
    }
  },
  mounted() {
    this.addPopoverListeners()

  },
  beforeDestroy() {
    //@click自动删 原生要自己删
    this.putBackContent()
    this.removePopoverListeners()
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
      }
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return ['click', 'hover'].indexOf(value) >= 0
      }
    }
  },
  methods: {
    addPopoverListeners() {
      if (this.trigger === 'click') {
        this.$refs.popOver.addEventListener('click', this.onClick)
      } else {
        this.$refs.popOver.addEventListener('mouseenter', this.open)
        this.$refs.popOver.addEventListener('mouseleave', this.close)
      }
    },
    removePopoverListeners() {
      if (this.trigger === 'click') {
        this.$refs.popOver.removeEventListener('click', this.onClick)
      } else {
        this.$refs.popOver.removeEventListener('mouseenter', this.open)
        this.$refs.popOver.removeEventListener('mouseleave', this.close)
      }
    },
    putBackContent() {
      const { contentWrapper, popOver } = this.$refs
      if (!contentWrapper) { return }
      popOver.appendChild(contentWrapper)
    },
    postionContent() {
      //把contentWrapper放到body的最后，解决父元素overflow:hidden的问题
      const { contentWrapper } = this.$refs
      document.body.appendChild(contentWrapper)
      let { top, left, height, width } = this.$refs.triggerWrapper.getBoundingClientRect()
      let { height: height2 } = contentWrapper.getBoundingClientRect()
      let x = {
        top: {
          top: top + window.scrollY,
          left: left + window.scrollX
        },
        bottom: {
          top: top + height + window.scrollY,
          left: left + window.scrollX
        },
        left: {
          top: top + window.scrollY + (height - height2) / 2,
          left: left + window.scrollX
        },
        right: {
          top: top + window.scrollY + (height - height2) / 2,
          left: left + window.scrollX + width
        },
      }
      contentWrapper.style.left = x[this.position].left + 'px'
      contentWrapper.style.top = x[this.position].top + 'px'

    },
    onClickDocument(e) {
      if (this.$refs.triggerWrapper.contains(e.target) || this.visible && this.$refs.contentWrapper.contains(e.target)) {
        return
      }
      this.close()
    },
    open() {
      this.visible = true
      console.log('打开')
      setTimeout(() => {
        this.postionContent();
        console.log('添加事件')
        document.addEventListener('click', this.onClickDocument)
      })
    },
    close() {
      this.visible = false
      console.log('关闭')
      console.log('移除事件')
      document.removeEventListener('click', this.onClickDocument)
    },
    onClick(event) {
      //contains只能判断dom关系
      if (this.$refs.triggerWrapper.contains(event.target)) {
        if (this.visible === true) {
          this.close()
        } else {
          this.open()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$border-color: #333;
$border-radiius: 4px;
.popOver {
  display: inline-block;
  position: relative;
  vertical-align: top;
}
.content-wrapper {
  position: absolute;
  border: 1px solid $border-color;
  border-radius: $border-radiius;
  // box-shadow: 0 0 3px rgba(0, 0, 0, 0.75);
  //解决三角形没有阴影的问题
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.75));
  background: white;
  padding: 0.5em 1em;
  max-width: 20em;
  //一大串的英文识别为单词 换行
  word-break: break-all;
  &::before,
  &::after {
    content: "";
    display: block;
    border: 10px solid transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    width: 0;
    height: 0;
    position: absolute;
  }
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before,
    &::after {
      left: 10px;
    }
    &::before {
      border-top-color: black;
      border-bottom: none;
      top: 100%;
    }
    &::after {
      border-top-color: white;
      border-bottom: none;
      //一定要有空格 100% - 1px
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,
    &::after {
      left: 10px;
    }
    &::before {
      border-bottom-color: black;
      border-top: none;
      bottom: 100%;
    }
    &::after {
      border-bottom-color: white;
      border-top: none;
      //一定要有空格 100% - 1px
      bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      border-left-color: black;
      border-right: none;
      left: 100%;
    }
    &::after {
      border-left-color: white;
      border-right: none;
      //一定要有空格 100% - 1px
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      border-right-color: black;
      border-left: none;
      right: 100%;
    }
    &::after {
      border-right-color: white;
      border-left: none;
      //一定要有空格 100% - 1px
      right: calc(100% - 1px);
    }
  }
}
.triggerWrapper {
  //解决button比span高 inline-flex兼容性会差一点
  display: inline-block;
}
</style>