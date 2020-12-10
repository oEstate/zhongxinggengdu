<template>
  <el-dialog
    :visible.sync="showImgMaterial"
    width="1200px"
    :show-close="false"
    :before-close="handleClose"
    top="4vh"
  >
    <div class="dashboard-container">
      <div class="adduploads u_f_ajs">
        <div>图片库</div>
        <el-button type="success" :disabled="selectImgArr.length > 0" @click="uploadImg = true">添加图片</el-button>
      </div>
      <el-container>
        <div class="aside" style="width: 166px">
          <el-scrollbar style="height: 688px">
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
        </div>

        <div class="gallery">
          <el-scrollbar style="height: 600px" v-loading="loading">
            <ul class="container-list u_f">
              <li
                @click="clickItem(item)"
                v-for="(item, index) in selectedOptions"
                :key="index"
              >
                <div class="item-img">
                  <img :src="item.imgUrl" alt="" />
                </div>
                <div class="item-name">{{ item.photosName }}</div>
                <div class="item-size">{{ item.width }}X{{ item.height }}</div>
                <div class="isLayer" v-show="isLayer(item)">
                  <i class="el-icon-success"></i>
                  <span>{{ selectNumber(item) }}</span>
                </div>
              </li>
            </ul>
            <p class="noImg" v-if="selectedOptions.length == 0">暂无数据</p>
          </el-scrollbar>
          <el-pagination
            @current-change="pageChange"
            background
            layout="total,prev, pager, next"
            :page-size="18"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-container>
    </div>

    <span slot="footer" class="dialog-footer u_f_ajs">
      <p class="tips">
        您已选中{{ selectNum + selectImgArr.length }}张，还可以选择{{
          totalNum - selectNum - selectImgArr.length
        }}张
      </p>
      <div>
        <el-button type="success" @click="handleClose" plain>取 消</el-button>
        <el-button type="success" @click="subMit">确 定</el-button>
      </div>
    </span>

    <!-- 上传图片 -->
    <el-dialog
      class="imgDia1"
      title="上传图片"
      :visible.sync="uploadImg"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
      width="65%"
    >
      <el-upload
        :class="{ hide: hideUpload }"
        ref="upload"
        :action="action"
        name="file"
        :multiple="true"
        list-type="picture-card"
        :on-success="imgUp"
        :on-remove="imgRemove"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">
          仅支持 gif、 jpeg、 png、 bmp 4种格式, 大小不超过3.0 MB
        </div>
      </el-upload>

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
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import {
  selectCzMaterialLibrary,
  addCzMaterialLibraryClassification,
  upCzMaterialLibraryClassification,
  addPhotos,
  delPhotos,
  selectCzMaterialLibraryClassification,
  upPhotos,
} from "@/api/material";
@Component({
  name: "materialImg",
  components: {},
})
export default class extends Vue {
  @Prop({ default: false }) showImgMaterial!: Boolean;
  @Prop({ default: true }) limitType!: Boolean; // 是否限制了上传数量 true支持  false不支持
  @Prop({ default: false }) multiple!: Boolean; // 本地上传是否支持多选  true支持  false不支持
  @Prop({ default: 5 }) totalNum!: any; // 可选择的总数
  @Prop({ default: 0 }) selectNum!: any; // 已选择数量
  @Watch("showImgMaterial")
  onChangeValue(newVal: string, oldVal: string) {
    // todo...
    if (newVal) {
      console.log("执行了");
      this.selectImgArr = [];
      this.init();
      this.hideUpload =
        this.totalNum - this.selectNum - this.selectImgArr.length == 0;
    }
  }

  private imageUrl = "";
  private selectImgArr: Array<any> = []; // 选中的图片
  private hideUpload = false;

  private imageClassTags: Array<any> = []; // 分组按钮
  private getGalleryForm: any = {}; // 获取分组数据
  private getImgsForm: any = {
    // 分组下的图片数据
    pageSize: 18,
    pageNo: 1,
  };
  private imgs: Array<any> = [];
  private imgsTotal = 0;

  private uploadImg = false; // 上传图片弹出框
  private uploadImgLoading = false; // 上传图片loading
  private uploadImgForm: any = {
    // 上传图片数据
    galleryId: 0,
  };
  private galleryList: Array<any> = []; // 准备上传的图片数据
  private action = `${process.env.VUE_APP_BASE_API}/photoController/addPhotos`;
  private siderData: Array<any> = [];
  private item: any = { className: "未分组", id: -1 }; // 准备上传的图片数据
  private active = 0;
  private loading = false;
  private selectedOptions: Array<any> = [];
  private total = 0;
  async created() {
    await this.init();
  }
  //初始化素材分类
  async init() {
    this.siderData = [{ className: "未分组", id: -1 }];
    const { data } = await selectCzMaterialLibrary({ id: 1 });
    console.log(data.list);
    this.siderData = this.siderData.concat(data.list);
    this.clickSider(this.item, this.active, this.getImgsForm.pageNo);
  }
  //初始化素材分类图片
  async clickSider(item: any, index: any, pageNo: any) {
    this.loading = true;
    this.active = index;
    console.log(item);
    this.item = item;
    const { data } = await selectCzMaterialLibraryClassification({
      id: this.item.id,
      pageNo: pageNo,
      pageSize: this.getImgsForm.pageSize,
    });
    console.log(data);
    this.selectedOptions = data.list;
    this.total = data.total;
    this.loading = false;
  }

