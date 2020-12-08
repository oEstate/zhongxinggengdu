<template>
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
})
export default class extends Vue {
  @Prop() limitType!: Boolean;
  @Prop() totalNum!: any;
  @Prop() selectNum!: any;
  @Prop() selectImgArr!: any; // 选中的图片
  private pageNo = 1;
  private pageSize = 18;
  private total = 0;
  private active = 0;
  private libraryId = -1;
  private siderName = "";
  private addSiderName = "";
  private searchVal = "";
  private action = `${process.env.VUE_APP_BASE_API}/photoController/addPhotos`;
  private dialogVisible = false;
  private dialogVisible1 = false;
  private uploadImgLoading = false;
  private uploadImg = false; // 上传图片弹出框
  private loading = false;
  private item: any = { className: "未分组", id: -1 }; // 准备上传的图片数据
  private galleryList: Array<any> = []; // 准备上传的图片数据
  private selectedOptions: Array<any> = [];
  private siderData: Array<any> = [];
  private libraryId_1 = -1;
  private changeClassLoading = false; // 批量分组loading\
  private changeClassShow = false; // 批量分组loading

  async created() {
    await this.init();
  }
  //初始化素材分类
  async init() {
    this.siderData = [{ className: "未分组", id: -1 }];
    const { data } = await selectCzMaterialLibrary({ id: 1 });
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

  // 点击图片
  clickItem(e: any) {
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
    this.$emit("getArr", this.selectImgArr);
  }
  // 分页
  pageChange(page: any) {
    // console.log(page)
    this.pageNo = page;
    this.clickSider(this.item, this.active, this.pageNo);
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
}
</script>

<style lang="scss" scoped>
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
        margin-bottom: 4px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 124px;
        margin: 0 auto;
      }
      .item-size {
        font-size: 13px;
        color: #666666;
      }
    }
  }
}
</style>
