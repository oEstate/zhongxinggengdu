<template>
  <div :class="classObj" class="app-wrapper">
    <div class="main-container">
      <navbar />
      <div class="u_f main-buttom">
        <sidebar class="sidebar-container" />
        <app-main />
      </div>
      <grayFooter class="grayFooter" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { DeviceType, AppModule } from "@/store/modules/app";
import { AppMain, Navbar, Sidebar } from "./components";
import grayFooter from "@/components/footer/gray.vue";
import ResizeMixin from "./mixin/resize";

@Component({
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar,
    grayFooter,
  },
})
export default class extends mixins(ResizeMixin) {
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile,
    };
  }

  private handleClickOutside() {
    AppModule.CloseSideBar(false);
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #F1F4F3;
}

.main-container {
  min-height: 100%;
  position: relative;
  .main-buttom {
    width: 1299px;
    margin: 0 auto;
  }
}

.grayFooter {
  margin-top: 45px;
}
</style>
