<template>
  <div class="container">
    <back icon="el-icon-search" titleTxt="轮播管理" backTxt="新增轮播" />
    <el-scrollbar style="height: 500px">
      <ul class="from">
        <li class="ag">
          <div class="from-itrm-l">轮播标题</div>
          <div class="phone">
            <el-input
              v-model="shopName"
              placeholder="请输入轮播标题"
            ></el-input>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">轮播类型</div>
          <div class="phone">
            <el-select class="select" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </li>

        <li class="ag">
          <div class="from-itrm-l">店铺</div>
          <div class="phone">
            <el-input
              v-model="shopName"
              placeholder="请输入店铺名称"
            ></el-input>
          </div>
        </li>

        <li class="ag">
          <div class="from-itrm-l">链接地址</div>
          <div class="phone">
            <el-input
              v-model="shopName"
              placeholder="请输入链接地址"
            ></el-input>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">商品封面</div>
          <div class="phone">
            <el-upload
              class="from-logo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="uplogo" />
              上传图片
            </el-upload>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">云平台</div>
          <div class="phone">
            <el-select class="select" v-model="value" placeholder="选择云平台">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </li>

        <li class="ag">
          <!--
          <div class="from-itrm-l">轮播图片</div>-->
          <div class="from-itrm-l">上传图片</div>
          <div class="phone">
            <el-upload
              class="uploads"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-button type="success" plain>添加图片</el-button>
            </el-upload>
          </div>
        </li>
        <li>
          <div class="from-itrm-l">内容详情</div>
          <div>
            <tinymce v-model="content" :height="400" />
          </div>
        </li>
        <li class="ags">
          <el-button type="success" plain @click="next">取消</el-button>
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

@Component({
  name: "matterAdd",
  components: {
    back,
    Tinymce,
  },
})
export default class extends Vue {
  private options = [
    {
      value: "0",
      label: "店铺",
    },
    {
      value: "1",
      label: "链接",
    },
    {
      value: "2",
      label: "内容",
    },
    {
      value: "3",
      label: "云平台",
    },
  ];
  private value = "";
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
      width: 67px;
      text-align: right;
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
