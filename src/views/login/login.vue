<template>
  <div class="login-container">
    <div class="login-nav">
      <div class="login-nav-bar">
        <div class="login-img">
          <img src="@/assets/common/LOGO.png" alt="" />
        </div>
        <el-link :underline="false" class="nav-button">首页</el-link>
        <el-link :underline="false" class="nav-button">常见问题</el-link>
        <el-link :underline="false" class="nav-button">村居直供APP</el-link>
      </div>
    </div>
    <div class="login-info">
      <div class="login-info-h1">绿色 天然 有机</div>
      <div class="login-layout">
        <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="扫码登录" name="first">
            <div class="Qr-code">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605007627525&di=117ccced9e5f6869bc5b723a8505408a&imgtype=0&src=http%3A%2F%2Fimg.haote.com%2Fupload%2Fqrcode%2F1525%2Fhaote0d9b960dabea1299c1971d8817467cff.png"
                alt=""
              />
              <div class="Qr-code-tips">请使用手机村居直供扫码</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="验证码登录" name="second">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              label-position="left"
              label-width="65px"
            >
              <el-form-item prop="username" label="手机号">
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="请输入手机号"
                  name="username"
                  type="text"
                  tabindex="1"
                />
              </el-form-item>

              <el-form-item prop="code" label="验证码">
                <div style="display: flex; align-items: center">
                  <el-input
                    :key="codeType"
                    ref="code"
                    v-model="loginForm.code"
                    :type="codeType"
                    placeholder="请输入验证码"
                    name="code"
                    tabindex="2"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin"
                  />
                  <el-button
                    :loading="loading"
                    type="success"
                    @click.native.prevent="handleLogin"
                    size="mini"
                  >
                    获取验证码
                  </el-button>
                </div>
              </el-form-item>

              <el-button
                :loading="loading"
                type="success"
                size="small"
                class="login-btn"
                style="width: 100%"
                @click.native.prevent="handleLogin"
              >
                登陆
              </el-button>
              <p class="login-tips">未注册手机号登录将自动创建账户</p>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <pageFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import pageFooter from "@/components/footer/index.vue";
import { Dictionary } from "vue-router/types/router";
import { isValidUsername } from "@/utils/validate";
import { UserModule } from "@/store/modules/user";
import { Form as ElForm, Input } from "element-ui";
@Component({
  name: "Login",
  components: {
    pageFooter,
  },
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
})
export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (!isValidUsername(value)) {
      callback(new Error("请输入正确的手机号"));
    } else {
      callback();
    }
  };

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error("验证码不能少于6位数字"));
    } else {
      callback();
    }
  };

  private loginForm = {
    username: "admin",
    code: "111111",
  };
  private activeName = "second";

  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: "blur" }],
    code: [{ validator: this.validatePassword, trigger: "blur" }],
  };

  private codeType = "code";
  private loading = false;
  private showDialog = false;
  private capsTooltip = false;
  private redirect?: string;
  private otherQuery: Dictionary<string> = {};
  mounted() {
    if (this.loginForm.username === "") {
      (this.$refs.username as Input).focus();
    } else if (this.loginForm.code === "") {
      (this.$refs.code as Input).focus();
    }
  }

  async handleLogin() {
    await UserModule.Login(this.loginForm);
    // 当没认证跳转到认证页
    //认证成功跳转到首页
    // this.$router.push({ path: "/certification" });
    this.$router.push({ path: "/" });
    // (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
    //   if (valid) {
    //     this.loading = true
    //     await UserModule.Login(this.loginForm)
    //     this.$router.push({
    //       path: this.redirect || '/',
    //       query: this.otherQuery
    //     }).catch(err => {
    //       console.warn(err)
    //     })
    //     // Just to simulate the time of the request
    //     setTimeout(() => {
    //       this.loading = false
    //     }, 0.5 * 1000)
    //   } else {
    //     return false
    //   }
    // })
  }
}
</script>

<style lang="scss" scoped>
.el-link.el-link--default:hover {
  color: #06c654;
}
.el-link.el-link--default {
  color: #fff;
}
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url("../../assets/common/banner2.jpg");
  background-size: 100% 100%;
  .login-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    margin-left: 240px;
    font-size: 20px;
    color: #fff;
    margin-top: 19px;
    .login-nav-bar {
      display: flex;
      align-items: center;
      .login-img {
        margin-right: 90px;
        height: 56px;
        img {
          height: 100%;
        }
      }
      .nav-button {
        margin-right: 72px;
      }
    }
  }
  .login-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
    .login-info-h1 {
      font-size: 68px;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #ffffff;
      letter-spacing: 6px;
      margin-right: 213px;
    }

    .login-layout {
      width: 372px;
      height: 357px;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
::v-deep .el-tabs__item {
  height: 61px;
  line-height: 61px;
  font-size: 20px;
}
::v-deep .el-tabs__item.is-active,
::v-deep .el-tabs__item:hover {
  color: #0ec756;
}
::v-deep .el-tabs__active-bar {
  background-color: #0ec756;
}
::v-deep .el-tabs__item {
  color: #fff;
}
::v-deep .el-form-item__label {
  color: #fff;
  font-size: 16px;
}
::v-deep .el-input {
  font-size: 16px;
}
.login-form {
  box-sizing: border-box;
  padding: 34px 28px 0 28px;
}
::v-deep .el-form-item {
  border-bottom: 1px solid #fff;
}
::v-deep .el-input__inner {
  border: 0px;
  outline: none;
  background-color: transparent;
  color: #fff;
  border-radius: 0;
  padding: 0;
}
.login-btn {
  width: 100%;
  margin-top: 11px;
  margin-bottom: 16px;
}
.login-tips {
  font-size: 14px;
  color: #ffffff;
  margin: 0 0 0 8px;
}

::v-deep .el-input__inner {
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:-moz-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &::-moz-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
}
.Qr-code {
  text-align: center;
  margin: 0 auto;
  margin-top: 13px;
  img {
    width: 186px;
    height: 186px;
  }
  .Qr-code-tips {
    height: 25px;
    font-size: 18px;
    color: #ffffff;
    line-height: 25px;
    margin-top: 18px;
  }
}
</style>
