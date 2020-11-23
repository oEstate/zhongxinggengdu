<template>
  <div class="login-nav">
    <div class="login-width">
      <div class="login-nav-bar">
        <div class="login-img">
          <img src="@/assets/common/logogreen.png" alt="" />
        </div>
        <el-link :underline="false" class="nav-button" @click="home">首页</el-link>
        <el-link :underline="false" class="nav-button">常见问题</el-link>
        <el-link :underline="false" class="nav-button">村居直供APP</el-link>
      </div>
      <el-link v-if="false" :underline="false" class="login-btn"
        >登录 / 注册</el-link
      >
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img src="http://dwz.date/dh7a" class="user-avatar" />
          <span>用户1245663</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/">
            <el-dropdown-item> 个人中心 </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block"> 退出登录 </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "headindex",
})
export default class extends Vue {
  created() {}
  home() {
    this.$router.push({ path: "/index" });
  }
}
</script>

<style lang="scss" scoped>
.el-link.el-link--default:hover {
  color: #06c654;
}
.el-link.el-link--default {
  color: #333;
}
.login-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 94px;
  font-size: 20px;
  color: #333;
  background-color: #f7f7f7;
  .login-width {
    width: 970px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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

.avatar-container {
  cursor: pointer;
  .avatar-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    .user-avatar {
      width: 42px;
      height: 42px;
      border-radius: 42px;
      margin-right: 10px;
    }

    .el-icon-caret-bottom {
      font-size: 12px;
      margin-left: 6px;
    }
  }
}

.el-dropdown-menu__item:not(.is-disabled):hover,
.el-dropdown-menu__item:focus {
  background-color: #e2f3e9;
  color: #13ce66;
}
</style>
