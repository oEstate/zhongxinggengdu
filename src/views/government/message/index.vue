<template>
  <div>
    <div class="header u_f_ac">
      <img class="header-icon" src="@/assets/header-icon/message.png" alt="" />
      <span>消息中心</span>
    </div>

    <div class="container">
      <!--
      <vlChar />
      <messageItem />-->

      <tabs :tabsData="tabsData" :tabsActive="tabsActive" @getPath="getPath">
        <component
          :is="isComponent"
          :appKey="appKey"
          :account="account"
          :token="token"
        ></component>
      </tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import messageItem from "./components/messageItem.vue";
import vlChar from "@/components/vlChar/index.vue";
import tabs from "@/components/common/tabs.vue";
@Component({
  name: "message",
  components: {
    messageItem,
    tabs,
    vlChar,
  },
})
export default class extends Vue {
  private tabsActive = "0";
  private isComponent = "messageItem";
  private appKey = "45c6af3c98409b18a84451215d0bdd6e";
  private account = "greatcs4";
  private token = "e10adc3949ba59abbe56e057f20f883e";
  private hackReset = true;
  private tabsData = [
    {
      label: "通知消息",
      name: "0",
      path: "messageItem",
    },
    {
      label: "聊天消息",
      name: "1",
      path: "vlChar",
    },
  ];
  getPath(e: any) {
    this.isComponent = e;
  }
  created() {}
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
::v-deep .el-tabs__header {
  margin: 0 32px;
}
</style>
