<template>
  <div class="tabs-panel" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'gTabsPanel',
  data() {
    return {
      active: false
    }
  },
  computed: {
    classes() {
      return {
        active: this.active
      }
    }
  },
  props: {
    name: {
      type: String || Number,
      required: true
    }
  },
  inject: ['eventBus'],
  created() {
    // console.log('爷爷给panel的eventbus')
    // console.log(this.eventBus)
    this.eventBus.$on('update:selected', (name) => {
      if (name === this.name) {
        //console.log(`panel${this.name}被选中了`)
        this.active = true
      } else {
        this.active = false
        // console.log(`panel${this.name}没被选中了`)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.tabs-panel {
  padding: 1em;
}
</style>