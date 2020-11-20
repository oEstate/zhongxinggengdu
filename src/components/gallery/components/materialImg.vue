<template>
  <el-container>
    <div class="aside" style="width: 166px">
      <el-scrollbar style="height: 688px">
        <ul class="aside-list">
          <li class="is-active">未分组</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
          <li>定南脐橙</li>
          <li>关于店铺</li>
        </ul>
      </el-scrollbar>
    </div>

    <div class="gallery">
      <el-scrollbar style="height: 670px">
        <ul class="container-list u_f">
          <li class="is-active-img">未分组</li>
          <li
            v-for="(item, index) in selectedOptions"
            :key="index"
            @click="clickItem(item)"
          >
            <div class="item-img">
              <img :src="item.imageUrl" alt="" />
            </div>
            <div class="item-name">肉蛋</div>
            <div class="item-size">300X300</div>
            <div class="isLayer" v-show="isLayer(item)">
              <i class="el-icon-success"></i>
              <span>{{ selectNumber(item) }}</span>
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({
  name: "materialImg",
})
export default class extends Vue {
  @Prop() limitType!: Boolean;
  @Prop() totalNum!: any;
  @Prop() selectNum!: any;

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

  private selectImgArr: Array<any> = []; // 选中的图片

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
  // 点击图片判断是否显示遮罩层
  isLayer(e: any) {
    if (this.selectImgArr.findIndex((item) => item.id == e.id) === -1) {
      return false;
    } else {
      return true;
    }
  }
  // 点击图片判断是否显示遮罩层上的数字
  selectNumber(e: any) {
    return this.selectImgArr.findIndex((item) => item.id == e.id) + 1;
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
      }
      .item-size {
        font-size: 13px;
        color: #666666;
      }
    }
  }
}
</style>
