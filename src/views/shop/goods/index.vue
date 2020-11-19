<template>
  <div>
    <div class="header">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <span>商品管理</span>
    </div>
    <div class="container">
      <goodList />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import goodList from "./components/goodList.vue";
@Component({
  name: "carousel",
  components: {
    goodList,
  },
})
export default class extends Vue {
  created() {}
}
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  background: #E8EFEC;
  line-height: 70px;
  font-size: 18px;
  color: #444444;
  padding-left: 33px;
  i {
    margin-right: 13px;
  }
}
.container {
  box-sizing: border-box;
  padding: 20px 32px 36px 32px;
}
</style>
