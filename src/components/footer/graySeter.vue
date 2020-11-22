<template>
  <div class="footer">
    <div class="icp">ICP证：沪B2-20150087</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "gray",
})
export default class extends Vue {
  created() {}
}
</script>

<style lang="scss" scoped>

.footer{
    color:#999999;
    font-size: 18px;
    text-align: center;
}
.icp,.el-link{
  font-size: 18px;
}
.icp{
  margin-top: 16px;
}
</style>
