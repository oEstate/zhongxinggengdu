<template>
  <div>
    <div class="header u_f_ac">
      <img
        class="header-icon"
        :src="icon"
        alt=""
      />
      <span>{{titleTxt}}</span>
    </div>
    <div class="back" :style="{marginBottom:bt}">
      <el-button type="text" icon="el-icon-back" @click="back"
        >{{backTxt}}</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({
  name: "backs",
})
export default class extends Vue {
  @Prop() icon!: any;
  @Prop() titleTxt!: any;
  @Prop() backTxt!: any;
  @Prop({ default: 52 }) bt!: any;
  back() {
    this.$router.go(-1);
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
.back {
  font-size: 16px;
  color: #444444;
  padding: 10px 0;
  border-bottom: 2px solid #e8efec;
  margin-bottom: 52px;
    padding-left: 33px;
  .el-button {
    font-size: 16px;
  }
}
</style>
