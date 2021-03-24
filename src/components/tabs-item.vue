<template>
  <div class="tabs-item" @click="onClick" :class="classes">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'gTabsItem',
  data() {
    return {
      active: false
    }
  },
  computed: {
    classes() {
      return {
        active: this.active,
        disabled: this.disabled
      }
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String || Number,
      required: true
    }
  },
  inject: ['eventBus'],
  created() {
    // console.log('爷爷给item的eventbus')
    //收到tabs发出的谁被选中了
    this.eventBus.$on('update:selected', (name) => {
      if (name === this.name) {
        this.active = true;
        //console.log(`我${this.name}被选中了`)
      } else {
        this.active = false;
        //console.log(`我${this.name}没被选中了`)
      }
    })
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return;//不能点
      }
      //告诉tabs的selected自己的名字
      this.eventBus.$emit('update:selected', this.name, this)
    }
  }
}
</script>
<style lang="scss" scoped>
$blue: blue;
.tabs-item {
  flex-shrink: 0;
  padding: 0 1em;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  &.active {
    color: $blue;
    font-weight: bold;
  }
  &.disabled {
    color: grey;
    cursor: not-allowed;
  }
}
</style>