<template>
  <el-container>
    <div class="aside" style="width: 166px">
      <el-scrollbar style="height: 440px">
        <ul class="aside-list">
          <li
            :class="active == index ? 'is-active' : ''"
            @click="clickSider(item, index)"
            v-for="(item, index) in siderData"
            :key="item.id"
          >
            {{ item.className }}
          </li>
        </ul>
      </el-scrollbar>
      <div class="btn">
        <div class="editor">
          <el-button type="success" plain @click="dialogVisible = true"
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
          <el-input placeholder="请输入关键字">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button class="query_btn" type="success">搜索</el-button>
        </div>
        <div>
          <el-button type="success" @click="uploadImg = true"
            >上传图片</el-button
          >
          <!--<el-button type="success" @click="addColumn">转移分组</el-button>
          <el-button type="success" @click="addColumn">批量删除</el-button>-->
        </div>
      </div>
      <el-scrollbar style="height: 550px">
        <ul class="container-list u_f">
          <li
            @click="clickItem(item)"
            v-for="(item, index) in selectedOptions"
            :key="index"
          >
            <div class="item-img">
              <img src="http://dwz.date/dp5k" alt="" />
            </div>
            <div class="item-name">肉蛋</div>
            <div class="item-size">300X300</div>
            <div class="isLayer" v-show="isLayer(item)">
              <i class="el-icon-success"></i>
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>

    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="siderName" maxlength="6" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" plain @click="dialogVisible = false"
          >取 消</el-button
        >
        <el-button type="success" @click="editorSider">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="dialogVisible1" width="30%">
      <el-input v-model="addSiderName" maxlength="6" show-word-limit></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" plain @click="dialogVisible1 = false"
          >取 消</el-button
        >
        <el-button type="success" @click="addSider">确 定</el-button>
      </span>
    </el-dialog>

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
        ref="upload"
        :action="action"
        name="file"
        :multiple="false"
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
} from "@/api/material";
@Component({
  name: "materialImg",
})
export default class extends Vue {
  private active = 0;
  private libraryId = -1;
  private siderName = "";
  private addSiderName = "";
  private action = `${process.env.VUE_APP_BASE_API}/photoController/addPhotos`;
  private dialogVisible = false;
  private dialogVisible1 = false;
  private uploadImgLoading = false;
  private uploadImg = false; // 上传图片弹出框

