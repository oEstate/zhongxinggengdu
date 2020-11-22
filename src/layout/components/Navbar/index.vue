<template>
  <div class="header">
    <div class="sidebar u_f">
      <div class="sidebar_item">
        <div class="logo">
          <img src="@/assets/common/logo3.png" alt="" />
        </div>
        <div class="sidebar_welcome">
          <div class="sidebar_welcome_img">
            <img src="@/assets/common/gh.png" alt="" />
          </div>
          <div class="sidebar_welcome_title">定南县人民政府</div>
          <div class="sidebar_welcome_text">您好！欢迎登录</div>
        </div>
      </div>
      <div>
        <el-input class="query">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <img
          @click="logout"
          class="query_icon"
          src="@/assets/common/back.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from '@/store/modules/user'
@Component({
  name: "SideBar",
  components: {},
})
export default class extends Vue {


  get routes() {
    return (this.$router as any).options.routes;
  }

  get activeMenu() {
    const route = this.$route;
    const { meta, path } = route;
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }
  private async logout() {
    await UserModule.LogOut();
    this.$router
      .push(`/login?redirect=${this.$route.fullPath}`)
      .catch((err) => {
        console.warn(err);
      });
  }
}
</script>


<style lang="scss" scoped>
.header {
  background-color: #00b54d;
}
.sidebar {
  width: 1299px;
  margin: 0 auto;
  justify-content: space-between;
  .sidebar_item {
    height: 310px;
    .logo {
      padding-top: 19px;
      margin-bottom: 41px;
      img {
        height: 44px;
      }
    }
    .sidebar_welcome {
      text-align: center;
      width: 222px;
      height: 179px;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 52px;
      margin-left: 28px;
      box-sizing: border-box;
      padding-top: 20px;
      .sidebar_welcome_img {
        width: 68px;
        height: 73px;
        margin: 0 auto 12px auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .sidebar_welcome_title {
        height: 28px;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        line-height: 28px;
        margin-bottom: 3px;
      }
      .sidebar_welcome_text {
        height: 20px;
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
      }
    }
  }
  .query {
    width: 219px;

    border-radius: 8px;
    margin-top: 21px;
  }
  ::v-deep .el-input__inner {
    background: rgba(255, 255, 255, 0.2);
    border: 0;
    color: #fff;
  }
  ::v-deep .el-input__prefix {
    color: #fff;
  }
}
.query_icon {
  cursor: pointer;
  border-radius: 8px;
  opacity: 0.4;
  border: 1px solid #ffffff;
  text-align: center;
  line-height: 38px;
  color: #fff;
  font-size: 20px;
  margin-left: 16px;
  position: relative;
  top: 14px;
  padding: 8px 16px;
}
</style>
