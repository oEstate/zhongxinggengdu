<template>
  <div>
    <el-row class="ul" :style="{height:clientHeight-300+'px'}">
      <el-scrollbar style="height: 100%">
        <div
          class="li u_f_ac"
          v-for="(item, index) in tableData"
          :key="index"
          @click="jump"
        >
          <div class="message-icon">
            <img src="http://dwz.date/drME" alt="" />
          </div>
          <div class="message">
            <p class="message-title">轮播名称轮播名称轮播名称</p>
            <p class="message-con">
              县政协组织收听收看全国政协县政协组织收听收看全国政协县政协组织收听收看全国政协
            </p>
          </div>
        </div>
      </el-scrollbar>
    </el-row>
    <el-pagination background layout="total,prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import ResizeMixin1 from "@/layout/mixin/resize1";
@Component({
  name: "messageItem",
})
export default class extends mixins(ResizeMixin1) {
  private tableData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1];
  created() {}
  jump() {
    this.$router.push({ path: "/message/info" });
  }
}
</script>

<style lang="scss" scoped>
.ul {
  border-radius: 12px;
  border: 1px solid #cccccc;
  .li {
    padding-bottom: 16px;
    border-bottom: 1px solid #e1e1e1;
    margin: 0 18px 16px 18px;
    width: auto;
    cursor: pointer;
    &:first-child {
      margin-top: 17px;
    }
    &:last-child {
      border-bottom: 0;
      margin-bottom: 0;
    }
    .message-icon {
      width: 79px;
      height: 77px;
      background: #d1dfd9;
      border-radius: 8px;
      overflow: hidden;
      margin-right: 19px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .message {
      .message-title {
        font-size: 18px;
        color: #333333;
        line-height: 25px;
        margin-bottom: 6px;
      }
      .message-con {
        font-size: 16px;
        color: #666666;
        line-height: 25px;
      }
    }
  }
}
</style>
