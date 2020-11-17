<template>
  <div>
    <div class="header">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <span>内容管理</span>
    </div>
    <div class="dashboard-container">
      <tabs :tabsData="tabsData" :tabsActive="tabsActive" @getPath="getPath">
        <component :is="isComponent"></component>
      </tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import PieChart from "./components/PieChart.vue";
import survey from "./components/survey.vue";
import news from "./components/news.vue";
import message from "./components/message.vue";
import construction from "./components/construction.vue";
import convenience from "./components/convenience.vue";
import customs from "./components/customs.vue";
import opengov from "./components/opengov.vue";
import tabs from "@/components/common/tabs.vue";
@Component({
  name: "Dashboard",
  components: {
    PieChart,
    tabs,
    survey,
    news,
    message,
    construction,
    convenience,
    customs,
    opengov
  },
})
export default class extends Vue {
  private tabsActive = "0";
  private isComponent = "survey";
  private tabsData = [
    {
      label: "本地概况",
      name: "0",
      path: "survey",
    },
    {
      label: "本地资讯",
      name: "1",
      path: "news",
    },
    {
      label: "通知消息",
      name: "2",
      path: "message",
    },
    {
      label: "党建",
      name: "3",
      path: "construction",
    },
    {
      label: "便民",
      name: "4",
      path: "convenience",
    },
    {
      label: "民风民俗",
      name: "5",
      path: "customs",
    },
    {
      label: "政务公开",
      name: "6",
      path: "opengov",
    },
  ];
  created() {}

  getPath(e:any){
    // alert(2)
    console.log(e)
    this.isComponent=e
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
::v-deep .el-tabs__item {
  font-size: 18px;
  height: 61px;
  line-height: 61px;
}
::v-deep .el-tabs__item.is-active {
  color: #00B54D;
}
::v-deep .el-tabs__active-bar {
  background-color: #00B54D;
}
::v-deep .el-tabs__item:hover {
  color: #00B54D;
}
.dashboard {
  &-container {
    margin: 18px 32px 0 32px;
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
