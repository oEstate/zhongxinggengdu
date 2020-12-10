<template>
  <el-container>
    <div class="aside" style="width: 166px">
      <el-scrollbar style="height: 440px">
        <ul class="aside-list">
          <li
            :class="active == index ? 'is-active' : ''"
            @click="clickSider(item, index, 1)"
            v-for="(item, index) in siderData"
            :key="item.id"
          >
            {{ item.className }}
          </li>
        </ul>
      </el-scrollbar>
      <div class="btn">
        <div class="editor">
          <el-button type="success" plain @click="openEditorSider"
            >编辑</el-button
          >
        </div>
        <div class="tc">
          <el-button type="success" @click="dialogVisible1 = true"
            >新增分类</el-button
          >
        </div>
      </div>
    </div>

    <div class="gallery">
      <div class="u_f_ajs query">
        <div class="u_f">
          <el-input placeholder="请输入关键字" v-model="searchVal">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="query_btn" type="success" @click="search"
            >搜索</el-button
          >
        </div>
        <div>
          <el-button type="success" @click="uploadImg = true"
            >上传视频</el-button
          >
          <el-button type="success" @click="transfer">转移分组</el-button>
          <el-button type="success" @click="deleteImg">批量删除</el-button>
        </div>
      </div>
      <el-scrollbar style="height: 530px" v-loading="loading">
        <ul class="container-list u_f">
          <li
            @click="clickItem(item)"
            v-for="(item, index) in selectedOptions"
            :key="index"
          >
            <div class="item-img">
              <img :src="item.videoScreenshotUrl" alt="" />
              <div class="playIcon"><i class="el-icon-video-play"></i></div>
              
            </div>
            <div class="item-name">{{ item.photosName }}</div>
            <div class="item-size">{{ item.videoTime }}</div>
            <div class="isLayer" v-show="isLayer(item)">
              <i class="el-icon-success"></i>
            </div>
          </li>
        </ul>
        <p class="noImg" v-if="selectedOptions.length == 0">暂无数据</p>
      </el-scrollbar>
      <el-pagination
        @current-change="pageChange"
        background
        layout="total,prev, pager, next"
        :page-size="15"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-input
        v-model.trim="siderName"
        maxlength="6"
        show-word-limit
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" plain @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="success" @click="editorSider">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="dialogVisible1" width="30%">
      <el-input
        v-model.trim="addSiderName"
        maxlength="6"
        show-word-limit
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" plain @click="dialogVisible1 = false"
          >取 消</el-button
        >
        <el-button type="success" @click="addSider">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 上传视频 -->
    <el-dialog
      class="imgDia1"
      title="上传视频"
      :visible.sync="uploadImg"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
      width="65%"
    >
      <el-upload
        class="uploader"
        :action="action"
        name="file"
        ref="upload"
        :on-progress="uploadVideoProcess"
        :on-success="handleVideoSuccess"
        :before-upload="beforeUploadVideo"
        :show-file-list="false"
      >
        <video
          v-if="videoData.imgUrl != '' && !videoFlag"
          :src="galleryList[0].imgUrl"
          style="width: 300px; height: 200px"
          class="avatar video-avatar"
          controls="controls"
        >
          您的浏览器不支持视频播放
        </video>
        <el-button v-if="videoData.imgUrl == '' && !videoFlag" type="success"
          >添加视频</el-button
        >
        <el-progress
          v-if="videoFlag == true"
          type="circle"
          :percentage="videoUploadPercent"
          style="margin-top: 7px"
        ></el-progress>
      </el-upload>
      <div>
        视频不能超过20M，支持mp4，mov，m4v，flv,x-flv，mkv，wmv，avi，rmvb，3gp视频格式
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="success" plain @click="uploadImgClose"
          >关 闭</el-button
        >
        <el-button
          :loading="uploadImgLoading"
          type="success"
          @click="uploadImgFun"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 分组 -->
    <el-dialog title="分组" :visible.sync="changeClassShow" width="30%">
      <div>
        <el-select v-model="libraryId_1" placeholder="请选择分组">
          <el-option
            v-for="(item, index) in siderData"
            :key="index"
            :label="item.className"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" plain @click="changeClassShow = false"
          >关 闭</el-button
        >
        <el-button
          :loading="changeClassLoading"
          type="success"
          @click="subChangeClass"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  selectCzMaterialLibrary,
  addCzMaterialLibraryClassification,
  upCzMaterialLibraryClassification,
  addPhotos,
  delPhotos,
  selectCzMaterialLibraryClassification,
  upPhotos,
  searchPhoto,
} from "@/api/material";
@Component({
  name: "materialVideo",
})
export default class extends Vue {
  private pageNo = 1;
  private pageSize = 15;
  private total = 0;
  private active = 0;
  private libraryId = -2;
  private siderName = "";
  private addSiderName = "";
  private searchVal = "";
  private action = `${process.env.VUE_APP_BASE_API}/photoController/addPhotos`;
  private dialogVisible = false;
  private dialogVisible1 = false;
  private uploadImgLoading = false;
  private uploadImg = false; // 上传图片弹出框
  private loading = false;
  private item: any = { className: "未分组", id: -2 }; // 准备上传的图片数据
  private galleryList: Array<any> = []; // 准备上传的图片数据
  private selectedOptions: Array<any> = [];
  private siderData: Array<any> = [];
  private selectImgArr: Array<any> = []; // 选中的图片
  private libraryId_1 = -1;
  private changeClassLoading = false; // 批量分组loading\
  private changeClassShow = false; // 批量分组loading
  private videoData: any = { imgUrl: "" }; // 选中的图片

