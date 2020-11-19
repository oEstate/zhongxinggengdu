<template>
  <div class="rate" :class="{ disabled: disabled }">
    <i
      v-for="i in 5"
      class="iconfont"
      @click="disabled ? '' : setScore(i)"
      :class="getClass(i)"
      :key="i"
    >
      <i
        v-if="disabled && i == Math.floor(score) + 1"
        class="iconfont"
        :style="'width:' + width"
      ></i>
    </i>
    <span v-if="showText" class="text">{{ curScore || score }}分</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({
  name: "MyRate",
})
export default class extends Vue {
  @Prop({ default: 0 }) score!: number;
  @Prop({ default: false }) disabled!: Boolean;
  @Prop({ default: false }) showText!: Boolean;
  private curScore = "";
  private width = "";
  created() {
    this.getDecimal();
  }
  getClass(i: any) {
    if (this.curScore === "") {
      return i <= this.score ? "el-icon-star-on" : "el-icon-star-off";
    } else {
      return i <= this.curScore ? "el-icon-star-on" : "el-icon-star-off";
    }
  }
  getDecimal() {
    this.width = Number(this.score * 100 - Math.floor(this.score) * 100) + "%";
  }
  setScore(i: any) {
    this.$emit("update:score", i); //使用`.sync`修饰符，对score 进行“双向绑定
  }
}
</script>

<style lang="scss" scoped>
.rate{
  .iconfont{
    position: relative;
    font-size: 18px;
 
    transition: .3s;
 
    &+.iconfont{
      margin-left: 5px;
    }
    .iconfont{
      position: absolute;
      left: 0;
      overflow: hidden;
    }
    &.el-icon-star-off{
      color: #c0c4cc;
    //   font-size: 14px;
    }
    &.el-icon-star-on {
      color: #f4cd17;
      transform: scale(1.2);
    }
  }
}
</style>
