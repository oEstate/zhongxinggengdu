<template>
  <div>
    <div class="u_f_ajs query">
      <div class="u_f">
        <el-input placeholder="请输入内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button class="query_btn" type="success">搜索</el-button>
      </div>
      <el-button type="success" @click="addColumn">新增栏目</el-button>
    </div>
    <el-table
      height="400"
      align="center"
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{
        background: '#E8EFEC',
        color: '#333',
        textAlign: 'center',
      }"
      :cell-style="{
        background: '#F3F6F5',
        color: '#333',
        textAlign: 'center',
      }"
    >
      <el-table-column :show-overflow-tooltip="true" prop="date" label="栏目"> </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="name" label="发布时间">
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="address" label="发布状态"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-button type="text" icon="el-icon-edit-outline">编辑</el-button>
        <el-button type="text" icon="el-icon-delete">删除</el-button>
        <el-button type="text" icon="el-icon-upload2">发布</el-button>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total,prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "survey",
})
export default class extends Vue {
  private tableData = [
    {
      date: "2016-05-02",
      name: "王小虎1",
      address: "上海市普陀区金沙江路 1518 弄",
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄",
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄",
    },
    {
      date: "2016-05-02",
      name: "王小虎1",
      address: "上海市普陀区金沙江路 1518 弄",
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄",
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄",
    },
  ];
  created() {}
  addColumn(){
    this.$router.push({path:'/views/addColumn'})
  }
}
</script>

<style lang="scss" scoped>
.query {
  margin-bottom: 21px;
  margin-top: 10px;
  .query_btn {
    margin-left: 12px;
  }
}
.row-name {
  background-color: #F3F6F5;
}
</style>
