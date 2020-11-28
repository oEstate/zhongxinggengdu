<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="1200px"
    :show-close="false"
    :before-close="handleClose"
    top="4vh"
  >
    <div class="dashboard-container">
      <div class="adduploads">
        <el-upload
          class="uploads"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :multiple="multiple"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button type="success">添加图片</el-button>
        </el-upload>
      </div>
      <tabs
        class="tabs"
        :tabsData="tabsData"
        :tabsActive="tabsActive"
        @getPath="getPath"
      >
        <component
          :is="isComponent"
          @getArr="getArr"
          :limitType="limitType"
          :totalNum="totalNum"
          :selectNum="selectNum"
        ></component>
      </tabs>
    </div>

    <span slot="footer" class="dialog-footer u_f_ajs">
      <p class="tips">
        您已选中{{ selectNum + selectImgArr.length }}张，还可以选择{{
          totalNum - selectNum - selectImgArr.length
        }}张
      </p>
      <div>
        <el-button type="success" @click="handleClose" plain>取 消</el-button>
        <el-button type="success" @click="handleClose">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import tabs from '@/components/common/tabs.vue'
import materialImg from './components/materialImg.vue'
import materialVideo from './components/materialVideo.vue'
import materialVr from './components/materialVr.vue'
@Component({
  name: 'gallery',
  components: {
    tabs,
    materialImg,
    materialVideo,
    materialVr
  }
})
export default class extends Vue {
  @Prop({ default: false }) dialogVisible!: Boolean;
  @Prop({ default: true }) limitType!: Boolean; // 是否限制了上传数量 true支持  false不支持
  @Prop({ default: false }) multiple!: Boolean; // 本地上传是否支持多选  true支持  false不支持
  @Prop({ default: 5 }) totalNum!: any; // 可选择的总数
  @Prop({ default: 0 }) selectNum!: any; // 已选择数量
  private tabsActive = '0';
  private isComponent = 'materialImg';
  private selectImgArr: Array<any> = []; // 选中的图片
  private tabsData = [
    {
      label: '图片库',
      name: '0',
      path: 'materialImg'
    },
    {
      label: '视频库',
      name: '1',
      path: 'materialVideo'
    },
    {
      label: 'VR库',
      name: '2',
      path: 'materialVr'
    }
  ];

  created() {}
  handleClose() {
    this.$emit('onlyclose', true)
  }

  getPath(e: any) {
    // alert(2)
    console.log(e)
    this.isComponent = e
  }

  changeShop(e: any) {
    this.isComponent = e
  }

  getArr(e: any) {
    console.log(e)
    this.selectImgArr = e
  }

  beforeAvatarUpload(file: any) {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  .adduploads {
    position: absolute;
    right: 30px;
    z-index: 8;
    top: 8px;
  }
}
.matter {
  box-sizing: border-box;
  padding: 0 24px;
  .dialog-column {
    flex-wrap: wrap;
    .dialog-columnItem {
      margin-right: 50px;
      margin-bottom: 26px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      .dialog-columnItemTxt {
        width: 96px;
        height: 44px;
        border-radius: 8px;
        border: 1px solid #cccccc;
        margin-right: 16px;

        text-align: center;
        line-height: 44px;
        font-size: 16px;
        color: #666;
      }
      i {
        font-size: 20px;
        color: #00b54d;
      }
    }
  }
  .dialog-addColumn {
    .el-input {
      width: 166px;
      margin-right: 16px;
    }
  }
}

.tips {
  font-size: 16px;
  color: #444444;
}

::v-deep .el-dialog {
  height: 841px;
}
::v-deep .el-dialog__header {
  border-bottom: 0;
  padding-top: 0;
}
::v-deep .el-dialog__body {
  padding: 0;
  margin: 0;
}
::v-deep .el-tabs__header {
  margin: 0 32px;
}
::v-deep .el-dialog__footer {
  padding: 20px;
}
</style>
