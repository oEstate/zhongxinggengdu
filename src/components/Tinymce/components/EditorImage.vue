<template>
  <div class="upload-container">
    <el-button
      icon="el-icon-upload"
      size="mini"
      type="success"
      @click="dialogVisible = true"
    >
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
      <el-upload
        :multiple="true"
        :file-list="defaultFileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        :action="action"
        list-type="picture-card"
      >
        <el-button size="small" type="success"> 点击上传 </el-button>
      </el-upload>
      <el-button type="success" @click="dialogVisible = false" plain>
        取消
      </el-button>
      <el-button type="success" @click="handleSubmit"> 确定 </el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ElUploadInternalRawFile } from "element-ui/types/upload";

export interface IUploadObject {
  hasSuccess: boolean;
  uid: number;
  url: string;
  width: number;
  height: number;
}

@Component({
  name: "EditorImageUpload",
})
export default class extends Vue {
  private action = `${process.env.VUE_APP_BASE_API}/file/upload`;
  private dialogVisible = false;
  private listObj: { [key: string]: IUploadObject } = {};
  private defaultFileList = [];

  private checkAllSuccess() {
    return Object.keys(this.listObj).every(
      (item) => this.listObj[item].hasSuccess
    );
  }

  private handleSubmit() {
    const arr = Object.keys(this.listObj).map((v) => this.listObj[v]);
    if (!this.checkAllSuccess()) {
      this.$message(
        "Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!"
      );
      return;
    }
    this.$emit("success-callback", arr);
    this.listObj = {};
    this.defaultFileList = [];
    this.dialogVisible = false;
  }

  private handleSuccess(response: any, file: ElUploadInternalRawFile) {
    const uid = file.uid;
    const objKeyArr = Object.keys(this.listObj);
    for (let i = 0, len = objKeyArr.length; i < len; i++) {
      if (this.listObj[objKeyArr[i]].uid === uid) {
        this.listObj[objKeyArr[i]].url = response.data;
        this.listObj[objKeyArr[i]].hasSuccess = true;
        return;
      }
    }
  }

  private handleRemove(file: ElUploadInternalRawFile) {
    const uid = file.uid;
    const objKeyArr = Object.keys(this.listObj);
    for (let i = 0, len = objKeyArr.length; i < len; i++) {
      if (this.listObj[objKeyArr[i]].uid === uid) {
        delete this.listObj[objKeyArr[i]];
        return;
      }
    }
  }

  private beforeUpload(file: ElUploadInternalRawFile) {
    const isJPG =
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/png" ||
      file.type === "image/bmp";
    // console.log(isJPG);
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isJPG) {
      this.$message.error("上传图片只能是 JPG 格式!");
      return false
    }
    if (!isLt3M) {
      this.$message.error("上传图片大小不能超过 3MB!");
      return false
    }
    
    const fileName = file.uid;
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      this.listObj[fileName] = {
        hasSuccess: false,
        uid: file.uid,
        url: "",
        width: img.width,
        height: img.height,
      };
    };
  }
}
</script>

<style lang="scss">
.editor-slide-upload {
  .el-upload--picture-card {
    width: 100%;
  }
}
</style>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
}
::v-deep .el-dialog__header {
  border: 0;
}
</style>
