<template>
  <div>
    <div class="u_f_ajs query">
      <div class="u_f">
        <el-input placeholder="请输入内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button class="query_btn" type="success">搜索</el-button>
      </div>
      <el-button type="success">新增内容</el-button>
    </div>
    <el-table
      align="center"
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{
        background: '#E8EFEC',
        color: '#333',
        textAlign: 'center'
      }"
      :cell-style="{
        background: '#F3F6F5',
        color: '#333',
        textAlign: 'center'
      }"
    >
      <el-table-column :show-overflow-tooltip="true" prop="date" label="标题" width="180"> </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="name" label="封面" width="180"> </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="address" label="发布时间"> </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="address" label="发布状态"> </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-button type="text" icon="el-icon-edit-outline">编辑</el-button>
        <el-button type="text" icon="el-icon-delete">删除</el-button>
        <el-button type="text" icon="el-icon-upload2">发布</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { addColumn,addContent,delColumn,delContent,queryColumn,queryContent,upColumn,upContent } from "@/api/information";
@Component({
  name: 'message'
})
export default class extends Vue {
  private tableData = [
    {
      date: '2016-05-02',
      name: '张三1',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2016-05-04',
      name: '张三',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '张三',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name: '张三',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ];

  created() {}
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
