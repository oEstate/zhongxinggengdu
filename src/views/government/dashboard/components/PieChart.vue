<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import echarts, { EChartOption } from "echarts";
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import ResizeMixin from "@/components/Charts/mixins/resize";

@Component({
  name: "PieChart",
})
export default class extends mixins(ResizeMixin) {
  @Prop({ default: "chart" }) private className!: string;
  @Prop({ default: "100%" }) private width!: string;
  @Prop({ default: "300px" }) private height!: string;

  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  }

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }

  private initChart() {
    this.chart = echarts.init(this.$el as HTMLDivElement, "macarons");
    this.chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["定南县老城镇", "定南县新城区", "定南县新城区1"],
      },
      series: [
        {
          name: "全县店铺总量分布",
          type: "pie",
          radius: [45, 95],
          center: ["50%", "38%"],
          data: [
            {
              value: 320,
              name: "定南县老城镇",
              itemStyle: {
                color: "#968efb",
              },
            },
            {
              value: 240,
              name: "定南县新城区",
              itemStyle: {
                color: "#FE8FA5",
              },
            },
            {
              value: 149,
              name: "定南县新城区1",
              itemStyle: {
                color: "#33C4AF",
              },
            },
          ],
          label: {
            show: false,
          },
          animationEasing: "cubicInOut",
          animationDuration: 2600,
        },
      ],
    } as EChartOption<EChartOption.SeriesPie>);
  }
}
</script>
