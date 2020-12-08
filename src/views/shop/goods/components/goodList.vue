<template>
  <div>
    <div class="u_f_ajs query">
      <div class="u_f" style="width: 100%">
        <el-input placeholder="请输入内容">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button class="query_btn" type="success" @click="change">搜索</el-button>
        <el-select @change="change" class="ml22" v-model="goodsType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select @change="change" class="ml22" v-model="goodsStatus" placeholder="请选择">
          <el-option
            v-for="item in options1"
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" fixed="left"> </el-table-column>
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsCover" label="封面">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <div slot="content">
              <img style="height: 250px" :src="scope.row.goodsCover" alt="" />
            </div>
            <img style="height: 50px" :src="scope.row.goodsCover" alt="" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="goodsName"
        label="商品名称"
        width="200"
      >
      </el-table-column>
      <el-table-column prop="evaluate" label="评价">
        <template slot-scope="scope">
          <p>{{ scope.row.evaluate }}</p>
          <div><el-button type="text">查看评价</el-button></div>
        </template>
      </el-table-column>
      <el-table-column prop="cumulativeSales" label="累计销量">
      </el-table-column>
      <el-table-column prop="numberOfCollections" label="收藏数">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160">
      </el-table-column>
      <el-table-column prop="goodsStatus" label="状态">
        <template slot-scope="scope">
          <el-tag
            effect="plain"
            size="mini"
            type="danger"
            v-if="scope.row.goodsStatus == 0"
            >下架</el-tag
          >
          <el-tag
            effect="plain"
            size="mini"
            type="success"
            v-if="scope.row.goodsStatus == 1"
            >上架</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button type="text">预览</el-button>
          <el-button type="text">编辑</el-button>
          <el-button
            type="text"
            @click="
              upAndDown(
                scope.row.goodsStatus == 0 ? '1' : '0',
                '0',
                scope.row.id
              )
            "
            >{{ scope.row.goodsStatus == 0 ? "上架" : "下架" }}</el-button
          >
          <el-button type="text">分享</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="u_f_ajs" style="margin-top: 30px">
      <div>
        <el-button type="success" @click="upAndDown('0', '1', '')"
          >批量下架</el-button
        >
        <el-button type="success" @click="upAndDown('1', '1', '')"
          >批量上架</el-button
        >
        <!--<el-button type="success">批量删除</el-button>-->
      </div>
      <el-pagination
        @current-change="pageChange"
        background
        layout="total,prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getGoodsList, batchLoadingAndUnloading } from "@/api/goods";
@Component({
  name: "goodList",
})
export default class extends Vue {
  private pageNo = 1;
  private pageSize = 15;
  private total = 0;
  private loading = false;
  private goodsName = "";
  private goodsType = "";
  private goodsStatus = "";
  private options = [
    {
      value: "",
      label: "全部",
    },
    {
      value: "0",
      label: "普通商品",
    },
    {
      value: "1",
      label: "认领商品",
    },
    {
      value: "2",
      label: "预定商品",
    },
    {
      value: "3",
      label: "特价商品",
    },
  ];
  private options1 = [
    {
      value: "",
      label: "全部",
    },
    {
      value: "0",
      label: "下架",
    },
    {
      value: "1",
      label: "上架",
    },
  ];

  private value = "";
  private multipleSelection = [];
  private tableData = [];

  created() {
    this.init(this.pageNo);
  }
  async init(pageNo: any) {
    this.loading = true;
    const { data } = await getGoodsList({
      goodsName: this.goodsName,
      goodsType: this.goodsType,
      goodsStatus: this.goodsStatus,
      pageNo: pageNo,
      pageSize: this.pageSize,
    });
    console.log(data);
    this.tableData = data.list;
    this.total = data.total;
    this.loading = false;
  }
  async upAndDown(goodsStatus: any, type: any, id: any) {
    let ids: any = [];
    if (type == "0") {
      ids.push(id);
    } else {
      this.multipleSelection.map((item: any) => {
        ids.push(item.id);
      });
    }
    await batchLoadingAndUnloading({
      goodsStatus,
      ids,
    });
    await this.init(this.pageNo);
    this.$message({
      message: "操作成功",
      type: "success",
    });
  }
  change(){
    this.init(1);
  }
  addGoods() {
    this.$router.push({ path: "/goods/add" });
  }

  handleSelectionChange(val: any) {
    this.multipleSelection = val;
  }
  // 分页
  pageChange(page: any) {
    // console.log(page)
    this.pageNo = page;
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
