<template>
  <div class="container">
    <back :icon="icon" titleTxt="内容管理" backTxt="新增内容" />
    <el-scrollbar :style="{ height: clientHeight - 310 + 'px' }">
      <ul class="from">
        <li class="ag">
          <div class="from-itrm-l">栏目标题</div>
          <div class="phone">
            <el-input
              v-model="shopName"
              placeholder="请输入栏目标题"
            ></el-input>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">消息封面</div>
          <el-upload
            class="from-logo"
            :action="action"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="uplogo" />
            上传图片
          </el-upload>
        </li>
        <li>
          <div class="from-itrm-l">栏目详情</div>
          <div>
            <tinymce v-model="content" :height="400" />
          </div>
        </li>
        <li class="ags">
          <el-button type="success" plain @click="next">取消</el-button>
          <el-button type="success" plain @click="next">保存</el-button>
          <el-button type="success" @click="next">发布</el-button>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import back from "@/components/header/back.vue";
import Tinymce from "@/components/Tinymce/index.vue";
import { mixins } from "vue-class-component";
import ResizeMixin1 from "@/layout/mixin/resize1";
import { addColumn,addContent,delColumn,delContent,queryColumn,queryContent,upColumn,upContent } from "@/api/information";
@Component({
  name: "matterAdd",
  components: {
    back,
    Tinymce,
  },
})
export default class extends mixins(ResizeMixin1) {
  private icon = require("@/assets/header-icon/matter.png");
  private content = "";
  private action = `${process.env.VUE_APP_BASE_API}/file/upload`;
  private shopName = "";
  changeShop() {
    this.$emit("changeShop", "binding");
  }

  next() {
    this.$emit("changeShop", "bindingPhone");
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
      width: 148px;
      height: 148px;
      background: #e8efec;
      border-radius: 8px;
      text-align: center;
      line-height: 148px;
      color: #999;
      cursor: pointer;
      .uplogo {
        width: 148px;
        height: 148px;
        border-radius: 8px;
      }
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
