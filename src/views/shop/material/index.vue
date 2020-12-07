<template>
  <div>
    <div class="header u_f_ac">
      <img class="header-icon" src="@/assets/header-icon/material.png" alt="" />
      <span>素材库</span>
    </div>
    <div class="dashboard-container">
      <tabs
        class="tabs"
        :tabsData="tabsData"
        :tabsActive="tabsActive"
        :isComponent="isComponent"
        @getPath="getPath"
      >
        <component :is="isComponent" @changeShop="changeShop"></component>
      </tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import tabs from "@/components/common/tabs.vue";
import materialImg from "./components/materialImg.vue";
import materialVideo from "./components/materialVideo.vue";
import materialVr from "./components/materialVr.vue";
@Component({
  name: "material",
  components: {
    tabs,
    materialImg,
    materialVideo,
    materialVr,
  },
})
export default class extends Vue {
  private tabsActive = "0";
  private isComponent = "materialImg";
  private tabsData = [
    {
      label: "图片库",
      name: "0",
      path: "materialImg",
    },
    {
      label: "视频库",
      name: "1",
      path: "materialVideo",
    },
    {
      label: "VR库",
      name: "2",
      path: "materialVr",
    },
  ];

  created() {}

  getPath(e: any) {
    // alert(2)
    console.log(e);
    this.isComponent = e;
  }

  changeShop(e: any) {
    this.isComponent = e;
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  background: #e8efec;
  line-height: 70px;
  font-size: 18px;
  color: #444444;
  padding-left: 33px;
  i {
    margin-right: 13px;
  }
}
::v-deep .el-tabs__item {
  font-size: 18px;
  height: 61px;
  line-height: 61px;
}
::v-deep .el-tabs__item.is-active {
  color: #00b54d;
}
::v-deep .el-tabs__active-bar {
  background-color: #00b54d;
}
::v-deep .el-tabs__item:hover {
  color: #00b54d;
}
.tabs ::v-deep {
  .el-tabs__header {
    margin-bottom: 0;
    padding: 0 32px;
  }
}
.dashboard {
  &-container {
    // margin: 18px 32px 0 32px;
    .report {
      border-bottom: 2px solid #e8efec;
      box-sizing: border-box;
      padding: 26px 36px 18px 37px;
      .icon-k {
        width: 6px;
        height: 6px;
        background: #00b54d;
        margin-right: 14px;
        display: inline-block;
      }
      .title {
        font-size: 20px;
        font-weight: 500;
        color: #444444;
      }
      .report-title {
        font-size: 16px;
        color: #777777;
      }
      .ic {
        color: #00b54d;
      }
    }

    .statistical {
      margin: 39px;
      &-n {
        height: 70px;
        font-size: 50px;
        font-weight: 600;
        color: #00b54d;
        line-height: 70px;
        letter-spacing: 1px;
        margin-bottom: 6px;
      }
      &-t {
        height: 22px;
        font-size: 16px;
        color: #444444;
        line-height: 22px;
      }
    }
  }
}
</style>
