<template>
  <div class="u_f">
    <el-select
      v-model="value"
      value-key="code"
      @change="change(0, value)"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.code"
        :label="item.name"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="value1"
      @change="change(1, value1)"
      value-key="code"
      placeholder="请选择"
    >
      <el-option
        v-for="item in options1"
        :key="item.code"
        :label="item.name"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="value2"
      @change="change(2, value2)"
      placeholder="请选择"
      value-key="code"
    >
      <el-option
        v-for="item in options2"
        :key="item.code"
        :label="item.name"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="value3"
      @change="change(3, value3)"
      placeholder="请选择"
      value-key="code"
    >
      <el-option
        v-for="item in options3"
        :key="item.code"
        :label="item.name"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-select
      @change="change(4, value3)"
      v-model="value4"
      placeholder="请选择"
      value-key="code"
    >
      <el-option
        v-for="item in options4"
        :key="item.code"
        :label="item.name"
        :value="item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getCity } from "@/api/selectCity";
@Component({
  name: "selectCity",
})
export default class extends Vue {
  private options = [];
  private value = "";
  private options1 = [];
  private value1 = "";
  private options2 = [];
  private value2 = "";
  private options3 = [];
  private value3 = "";
  private options4 = [];
  private value4 = "";
  async created() {
    const { data } = await getCity({ pcode: 0 });
    this.options = data;
  }
  async change(type: any, val: any) {
    let pcode = val.code;
    switch (type) {
      case 0:
        this.options1 = [];
        this.value1 = "";
        this.options2 = [];
        this.value2 = "";
        this.options3 = [];
        this.value3 = "";
        this.options4 = [];
        this.value4 = "";
        const data = await getCity({ pcode });
        this.options1 = data.data;
        this.combination();
        break;
      case 1:
        this.options2 = [];
        this.value2 = "";
        this.options3 = [];
        this.value3 = "";
        this.options4 = [];
        this.value4 = "";
        const data1 = await getCity({ pcode });
        this.options2 = data1.data;
        this.combination();
        break;
      case 2:
        this.options3 = [];
        this.value3 = "";
        this.options4 = [];
        this.value4 = "";
        const data2 = await getCity({ pcode });
        this.options3 = data2.data;
        this.combination();
        break;
      case 3:
        this.options4 = [];
        this.value4 = "";
        const data3 = await getCity({ pcode });
        this.options4 = data3.data;
        this.combination();
        break;
      case 4:
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
      this.pd(this.value3) ? "" : this.value3,
      this.pd(this.value4) ? "" : this.value4,
    ];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == null || arr[i] == "" || JSON.stringify(arr[i]) == "{}") {
        arr.splice(i, 1);
        // console.log(arr);
        i = i - 1;
      }
    }
    this.$emit("getCity", arr);
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
