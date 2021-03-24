import Toast from './components/toast'

let currentToast

export default {
  install(Vue) {
    Vue.prototype.$toast = function (message, toastOptions) {
      //函数里的对象扩展 message:message然后简写
      if (currentToast) {
        currentToast.close()
      }
      currentToast = createToast({
        Vue, message, propsData: toastOptions, onClose: () => {
          currentToast = null
        }
      })
    }
  }
}

//js会自动把函数提到上面
function createToast({ Vue, message, propsData, onClose }) {
  let Constructor = Vue.extend(Toast)
  let toast = new Constructor({ propsData })
  toast.$slots.default = [message]
  toast.$mount()
  toast.$on('close', onClose)
  document.body.appendChild(toast.$el)
  return toast
}