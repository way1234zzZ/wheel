<template>
  <div class="app">
    <g-row class="topbar">
      <g-col class="demoBox" span="9">
        <g-row>
          <!-- 加style可以覆盖 -->
          <g-col>1</g-col>
          <g-col>2</g-col>
          <g-col>3</g-col>
          <g-col>4</g-col>
        </g-row>
      </g-col>
      <g-col class="demoBox" span="15">
        <g-row align="right">
          <g-col>

          </g-col>
          <g-col>2</g-col>
          <g-col>3</g-col>
          <g-col>4</g-col>
          <g-col>5</g-col>
          <g-col>6</g-col>
          <g-col>7</g-col>
        </g-row>
      </g-col>
    </g-row>
    <g-row class="logo-and-search-and-qrcode">
      <g-col class="demoBox" span="3">
        <g-row align="center">
          <g-col>
            <!-- 或者不加g-row g-col 在 logo-wrapper里加display：flex 和 justify-content:center -->
            <div class="logo-wrapper">
              <img class="logo" src="https://img.alicdn.com/imgextra/i4/O1CN01M3JbAy1Lz2ruh2Efa_!!6000000001369-1-tps-190-140.gif" alt="">
            </div>
          </g-col>
        </g-row>

      </g-col>
      <g-col class="demoBox" span="14"></g-col>
      <g-col class="demoBox" span="7"></g-col>
    </g-row>
  </div>
</template>
<script>
import gRow from '@/components/row.vue'
import gCol from '@/components/col.vue'
export default {
  components: {
    gRow,
    gCol
  }
}
</script>
<style lang="scss" scoped>
img {
  max-width: 100%;
}
.logo-wrapper {
  padding: 10px;
}
.demoBox {
  min-height: 50px;
  background: grey;
  border: 1px solid red;
}
</style>