<template>
  <div>
    <div class="container">
      <el-scrollbar :style="{ height: clientHeight - 370 + 'px' }">
        <ul class="from">
          <li class="ag">
            <div class="from-itrm-l">{{userType=='1'?'店铺头像':'平台头像'}}</div>
            <img src="http://dwz.date/drME" class="from-logo" />
          </li>
          <li class="ag">
            <div class="from-itrm-l">{{userType=='1'?'店铺名称':'平台名称'}}</div>
            <div>小杨家的超市</div>
          </li>
          <li>
            <div class="from-itrm-l">{{userType=='1'?'店铺简介':'平台简介'}}</div>
            <div>
              爱他美官方旗舰店，原装原罐进口，德国领先的高端奶粉品牌，是德国市场份额第一的奶粉，也是欧洲销量最好的奶粉之一，爱他美官方
              旗舰店，原装原罐进口，德国领先的高端奶粉品牌，是德国市场份额第一的奶粉，也是欧洲销量最好的奶粉之一
            </div>
          </li>
          <li class="ag">
            <div class="from-itrm-l">{{userType=='1'?'店铺地址':'平台地址'}}</div>
            <div>小杨家的超市</div>
          </li>
          <li class="ag" v-if="userType=='1'">
            <div class="from-itrm-l">店铺行业</div>
            <div>制造业</div>
          </li>
          <li>
            <div class="from-itrm-l">{{userType=='1'?'店铺图片':'平台图片'}}</div>
            <img src="http://dwz.date/drMG" class="icard" />
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="next-btn">
      <el-button type="success" @click="changeShop">修改</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import ResizeMixin1 from "@/layout/mixin/resize1";
import { getUserType } from "@/utils/cookies";
@Component({
  name: "basic",
})
export default class extends mixins(ResizeMixin1) {
  private active = 2;
  private shopName = "";
  private selectedOptions = [];
  private imageUrl = "";
  get userType() {
    return getUserType();
  }
  changeShop() {
    this.$emit("changeShop", "basicAlter");
  }
}
</script>

<style lang="scss" scoped>
.from {
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
      width: 259px;
      height: 146px;
      background: #f0f0f0;
      border-radius: 8px;
      opacity: 0.8;
      text-align: center;
      cursor: pointer;
      border: 1px solid #f0f0f0;
      line-height: 146px;
      .icard-img {
        width: 259px;
        height: 146px;
        border-radius: 8px;
        border: 1px solid #f0f0f0;
      }
    }
  }
  .ag {
    align-items: center;
  }
}
.next-btn {
  text-align: center;
  margin-top: 10px;

  .el-button {
    margin-right: 20px;
  }
}
</style>
