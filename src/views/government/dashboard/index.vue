<template>
  <div>
    <div class="header">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <span>数据中心</span>
    </div>
    <div class="dashboard-container">
      <div class="u_f_ajs report">
        <div class="u_f_ac">
          <span class="icon-k"></span>
          <span class="title">全县营收情况</span>
        </div>
        <div>
          <span class="report-title">查看详细报表</span>
          <i class="el-icon-arrow-right ic"></i>
        </div>
      </div>
      <ul class="statistical u_f_ajsv">
        <li>
          <div class="statistical-n">1799</div>
          <div class="statistical-t">今日订单成交量</div>
        </li>
        <li>
          <div class="statistical-n">884.34</div>
          <div class="statistical-t">今日总营业额(万元)</div>
        </li>
        <li>
          <div class="statistical-n">11345.12</div>
          <div class="statistical-t">本周总营业额(万元)</div>
        </li>
        <li>
          <div class="statistical-n">45872.14</div>
          <div class="statistical-t">本月总营业额(万元)</div>
        </li>
      </ul>
      <div class="u_f_ajs report">
        <div class="u_f_ac">
          <span class="icon-k"></span>
          <span class="title">全县营收情况</span>
        </div>
        <div>
          <span class="report-title">查看详细报表</span>
          <i class="el-icon-arrow-right ic"></i>
        </div>
      </div>

      <pie-chart />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import PieChart from "./components/PieChart.vue";

@Component({
  name: "Dashboard",
  components: {
    PieChart,
  },
})
export default class extends Vue {
  @Prop() routes!: any;
  created() {
    console.log(this.routes);
  }
  get name() {
    return UserModule.name;
  }

  get roles() {
    return UserModule.roles;
  }
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

.dashboard {
  &-container {
    .report {
      border-bottom: 2px solid #E8EFEC;
      box-sizing: border-box;
      padding: 26px 36px 18px 37px;
      .icon-k {
        width: 6px;
        height: 6px;
        background: #00B54D;
        margin-right: 14px;
        display: inline-block;
      }
      .title {
        font-size: 20px;
        font-weight: 500;
        color: #444444;
      }
      .report-title {
        font-size: 16px;
        color: #777777;
      }
      .ic {
        color: #00B54D;
      }
    }

    .statistical {
      margin: 39px;
      &-n {
        height: 70px;
        font-size: 50px;
        font-weight: 600;
        color: #00B54D;
        line-height: 70px;
        letter-spacing: 1px;
        margin-bottom: 6px;
      }
      &-t {
        height: 22px;
        font-size: 16px;
        color: #444444;
        line-height: 22px;
      }
    }
  }
}
</style>
