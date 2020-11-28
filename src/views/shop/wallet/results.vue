<template>
  <div>
    <div class="header u_f_ac">
      <img class="header-icon" src="@/assets/header-icon/goods.png" alt="" />
      <span>账户总览</span>
    </div>
    <div class="container">
      <img class="results_img" src="http://dwz.date/dutK" alt="" />
      <p class="results_title">提现提交成功</p>
      <p class="results_tips">我们将会在3个小时内将您的余额提现到账</p>
      <div><el-button type="success" @click="back">返回账户</el-button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
@Component({
  name: 'results'
})
export default class extends Vue {
  created() {}
  back() {
    this.$router.go(-1)
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  background: #e8efec;
  line-height: 70px;
  font-size: 18px;
  color: #444444;
  padding-left: 33px;
  i {
    margin-right: 13px;
  }
}
.container {
  text-align: center;
  .results_img{
      width: 90px;
      margin: 138px 0 19px 0;
  }
  .results_title {
    height: 28px;
    font-size: 20px;
    font-weight: 500;
    color: #666666;
    line-height: 28px;
    margin-bottom: 4px;
  }
  .results_tips {
    height: 31px;
    font-size: 18px;
    color: #666666;
    line-height: 31px;
    margin-bottom: 32px;
  }
}
</style>
