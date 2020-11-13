<template>
  <section class="app-main">
    <div class="header">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <span>内容管理</span>
    </div>

    <transition name="fade-transform" mode="out-in">
      <router-view :routes="routes" />
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AppMain",
})
export default class extends Vue {
  created() {
    console.log(this.nowroute);
    console.log(this.routes);
  }
  get routes() {
    let routes: any = {
      children: this.$router.options.routes,
    };
    let route: any = this.$route.matched;
    for (var i = 0; i < route.length - 1; i++) {
      routes = routes.children.find((e: any) => e.name == route[i].name);
    }

    return routes.children;
  }
  get nowroute() {
    let route: any = this.$route;

    return route;
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  width: 100%;
  height: 994px;
  background: #F3F6F5;
  box-shadow: 0px 0px 16px 6px rgba(12, 44, 27, 0.05);
  border-radius: 18px;
  margin-top: -210px;
  .header {
    height: 70px;
    background: #E8EFEC;
    line-height: 70px;
    font-size: 18px;
    color: #444444;
    padding-left: 33px;
    i {
      margin-right: 13px;
    }
  }
}
</style>
