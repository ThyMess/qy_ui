import TreeSelect from './src/main';

TreeSelect.install = function(Vue) {
  Vue.component(TreeSelect.name, TreeSelect);
};

export default TreeSelect