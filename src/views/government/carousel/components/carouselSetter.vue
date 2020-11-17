<template>
  <div>
    <div class="query">
      <el-button type="success">新增栏目</el-button>
    </div>
    <el-table
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
      <el-table-column :show-overflow-tooltip="true" prop="date" label="序号">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="轮播名称"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="封面"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="链接类型"
      >
      </el-table-column>
      <el-table-column prop="address" label="操作" width="260">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit-outline">编辑</el-button>
          <el-button type="text" icon="el-icon-delete">删除</el-button>
          <el-button
            type="text"
            icon="el-icon-top"
            :disabled="scope.$index === 0"
            @click="moveUp(scope.$index, scope.row)"
            >向上</el-button
          >
          <el-button
            type="text"
            icon="el-icon-bottom"
            :disabled="scope.$index === tableData.length - 1"
            @click="moveDown(scope.$index, scope.row)"
            >向下</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "carouseld",
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
  ];
  created() {}

  //上移
  moveUp(index: any, row: any) {
    var that = this;
    console.log("上移", index, row);
    console.log(that.tableData[index]);
    if (index > 0) {
      let upDate = that.tableData[index - 1];
      that.tableData.splice(index - 1, 1);
      that.tableData.splice(index, 0, upDate);
    } else {
      alert("已经是第一条，不可上移");
    }
  }

  //下移
  moveDown(index: any, row: any) {
    var that = this;
    console.log("下移", index, row);
    if (index + 1 === that.tableData.length) {
      alert("已经是最后一条，不可下移");
    } else {
      console.log(index);
      // 保存下一条数据
      let downDate = that.tableData[index + 1];
      // 删除下一条数据
      that.tableData.splice(index + 1, 1);
      // 增添被删除的那一条数据
      that.tableData.splice(index, 0, downDate);
    }
  }
}
</script>

<style lang="scss" scoped>
.query {
  margin-bottom: 20px;
  text-align: right;
  .query_btn {
    margin-left: 12px;
  }
}
// .el-button--text{
//   color: #00B54D;
// }
</style>
