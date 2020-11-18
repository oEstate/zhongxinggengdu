<template>
  <div class="container">
    <el-scrollbar style="height: 100%">
      <ul class="from">
        <li class="ag">
          <div class="from-itrm-l">手机号</div>
          <div class="from-itrm-r">17710927017</div>
          <el-button type="success" @click="changeShop">修改</el-button>
        </li>
        <li class="ag">
          <div class="from-itrm-l">微 信</div>
          <div class="from-itrm-r">特仑苏</div>
          <el-button type="success">取消绑定</el-button>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "materialVr",
})
export default class extends Vue {
  private active = 2;
  private shopName = "";
  private selectedOptions = [];
  private imageUrl = "";
  changeShop() {
    this.$emit("changeShop", "bindingPhoneValidation");
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 530px;
}
.from {
  margin-top: 10px;
  li {
    list-style: none;
    display: flex;
    margin-bottom: 18px;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 18px;
    .from-itrm-l {
      margin-right: 20px;
      font-size: 16px;
      color: #333333;
      flex-shrink: 0;
      width: 60px;
    }
    .from-itrm-r {
      width: 160px;
    }
  }
  .ag {
    align-items: center;
  }
}
</style>