  private videoImg = "";
  private videoFlag = false;
  private videoUploadPercent = 0;
  private isShowUploadVideo = false;

  async created() {
    await this.init();
  }
  //初始化素材分类
  async init() {
    this.siderData = [{ className: "未分组", id: -2 }];
    const { data } = await selectCzMaterialLibrary({ id: 2 });
    console.log(data.list);
    this.siderData = this.siderData.concat(data.list);
    this.clickSider(this.item, this.active, this.pageNo);
  }
  //初始化素材分类图片
  async clickSider(item: any, index: any, pageNo: any) {
    this.loading = true;
    this.active = index;
    console.log(item);
    this.item = item;
    this.siderName = item.className;
    this.libraryId = item.id;
    const { data } = await selectCzMaterialLibraryClassification({
      id: this.libraryId,
      pageNo: pageNo,
      pageSize: this.pageSize,
    });
    console.log(data);
    this.selectedOptions = data.list;
    this.total = data.total;
    this.loading = false;
  }
  openEditorSider() {
    if (this.libraryId == -1) {
      return;
    }
    this.dialogVisible = true;
  }

  //编辑素材分类
  async editorSider() {
    console.log(this.libraryId);
    if (this.siderName == "") {
      return;
    }
    await upCzMaterialLibraryClassification({
      libraryId: 2,
      id: this.libraryId,
      className: this.siderName,
    });
    this.dialogVisible = false;
    await this.init();
  }
  //新增素材分类
  async addSider() {
    if (this.addSiderName == "") {
      return;
    }
    await addCzMaterialLibraryClassification({
      libraryId: 2,
      className: this.addSiderName,
    });
    this.dialogVisible1 = false;
    this.addSiderName = "";
    await this.init();
  }
  // 视频 - 上传
  handleVideoSuccess(res: any, file: any) {
    console.log("上传成功", res, file);
    this.isShowUploadVideo = true;
    this.videoFlag = false;
    this.videoUploadPercent = 0;
    //后台上传地址
    if (res.code == 200) {
      this.videoData = res.data;
      this.galleryList.push(res.data.id);
    } else {
      this.$message.error(res.Message);
    }
  }

  //进度条
  uploadVideoProcess(event: any, file: any, fileList: any) {
    console.log("进度条", event, file, fileList);
    this.videoFlag = true;
    this.videoUploadPercent = file.percentage.toFixed(0) * 1;
  }

  // 视频 - 格式检测
  beforeUploadVideo(file: any) {
    console.log("上传前", file);
    var fileSize = file.size / 1024 / 1024 < 20;
    if (
      [
        "video/mp4",
        "video/mov",
        "video/m4v",
        "video/flv",
        "video/x-flv",
        "video/mkv",
        "video/wmv",
        "video/avi",
        "video/rmvb",
        "video/3gp",
      ].indexOf(file.type) == -1
    ) {
      this.$message.error("请上传正确的视频格式");
      return false;
    }
    if (!fileSize) {
      this.$message.error("视频大小不能超过20MB");
      return false;
    }
    this.isShowUploadVideo = false;
  }

  // 视频 - 弹出框关闭
  uploadImgClose(done: any) {
    this.uploadImg = false;
  }

