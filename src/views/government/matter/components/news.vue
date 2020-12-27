<template>
  <div>
    <div class="u_f_ajs query">
      <ul class="u_f column">
        <li
          @click="getData(index, item.id, 1)"
          v-for="(item, index) in columnData"
          :key="index"
          class="column_item"
          :class="active == index ? 'is_column_item' : ''"
        >
          {{ item.columnName }}
        </li>
      </ul>
      <el-button type="success" @click="dialogVisible = true"
        >编辑栏目</el-button
      >
    </div>
    <div class="u_f_ajs query">
      <div class="u_f">
        <el-input placeholder="请输入内容" v-model="contentTitle">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button class="query_btn" type="success">搜索</el-button>
      </div>
      <el-button type="success" @click="addContent">新增内容</el-button>
    </div>
    <el-table
      align="center"
      :data="tableData"
      border
      style="width: 100%"
      v-loading="loading"
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
        prop="date"
        label="标题"
        width="180"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="封面"
        width="180"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="发布时间"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="发布状态"
      >
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-button type="text" icon="el-icon-edit-outline">编辑</el-button>
        <el-button type="text" icon="el-icon-delete">删除</el-button>
        <el-button type="text" icon="el-icon-upload2">发布</el-button>
      </el-table-column>
    </el-table>

    <el-dialog
      title="编辑栏目"
      :visible.sync="dialogVisible"
      width="960px"
      center
    >
      <el-scrollbar style="height: 374px">
        <div class="matter">
          <ul class="dialog-column u_f">
            <li
              v-for="(item, index) in columnData"
              :key="index"
              class="dialog-columnItem u_f_ac"
            >
              <span class="dialog-columnItemTxt">{{ item.columnName }}</span>
              <i class="el-icon-delete" @click="deleteColumn(item.id)"></i>
            </li>
          </ul>
          <div class="dialog-addColumn">
            <el-button type="success" @click="open">新建栏目</el-button>
          </div>
          <!-- <div class="dialog-addColumn u_f">
            <el-input v-model="shopName" placeholder="请输入栏目名"></el-input>
            <el-button type="success">确认</el-button>
          </div> -->
        </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="dialogVisible = false" plain
          >取 消</el-button
        >
        <el-button type="success" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
  name: "news",
})
export default class extends Vue {
  private dialogVisible = false;
  private loading = false;
  private total = 0;
  private pageNo = 1;
  private pageSize = 15;
  private active = 0;
  private contentTitle = "";
  private tableData = [];
  private columnData: any = [];
  created() {
    this.init();
  }
  //回显
  async init() {
    const { data } = await queryColumn({ columnType: 0 });
    this.columnData = data;
    console.log(data);
    let id = this.columnData.length > 0 ? this.columnData[0].id : "";
    this.getData(0, id, this.pageNo);
  }
  addColumn() {
    this.$router.push({ path: "/views/addColumn" });
  }

  addContent() {
    this.$router.push({ path: "/views/addContent" });
  }
  open() {
    this.$prompt("请输入栏目名", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(({ value }: any) => {
        this.add(value);
      })
      .catch(() => {});
  }
  async add(columnName: any) {
    const { data } = await addColumn({ columnType: 0, columnName });
    this.init();
  }
  async deleteColumn(id: any) {
    this.$confirm("此操作将永久删除该栏目, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        const { data } = await delColumn({ id });
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.init();
      })
      .catch(() => {});
  }
  async getData(index: any, id: any, pageNo: any) {
    this.active = index;
    this.loading = true;
    const { data } = await queryContent({
      id,
      pageNo,
      pageSize: this.pageSize,
      columnType: 0,
      contentTitle: this.contentTitle,
    });
    // console.log(data);
    this.tableData = data.list;
    this.total = data.total;
    this.loading = false;
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
  .column {
    margin-top: 0;
    margin-bottom: 0;
    .column_item {
      width: 96px;
      height: 44px;
      background: #f7fff9;
      border-radius: 8px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 44px;
      color: #666666;
      margin-right: 16px;
      cursor: pointer;
    }
    .is_column_item {
      border: 1px solid #00b54d;
      color: #00b54d;
    }
  }
}

.matter {
  box-sizing: border-box;
  padding: 0 24px;
  .dialog-column {
    flex-wrap: wrap;
    .dialog-columnItem {
      margin-right: 50px;
      margin-bottom: 26px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      .dialog-columnItemTxt {
        width: 96px;
        height: 44px;
        border-radius: 8px;
        border: 1px solid #cccccc;
        margin-right: 16px;

        text-align: center;
        line-height: 44px;
        font-size: 16px;
        color: #666;
      }
      i {
        font-size: 20px;
        color: #00b54d;
      }
    }
  }
  .dialog-addColumn {
    .el-input {
      width: 166px;
      margin-right: 16px;
    }
  }
}
.el-icon-delete {
  cursor: pointer;
}
</style>
