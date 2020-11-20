<template>
  <div class="container">
    <back
      icon="el-icon-search"
      titleTxt="商品管理"
      backTxt="商品发布"
      bt="30px"
    />
    <el-scrollbar style="height: 500px">
      <ul class="from">
        <li class="ag">
          <div class="from-itrm-l">商品类型</div>
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
          <div class="from-itrm-l">商品分类</div>
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
          <div class="from-itrm-l">商品标题</div>
          <div class="phone">
            <el-input
              v-model="shopName"
              placeholder="请输入商品标题"
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
          <div class="from-itrm-l">商品轮播</div>
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
          <el-button type="success" plain @click="openGallery"
            >打开图片库</el-button
          >
        </li>

        <li style="display: block">
          <!-- 规格表 -->
          <div class="spec_con">
            <span class="name">商品规格：</span>
            <div class="spec_box">
              <div
                class="spec_row_box"
                v-for="(item, index) in specArr"
                :key="index"
              >
                <div class="spec_name_box">
                  <span class="spec_name">规格名：</span>
                  <el-input
                    style="width: 247px"
                    type="text"
                    placeholder="请输入规格名称（示例：颜色）"
                    v-model="item.specName"
                    maxlength="4"
                    show-word-limit
                  ></el-input>
                  <i
                    class="el-icon-delete close_btn"
                    @click="deletRow(index)"
                  ></i>
                </div>
                <div class="spec_value_box">
                  <span class="spec_value_name">规格值：</span>
                  <div class="right_box">
                    <div
                      class="input_box"
                      v-for="(sp, idx) in item.specList"
                      :key="idx"
                    >
                      <el-input
                        style="width: 160px"
                        @input="creatData"
                        type="text"
                        placeholder="规格值"
                        v-model="sp.specValue"
                        maxlength="20"
                        show-word-limit
                      ></el-input>

                      <i
                        class="el-icon-circle-close close_spec_value"
                        @click.stop="deletSpecValue(index, idx)"
                      ></i>
                    </div>

                    <el-button
                      class="add_spec_value"
                      size="mini"
                      type="success"
                      @click.stop="addSpecValue(index)"
                      >添加规格值</el-button
                    >
                  </div>
                </div>
              </div>
              <div
                :class="showAddSpec ? 'add_spec_btn' : 'add_spec_btn default'"
                @click.stop="addSpecRow"
              >
                添加规格项
              </div>
            </div>
          </div>
          <!-- 明细表 -->
          <div class="spec_con">
            <span class="name">规格明细：</span>
            <!-- 一、二级规格 -->
            <div class="spec_box" style="padding: 0;padding-bottom:1px;">
              <div class="title_box">
                <span class="one_spec_name">{{
                  specArr[0] && specArr[0].specName
                }}</span>
                <span
                  class="two_spec_name"
                  v-if="specArr[1] && specArr[1].specName"
                  >{{ specArr[1] && specArr[1].specName }}</span
                >
                <span class="origin_price_name">成本价</span>
                <span class="line_price_name">划线价</span>
                <span class="sale_price_name"
                  ><i style="color: red">* </i> 销售价</span
                >
                <span class="inventory_name"
                  ><i style="color: red">* </i> 库存</span
                >
                <span class="unit_name"><i style="color: red">* </i> 单位</span>
              </div>
              <div class="rows" v-for="(item, index) in specData" :key="index">
                <p class="td">{{ item.specValue }}</p>
                <p class="td border" v-if="specArr[1] && specArr[1].specName">
                  <span
                    class="color"
                    v-for="(nameChild, nameIdx) in item.children"
                    :key="nameIdx"
                    v-show="nameChild.specValue"
                    >{{ nameChild.specValue }}</span
                  >
                </p>
                <p class="td">
                  <el-input-number
                    style="width: 90%"
                    v-for="(priceChild, priceIdx) in item.children"
                    :key="priceIdx"
                    v-model="priceChild.originPrice"
                    :min="0.01"
                    :precision="2"
                    :controls="false"
                  ></el-input-number>
                </p>
                <p class="td">
                  <el-input-number
                    style="width: 90%"
                    v-for="(lineChild, lineIdx) in item.children"
                    :key="lineIdx"
                    v-model="lineChild.linePrice"
                    :min="0.01"
                    :precision="2"
                    :controls="false"
                  ></el-input-number>
                </p>
                <p class="td">
                  <el-input-number
                    style="width: 90%"
                    v-for="(saleChild, saleIdx) in item.children"
                    :key="saleIdx"
                    v-model="saleChild.salePrice"
                    :min="0.01"
                    :precision="2"
                    :controls="false"
                  ></el-input-number>
                </p>
                <p class="td">
                  <el-input-number
                    style="width: 90%"
                    v-for="(invenChild, invenIdx) in item.children"
                    :key="invenIdx"
                    v-model="invenChild.inventory"
                    :min="0"
                    :precision="0"
                    :controls="false"
                  ></el-input-number>
                </p>
                <p class="td flex2">
                  <el-input
                    style="width: 90%"
                    v-for="(unitChild, unitIdx) in item.children"
                    :key="unitIdx"
                    v-model.trim="unitChild.unit"
                  ></el-input>
                </p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="from-itrm-l">商品详情</div>
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

    <gallery @onlyclose="isShow = false" :dialogVisible="isShow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import back from "@/components/header/back.vue";
