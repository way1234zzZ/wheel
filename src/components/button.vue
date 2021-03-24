<template>
  <!-- 这里为什么要放进数组 -->
  <button class="gButton" :class="{[`icon-${iconPosition}`]:true}" @click="switchLoading">
    <!-- <button class="gButton" :class="[`icon-${iconPosition}`]" @click="switchLoading"> -->
    <!-- :icon的icon为传给icon.vue的属性 “icon”为app.vue传来的icon属性（变量） -->
    <g-icon v-if="icon && !loading" class="icon" :name="icon"></g-icon>
    <g-icon v-if="loading" class="loading icon" name="loading"></g-icon>
    <div class="content">
      <slot></slot>
    </div>

  </button>
</template>

<script>
import gIcon from './icon.vue'
export default {
  name: "gButton",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    iconPosition: {
      type: String,
      default: 'left',
      //value可以随便取 prop的验证函数 iconPosition不为左或者右时报错
      validator(value) {
        return !(value != 'left' && value != 'right')
      }
    }
  },
  components: {
    gIcon,
  },
  methods: {
    switchLoading() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
//spin:名称
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.gButton {
  font-size: var(--font-size);
  height: var(--button-height);
  padding: 0 1em;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background: var(--button-bg);
  display: inline-flex;
  //解决inline中基线对齐的问题 以后要看
  vertical-align: middle;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: var(--border-color-hover);
  }
  &:active {
    background-color: var(--button-active-bg);
  }
  &:focus {
    outline: none;
  }
  > .icon {
    order: 1;
    margin-right: 0.1em;
  }
  > .content {
    order: 2;
  }

  &.icon-right {
    > .icon {
      order: 2;
      //这里为什么会多一个margin-right
      margin-right: 0;
      margin-left: 0.1em;
    }
    > .content {
      order: 1;
    }
  }
}
.icon {
  width: 1em;
  height: 1em;
}
.loading {
  animation: spin 1s infinite linear;
}
</style>