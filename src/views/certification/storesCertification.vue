<template>
  <div class="">
    <grayHeader />
    <div class="container">
      <steps ref="steps" :activeNumber="active" />
      <ul class="from">
        <li class="ag">
          <div class="from-itrm-l">店铺头像</div>
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
        </li>
        <li class="ag">
          <div class="from-itrm-l">店铺名称：</div>
          <div>
            <el-input
              v-model="shopName"
              placeholder="请输入店铺名称"
            ></el-input>
          </div>
        </li>
        <li>
          <div class="from-itrm-l">店铺简介：</div>
          <div style="width: 88%">
            <el-input
              type="textarea"
              placeholder="请输入店铺简介（限制50个字符）"
              v-model="shopName"
              class="textareaInfo"
              maxlength="50"
            >
            </el-input>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">店铺地址：</div>
          <div>
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
              placeholder="请选择地址"
            >
            </el-cascader>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">店铺行业：</div>
          <div>
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
              placeholder="请选择地址"
            >
            </el-cascader>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">本人姓名：</div>
          <div>
            <el-input
              v-model="shopName"
              placeholder="请输入您的姓名"
            ></el-input>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">身份证号：</div>
          <div>
            <el-input
              v-model="shopName"
              placeholder="请输入身份证号"
            ></el-input>
          </div>
        </li>
        <li>
          <div class="from-itrm-l">身份证（正面）：</div>
          <el-upload
            class="icard"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="icard-img" />
            <i v-else class="el-icon-camera"></i>
          </el-upload>
          <el-link :underline="false" class="sample">产看示例</el-link>
        </li>
        <li>
          <div class="from-itrm-l">身份证（反面）：</div>
          <el-upload
            class="icard"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="icard-img" />
            <i v-else class="el-icon-camera"></i>
          </el-upload>
          <el-link :underline="false" class="sample">产看示例</el-link>
        </li>
        <li>
          <div class="from-itrm-l">本人手持身份证：</div>
          <el-upload
            class="icard"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="icard-img" />
            <i v-else class="el-icon-camera"></i>
          </el-upload>
          <el-link :underline="false" class="sample">产看示例</el-link>
        </li>
      </ul>
    </div>
    <div class="next-btn">
      <el-button type="success" @click="submit">提交</el-button>
    </div>
    <grayFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import { regionData } from "element-china-area-data";
import grayHeader from "@/components/header/index.vue";
import grayFooter from "@/components/footer/gray.vue";
import steps from "@/components/common/steps.vue";
@Component({
  name: "storesCertification",
  components: {
    grayHeader,
    grayFooter,
    steps,
  },
})
export default class extends Vue {
  private active = 2;
  private shopName = "";
  // private options = regionData;
  private selectedOptions = [];
  private imageUrl = "";
  jump() {
    this.$router.push({ path: "/login" });
  }
  submit() {
    this.$router.push({ path: "/auditCertification" });
  }
  handleChange(value: any) {
    console.log(value);
  }
  handleAvatarSuccess(res: any, file: any) {
    this.imageUrl = URL.createObjectURL(file.raw);
  }
  beforeAvatarUpload(file: any) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
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

::v-deep .el-input__inner {
  // border-color:#f0f0f0;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 6px;
  width: 462px;
  font-size: 16px;
}
::v-deep .el-textarea__inner {
  background-color: #f0f0f0;
  // border-color:#f0f0f0;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  height: 221px;
}
.container {
  margin-top: 130px;
}
.from {
  margin: 52px auto 86px auto;
  width: 1143px;
  li {
    list-style: none;
    display: flex;
    margin-bottom: 18px;
    &:first-child {
      margin-bottom: 24px;
    }
    .from-itrm-l {
      margin-right: 12px;
      font-size: 16px;
      color: #333333;
    }
    .from-logo {
      width: 112px;
      height: 112px;
      background: #eaeaea;
      margin-left: 16px;
      border-radius: 112px;
      text-align: center;
      line-height: 112px;
      color: #999;
      cursor: pointer;
      .uplogo {
        width: 112px;
        height: 112px;
        border-radius: 112px;
      }
    }
    .icard {
      width: 377px;
      height: 242px;
      background: #f0f0f0;
      border-radius: 8px;
      opacity: 0.8;
      text-align: center;
      cursor: pointer;
      border: 1px solid #f0f0f0;
      .el-icon-camera {
        font-size: 61px;
        line-height: 242px;
        color: #aaa;
      }
      .icard-img {
        width: 377px;
        height: 242px;
        border-radius: 8px;
        border: 1px solid #f0f0f0;
      }
    }
    .sample {
      position: relative;
      bottom: 17px;
      left: 21px;
    }
  }
  .ag {
    align-items: center;
  }
}
.next-btn {
  text-align: center;
  margin-bottom: 122px;
}
</style>
