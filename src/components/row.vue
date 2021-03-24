<template>
  <div class="row" :style="rowStyle" :class="rowClass">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'gRow',
  props: {
    gutter: {
      type: [Number, String]
    },
    align: {
      type: String,
      validator(value) {
        return ['left', 'right', 'center'].includes(value)
      }
    }
  },
  computed: {
    rowStyle() {
      let { gutter } = this
      return {
        marginLeft: -gutter / 2 + 'px',
        marginRight: -gutter / 2 + 'px'
      }
    },
    rowClass() {
      let { align } = this
      return [align && `align-${align}`]
    }
  },
  //created相当于docunmet.createElement
  created() {
    //console.log('row created');
  },
  //相当于document.body.appendChild
  mounted() {
    //col比row先mount所以等row mount完后 把row的gutter传给col
    this.$children.forEach((v) => {
      v.gutter = this.gutter
    })
    // this.$children.forEach(function (v) {
    //   v.gutter = this.gutter
    // }.bind(this))

  }

}
</script>
<style lang="scss" scoped>
.row {
  //flex默认 nowrap不换行 所以默认col里默认50%在遇到三列的情况下会更新
  //shrink:noshrink不收缩 三个50%
  display: flex;
  //手机会变成上下结构，不让换行会缩
  flex-wrap: wrap;
  // margin: 0 -10px;

  &.align-left {
    justify-content: flex-start;
  }
  &.align-right {
    justify-content: flex-end;
  }
  &.align-center {
    justify-content: center;
  }
}
</style>