import Tinymce from "@/components/Tinymce/index.vue";
import gallery from "@/components/gallery/index.vue";
@Component({
  name: "addGoods",
  components: {
    back,
    Tinymce,
    gallery,
  },
})
export default class extends Vue {
  private isShow = false;
  private specArr: Array<any> = []; //规格名与规格值
  private specData: Array<any> = []; //规格明细数据
  private showAddSpec = true; //是否禁用添加规格按钮
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
  openGallery() {
    this.isShow = true;
  }
  changeShop() {
    this.$emit("changeShop", "binding");
  }
  next() {
    this.$emit("changeShop", "bindingPhone");
  }
  // 删除当前规格行
  deletRow(index: any) {
    this.specArr.splice(index, 1);
    if (this.specArr.length < 2) {
      this.showAddSpec = true;
    }
    // 重新生成表格数据
    this.creatData();
  }
  // 删除规格值
  deletSpecValue(index: any, idx: any) {
    this.specArr[index].specList.splice(idx, 1);
    // 重新生成表格数据
    this.creatData();
  }
  // 添加规格值
  addSpecValue(index: any) {
    let obj = {
      specValue: "",
    };
    this.specArr[index].specList.push(obj);
  }
  // 添加规格项行
  addSpecRow() {
    // console.log('新增规格行');
    let obj = {
      specName: "",
      specList: [{ specValue: "" }],
    };
    this.specArr.push(obj);
    if (this.specArr.length >= 2) {
      this.showAddSpec = false;
      return;
    }
  }
  // 实时生成数据
  creatData() {
    console.log(this.specArr);
    this.specData = [];
    this.specArr[0].specList.forEach((item: any, i: any) => {
      let specObj: any = {
        specKey: this.specArr[0].specName,
        specValue: item.specValue,
        children: [],
      };
      this.specData.push(specObj);
      if (this.specArr[1]) {
        this.specArr[1].specList.forEach((sku: any) => {
          let obj: any = {
            specKey: this.specArr[1].specName,
            specValue: sku.specValue,
            originPrice: undefined,
            linePrice: undefined,
            salePrice: undefined,
            inventory: undefined,
            unit: "件",
            skuCode: "",
            isOpen: true,
          };
          specObj.children.push(obj);
        });
      } else {
        let obj: any = {
          originPrice: undefined,
          linePrice: undefined,
          salePrice: undefined,
          inventory: undefined,
          unit: "件",
          skuCode: "",
          isOpen: true,
        };
        specObj.children.push(obj);
      }
    });
    console.log(this.specData);
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

.spec_con {
  width: 100%;
  // display: flex;
  margin-top: 20px;
  .name {
    box-sizing: border-box;
    padding-right: 12px;
    width: 140px;
    text-align: right;
    font-weight: bold;
    font-size: 14px;
    color: #606266;
    &::before {
      content: "*";
      display: inline-block;
      color: #f56c6c;
    }
  }
  .spec_box {
    width: 80%;
    margin-left: 15px;
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 12px;
    
    ::v-deep .el-input__inner {
      font-size: 13px;
    }
    .spec_row_box {
      width: 100%;
      display: flex;
      flex-flow: column;
      .spec_name_box {
        width: 100%;
        margin-bottom: 20px;
        // background-color: #f8f8f8;
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        .spec_name {
          width: 80px;
          padding: 7px 10px;
          margin: 0;
          font-size: 12px;
          line-height: 16px;
          font-weight: 400;
          height: 100%;
        }
        input {
          font-size: 12px;
          float: left;
          width: 94px;
          background-color: #fff;
          border: 0 none;
          outline: none;
          border: 1px solid #bbb;
          border-radius: 2px;
          cursor: pointer;
          padding: 5px 10px;
          box-sizing: border-box;
          &::placeholder {
            font-size: 12px;
            line-height: 100%;
          }
        }
        .close_btn {
          color: #00b54d;
          cursor: pointer;
          margin-left: 14px;
        }
      }
      .spec_value_box {
        width: 100%;
        margin-bottom: 20px;
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        .spec_value_name {
          padding: 7px 10px;
          font-size: 12px;
          line-height: 16px;
          font-weight: 400;
          height: 100%;
          float: left;
          margin-top: 4px;
        }
        .right_box {
          float: left;
          width: 85%;
          .input_box {
            float: left;
            display: flex;
            position: relative;
            margin: 0 10px 10px 0;
            &:hover {
              .close_spec_value {
                display: block;
              }
            }
            input {
              font-size: 12px;
              box-sizing: border-box;
              border: 1px solid #bbb;
              border-radius: 2px;
              min-height: 30px;
              max-height: 76px;
              line-height: 100%;
              outline: none;
              padding: 5px 10px;
              width: 152px;
              background-color: #fff;
              &::placeholder {
                font-size: 12px;
                line-height: 100%;
              }
            }
            .close_spec_value {
              position: absolute;
              right: -8px;
              top: -8px;
              text-align: center;
              color: #fff;
              color: rgba(0, 0, 0, 0.5);
              cursor: pointer;
              display: none;
              font-size: 18px;
              &:hover {
                // color: rgba(0, 0, 0, 0.6);
                color: #00b54d;
              }
            }
          }
          .add_spec_value {
            float: left;
            margin-left: 10px;
            margin-top: 5px;
          }
        }
      }
    }
    .add_spec_btn {
      max-width: 80px;
      text-align: center;
      height: 30px;
      line-height: 29px;
      cursor: pointer;
      margin-left: 12px;
      padding: 0px 5px;
      box-sizing: border-box;
      background-color: rgb(247, 247, 247);
      color: rgb(101, 113, 128);
      border-radius: 3px;
      border: 1px solid rgb(215, 221, 228);
      font-size: 12px;
      &.default {
        cursor: default;
        background-color: #f7f7f7;
        color: #ccc;
        pointer-events: none;
        &:hover {
          background-color: #f7f7f7;
          color: #ccc;
          border: 1px solid rgb(215, 221, 228);
        }
      }
      &:hover {
        color: #00b54d;
        border: 1px solid #00b54d;
      }
    }
    .title_box,
    .rows {
      width: 100%;
      min-height: 64px;
      line-height: 64px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      &:last-child{
        border-bottom:0;
      }
      span,
      .td {
        margin: 0;
        display: block;
        height: 100%;
        font-size: 12px;
        color: #657180;
        flex: 1;
        text-align: center;
        &.border {
          border-left: 1px solid #ccc;
        }
        .specNo_name,
        .flex2 {
          flex: 2;
        }
      }
      input {
        width: 80px;
        height: 30px;
        border-radius: 2px;
        border: 1px solid #ccc;
        outline: none;
        cursor: pointer;
        text-align: center;
        line-height: 30px;
      }
    }

    .title_box {
      background-color: #e8efec;
      border-radius: 12px;
      span {
        color: #333;
        font-size: 16px;
      }
    }
  }
}
</style>
