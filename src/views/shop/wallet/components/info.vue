<template>
  <div>
    <ul class="u_f info">
      <li>
        <div class="u_f_ac">
          <span class="icon-k"></span>
          <span class="title">店铺余额</span>
        </div>
        <div class="money u_f_ac">
          <div class="money_txt">1799.00</div>
          <el-button type="success" plain>提现</el-button>
        </div>
        <div class="tips u_f_ac">
          <div>可用余额(元)</div>
          <div><i class="el-icon-question"></i></div>
        </div>
      </li>
      <li>
        <div class="u_f_ac">
          <span class="icon-k"></span>
          <span class="title">银行卡信息</span>
        </div>
        <div class="u_f u_f_end">
          <div class="card">
            <div class="bank u_f_ac">
              <span class="bank_img"><img src="http://dwz.date/dutK" alt="" /></span>
              <span class="bank_name">中国招商银行</span>
            </div>
            <p class="bank_number">**** **** **** **** 220</p>
          </div>
          <div><el-button type="text">更换银行卡</el-button></div>
        </div>
      </li>
    </ul>
    <div>
      <div class="u_f_ac">
        <span class="icon-k"></span>
        <span class="title">收支情况</span>
      </div>
      <div class="query">
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-table
        height="240"
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
        <el-table-column
          :show-overflow-tooltip="true"
          prop="date"
          label="日期"
          width="200"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="name"
          label="账户"
          width="200"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="address"
          label="收入类型"
          width="200"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="address"
          label="收入(元)"
          width="200"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="address"
          label="结余"
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
        <el-table-column prop="address" label="操作" width="200" fixed="right">
          <el-button type="text">下载明细</el-button>
        </el-table-column>
      </el-table>
      <div class="u_f_ajs" style="margin-top: 30px">
        <div>
          <el-button type="success">下载列表明细</el-button>
        </div>
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "walletInfo",
})
export default class extends Vue {
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
  margin-top: 22px;
}
.icon-k {
  width: 3px;
  height: 16px;
  background: #00b54d;
  margin-right: 10px;
}
.title {
  font-size: 18px;
  font-weight: 500;
  color: #444444;
}
.info {
  border-bottom: 2px solid #e8efec;
  margin-bottom: 28px;
  li {
    flex: 1;
    padding-top: 26px;
    &:first-child {
      border-right: 2px solid #e8efec;
    }
    &:last-child {
      margin-left: 43px;
    }
    .money {
      height: 81px;
      font-size: 58px;
      font-weight: 600;
      color: #00b54d;
      line-height: 81px;
      letter-spacing: 2px;
      margin-top: 47px;
      margin-bottom: 14px;
      .money_txt {
        margin-right: 110px;
      }
    }
    .tips {
      font-size: 18px;
      color: #444444;
      letter-spacing: 1px;
      margin-bottom: 59px;
      cursor: pointer;
      i {
        color: #00b34c;
        margin-left: 6px;
      }
    }
    .u_f_end {
      align-items: flex-end;
    }
    .card {
      width: 305px;
      height: 188px;
      background: #e8efec;
      border-radius: 12px;
      border: 1px solid rgba(0, 181, 77, 0.22);
      box-sizing: border-box;
      padding: 21px 27px 19px 19px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 15px;
      margin-right: 27px;
      .bank {
        .bank_img {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background: #ffffff;
          border-radius: 31px;
          box-sizing: border-box;
          padding: 3px;
          overflow: hidden;
          margin-right: 8px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .bank_name {
          width: 112px;
          font-size: 18px;
          font-weight: 500;
          color: #444444;
        }
      }
      .bank_number {
        text-align: right;
        font-size: 16px;
        font-weight: 500;
        color: #444444;
      }
    }
  }
}
</style>
