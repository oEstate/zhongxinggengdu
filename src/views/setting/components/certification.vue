<template>
  <div class="container">
    <el-scrollbar style="height: 100%">
      <ul class="from">
        <li class="ag">
          <div class="from-itrm-l">本人姓名</div>
          <div>马有成</div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">身份证号</div>
          <div>4567895256728950254894</div>
        </li>
        <li class="ag nolinje">
          <div class="from-itrm-l">身份证（正面）</div>
          <img src="@/assets/common/auditsuccess.png" class="icard" />
        </li>
        <li class="ag nolinje">
          <div class="from-itrm-l">身份证（反面）</div>
          <img src="@/assets/common/auditsuccess.png" class="icard" />
        </li>
        <li class="ag nolinje">
          <div class="from-itrm-l">本人手持身份证</div>
          <img src="@/assets/common/auditsuccess.png" class="icard" />
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "certification",
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
.container {
  height: 636px;
}
.from {
  margin-top: 10px;
  li {
    list-style: none;
    display: flex;
    margin-bottom: 18px;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 18px;
    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }
    .from-itrm-l {
      margin-right: 22px;
      font-size: 16px;
      color: #333333;
      flex-shrink: 0;
    }
    .from-logo {
      width: 76px;
      height: 76px;
      background: #eaeaea;
      border-radius: 76px;
    }
    .icard {
      width: 359px;
      height: 232px;
      background: #f0f0f0;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
    }
  }
  .nolinje {
    border-bottom: 0;
    padding-bottom: 0;
  }
  .ag {
    align-items: center;
  }
}
</style>
