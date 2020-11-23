<template>
  <div>
    <div class="u_f_ajs query">
      <div class="u_f" style="width: 100%">
        <el-input placeholder="请输入内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button class="query_btn" type="success">搜索</el-button>
        <el-select class="ml22" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select class="ml22" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button class="add_goods_btn" type="success" @click="addGoods"
          >商品发布</el-button
        >
      </div>
    </div>
    <el-table
      height="540"
      align="center"
      ref="multipleTable"
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="date"
        label="商品编号"
        width="200"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="name"
        label="封面"
        width="200"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="商品名称"
        width="200"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="评价"
        width="200"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="累计销量"
        width="200"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="收藏数"
        width="200"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="创建时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="address"
        label="状态"
        width="200"
      >
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200" fixed="right">
        <el-button type="text">预览</el-button>
        <el-button type="text">编辑</el-button>
        <el-button type="text">下架</el-button>
        <el-button type="text">分享</el-button>
      </el-table-column>
    </el-table>
    <div class="u_f_ajs" style="margin-top: 30px">
      <div>
        <el-button type="success">批量下架</el-button>
        <el-button type="success">批量删除</el-button>
      </div>
      <el-pagination background layout="total,prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "goodList",
})
export default class extends Vue {
  private options = [
    {
      value: "选项1",
      label: "黄金糕",
    },
    {
      value: "选项2",
      label: "双皮奶",
    },
    {
      value: "选项3",
      label: "蚵仔煎",
    },
    {
      value: "选项4",
      label: "龙须面",
    },
    {
      value: "选项5",
      label: "北京烤鸭",
    },
  ];
  private value = "";
  private multipleSelection = [];
  private tableData = [
    {
      date: "2016-05-02",
      name: "张三1",
      address: "上海市普陀区金沙江路 1518 弄",
    },
    {
      date: "2016-05-04",
      name: "张三",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      date: "2016-05-01",
      name: "张三",
      address: "上海市普陀区金沙江路 1519 弄",
    },
    {
      date: "2016-05-03",
      name: "张三",
      address: "上海市普陀区金沙江路 1516 弄",
    },
    {
      date: "2016-05-02",
      name: "张三1",
      address: "上海市普陀区金沙江路 1518 弄",
    },
    {
      date: "2016-05-04",
      name: "张三",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      date: "2016-05-01",
      name: "张三",
      address: "上海市普陀区金沙江路 1519 弄",
    },
    {
      date: "2016-05-03",
      name: "张三",
      address: "上海市普陀区金沙江路 1516 弄",
    },
  ];
  created() {}
  addGoods() {
    this.$router.push({ path: "/goods/add" });
  }

  handleSelectionChange(val: any) {
    this.multipleSelection = val;
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
  .el-input {
    width: 220px;
  }
  .ml22 {
    margin-left: 22px;
    width: 190px;
  }
}
.row-name {
  background-color: #f3f6f5;
}
.add_goods_btn {
  margin-left: auto;
}
</style>
