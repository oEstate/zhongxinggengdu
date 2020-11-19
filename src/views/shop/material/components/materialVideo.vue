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

    <div class="gallery">
      <div class="u_f_ajs query">
        <div class="u_f">
          <el-input placeholder="请输入关键字">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="query_btn" type="success">搜索</el-button>
        </div>
        <div>
          <el-button type="success" @click="addColumn">上传视频</el-button>
          <el-button type="success" @click="addColumn">转移分组</el-button>
          <el-button type="success" @click="addColumn">批量删除</el-button>
        </div>
      </div>
      <el-scrollbar style="height: 480px">
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
.gallery {
  width: 100%;
  box-sizing: border-box;
  padding: 21px 26px 0 26px;

  .query {
    margin-bottom: 20px;
    .query_btn {
      margin-left: 12px;
    }
  }
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
      &:nth-child(5n){
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