  // 视频 上传请求
  uploadImgFun() {
    if (this.galleryList.length == 0) {
      this.$message.error("请先上传视频");
      return;
    }
    this.uploadImgLoading = true;
    let uploadImgForm: any = {
      // 上传图片数据
      classId: this.libraryId,
      photos: this.galleryList,
    };
    console.log(uploadImgForm);
    upPhotos(uploadImgForm).then((res: any) => {
      console.log("上传图片保存", res);
      if (res.code == 200) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.videoData = { imgUrl: "" };
        this.galleryList = [];
        this.uploadImg = false;
        (this.$refs["upload"] as any).clearFiles();
        this.clickSider(this.item, this.active, this.pageNo);
        setTimeout(() => {
          this.uploadImgLoading = false;
        }, 1000);
      } else {
        this.uploadImgLoading = false;
        this.$message.error(res.message);
      }
    });
  }
  //转移分组
  transfer() {
    if (this.selectImgArr.length === 0) {
      return;
    }
    this.changeClassShow = true;
  }
  // 图片转移分组
  subChangeClass() {
    this.changeClassLoading = true;
    let photos: any = [];
    this.selectImgArr.map((item: any) => {
      photos.push(item.id);
    });
    let uploadImgForm: any = {
      // 上传图片数据
      classId: this.libraryId_1,
      photos,
    };
    console.log(uploadImgForm);
    upPhotos(uploadImgForm).then((res: any) => {
      // console.log("", res);
      if (res.code == 200) {
        this.$message({
          message: "转移成功",
          type: "success",
        });
        this.selectImgArr = [];
        setTimeout(() => {
          this.changeClassLoading = false;
        }, 1000);
        this.clickSider(this.item, this.active, this.pageNo);
      } else {
        this.changeClassLoading = false;
        this.$message.error(res.message);
      }
      this.changeClassShow = false;
    });
  }
  //批量删除
  deleteImg() {
    if (this.selectImgArr.length === 0) {
      return;
    }
    let photos: any = [];
    this.selectImgArr.map((item: any) => {
      photos.push(item.id);
    });
    this.$confirm(
      "若删除，会对目前已使用该视频的相关业务造成影响。",
      "确定删除该视频？",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(() => {
        delPhotos({ photos }).then((res: any) => {
          console.log("移动到回收站", res);
          if (res.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.selectImgArr = [];
            this.clickSider(this.item, this.active, this.pageNo);
          } else {
            this.$message.error(res.message);
          }
        });
      })
      .catch(() => {});
  }
  // 分页
  pageChange(page: any) {
    // console.log(page)
    this.pageNo = page;
    this.clickSider(this.item, this.active, this.pageNo);
  }
  async search() {
    this.loading = true;
    const { data } = await searchPhoto({
      id: this.item.id,
      pageNo: 1,
      pageSize: this.pageSize,
      className: this.searchVal,
    });
    // console.log(data);
    this.selectedOptions = data.list;
    this.total = data.total;
    this.loading = false;
  }
  changeShop() {
    this.$emit("changeShop", "basicAlter");
  }
  // 点击图片
  clickItem(e: any) {
    if (this.selectImgArr.findIndex((item: any) => item.id == e.id) === -1) {
      this.selectImgArr.push(e);
      console.log(e);
    } else {
      this.selectImgArr.splice(
        this.selectImgArr.findIndex((item: any) => item.id === e.id),
        1
      );
    }
    // console.log(this.selectImgArr);
  }

  // 点击图片判断是否显示遮罩层
  isLayer(e: any) {
    if (this.selectImgArr.findIndex((item) => item.id == e.id) === -1) {
      return false;
    } else {
      return true;
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input .el-input__count .el-input__count-inner {
  background-color: #fff;
}
.aside {
  border-right: 2px solid #e8efec;
  // position: relative;
  height: 656px;
  .aside-list {
    margin-bottom: 8px;
    li {
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 18px;
      color: #444444;
      cursor: pointer;
    }
    .is-active {
      background-color: #e8efec;
      color: #00b54d;
      font-weight: 500;
    }
  }
  .btn {
    // position: absolute;
    // bottom: 14px;
    // left: 50%;
    // transform: translateX(-50%);
    margin-top: 30px;
    .editor {
      margin-bottom: 14px;
      text-align: center;
      .el-button {
        width: 97px;
      }
    }
  }
}
.gallery {
  width: 100%;
  box-sizing: border-box;
  padding: 21px 26px 0 26px;

  .query {
    margin-bottom: 20px;
    .query_btn {
      margin-left: 12px;
    }
  }
  .noImg {
    text-align: center;
    margin-top: 40px;
  }
  .container-list {
    flex-wrap: wrap;
    li {
      width: 140px;
      height: 168px;
      background: #ffffff;
      border-radius: 10px;
      border: 1px solid #dddddd;
      text-align: center;
      margin: 0 20px 20px 0;
      position: relative;
      cursor: pointer;
      .isLayer {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.3);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        .el-icon-success {
          color: #00b54d;
          font-size: 40px;
        }
        span {
          font-size: 30px;
          font-weight: 700;
          color: #fff;
        }
      }
      &:nth-child(5n) {
        margin-right: 0;
      }
      .item-img {
        overflow: hidden;
        position: relative;
        img {
          width: 140px;
          height: 110px;
          border-radius: 10px 10px 0px 0px;
        }
        .playIcon{
          position: absolute;
          top: 36px;
          left: 48px;
        }
        .el-icon-video-play{
          font-size: 40px;
          color: rgba(0, 0, 0, .4);

        }
      }
      .item-name {
        font-size: 16px;
        color: #444444;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 124px;
        margin: 4px auto;
      }
      .item-size {
        font-size: 13px;
        color: #666666;
      }
    }
  }
}
.uploader{
  margin-bottom: 20px;
}
::v-deep .el-dialog {
  height: auto;
  .el-dialog__header,
  .el-dialog__footer {
    border: 0;
  }
  .el-input__inner {
    background-color: #fff;
  }
}
</style>
