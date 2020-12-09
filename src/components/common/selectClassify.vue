<template>
  <div class="u_f">
    <el-select
      v-model="value"
      value-key="categoryCode"
      @change="change(0, value)"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.categoryCode"
        :label="item.categoryName"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="value1"
      @change="change(1, value1)"
      value-key="categoryCode"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options1"
        :key="item.categoryCode"
        :label="item.categoryName"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="value2"
      @change="change(2, value2)"
      placeholder="请选择"
      value-key="categoryCode"
    >
      <el-option
        v-for="item in options2"
        :key="item.categoryCode"
        :label="item.categoryName"
        :value="item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { getClassify } from "@/api/selectCity";
@Component({
  name: "selectClassify",
})
export default class extends Vue {
  @Prop({ default: "" }) echo!: any;
  private options = [];
  private value = "";
  private options1 = [];
  private value1 = "";
  private options2 = [];
  private value2 = "";
  async created() {
    const { data } = await getClassify({ pcode: 0 });
    this.options = data;
  }
  mounted() {
    this.value = this.echo[0];
    if (this.echo.length > 1) {
      this.echo.map((item: any, index: any) => {
        console.log(item)
        this.change(index, item);
      });
      this.value1 = this.echo[1];
      this.value2 = this.echo[2];
    }
  }
  async change(type: any, val: any) {
    let pcode = val.categoryCode;
    switch (type) {
      case 0:
        this.options1 = [];
        this.value1 = "";
        this.options2 = [];
        this.value2 = "";
        const data = await getClassify({ pcode });
        this.options1 = data.data;
        this.combination();
        break;
      case 1:
        this.options2 = [];
        this.value2 = "";
        const data1 = await getClassify({ pcode });
        this.options2 = data1.data;
        this.combination();
        break;
      case 2:
        this.combination();
        break;
    }
  }
  pd(obj: any) {
    if (JSON.stringify(obj) == "{}") {
      return true;
    }
    return false;
  }
  combination() {
    let arr = [
      this.pd(this.value) ? "" : this.value,
      this.pd(this.value1) ? "" : this.value1,
      this.pd(this.value2) ? "" : this.value2,
    ];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == null || arr[i] == "" || JSON.stringify(arr[i]) == "{}") {
        arr.splice(i, 1);
        // console.log(arr);
        i = i - 1;
      }
    }
    this.$emit("getClassify", arr);
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  margin-right: 10px;
}
::v-deep .el-select .el-input__inner {
  width: 150px;
}
</style>
