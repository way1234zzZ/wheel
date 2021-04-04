<template>
  <g-layout style="height:100vh">
    <g-header class="demo">header</g-header>
    <!-- <g-content class="demo">content</g-content> -->
    <g-layout>
      <g-sider class="demo">sider</g-sider>
      <g-content class="demo">content</g-content>
    </g-layout>
    <g-footer class="demo">footer</g-footer>
  </g-layout>
</template>


<style lang="scss" scoped>
.demo {
  border: 1px solid #666;
  min-height: 100px;
}
.sider {
  background: #333;
  width: 200px;
}
.header {
  background: #999;
  height: 100px;
}
.footer {
  background: #ccc;
  height: 50px;
}
</style>