  // 点击图片
  clickItem(e: any) {
    console.log(this.selectImgArr);
    if (this.selectImgArr.findIndex((item: any) => item.id == e.id) === -1) {
      if (
        this.limitType &&
        this.totalNum - this.selectNum - this.selectImgArr.length <= 0
      ) {
        this.$message({
          message: "已超过添加最大图片数量",
          type: "warning",
        });
        return;
      }
      this.selectImgArr.push(e);
    } else {
      this.selectImgArr.splice(
        this.selectImgArr.findIndex((item: any) => item.id === e.id),
        1
      );
    }
  }
  // 父 - 确定
  subMit() {
    console.log("this.selectImgArr", this.selectImgArr);
    if (this.selectImgArr.length == 0) {
      this.$message.error("请先选择图片");
      return;
    }
    this.$emit("subMit", this.selectImgArr);
  }

  // 分页
  pageChange(page: any) {
    // console.log(page)
    this.getImgsForm.pageNo = page;
    this.clickSider(this.item, this.active, this.getImgsForm.pageNo);
  }
  showUploadImg() {
    if (
      this.limitType &&
      this.totalNum - this.selectNum - this.selectImgArr.length <= 0
    ) {
      this.$message.error("已超过添加最大图片数量");
      return;
    }
    this.uploadImg = true;
  }
  // 点击图片判断是否显示遮罩层
  isLayer(e: any) {
    if (this.selectImgArr.findIndex((item: any) => item.id == e.id) === -1) {
      return false;
    } else {
      return true;
    }
  }

  // 点击图片判断是否显示遮罩层上的数字
  selectNumber(e: any) {
    return this.selectImgArr.findIndex((item: any) => item.id == e.id) + 1;
  }
  handleClose() {
    this.selectImgArr = [];
    this.$emit("onlyclose", true);
  }
  getArr(e: any) {
    console.log(e);
    this.selectImgArr = e;
  }
  handleAvatarSuccess(res: any, file: any) {
    this.imageUrl = URL.createObjectURL(file.raw);
  }
  // 图片 - 格式检测
  beforeAvatarUpload(file: any) {
    console.log("file", file);
    const isJPG =
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/png" ||
      file.type === "image/bmp";
    console.log(isJPG);
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isJPG) {
      this.$message.error("上传图片只能是 JPG 格式!");
    }
    if (!isLt3M) {
      this.$message.error("上传图片大小不能超过 3MB!");
    }
    return isJPG && isLt3M;
  }

  // 图片 上传请求
  uploadImgFun() {
    if (this.galleryList.length == 0) {
      this.$message.error("请先上传图片");
      return;
    }
    this.uploadImgLoading = true;
    let uploadImgForm: any = {
      // 上传图片数据
      classId: this.item.id,
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
        this.galleryList = [];
        this.uploadImg = false;
        (this.$refs["upload"] as any).clearFiles();
        this.subMit();
        setTimeout(() => {
          this.uploadImgLoading = false;
        }, 1000);
      } else {
        this.uploadImgLoading = false;
        this.$message.error(res.message);
      }
    });
  }
  // 图片 - 上传
  imgUp(file: any, fileList: any) {
    console.log("--", file, fileList);
    this.galleryList.push(file.data.id);
    this.selectImgArr.push(file.data);
    this.hideUpload =
      this.totalNum - this.selectNum - this.selectImgArr.length == 0;
    console.log(this.galleryList);
  }
  // 图片 - 删除
  imgRemove(file: any, fileList: any) {
    console.log("图片删除", file, fileList);
    if (file.response) {
      this.galleryList = [];
      fileList.forEach((e: any) => {
        this.galleryList.push(e.response.data.id);
      });
      let id = file.response.data.id;
      this.selectImgArr.splice(
        this.selectImgArr.findIndex((item) => (item.id && item.id) === id),
        1
      );
      this.hideUpload =
        this.totalNum - this.selectNum - this.selectImgArr.length == 0;
      console.log("删除后的已选择", this.selectImgArr);
    }
  }
  // 图片 - 弹出框关闭
  uploadImgClose(done: any) {
    this.$confirm("确认关闭？")
      .then((_) => {
        console.log("执行了", this.galleryList);
        this.galleryList = [];
        this.selectImgArr = [];
        this.uploadImg = false;
        this.hideUpload =this.totalNum - this.selectNum - this.selectImgArr.length == 0;
        (this.$refs["upload"] as any).clearFiles();
        done();
      })
      .catch((_) => {});
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  .adduploads {
    margin: 6px 40px;
    div {
      font-size: 20px;
      font-weight: 700;
    }
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

.aside {
  border-right: 2px solid #e8efec;
  // position: relative;
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
}
.gallery {
  width: 100%;
  box-sizing: border-box;
  padding: 21px 26px 0 26px;
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
      &:nth-child(6n) {
        margin-right: 0;
      }
      .item-img {
        overflow: hidden;
        img {
          width: 140px;
          height: 110px;
          border-radius: 10px 10px 0px 0px;
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
.imgDia1 ::v-deep .el-dialog {
  height: auto;
  .el-dialog__header,
  .el-dialog__footer {
    border: 0;
  }
  .el-input__inner {
    background-color: #fff;
  }
  .el-dialog__header {
    padding-top: 12px;
  }
  .el-dialog__body {
    margin: 0 20px;
  }
}
</style>
