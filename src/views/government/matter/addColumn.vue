<template>
  <div class="container">
    <back :icon="icon" titleTxt="内容管理" :backTxt="backTxt" />
    <el-scrollbar :style="{ height: clientHeight - 310 + 'px' }">
      <ul class="from">
        <li class="ag">
          <div class="from-itrm-l">栏目标题</div>
          <div class="phone">
            <el-input
              v-model.trim="contentTitle"
              placeholder="请输入栏目标题"
            ></el-input>
          </div>
        </li>
        <li>
          <div class="from-itrm-l">栏目详情</div>
          <div>
            <tinymce v-model="contentDetail" :height="600" />
          </div>
        </li>
        <li class="ags">
          <el-button type="success" plain @click="goBack">取消</el-button>
          <el-button type="success" :loading="loading" plain @click="modification(1)"
            >保存</el-button
          >
          <el-button type="success" :loading="loading" @click="modification(0)"
            >发布</el-button
          >
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import back from "@/components/header/back.vue";
import Tinymce from "@/components/Tinymce/indexGov.vue";
import { mixins } from "vue-class-component";
import ResizeMixin1 from "@/layout/mixin/resize1";
import {
  addColumn,
  addContent,
  delColumn,
  delContent,
  queryColumn,
  queryContent,
  upColumn,
  upContent,
  queryContentById,
} from "@/api/information";
@Component({
  name: "matterAdd",
  components: {
    back,
    Tinymce,
  },
})
export default class extends mixins(ResizeMixin1) {
  private loading = false;
  private icon = require("@/assets/header-icon/matter.png");
  private contentTitle = "";
  private contentDetail = "";
  private backTxt = "新增栏目";
  created() {
    console.log(this.$route.query.id);
    if (this.$route.query.id) {
      this.init(this.$route.query.id);
      this.backTxt = "编辑栏目";
    }
  }
  changeShop() {
    this.$emit("changeShop", "binding");
  }

  goBack() {
    this.$router.go(-1);
  }
  //回显
  async init(id: any) {
    const { data } = await queryContentById({ id });
    console.log(data);
    this.contentTitle = data.contentTitle;
    this.contentDetail = data.contentDetail;
  }

  modification(type: any){
    if(this.$route.query.id){
      this.editorRelease(type)
    }else{
      this.release(type)
    }
  }
  // 发布
  async release(type: any) {
    if (!this.contentTitle) {
      this.$message.error("请输入栏目标题");
      return;
    }
    if (this.contentDetail.length < 62) {
      this.$message.error("请输入栏目详情");
      return;
    }
    this.loading = true;
    const { data } = await addContent({
      columnType: 6,
      contentStatus: type,
      contentTitle: this.contentTitle,
      contentDetail: this.contentDetail,
    });
    console.log(data);
    let str = type == 1 ? "保存成功！" : "发布成功！";
    this.$confirm(str, "提示", {
      confirmButtonText: "确定",
      showCancelButton: false,
      closeOnPressEscape: false,
      closeOnClickModal: false,
      showClose: false,
      type: "success",
    }).then(() => {
      this.goBack();
    });
    this.loading = false;
  }

  // 编辑
  async editorRelease(type: any) {
    if (!this.contentTitle) {
      this.$message.error("请输入栏目标题");
      return;
    }
    if (this.contentDetail.length < 62) {
      this.$message.error("请输入栏目详情");
      return;
    }
    this.loading = true;
    const { data } = await upContent({
      id:this.$route.query.id,
      columnType: 6,
      contentStatus: type,
      contentTitle: this.contentTitle,
      contentDetail: this.contentDetail,
    });
    console.log(data);
    let str = type == 1 ? "保存成功！" : "编辑成功！";
    this.$confirm(str, "提示", {
      confirmButtonText: "确定",
      showCancelButton: false,
      closeOnPressEscape: false,
      closeOnClickModal: false,
      showClose: false,
      type: "success",
    }).then(() => {
      this.goBack();
    });
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-link {
  align-items: flex-end;
}
.el-link.el-link--default:hover {
  color: #06c654;
}
.el-link.el-link--default {
  color: #666;
}
::v-deep .el-input.is-disabled .el-input__inner {
  background-color: #f0f0f0;
}
::v-deep .el-input__inner {
  background-color: #f0f0f0;
  color: #333;
  border-radius: 6px;

  font-size: 16px;
}
.phone,
.code {
  width: 270px;
}

.from {
  padding-left: 33px;
  li {
    list-style: none;
    display: flex;
    margin-bottom: 20px;
    &:last-child {
      margin-top: 50px;
    }
    .from-itrm-l {
      margin-right: 22px;
      font-size: 16px;
      color: #333333;
      flex-shrink: 0;
    }
    .from-logo {
      width: 76px;
      height: 76px;
      background: #eaeaea;
      border-radius: 76px;
    }
    .icard {
      width: 359px;
      height: 232px;
      background: #f0f0f0;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
    }
  }
  .ag {
    align-items: center;
  }
  .ags {
    align-items: center;
    justify-content: center;
    .el-button {
      margin-right: 10px;
    }
  }
}
</style>
