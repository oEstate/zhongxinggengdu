<template>
  <div class="footer">
    <div class="footer-top">
      <el-link :underline="false" class="nav-button">关于我们</el-link> |
      <el-link :underline="false" class="nav-button">联系我们</el-link>
    </div>
    <div class="icp">京ICP备2020046644号</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'footindex'
})
export default class extends Vue {
  created() {}
}
</script>

<style lang="scss" scoped>
.el-link.el-link--default:hover {
  color: #06c654;
}
.el-link.el-link--default {
  color: #fff;
}
.footer{
    color:#fff;
    font-size: 18px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 43px;
    margin: auto;
    text-align: center;
    height: 52px;
    line-height: 18px;
    // .footer-top{
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    // }
}
.icp,.el-link{
  font-size: 18px;
  margin-top: -2px;
}
.icp{
  margin-top: 16px;
}
</style>
