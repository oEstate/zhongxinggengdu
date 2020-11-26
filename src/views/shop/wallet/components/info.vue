<template>
  <div>
    <ul class="u_f info">
      <li>
        <div class="u_f_ajs">
          <div>
            <span class="icon-k"></span>
            <span class="title">店铺余额</span>
          </div>
          <p class="withdrawal">您有1条提现进行中</p>
        </div>
        <div class="money u_f_ac">
          <div class="money_txt">1799.00</div>
          <el-button type="success" plain @click="dialogVisible = true"
            >提现</el-button
          >
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
        <!--<div class="u_f u_f_end">
          <div class="card">
            <div class="bank u_f_ac">
              <span class="bank_img"><img src="http://dwz.date/dutK" alt="" /></span>
              <span class="bank_name">中国招商银行</span>
            </div>
            <p class="bank_number">**** **** **** **** 220</p>
          </div>
          <div><el-button type="text">更换银行卡</el-button></div>
        </div>-->
        <div class="card card_none">
          <el-button type="success" @click="addCard">添加银行卡</el-button>
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

      <el-dialog
        :visible.sync="dialogVisible"
        width="506px"
        :before-close="handleClose"
        center
        :close-on-click-modal="false"
      >
        <div class="dialog_content">
          <div>
            <!--<el-input v-model="input" placeholder="0.00"></el-input>-->

            <el-input-number
              v-model="value1"
              :precision="2"
              placeholder="0.00"
            ></el-input-number>
          </div>
          <div class="tips u_f_ac">
            <div>可用余额(元)</div>
            <div><i class="el-icon-question"></i></div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="success" @click="submit">提交申请</el-button>
        </span>
      </el-dialog>
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
  private value1 = undefined;
  private multipleSelection = [];

  private dialogVisible = false;
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
  addCard() {
    this.$router.push({ path: "/wallet/addCard" });
  }

  handleSelectionChange(val: any) {
    this.multipleSelection = val;
  }
  submit() {
    this.dialogVisible = false;
    this.$router.push({ path: "/wallet/results" });
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
.withdrawal {
  font-size: 16px;
  color: #00b54d;
  letter-spacing: 1px;
  margin-right: 35px;
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
          img {
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
    .card_none {
      align-items: center;
      justify-content: center;
    }
  }
}
::v-deep .el-dialog--center .el-dialog__body {
  padding: 0 73px;
}
::v-deep .el-dialog {
  height: auto;
  .el-dialog__header,
  .el-dialog__footer {
    border: 0;
  }
  .el-dialog__footer .el-button {
    margin: 0;
    width: 294px;
  }
  .tips {
    font-size: 18px;
    color: #444444;
    letter-spacing: 1px;
    margin-bottom: 41px;
    margin-top: 14px;
    cursor: pointer;
    i {
      color: #00b34c;
      margin-left: 6px;
    }
  }
  .el-input-number {
    width: 100%;
  }
  .el-input-number__decrease,
  .el-input-number__increase {
    display: none;
  }
  .el-input {
    .el-input__inner {
      height: 81px;
      font-size: 58px;
      font-weight: 600;
      color: #00b54d;
      line-height: 81px;
      letter-spacing: 2px;
      padding: 0;
      border: 0;
      background-color: #fff;
      border-radius: 0;
      text-align: left;
    }
    .el-input__inner::placeholder {
      color: rgba(0, 181, 77, 0.2);
    }
    /* 谷歌 */
    .el-input__inner::-webkit-input-placeholder {
      color: rgba(0, 181, 77, 0.2);
    }
    /* 火狐 */
    .el-input__inner:-moz-placeholder {
      color: rgba(0, 181, 77, 0.2);
    }
    /*ie*/
    .el-input__inner:-ms-input-placeholder {
      color: rgba(0, 181, 77, 0.2);
    }
  }
}
</style>
