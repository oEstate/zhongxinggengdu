<template>
  <div class="container">
    <div class="back">
      <el-button type="text" icon="el-icon-back" @click="changeShop"
        >更换手机号</el-button
      >
    </div>
    <ul class="from">
      <li class="ag">
        <div class="from-itrm-l">手机号</div>
        <div class="phone">
          <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
        </div>
      </li>
      <li class="ag">
        <div class="from-itrm-l">验证码</div>
        <div class="code u_f_ajc">
          <el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input>
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
        <el-button type="success" @click="changeShop">完成</el-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getUserPhoneCode } from "@/api/users";
@Component({
  name: "bindingPhone",
})
export default class extends Vue {
  private codeObj: any = {
    codeDisabled: false,
    codeMsg: "获取验证码",
  };
  private timer: any = null;
  private count = 0;
  private loading = false;

  private loginForm = {
    phone: "",
    code: "",
  };
  async getCode() {
    try {
      const TIME_COUNT = 10;
      if (!this.timer) {
        this.loading = true;
        await getUserPhoneCode({ phone: this.loginForm.phone });
        this.loading = false;
        this.count = TIME_COUNT;
        this.codeObj.codeMsg = `${this.count}s后重新发送`;
        this.codeObj.codeDisabled = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.codeObj.codeMsg = `${this.count}s后重新发送`;
            this.count--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.codeObj.codeMsg = "获取验证码";
            this.codeObj.codeDisabled = false;
          }
        }, 1000);
      }
    } catch (err) {
      this.loading = false;
    }
  }
  changeShop() {
    this.$emit("changeShop", "binding");
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-link {
  align-items: flex-end;
}
.el-link.el-link--default:hover {
  color: #06c654;
}
.el-link.el-link--default {
  color: #666;
}

::v-deep .el-input__inner {
  background-color: #f0f0f0;
  color: #333;
  border-radius: 6px;

  font-size: 16px;
}
.phone,
.code {
  width: 270px;
}
.container {
  height: 530px;
}
.back {
  font-size: 16px;
  color: #444444;
  padding: 0 0 10px 0;
  border-bottom: 2px solid #e8efec;
  margin-bottom: 52px;
  // .el-icon-back{
  //   margin-right: 8px;
  // }
  .el-button {
    font-size: 16px;
  }
}
.from {
  margin-top: 10px;
  li {
    list-style: none;
    display: flex;
    margin-bottom: 20px;
    &:last-child {
      margin-top: 50px;
    }
    .from-itrm-l {
      margin-right: 22px;
      font-size: 16px;
      color: #333333;
      flex-shrink: 0;
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
  }
  .ag {
    align-items: center;
    justify-content: center;
  }
}
</style>
