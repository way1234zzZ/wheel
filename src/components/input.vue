<template>
  <!-- <div class="wrapper" :class="{'error':error}"> -->
  <!-- 如果存在error类 -->
  <div class="wrapper" :class="{error}">
    <!-- :value为 input原有属性value -->
    <!-- $event当前事件对象，浏览器赋予 -->
    <input :value="value" type="text" :disabled="disabled" :readonly="readonly" @change="$emit('change',$event.target.value,'hi')" @input="$emit('input',$event.target.value,'hi')" @focus="$emit('focus',$event.target.value,'hi')"
      @blur="$emit('blur',$event.target.value,'hi')">
    <!-- 用template取代div 否则要给div加样式 -->
    <template v-if="error">
      <g-icon name="error" class="icon-error"></g-icon>
      <span class="errorMsg">{{error}}</span>
    </template>
  </div>
</template>

<script>
import gIcon from './icon.vue'
export default {
  name: 'gInput',
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    }
  },
  components: {
    gIcon
  }
}
</script>

<style lang="scss" scoped>
// scoped给组件加上唯一id
$height: 32px;
$border-color: #999;
$border-color-hover: #666;
$border-radius: 4px;
$font-size: 12px;
$box-shadow-color: rgba(0, 0, 0, 0.5);
$red: #f1453d;
.wrapper {
  font-size: $font-size;
  //怎么做到对齐居中的
  display: inline-flex;
  align-items: center;

  //下面两种一样的效果
  > :not(:last-child) {
    margin-right: 0.5em;
  }

  // > * {
  //   margin-right: 0.5em;
  //   &:last-child {
  //     margin-right: 0;
  //   }
  // }

  > input {
    height: $height;
    padding: 0 8px;
    border: 1px solid $border-color;
    font-size: inherit;
    &:hover {
      border-color: $border-color-hover;
    }
    border-radius: $border-radius;
    &:focus {
      box-shadow: inset 0 1px 3px $box-shadow-color;
      outline: none;
    }
    // readonly可以focus disabled不行
    &[disabled],
    &[readonly] {
      border-color: #bbb;
      color: #bbb;
      cursor: not-allowed;
    }
  }
  // 同时具有两个类名的元素
  &.error {
    > input {
      border-color: $red;
    }
  }
  // 这里不能加& 不是直接子代
  .icon-error {
    fill: $red;
  }
  .errorMsg {
    color: $red;
  }
}
// .error {
//   > input {
//     border-color: $red;
//   }
// }
</style>