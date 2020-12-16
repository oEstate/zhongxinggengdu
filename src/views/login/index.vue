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
      <el-link @click="jump" :underline="false" class="login-btn">登录 / 注册</el-link>
    </div>
    <div class="login-info">
      <div class="login-info-h1">村居直供云平台</div>
      <div class="login-info-h2">服务城乡居民</div>
      <el-button class="login-info-btn" type="success" @click="jump">入住平台</el-button>
    </div>
    <pageFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import pageFooter from '@/components/footer/index.vue'
@Component({
  name: 'LoginHome',
  components: {
    pageFooter
  }
})
export default class extends Vue {
  jump() {
    this.$router.push({ path: '/login' })
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
  background-image: url("../../assets/common/banner1.jpg");
  background-size: 100% 100%;
  .login-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    margin: 18px 13.6% 0 12.5%;
    font-size: 20px;
    color: #fff;
    // background-color: #ff0000;
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
        display: inline-block;
      }
    }
    .login-btn {
    }
  }
  .login-info {
    text-align: center;
    .login-info-h1 {
      height: 132px;
      font-size: 94px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 132px;
      letter-spacing: 8px;
      margin-bottom: 17px;
      margin-top: 135px;
    }
    .login-info-h2 {
      height: 65px;
      font-size: 46px;
      font-family: PingFangSC-Light, PingFang SC;
      color: #ffffff;
      line-height: 65px;
      letter-spacing: 4px;
      margin-bottom: 40px;
    }
    .login-info-btn {
    }
  }
}
</style>
