import Alert from '../packages/alert/index'
import TreeSelect from '../packages/tree-select'

const components = [
  Alert,
  TreeSelect
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Alert
}