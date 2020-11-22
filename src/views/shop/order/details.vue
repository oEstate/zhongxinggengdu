<template>
  <div class="container">
    <back
      icon="el-icon-search"
      titleTxt="订单管理"
      backTxt="订单详情"
      bt="20px"
    />
    <ul>
      <li class="u_f">
        <div class="lable">下单时间</div>
        <div>56785904</div>
      </li>
      <li class="u_f">
        <div class="lable">订单编号</div>
        <div>2020-10-11 10:22:22</div>
      </li>
      <li class="u_f">
        <div class="lable">支付时间</div>
        <div>2020-10-11 10:22:22</div>
      </li>
      <li class="u_f">
        <div class="lable">收货人</div>
        <div>王彦虎</div>
      </li>
      <li class="u_f">
        <div class="lable">手机号</div>
        <div>17710983732</div>
      </li>
      <li class="u_f">
        <div class="lable">收货地址</div>
        <div>北京市昌平区沙河镇小沙河村芙蓉兴盛市旁</div>
      </li>
      <li class="u_f">
        <div class="lable">配送方式</div>
        <div>平台配送</div>
      </li>
      <li class="u_f">
        <div class="lable">买家留言</div>
        <div>暂无</div>
      </li>
    </ul>
    <div class="pise u_f_ajs">
      <div class="goods u_f_ac">
        <img src="http://dwz.date/dp5k" alt="" />
        <div>
          <p class="title">定南脐橙老家脐橙</p>
          <p>5KG</p>
        </div>
      </div>
      <div>
        <p class="price">¥99.8</p>
        <p class="num">x4</p>
      </div>
    </div>
    <div class="allprice">
      <p>商品总金额：¥99.8</p>
      <p>运费：¥0.0</p>
      <p>
        <span>合计：</span>
        <span class="isColor">¥99.8</span>
      </p>
      <p><el-button class="query_btn" type="success">联系买家</el-button></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import back from "@/components/header/back.vue";
import Tinymce from "@/components/Tinymce/index.vue";

@Component({
  name: "matterAdd",
  components: {
    back,
    Tinymce,
  },
})
export default class extends Vue {
  private content = ``;
  private shopName = "";
  changeShop() {
    this.$emit("changeShop", "binding");
  }
  next() {
    this.$emit("changeShop", "bindingPhone");
  }
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0 30px;
}
li {
  font-size: 16px;
  color: #333333;
  margin-bottom: 18px;
  .lable {
    margin-right: 20px;
    width: 72px;
    text-align: right;
  }
}
.pise {
  padding: 18px 0;
  border-top: 1px solid #e8efec;
  border-bottom: 1px solid #e8efec;
  margin: 0 30px;
  .goods {
    font-size: 16px;
    color: #333333;
    img {
      width: 79px;
      height: 77px;
      flex-shrink: 0;
      border-radius: 8px;
      margin-right: 18px;
    }
    .title {
      margin-bottom: 8px;
    }
  }
  .price {
    text-align: right;
    font-size: 22px;
    font-weight: 500;
    color: #fb3737;
  }
  .num {
    text-align: right;
    font-size: 16px;
    color: #333333;
  }
}
.allprice {
    margin: 30px 30px 0 30px;
  p {
    text-align: right;
    font-size: 16px;
    color: #333333;
    line-height: 22px;
    margin-bottom: 7px;
    .isColor{
      color: #FB3737;
    }
  }
}
</style>