  private uploadImgForm: any = {
    // 上传图片数据
    galleryId: 0,
  };
  private galleryList: Array<any> = []; // 准备上传的图片数据
  private selectedOptions = [
    {
      coversUrl: "",
      duration: "",
      galleryId: 0,
      height: "750",
      id: 1471,
      imageName: "3",
      imageUrl:
        "https://kzmall.oss-cn-beijing.aliyuncs.com/prod/material/image/20/1586401837385_3.png",
      type: 0,
      width: "750",
    },
    {
      coversUrl: "",
      duration: "",
      galleryId: 0,
      height: "500",
      id: 1472,
      imageName: "筷赚Logo",
      imageUrl:
        "https://kzmall.oss-cn-beijing.aliyuncs.com/prod/material/image/20/1586402391932_筷赚Logo.png",
      type: 0,
      width: "500",
    },
    {
      coversUrl: "",
      duration: "",
      galleryId: 0,
      height: "739",
      id: 1485,
      imageName: "1",
      imageUrl:
        "https://kzmall.oss-cn-beijing.aliyuncs.com/prod/material/image/20/1586405121007_1.png",
      type: 0,
      width: "750",
    },
    {
      coversUrl: "",
      duration: "",
      galleryId: 0,
      height: "151",
      id: 1486,
      imageName: "2",
      imageUrl:
        "https://kzmall.oss-cn-beijing.aliyuncs.com/prod/material/image/20/1586405133745_2.png",
      type: 0,
      width: "750",
    },
    {
      coversUrl: "",
      duration: "",
      galleryId: 0,
      height: "624",
      id: 1487,
      imageName: "4",
      imageUrl:
        "https://kzmall.oss-cn-beijing.aliyuncs.com/prod/material/image/20/1586405145458_4.png",
      type: 0,
      width: "750",
    },
    {
      coversUrl: "",
      duration: "",
      galleryId: 0,
      height: "655",
      id: 1488,
      imageName: "5",
      imageUrl:
        "https://kzmall.oss-cn-beijing.aliyuncs.com/prod/material/image/20/1586405156231_5.png",
      type: 0,
      width: "750",
    },
  ];
  private siderData: Array<any> = [];
  private selectImgArr: Array<any> = []; // 选中的图片
  async created() {
    await this.init();
  }
  //初始化素材分类
  async init() {
    this.siderData = [{ className: "未分组", id: -1 }];
    const { data } = await selectCzMaterialLibrary({ id: 1 });
    console.log(data.list);
    this.siderData = this.siderData.concat(data.list);
    this.clickSider([{ className: "未分组", id: -1 }], 0);
  }
  //初始化素材分类图片
  async clickSider(item: any, index: any) {
    this.active = index;
    this.siderName = item.className;
    this.libraryId = item.id;
    console.log(item);
    const { data } = await selectCzMaterialLibraryClassification({
      id: this.libraryId,
    });
  }
  //编辑素材分类
  async editorSider() {
    await upCzMaterialLibraryClassification({
      libraryId: 1,
      id: this.libraryId,
      className: this.siderName,
    });
    this.dialogVisible = false;
    await this.init();
  }
  //新增素材分类
  async addSider() {
    await addCzMaterialLibraryClassification({
      libraryId: 1,
      className: this.addSiderName,
    });
    this.dialogVisible1 = false;
    this.addSiderName = "";
    await this.init();
  }
  // 图片 - 上传
  imgUp(file: any, fileList: any) {
    console.log("--", file, fileList);
    let obj: any = {};
    obj.id = file.data.id;
    obj.imgUrl = file.data.imgUrl;
    this.galleryList.push(obj);
    console.log(this.galleryList)
  }

  // 图片 - 删除
  imgRemove(file: any, fileList: any) {
    console.log("图片删除", file, fileList);
    if (file.response) {
      this.galleryList = [];
      fileList.forEach((e: any) => {
        let gObj: any = {};
        console.log(e)
        gObj.id = e.response.data[0].id;
        gObj.imgUrl = e.response.data[0].imgUrl;
        this.galleryList.push(gObj);
      });
      let id = file.response.data[0].id;
      this.selectImgArr.splice(
        this.selectImgArr.findIndex((item) => (item.id && item.id) === id),
        1
      );
      console.log("删除后的已选择", this.selectImgArr);
    }
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
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt3M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt3M;
  }

      // 图片 - 弹出框关闭
    uploadImgClose(done:any){
      this.$confirm('确认关闭？').then(_ => {
        console.log('执行了',this.galleryList)
        this.galleryList = []
        this.selectImgArr = []
        this.uploadImg = false

        // this.$refs.upload.clearFiles()
        done();
      }).catch(_ => {});
    }

  changeShop() {
    this.$emit("changeShop", "basicAlter");
  }


  // 点击图片
  clickItem(e: any) {
    if (this.selectImgArr.findIndex((item: any) => item.id == e.id) === -1) {
      this.selectImgArr.push(e);
    } else {
      this.selectImgArr.splice(
        this.selectImgArr.findIndex((item: any) => item.id === e.id),
        1
      );
    }
    // this.$emit("getArr", this.selectImgArr);
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
        img {
          width: 140px;
          height: 110px;
          border-radius: 10px 10px 0px 0px;
        }
      }
      .item-name {
        font-size: 16px;
        color: #444444;
        margin-bottom: 4px;
      }
      .item-size {
        font-size: 13px;
        color: #666666;
      }
    }
  }
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
