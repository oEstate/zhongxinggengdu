<template>
  <el-container>
    <div class="aside" style="width: 166px">
      <el-scrollbar style="height: 440px">
        <ul class="aside-list">
          <li class="is-active">未分组</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
        </ul>
      </el-scrollbar>
      <div class="btn">
        <div class="editor">
          <el-button type="success" plain>编辑</el-button>
        </div>
        <div class="tc">
          <el-button type="success">新增分类</el-button>
        </div>
      </div>
    </div>

    <el-container>
      <el-scrollbar style="height: 440px">
        <ul class="aside-list">
          <li class="is-active">未分组</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
        </ul>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "materialImg",
})
export default class extends Vue {
  private active = 2;
  private shopName = "";
  private selectedOptions = [];
  private imageUrl = "";
  changeShop() {
    this.$emit("changeShop", "basicAlter");
  }
}
</script>

<style lang="scss" scoped>
.aside {
  border-right: 2px solid #e8efec;
  // position: relative;
  height: 560px;
  .aside-list {
    margin-bottom: 8px;
    li {
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 18px;
      color: #444444;
      cursor: pointer;
    }
    .is-active {
      background-color: #e8efec;
      color: #00b54d;
      font-weight: 500;
    }
  }
  .btn {
    // position: absolute;
    // bottom: 14px;
    // left: 50%;
    // transform: translateX(-50%);
    .editor {
      margin-bottom: 14px;
      text-align: center;
      .el-button {
        width: 97px;
      }
    }
  }
}
</style>
