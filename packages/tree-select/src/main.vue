<template>
  <div class="qy-tree-select">
    <el-select
      v-model="selectedList"
      ref="select"
      style="width: 100%"
      multiple
      popper-class="special-popper"
      @remove-tag="removeTag"
    >
      <el-option :label="1" :value="1" hidden></el-option>
      <el-option v-for="(item,index) in selectListDetail" :key="index" hidden :label="item.showName" :value="item.id" style="width:0;height:0;visibility:hidden"></el-option>
      <div class="tree">
        <div class="top">
          <div class="left">
            <div class="left-search">
              <div>综合搜索:</div>
              <el-input
                class="search-inputs"
                clearable
                placeholder="请输入内容"
                v-model="filterKey"
                @clear="clearFilter"
              >
              </el-input>
              <el-button type="primary" size="small" @click="filter"
                >搜索</el-button
              >
            </div>
            <div class="center">
              <div>部门</div>
            </div>
            <el-scrollbar class="left-scroll" ref="treeScroll" style="height: 200px">
              <el-tree
                class="filter-tree"
                show-checkbox
                node-key="id"
                empty-text="无"
                :data="treeData"
                :props="defaultProps"
                :filter-node-method="filterNode"
                :default-checked-keys="selectedList"
                :check-strictly="true"
                ref="trees"
                @check="treeChange"
              >
              </el-tree>
            </el-scrollbar>
          </div>
          <div class="right">
            <div class="right-top">
              <div>已选择</div>
              <el-button class="checkButton" size="small" @click="reset"
                >重置</el-button
              >
            </div>
            <div class="content">
              <el-scrollbar ref="treeScroll" style="height: 217px">
                <div
                  class="info"
                  v-for="(item, index) in selectListDetail"
                  :key="index"
                >
                  <div class="icon">
                    <img :src="card" alt="" />
                  </div>
                  <div>{{ item.showName }}</div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
        <div class="footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="cancel">确定</el-button>
        </div>
      </div>
    </el-select>
  </div>
</template>

<script type="text/babel">
import card from "assets/image/card.png";
import { validatenull } from 'utils/util'
export default {
  name:'QyTreeSelect',
  props: {
    selectedIds: {
      type: Array,
      default: () => [],
    },
    list:{
      type:Array,
      default: () => {
        return []
      }
    },
    index:{
      type:Number,
      default:null,
    },
    mutiple: {
      type: Boolean,
      default: true,
    },
    disList: {
      type: Array,
      default: function(){
        return []
      },
    },
    treeData:{
      type:Array,
      default: function(){
        return []
      },
    }
  },
  model: {
    prop: "selectedIds",
    event: "changeSelect",
  },
  data() {
    return {
      card,
      checkArr: [], // 返回数据
      filterKey: "",
      defaultProps: {
        children: "children",
        label: "name",
      },    
    };
  },
  computed: {
    // 选中的id数组
    selectedList: {
      get() {
        return this.selectedIds;
      },
      set(val) {
        this.$emit('changeSelect', val)
      },
    },
    // 选中的对象数组
    selectListDetail:{
      get(){
        return this.list
      },
      set(val){
        this.$emit('changeDetail', val)
      }
    }
  },
  watch:{
    selectedList:{
      handler(val) {
        if(!validatenull(this.selectListDetail)) return
        if(!validatenull(val) && !validatenull(this.treeData)) {
          
          this.$nextTick(() => {
            let a = this.$refs.trees.getCheckedNodes(true)
            this.selectListDetail = a
          })
        }
      },
      immediate: true
    },
    treeData:{
      handler(val) {
        if(!validatenull(this.selectListDetail)) return
        if(!validatenull(val) && !validatenull(this.selectedList)) {
          this.$nextTick(() => {
            let a = this.$refs.trees.getCheckedNodes(true)
            this.selectListDetail = a
          })
        }
      },
      immediate: true
    },
  },
  methods: {
    filter() {
      this.$refs.trees.filter(this.filterKey);
    },
    filterNode(value, data) {
      if (!value) return true;
      if(!data || !data.name) return false
      return data.name.indexOf(value) !== -1;
    },
    clearFilter() {
      this.filterKey = "";
      this.$refs.trees.filter("");
    },
    cancel() {
      this.$refs.select.blur();
    },
    treeChange(checkNode) {
      let a = this.$refs.trees.getCheckedNodes(true)
      console.log(a)
      if(!this.mutiple) {
        const { id } = checkNode
        this.selectedList = [id]
        this.selectListDetail = [checkNode]
        this.$nextTick(() => {
          this.$refs.trees.setCheckedKeys([id]);
        });
      }else{
        this.selectedList = a.map(el => el.id)
        this.selectListDetail = a
      }
    },
    // 选则框中点X时
    removeTag(v) {
      this.$refs.trees.setChecked(v,false)
      let index = this.selectListDetail.findIndex(el => el.id == v)
      this.selectListDetail.splice(index,1)
      this.$emit('changeDetail', this.selectListDetail)
    },
    // 重置
    reset() {
      this.selectedList = [];
      this.selectListDetail = [];
      this.$nextTick(() => {
        this.$refs.trees.setCheckedKeys([]);
      });
    },
  },
};
</script>