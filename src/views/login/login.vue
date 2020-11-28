<template>
  <div class="login-container">
    <div class="login-nav">
      <div class="login-nav-bar">
        <div class="login-img">
          <img src="@/assets/common/LOGO.png" alt="" />
        </div>
        <el-link :underline="false" class="nav-button" @click="home"
          >首页</el-link
        >
        <el-link :underline="false" class="nav-button">常见问题</el-link>
        <el-link :underline="false" class="nav-button" @click="certification"
          >村居直供APP</el-link
        >
      </div>
    </div>
    <div class="login-info">
      <div class="login-info-h1">绿色 天然 有机</div>
      <div class="login-layout">
        <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="扫码登录" name="first">
            <div class="Qr-code">
              <div class="img" id="qrCode" ref="qrCodeDiv"></div>
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
              <el-form-item prop="phone" label="手机号">
                <el-input
                  ref="phone"
                  v-model="loginForm.phone"
                  placeholder="请输入手机号"
                  name="phone"
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
                class="login-btn"
                style="width: 100%"
                @click.native.prevent="handleLogin"
              >
                登录
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
import { Component, Vue } from 'vue-property-decorator'
import pageFooter from '@/components/footer/index.vue'
import { Dictionary } from 'vue-router/types/router'
import { UserModule } from '@/store/modules/user'
import { Form as ElForm, Input } from 'element-ui'
@Component({
  name: 'Login',
  components: {
    pageFooter
  },
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
})
export default class extends Vue {
  private QRCode: any;
  private validatePhone = (rule: any, value: string, callback: Function) => {
    if (value.length < 11) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  };

  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('验证码不能少于6位数字'))
    } else {
      callback()
    }
  };

  private loginForm = {
    phone: 'merchants',
    code: '111111'
  };

  private activeName = 'second';

  private loginRules = {
    phone: [{ validator: this.validatePhone, trigger: 'blur' }],
    code: [{ validator: this.validatePassword, trigger: 'blur' }]
  };

  private codeType = 'code';
  private loading = false;
  private showDialog = false;
  private capsTooltip = false;
  private redirect?: string;
  private otherQuery: Dictionary<string> = {};
  mounted() {
    if (this.loginForm.phone === '') {
      (this.$refs.username as Input).focus()
    } else if (this.loginForm.code === '') {
      (this.$refs.code as Input).focus()
    }

    new this.QRCode(this.$refs.qrCodeDiv, {
      text: 'https://www.baidu.com',
      width: 180,
      height: 180,
      colorDark: '#000', // 二维码颜色
      colorLight: '#fff', // 二维码背景色
      correctLevel: this.QRCode.CorrectLevel.L // 容错率，L/M/H
    })
  }

  async handleLogin() {
    await UserModule.Login(this.loginForm)
    // 当没认证跳转到认证页
    // 认证成功跳转到首页
    // this.$router.push({ path: "/certification" });
    this.$router.push({ path: '/' }).catch((err) => {
      console.warn(err)
    })
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

  home() {
    this.$router.push({ path: '/index' })
  }

  certification() {
    this.$router.push({ path: '/certification' })
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
  .img {
    display: inline-block;
    background-color: #fff;
    padding: 6px;
    box-sizing: border-box;
    img {
      width: 180px;
      height: 180px;
    }
  }
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
