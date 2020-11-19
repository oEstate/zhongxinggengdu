<template>
  <el-container>
    <div class="aside" style="width: 166px">
      <el-scrollbar style="height: 688px">
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
    </div>

    <div class="gallery">
      <el-scrollbar style="height: 670px">
        <ul class="container-list u_f">
          <li class="is-active-img">未分组</li>
          <li
            v-for="(item, index) in [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
            ]"
            :key="index"
          >
            <div class="item-img">
              <img src="http://dwz.date/dp5k" alt="" />
            </div>
            <div class="item-name">肉蛋</div>
            <div class="item-size">300X300</div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "materialVideo",
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

}
.gallery {
  width: 100%;
  box-sizing: border-box;
  padding: 21px 26px 0 26px;
  .container-list {
    flex-wrap: wrap;
    li {
      width: 140px;
      height: 168px;
      background: #ffffff;
      border-radius: 10px;
      border: 1px solid #dddddd;
      text-align: center;
      margin: 0 20px 20px 0;
      &:nth-child(6n){
        margin-right: 0;
      }
      .item-img {
        overflow: hidden;
        img {
          width: 140px;
          height: 110px;
          border-radius: 10px 10px 0px 0px;
        }
      }
      .item-name {
        font-size: 16px;
        color: #444444;
        margin-bottom: 4px;
      }
      .item-size {
        font-size: 13px;
        color: #666666;
      }
    }
  }
}
</style>
