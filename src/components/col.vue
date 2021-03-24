<template>
  <!-- 如果有offset -->
  <div class="col" :class="colClasses" :style="colStyle">
    <!-- <div style="border:1px solid green;height:100px"> -->
    <slot></slot>
    <!-- </div> -->
  </div>
</template>
<script>
let validator = (value) => {
  let keys = Object.keys(value)
  let valid = true
  keys.forEach(key => {
    if (!['span', 'offset'].includes(key)) {
      valid = false
    }
  })
  return valid
}
export default {
  name: 'gCol',
  data() {
    return {
      gutter: 0,

    }
  },
  methods: {
    createClass(obj, str = '') {
      let array = []
      if (!obj) {
        return array
      }
      if (obj.span) {
        array.push(`col-${str}${obj.span}`)
      }
      if (obj.offset) {
        array.push(`offset-${str}${obj.offset}`)
      }
      return array
    }
  },
  computed: {
    colClasses() {
      //解构，快速获取this对象中的span offset
      let { span, offset, ipad, narrowPc, pc, widePc } = this
      let createClass = this.createClass
      return [
        ...createClass({ span, offset }),
        ...createClass(ipad, 'ipad-'),
        ...createClass(narrowPc, 'narrow-pc-'),
        ...createClass(pc, 'pc-'),
        ...createClass(widePc, 'wide-pc-')
      ]
      //return [
      // span && `col-${span}`,
      // offset && `offset-${offset}`,
      //...(phone && [`col-phone-${phone.span}`]),app没有写phone或者下面的iPad等，结果为undefined,扩展不了，报错
      // ...(ipad ? [`col-ipad-${ipad.span}`] : []),
      // ...(narrowPc ? [`col-narrow-pc-${narrowPc.span}`] : []),
      // ...(pc ? [`col-pc-${pc.span}`] : []),
      // ...(widePc ? [`col-wide-pc-${widePc.span}`] : []),
      //]
      //return [this.span && `col-${this.span}`, this.offset && `offset-${this.offset}`]
    },
    colStyle() {
      return {
        paddingLeft: this.gutter / 2 + 'px',
        paddingRight: this.gutter / 2 + 'px'
      }
    }
  },
  props: {
    span: {
      //既可以传number，也可以传string
      type: [Number, String]
    },
    offset: {
      type: [Number, String]
    },
    // phone: {
    //   type: Object,
    //   validator: validator
    //   //validator,
    // },
    ipad: {
      type: Object,
      validator,
    },
    narrowPc: {
      type: Object,
      validator,
    },
    pc: {
      type: Object,
      validator,
    },
    widePc: {
      type: Object,
      validator,
    }

  },
  created() {
    // console.log('col created');
  },
  //相当于document.body.appendChild
  mounted() {
    //console.log('col mounted');
  }
}
</script>
<style lang="scss" scoped>
.col {
  // height: 100px;
  // background: grey;
  // border: 1px solid red;
  //width: 50%;

  //mobile first移动端优先
  $class-prefix: col-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }

  $class-prefix: offset-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }

  //手机的写在下面 后写的权重更大
  // @media (max-width: 576px) {
  //   $class-prefix: col-phone-;
  //   @for $n from 1 through 24 {
  //     &.#{$class-prefix}#{$n} {
  //       width: ($n / 24) * 100%;
  //     }
  //   }

  //   $class-prefix: offset-phone;
  //   @for $n from 1 through 24 {
  //     &.#{$class-prefix}#{$n} {
  //       margin-left: ($n / 24) * 100%;
  //     }
  //   }
  // }

  @media (min-width: 577px) {
    $class-prefix: col-ipad-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-ipad-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }

  @media (min-width: 769px) {
    $class-prefix: col-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }

  @media (min-width: 993px) {
    $class-prefix: col-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }

  @media (min-width: 1201px) {
    $class-prefix: col-wide-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-wide-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
}
</style>