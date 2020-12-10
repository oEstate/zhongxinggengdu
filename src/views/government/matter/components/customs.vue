<template>
  <div>
    <div class="u_f_ajs query">
      <ul class="u_f column">
        <li class="column_item is_column_item">热点</li>
        <li class="column_item">定南要闻</li>
        <li class="column_item">文化</li>
        <li class="column_item">民生</li>
        <li class="column_item">教育</li>
      </ul>
      <el-button type="success" @click="dialogVisible = true"
        >编辑栏目</el-button
      >
      <!--<el-button type="success" @click="addColumn">编辑栏目</el-button>-->
    </div>
    <div class="u_f_ajs query">
      <div class="u_f">
        <el-input placeholder="请输入内容">
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
      :before-close="handleClose"
    >
      <el-scrollbar style="height: 374px">
        <div class="matter">
          <ul class="dialog-column u_f">
            <li
              v-for="(item, index) in tableData"
              :key="index"
              class="dialog-columnItem u_f_ac"
            >
              <span class="dialog-columnItemTxt">定南要闻</span>
              <i class="el-icon-delete"></i>
            </li>
          </ul>
          <div class="dialog-addColumn">
            <el-button type="success">新建栏目</el-button>
          </div>
          <div class="dialog-addColumn u_f">
            <el-input
              v-model="shopName"
              placeholder="请输入栏目名"
            ></el-input>
            <el-button type="success">确认</el-button>
          </div>
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { addColumn,addContent,delColumn,delContent,queryColumn,queryContent,upColumn,upContent } from "@/api/information";
@Component({
  name: 'customs'
})
export default class extends Vue {
  private dialogVisible = false;
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
    }
  ];

  created() {}
  addColumn() {
    this.$router.push({ path: '/views/addColumn' })
  }

  addContent() {
    this.$router.push({ path: '/views/addContent' })
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
    .el-input{
      width: 166px;
      margin-right: 16px;
    }
  }
}
</style>
