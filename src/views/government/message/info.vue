<template>
  <div class="container">
    <back :icon="icon" titleTxt="消息中心" backTxt="消息详情" />
    <el-scrollbar class="infoscrollbar" style="height: 536px">
      <div v-html="info"></div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import back from "@/components/header/back.vue";
import Tinymce from "@/components/Tinymce/index.vue";

@Component({
  name: "matterAdd",
  components: {
    back,
    Tinymce,
  },
})
export default class extends Vue {
    private icon = require("@/assets/header-icon/message.png");
  private info = `<div>
	窑货店，顾名思义，凡窑里烧出来的东西，除了秦砖汉瓦什么都卖。</div>`
}
</script>

<style lang="scss" scoped>
.infoscrollbar{
  margin-top: -34px;
}
</style>
