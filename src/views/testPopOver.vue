<template>
  <div style="overflow: hidden; padding-top: 150px; padding-bottom: 40px;">
    <g-pop-over position="bottom">
      <!-- 解构 -->
      <template slot="content" slot-scope="{close}">
        <div>文字</div>
        <div>popover <a href="http://qq.com">看新网</a> 内容</div>
        <g-button @click="close">关闭</g-button>
      </template>
      <g-button>点我</g-button>
    </g-pop-over>
    <g-pop-over position="top">
      <template slot="content">
        <div>popover内容
          <g-button>关闭</g-button>
        </div>
      </template>
      <g-button>点我</g-button>
    </g-pop-over>
    <g-pop-over position="right" trigger="hover">
      <template slot="content">
        <div>popover <a href="http://qq.com">看新网</a> 内容</div>
      </template>
      <g-button>点我</g-button>
    </g-pop-over>
  </div>
</template>
<script>
import gButton from '@/components/button.vue'
import gPopOver from '@/components/popOver.vue'
export default {
  name: 'testPopOver',
  components: {
    gPopOver,
    gButton
  },
  methods: {

  }
}
</script>