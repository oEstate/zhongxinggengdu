<template>
  <div class="container">
    <back :icon="icon" titleTxt="账户总览" backTxt="添加银行卡" />
    <ul class="from">
      <li class="ag">
        <div class="from-itrm-l">选择银行</div>
        <div class="phone">
          <el-select v-model="value" placeholder="请选择银行">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </li>
      <li class="ag">
        <div class="from-itrm-l">姓名</div>
        <div class="phone">
          <el-input
            v-model="shopName"
            placeholder="请输入持卡人姓名"
          ></el-input>
        </div>
      </li>
      <li class="ag">
        <div class="from-itrm-l">银行卡号</div>
        <div class="phone">
          <el-input v-model="shopName" placeholder="请输入银行卡号"></el-input>
        </div>
      </li>
      <li class="ag">
        <div class="from-itrm-l">手机号</div>
        <div class="phone">
          <el-input
            v-model="shopName"
            placeholder="请输入持卡人手机号"
          ></el-input>
        </div>
      </li>

      <li class="ag">
        <div class="from-itrm-l">验证码</div>
        <div class="code u_f_ajc">
          <el-input v-model="shopName" placeholder="请输入验证码"></el-input>
          <el-button
            type="success"
            :disabled="codeObj.codeDisabled"
            :loading="loading"
            @click="getCode"
            >{{ codeObj.codeMsg }}</el-button
          >
        </div>
      </li>
      <li class="ag">
        <el-button type="success" @click="changeShop">确认绑定</el-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import back from "@/components/header/back.vue";

@Component({
  name: "matterAdd",
  components: {
    back,
  },
})
export default class extends Vue {
  private icon = require("@/assets/header-icon/message.png");
  private options = [
    {
      value: "0",
      label: "店铺",
    },
    {
      value: "1",
      label: "链接",
    },
    {
      value: "2",
      label: "内容",
    },
    {
      value: "3",
      label: "云平台",
    },
  ];

  private codeObj: any = {
    codeDisabled: false,
    codeMsg: "获取验证码",
  };
  private timer: any = null;
  private count = 0;
  private loading = false;
  getCode() {
    const TIME_COUNT = 60;
    if (!this.timer) {
      this.count = TIME_COUNT;
      this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.codeObj.codeDisabled = true;
          this.count--;
          this.codeObj.codeMsg = `${this.count}s后重新发送`;
        } else {
          clearInterval(this.timer);
          this.timer = null;
          this.codeObj.codeMsg = "获取验证码";
          this.codeObj.codeDisabled = false;
        }
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
.from {
  margin-top: 10px;
  li {
    list-style: none;
    display: flex;
    margin-bottom: 20px;
    .phone,
    .el-select {
      width: 270px;
    }
    &:last-child {
      margin-top: 50px;
    }
    .from-itrm-l {
      margin-right: 22px;
      font-size: 16px;
      color: #333333;
      flex-shrink: 0;
      width: 70px;
      text-align: right;
    }
    .from-logo {
      width: 76px;
      height: 76px;
      background: #eaeaea;
      border-radius: 76px;
    }
    .icard {
      width: 359px;
      height: 232px;
      background: #f0f0f0;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
    }
    .code {
      .el-input {
        width: 160px;
      }
    }
  }
  .ag {
    align-items: center;
    justify-content: center;
  }
}
</style>
