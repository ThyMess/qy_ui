<template>
  <div id="app">
    <el-alert title="测试"></el-alert>
    <qy-tree-select v-model="idList" :treeData="treeData" :list="list" @changeDetail="v => list = v"></qy-tree-select>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      idList:[],
      list:[],
      treeData:[
        {
          name:'部门a',
          showName:'',
          id:1,
          disabled:true,
          children:[
            {
              name:'测试',
              showName:'部门a-测试',
              id:2
            }
          ]
        }
      ]      
    }
  },
}
</script>