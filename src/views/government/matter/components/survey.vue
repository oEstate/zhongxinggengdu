<template>
  <div>
    <div class="u_f_ajs query">
      <div class="u_f">
        <el-input placeholder="请输入内容" v-model="contentTitle">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button class="query_btn" type="success" @click="init(1)"
          >搜索</el-button
        >
      </div>
      <el-button type="success" @click="addColumn">新增栏目</el-button>
    </div>
    <el-table
      height="510"
      align="center"
      :data="tableData"
      v-loading="loading"
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
      <el-table-column
        :show-overflow-tooltip="true"
        prop="contentTitle"
        label="栏目"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="createTime"
        label="发布时间"
      >
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="发布状态">
        <template slot-scope="scope">
          <el-tag
            type="success"
            size="mini"
            v-if="scope.row.contentStatus == 0"
            effect="dark"
            >已发布</el-tag
          >
          <el-tag type="info" size="mini" v-else effect="dark">未发布</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit-outline" @click="editorColumn(scope.row.id)">编辑</el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="del(scope.row.id)"
            >删除</el-button
          >
          <el-button
            type="text"
            icon="el-icon-upload2"
            @click="changeState(scope.row.id, scope.row.contentStatus)"
            >{{ scope.row.contentStatus == 0 ? "取消发布" : "发布" }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="pageChange"
      background
      layout="total,prev, pager, next"
      :page-size="15"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  addColumn,
  addContent,
  delColumn,
  delContent,
  queryColumn,
  queryContent,
  upColumn,
  upContent,
} from "@/api/information";
@Component({
  name: "survey",
})
export default class extends Vue {
  private loading = false;
  private total = 0;
  private pageNo = 1;
  private pageSize = 15;
  private contentTitle = "";
  private tableData = [];
  created() {
    this.init(this.pageNo);
  }
  addColumn() {
    this.$router.push({ path: "/views/addColumn" });
  }
  editorColumn(id:any) {
    this.$router.push({ path: `/views/addColumn?id=${id}` });
  }
  //初始化
  async init(pageNo: any) {
    this.loading = true;
    const { data } = await queryContent({
      pageNo: pageNo,
      pageSize: this.pageSize,
      columnType: 6,
      contentTitle: this.contentTitle,
    });
    // console.log(data);
    this.tableData = data.list;
    this.total = data.total;
    this.loading = false;
  }

  // 分页
  pageChange(page: any) {
    // console.log(page)
    this.pageNo = page;
    this.init(this.pageNo);
  }
  async del(id: any) {
    this.$confirm("此操作将永久删除该栏目, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await delContent({ id });
        this.$message({
          type: "success",
          message: "操作成功!",
        });
        this.init(this.pageNo);
      })
      .catch(() => {});
  }
  async changeState(id: any, type: any) {
    let contentStatus = type == 0 ? 1 : 0;
    await upContent({ id, contentStatus });
    this.$message({
      type: "success",
      message: "操作成功!",
    });
    this.init(this.pageNo);
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
  background-color: #f3f6f5;
}
</style>
