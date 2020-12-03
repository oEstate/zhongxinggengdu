<template>
  <div>
    <div class="container">
      <el-scrollbar :style="{ height: clientHeight - 370 + 'px' }">
        <ul class="from">
          <li class="ag">
            <div class="from-itrm-l">
              {{ userType == "1" ? "店铺头像" : "平台头像" }}
            </div>
            <el-upload
              class="from-logo"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="uplogo" />
              更换图片
            </el-upload>
          </li>
          <li class="ag">
            <div class="from-itrm-l">
              {{ userType == "1" ? "店铺名称" : "平台名称" }}
            </div>
            <div>
              <el-input v-model="shopName" placeholder="请输入名称"></el-input>
            </div>
          </li>
          <li>
            <div class="from-itrm-l">
              {{ userType == "1" ? "店铺简介" : "平台简介" }}
            </div>
            <div style="width: 88%">
              <el-input
                type="textarea"
                placeholder="请输入简介（限制500个字符）"
                v-model="shopName"
                class="textareaInfo"
                maxlength="500"
                show-word-limit
              >
              </el-input>
            </div>
          </li>
          <li class="ag">
            <div class="from-itrm-l">
              {{ userType == "1" ? "店铺地址" : "平台地址" }}
            </div>
            <div><selectCity @getCity="getCity" /></div>
          </li>
          <li>
            <div class="from-itrm-l">
              {{ userType == "1" ? "店铺图片" : "平台图片" }}
            </div>
            <el-upload
              class="icard"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="icard-img" />
              更换图片
            </el-upload>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="next-btn">
      <el-button type="success" plain @click="changeShop">取消修改</el-button>
      <el-button type="success" @click="changeShop">完成修改</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// import { regionData } from "element-china-area-data";
import { mixins } from "vue-class-component";
import ResizeMixin1 from "@/layout/mixin/resize1";
import selectCity from "@/components/common/selectCity.vue";
import { getUserType } from "@/utils/cookies";
@Component({
  name: "basicAlter",
  components: {
    selectCity,
  },
})
export default class extends mixins(ResizeMixin1) {
  private active = 2;
  private shopName = "";
  private options = [];
  private imageUrl = "";
  private value = "";
  private action = `${process.env.VUE_APP_BASE_API}/file/upload`;
  async created() {}
  get userType() {
    return getUserType();
  }
  jump() {
    this.$router.push({ path: "/login" });
  }

  handleChange(value: any) {
    console.log(value);
  }

  handleAvatarSuccess(res: any, file: any) {
    this.imageUrl = URL.createObjectURL(file.raw);
  }
  getCity(city: any) {
    console.log(city);
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

  changeShop() {
    this.$emit("changeShop", "basic");
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
  height: 178px;
}

.from {
  li {
    list-style: none;
    display: flex;
    margin-bottom: 18px;
    &:first-child {
      margin-bottom: 24px;
    }
    .from-itrm-l {
      margin-right: 22px;
      font-size: 16px;
      color: #333333;
    }
    .from-logo {
      width: 76px;
      height: 76px;
      background: #eaeaea;
      border-radius: 76px;
      text-align: center;
      line-height: 76px;
      color: #999;
      font-size: 14px;
      cursor: pointer;
      .uplogo {
        width: 76px;
        height: 76px;
        border-radius: 76px;
      }
    }
    .icard {
      width: 259px;
      height: 146px;
      background: #f0f0f0;
      border-radius: 8px;
      opacity: 0.8;
      text-align: center;
      cursor: pointer;
      border: 1px solid #f0f0f0;
      line-height: 146px;
      .icard-img {
        width: 259px;
        height: 146px;
        border-radius: 8px;
        border: 1px solid #f0f0f0;
      }
    }
  }
  .ag {
    align-items: center;
  }
}
.next-btn {
  text-align: center;
  margin-top: 10px;

  .el-button {
    margin-right: 20px;
  }
}
</style>
