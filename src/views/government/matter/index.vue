<template>
  <div>
    <div class="header u_f_ac">
      <img class="header-icon" src="@/assets/header-icon/matter.png" alt="" />
      <span>内容管理</span>
    </div>
    <div class="dashboard-container">
      <tabs :tabsData="userType == '4'?tabsData:tabsData1" :tabsActive="tabsActive" @getPath="getPath" :isComponent="isComponent">
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
import { getUserType } from "@/utils/cookies";
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
    opengov,
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
  private tabsData1 = [
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
  ];

  created() {}
  get userType() {
    return getUserType();
  }
  getPath(e: any) {
    // alert(2)
    // console.log(e)
    this.isComponent = e;
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
::v-deep .el-tabs__item {
  font-size: 18px;
  height: 61px;
  line-height: 61px;
}
::v-deep .el-tabs__item.is-active {
  color: #00b54d;
}
::v-deep .el-tabs__active-bar {
  background-color: #00b54d;
}
::v-deep .el-tabs__item:hover {
  color: #00b54d;
}
.dashboard {
  &-container {
    margin: 18px 32px 0 32px;
    .report {
      border-bottom: 2px solid #e8efec;
      box-sizing: border-box;
      padding: 26px 36px 18px 37px;
      .icon-k {
        width: 6px;
        height: 6px;
        background: #00b54d;
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
        color: #00b54d;
      }
    }

    .statistical {
      margin: 39px;
      &-n {
        height: 70px;
        font-size: 50px;
        font-weight: 600;
        color: #00b54d;
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
