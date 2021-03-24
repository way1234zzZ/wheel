<template>
  <g-row>
    <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
      <div class="demo"></div>
    </g-col>
    <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
      <div class="demo"></div>
    </g-col>
    <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
      <div class="demo"></div>
    </g-col>
    <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
      <div class="demo"></div>
    </g-col>
    <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
      <div class="demo"></div>
    </g-col>
    <g-col span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
      <div class="demo"></div>
    </g-col>
  </g-row>
</template>
<script>
import gRow from '@/components/row.vue'
import gCol from '@/components/col.vue'
export default {
  components: {
    gRow,
    gCol,
  }
}
</script>
<style lang="scss" scoped>
.demo {
  border: 1px solid red;
  height: 100px;
}
</style>