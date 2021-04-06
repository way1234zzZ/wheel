let onClickDocument = (e) => {
  let { target } = e
  callbacks.forEach((item) => {
    if (target === item.el || item.el.contains(target)) {
      return
    } else {
      item.callback()
    }
  })
}
//一开始就监听 一直点一直加
document.addEventListener('click', onClickDocument)
let callbacks = []
export default {
  bind: function (el, binding) {
    callbacks.push({ el, callback: binding.value })
  }
}

let removeListener = () => {
  document.removeEventListener('click', onClickDocument)
}

export { removeListener }