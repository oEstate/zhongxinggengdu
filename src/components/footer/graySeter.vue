<template>
  <div class="footer">
    <div class="icp">京ICP备2020046644号</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'gray'
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
