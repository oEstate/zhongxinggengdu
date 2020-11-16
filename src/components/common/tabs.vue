<template>
  <el-tabs v-model="tabsActive" @tab-click="handleClick">
    <el-tab-pane
      v-for="item in tabsData"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    >
      <slot />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({
  name: "tabs",
})
export default class extends Vue {
  @Prop() tabsActive!: any;
  @Prop() tabsData!: any;

  get tabs() {
    let tabs: any = this.tabsActive;
    return tabs;
  }
  created() {}
  handleClick(tab: any, event: any) {
    let path = this.tabsData[tab.index].path;
    this.$emit("getPath", path);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__item {
  font-size: 18px;
  height: 61px;
  line-height: 61px;
}
::v-deep .el-tabs__item.is-active {
  color: #00B54D;
}
::v-deep .el-tabs__active-bar {
  background-color: #00B54D;
}
::v-deep .el-tabs__item:hover {
  color: #00B54D;
}
</style>
