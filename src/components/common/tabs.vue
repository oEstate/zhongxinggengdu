<template>
  <el-tabs v-model="active" @tab-click="handleClick">
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
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";

@Component({
  name: "tabs",
})
export default class extends Vue {
  @Prop() tabsActive!: any;
  @Prop() tabsData!: any;
  private active = this.tabsActive;

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
  color: #00b54d;
}
::v-deep .el-tabs__active-bar {
  background-color: #00b54d;
}
::v-deep .el-tabs__item:hover {
  color: #00b54d;
}
</style>
