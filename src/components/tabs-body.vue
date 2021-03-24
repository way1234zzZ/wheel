<template>
  <div class="tabs-body">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'gTabsBody',
  inject: ['eventBus'],
  created() {
    // console.log('爷爷给body的eventbus')
    // console.log(this.eventBus)
  }
}
</script>
<style scoped>
</style>