<template>
  <div class="container">
    <el-steps align-center :active="activeNumber" finish-status="success">
      <el-step title="1、选择身份"></el-step>
      <el-step title="2、提交认证"></el-step>
      <el-step title="3、等待平台审核"></el-step>
      <el-step :title="lastName"></el-step>
    </el-steps>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({
  name: "steps",
})
export default class extends Vue {
  @Prop({ default: 1 }) activeNumber!: number;
  @Prop({ default: '4、审核结果' }) lastName!: string;
  next() {
    if (this.activeNumber++ > 3) this.activeNumber = 0;
  }
}
</script>

<style lang="scss" scoped>
.el-steps {
  max-width: 803px;
  margin: 0 auto;
}
::v-deep .el-step__head {
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
::v-deep .el-step__title.is-process {
  font-weight: 400;
  color: #e3e3e3;
}
::v-deep .el-step__title.is-wait {
  color: #e3e3e3;
}
::v-deep .el-step__head.is-success {
  color: #00b54d;
  border-color: #00b54d;
}
::v-deep .el-step__head.is-process,
::v-deep .el-step__head.is-wait {
  color: #e3e3e3;
  border-color: #e3e3e3;
}
::v-deep .el-step__head.is-process .el-step__icon,
::v-deep .el-step__head.is-wait .el-step__icon {
  background-color: #e3e3e3;
  width: 30px;
  height: 30px;
}

::v-deep .el-step__icon {
  background-color: #00b54d;
  width: 42px;
  height: 42px;
  margin-left: 84px;
}
::v-deep .el-step.is-horizontal .el-step__line {
  height: 4px;
}
::v-deep .el-step.is-horizontal .el-step__line {
  top: 21px;
  background-color: #e3e3e3;
}
::v-deep .is-success .el-step__line-inner {
  height: 4px;
  background-color: #00b54d;
}
</style>
