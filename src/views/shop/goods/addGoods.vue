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
          <div class="from-itrm-l">商品简介</div>
          <div style="width: 88%">
            <el-input
              type="textarea"
              placeholder="请输入商品简介（限制50个字）"
              v-model="shopName"
              class="textareaInfo"
              maxlength="50"
            >
            </el-input>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">商品封面</div>
          <el-button type="success" plain @click="openGallery"
            >添加图片</el-button
          >
        </li>

        <li class="ag">
          <div class="from-itrm-l">商品轮播</div>
          <el-button type="success" plain @click="openGallery"
            >添加图片</el-button
          >
        </li>
        <li class="ag">
          <div class="from-itrm-l">商品定金</div>
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
          <div class="from-itrm-l">预定截止</div>
          <div class="phone">
            <el-date-picker v-model="value" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
        <li style="display: block">
          <!-- 规格表 -->
          <div class="from-itrm-l">商品规格</div>
          <div class="spec_con">
            <div class="spec_box">
              <div
                class="spec_row_box"
                v-for="(item, index) in specArr"
                :key="index"
              >
                <div class="spec_name_box flex-row-start">
                  <span class="spec_name">规格名：</span>
                  <div class="posItem" v-show="item.specName">
                    <el-tag
                      type="success"
                      style="min-width: 160px; padding-right: 50px"
                      >{{ item.specName }}</el-tag
                    >
                    <el-button-group class="btnGroup">
                      <el-button
                        style="margin-right: 6px"
                        type="text"
                        icon="el-icon-edit"
                        @click="specNameS(item, index, 'edit')"
                      ></el-button>
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        @click="deletRow(index)"
                      ></el-button>
                    </el-button-group>
                  </div>
                  <el-button
                    v-show="!item.specName"
                    type="text"
                    @click="specNameS('', index, 'new')"
                    >添加规格名</el-button
                  >
                  <el-button
                    class="dangerFont"
                    v-show="!item.specName && index == 1"
                    type="text"
                    @click="deleteSpecRow"
                    >删除</el-button
                  >
                </div>
                <div class="spec_value_box">
                  <span class="spec_value_name">规格值：</span>
                  <div class="right_box">
                    <div
                      class="input_box"
                      v-for="(sp, idx) in item.specList"
                      :key="idx"
                    >
                      <div class="posItem">
                        <el-tag
                          style="min-width: 160px; padding-right: 50px"
                          type="info"
                          >{{ sp.specValue }}</el-tag
                        >
                        <el-button-group class="btnGroup">
                          <el-button
                            style="margin-right: 6px"
                            type="text"
                            icon="el-icon-edit"
                            @click="showSpec(item, index, sp, idx, 'edit')"
                          ></el-button>
                          <el-button
                            type="text"
                            icon="el-icon-delete"
                            @click="deleteSpec(index, idx)"
                          ></el-button>
                        </el-button-group>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span class="spec_value_name"></span>
                    <el-button
                      :disabled="item.specName.length == 0"
                      plain
                      type="success"
                      size="mini"
                      @click.stop="showSpec(item, index, '', '', 'new')"
                      >添加规格值</el-button
                    >
                    <span
                      v-show="item.specName.length == 0"
                      class="dangerFont f12"
                      style="padding-left: 2px"
                    >
                      请先添加规格名
                    </span>
                  </div>
                </div>
                <el-divider v-if="index != 1"></el-divider>
              </div>
              <el-button
                @click.stop="addSpecRow"
                size="small"
                type="success"
                :disabled="
                  specArr[0].specList.length == 0 || specArr.length >= 2
                "
                >添加规格项</el-button
              >
              <span
                v-show="specArr[0].specList.length == 0"
                class="dangerFont f12"
                style="padding-left: 6px"
                >请完成1级规格后在添加二级规格</span
              >
            </div>
          </div>
        </li>
        <li style="display: block">
          <!-- 规格表 -->
          <div class="from-itrm-l">规格明细</div>
          <!-- 明细表 -->
          <div class="spec_con">
            <!-- 一、二级规格 -->
            <div class="spec_box" style="padding: 0; padding-bottom: 1px">
              <div class="title_box">
                <span class="one_spec_name">{{
                  specArr[0] && specArr[0].specName
                }}</span>
                <span class="two_spec_name" v-if="specArr[1]">{{
                  specArr[1].specName
                }}</span>

                <span class="sale_price_name"> 价格</span>
                <span class="line_price_name">原价</span>
                <span class="inventory_name"> 库存</span>
                <span class="unit_name">单位</span>
                <span class="product_img">
                  商品图片
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="建议尺寸: 140*140"
                    placement="top-start"
                  >
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </span>
              </div>
              <div class="rows" v-for="(item, index) in specData" :key="index">
                <p class="td">{{ item.specValue }}</p>
                <p class="td border" v-if="specArr[1]">
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
                <p class="td">
                  <span
                    class="product_img_box"
                    v-if="imgChild.skuImageUrl"
                    v-for="(imgChild, imgIdx) in item.children"
                    :key="imgIdx"
                  >
                    <img
                      class="product_img"
                      :src="imgChild.skuImageUrl"
                      alt=""
                    />
                    <i
                      class="el-icon-delete"
                      @click="deletSkuImg(index, imgIdx)"
                    ></i>
                  </span>
                  <el-button
                    class="add_img"
                    v-else
                    type="text"
                    @click="showSpecImgMaterialDia(index, imgIdx)"
                    >添加图片</el-button
                  >
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

    <!-- 规格名 -->
    <el-dialog
      title="规格名"
      :visible.sync="specNameShow"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="specNameForm" label-width="80px">
        <el-form-item label="规格名：">
          <el-input
            v-model.trim="specNameForm.specName"
            placeholder="规格名"
            maxlength="4"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearspecNameForm" type="success" plain size="small"
          >关 闭</el-button
        >
        <el-button
          :disabled="specNameForm.specName.length == 0"
          type="success"
          @click="addSpecName"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 规格值 -->
    <el-dialog
      title="规格值"
      :visible.sync="specShow"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="specForm" label-width="80px">
        <el-form-item label="规格名：">
          <div>{{ specForm.specKey }}</div>
        </el-form-item>
        <el-form-item label="规格值：">
          <el-input
            v-model.trim="specForm.specValue"
            placeholder="规格值"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="clearspecForm" type="success" plain
          >关 闭</el-button
        >
        <el-button
          size="small"
          :disabled="specForm.specValue.length == 0"
          type="success"
          @click="addSpecValue"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
  //

  private shopName = "";

  //
  private isShow = false;
  private specArr: Array<any> = [
    {
      specName: "",
      specList: [],
    },
  ]; //规格名与规格值
  private specData: Array<any> = []; //规格明细数据
  private showAddSpec = true; //是否禁用添加规格按钮
  private specNameShow = false;
  private specNameForm: any = {
    fatherIndex: 0,
    specName: "",
  };
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
  private specForm: any = {
    fatherIndex: 0,
    selfIndex: 0,
    spec2Index: 0, // ** 如果是0 代表没有2级规格值的子集  如果有了spec2Index++
    specValue: "",
    specKey: "",
  };
  private ruleForm: any = {
    salesStatus: "0",
    evaluate: "1",
    isFreeShipping: "1",
    showSales: "1",
    freightTemplateId: "",
    isCompanyType: false,
    isSelffetchType: false,
    skuType: "0",
  };
  private codeType = false;
  private goodsImg: Array<any> = [];
  private skuType0: any = {
    unit: "件",
  };
  private parameter: Array<any> = [];
  private subLoading = false;
  private limitType = false;
  private selectNum = 0;

  private imgMaterialType: Array<any> = [];
  private showImgMaterial = false;
  private currentSpecIdx = 0;
  private currentSpecChildIdx = 0;
  private specShow = false;
  openGallery() {
    this.isShow = true;
  }
  changeShop() {
    this.$emit("changeShop", "binding");
  }
  next() {
    this.$emit("changeShop", "bindingPhone");
  }

  /**
   *
   * 规格值操作
   *
   */
  // 添加规格项行
  addSpecRow() {
    // 新增规格行 = specArr
    let specArrObj = {
      specName: "",
      specList: [],
    };
    this.specArr.push(specArrObj);
  }
  deleteSpecRow() {
    this.specArr.splice(1, 1);
  }
  // 添加规格名 =弹出框
  specNameS(o: any, i: any, t: any) {
    this.specNameForm.fatherIndex = i;
    this.specNameForm.type = t;
    if (t == "edit") this.specNameForm.specName = o.specName;
    this.specNameShow = true;
  }
  // 关闭清空弹出框
  clearspecNameForm() {
    this.specNameForm.specName = "";
    this.specNameShow = false;
  }
  // 规格名弹出框 确定操作
  addSpecName() {
    let i = this.specNameForm.fatherIndex;
    let n = this.specNameForm.specName;
    this.specArr[i].specName = n;
    // 编辑
    if (this.specNameForm.type == "edit") {
      console.log("this.specData[i]", this.specData[i]);
      if (this.specData[i]) {
        console.log("存在");
        this.specData.forEach((e) => {
          if (i == 0) {
            e.specKey = n;
          }
          if (i == 1) {
            e.children.forEach((ei: { specKey: any }) => (ei.specKey = n));
          }
        });
      }
    }
    this.specNameForm.specName = "";
    this.specNameShow = false;
  }
  // 删除当前规格行
  deletRow(i: any) {
    // this.specArr.splice(index, 1);
    this.$confirm(
      "此操作将重置规格明细中中所有已填写的数据，是否继续?",
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    )
      .then(() => {
        // 只有规格1时
        if (this.specArr.length == 1) {
          console.log("只有规格1");
          this.specArr = [
            {
              specName: "",
              specList: [],
            },
          ];
          this.specData = [];
        } else {
          let specData: Array<any> = [];
          this.specArr.splice(i, 1);
          this.specArr[0].specList.forEach((e: { specValue: any }) => {
            let obj = {
              specKey: this.specArr[0].specName,
              specValue: e.specValue,
              children: [
                {
                  specKey: "",
                  specValue: "",
                  linePrice: undefined,
                  salePrice: undefined,
                  inventory: undefined,
                  unit: "件",
                },
              ],
            };
            specData.push(obj);
          });
          this.specData = specData;
        }
        this.specForm.spec2Index = 0;
      })
      .catch(() => {});
  }
  /**
   * o1  => 规格1
   * i1  => 总规格索引
   * o2  => 规格2
   * i2  => 编辑时的索引
   * t   => 状态  edit || new
   */
  showSpec(o1: any, i1: any, o2: any, i2: any, t: any) {
    this.specForm.specKey = o1.specName;
    this.specForm.fatherIndex = i1;
    this.specForm.type = t;
    if (t == "edit") {
      this.specForm.specValue = o2.specValue;
      this.specForm.selfIndex = i2;
    }
    this.specShow = true;
  }
  clearspecForm() {
    this.specForm.specValue = "";
    this.specShow = false;
  }
  // 添加规格值弹出框的确定操作
  addSpecValue(o: any) {
    let i = this.specForm.fatherIndex;
    // 新增
    if (this.specForm.type == "new") {
      // specArr 数据整理
      this.specArr[i].specList.push({ specValue: this.specForm.specValue });
      // specData 数据整理
      // 规格名1中添加规格值
      if (i == 0) {
        // 新增属性条 = specData
        // 先判断2是否存在 存在的话循环生成新的children
        let children = [];
        if (this.specForm.spec2Index == 0) {
          console.log("2");
          // 没有2级时的添加1级规格值
          children.push({
            specKey: "",
            specValue: "",
            linePrice: undefined,
            salePrice: undefined,
            inventory: undefined,
            unit: "件",
            skuDescription: "",
            skuImageUrl: "",
          });
          console.log("添加一级规格值");
        } else {
          // 有2级时的添加1级规格值
          this.specArr[1].specList.forEach((e: { specValue: any }) => {
            children.push({
              specKey: this.specArr[1].specName,
              specValue: e.specValue,
              linePrice: undefined,
              salePrice: undefined,
              inventory: undefined,
              unit: "件",
              skuDescription: "",
              skuImageUrl: "",
            });
          });
          console.log("有2级时的添加1级规格值");
        }
        this.specData.push({
          specKey: this.specForm.specKey,
          specValue: this.specForm.specValue,
          children,
        });
      }
      // 规格名2中添加规格值
      if (i == 1) {
        this.specData.forEach((e) => {
          if (this.specForm.spec2Index == 0) {
            // 第一次添加
            e.children[0].specKey = this.specForm.specKey;
            e.children[0].specValue = this.specForm.specValue;
          } else {
            // 非第一次添加
            e.children.push({
              specKey: this.specForm.specKey,
              specValue: this.specForm.specValue,
              linePrice: undefined,
              salePrice: undefined,
              inventory: undefined,
              unit: "件",
              skuDescription: "",
              skuImageUrl: "",
            });
          }
        });
        this.specForm.spec2Index++;
        console.log("规格名2中添加规格值");
      }
    }
    // 编辑
    if (this.specForm.type == "edit") {
      let i2 = this.specForm.selfIndex;
      this.specArr[i].specList[i2].specValue = this.specForm.specValue;
      if (i == 0) this.specData[i2].specValue = this.specForm.specValue;
      if (i == 1)
        this.specData.forEach(
          (e) => (e.children[i2].specValue = this.specForm.specValue)
        );
    }
    this.specForm.specValue = "";
    this.specShow = false;
  }
  // 删除规格值
  deleteSpec(i1: any, i2: any) {
    // 一级规格的删除
    if (i1 == 0) {
      if (this.specData.length == 1) {
        this.$confirm(
          "此操作将重置规格明细中中所有已填写的数据，是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            this.specArr[i1].specList.splice(i2, 1);
            this.specData.splice(i2, 1);
          })
          .catch(() => {});
      } else {
        this.specArr[i1].specList.splice(i2, 1);
        this.specData.splice(i2, 1);
      }
    }
    // 二级规格的删除
    if (i1 == 1) {
      this.specData.forEach((e) => {
        if (e.children.length == 1) {
          e.children[i2].specValue = "";
        } else {
          e.children.splice(i2, 1);
        }
      });
      this.specArr[i1].specList.splice(i2, 1);
      this.specForm.spec2Index--;
    }
  }

  submitForm(formName: any) {
    console.log(this.ruleForm);
    // 商品标题
    if (!this.ruleForm.name) {
      this.$message.error("请填写商品标题");
      return;
    }
    // 商品描述
    if (!this.ruleForm.abstracts) {
      this.$message.error("请填写商品描述");
      return;
    }
    // 分享描述
    if (!this.ruleForm.shareDescription) {
      this.$message.error("请填写分享描述");
      return;
    }
    // 商品编码
    if (!this.ruleForm.code) {
      this.$message.error("请填写商品编码");
      return;
    }
    if (!this.codeType) {
      this.$message.error("商品编码重复，请重新输入");
      return;
    }
    // 分类
    if (
      !this.ruleForm.shopCategoryIdsArr ||
      this.ruleForm.shopCategoryIdsArr.length == 0
    ) {
      this.$message.error("请选择商品分类");
      return;
    } else {
      let arr: { pid: any; id: any }[] = [];
      this.ruleForm.shopCategoryIdsArr.forEach((e: any[]) => {
        let obj = {
          pid: e[0],
          id: e[1],
        };
        arr.push(obj);
      });
      this.ruleForm.shopCategoryIds = arr;
    }
    // 商品图片
    if (this.goodsImg.length == 0) {
      this.$message.error("请上传商品图片");
      return;
    }
    this.ruleForm.imageUrl = this.goodsImg[0].imageUrl;
    this.ruleForm.goodsImg = this.goodsImg;
    // 商品规格
    if (this.ruleForm.skuType == 0) {
      if (!this.skuType0.salePrice) {
        this.$message.error("请填写销售价");
        return;
      }
      if (
        this.skuType0.linePrice &&
        this.skuType0.linePrice <= this.skuType0.salePrice
      ) {
        this.$message.error("划线价应大于销售价");
        return;
      }
      if (this.skuType0.inventory == undefined) {
        this.$message.error("请填写库存");
        return;
      }
      if (this.skuType0.unit == undefined) {
        this.$message.error("请填写单位");
        return;
      }
      let arr = [];
      arr.push(this.skuType0);
      this.ruleForm.productSkuList = arr;
    }
    if (this.ruleForm.skuType == 1) {
      console.log("specArr", this.specArr);
      console.log("specData", this.specData);
      if (this.specData.length == 0) {
        this.$message.error("请添加商品规格");
        return;
      }
      //
      for (let i = 0; i < this.specArr.length; i++) {
        let o = this.specArr[i];
        if (!o.specName) {
          this.$message.error("请填写正确的规格名");
          return;
        }
        if (o.specList.length == 0) {
          this.$message.error("请完善商品规格列表中的规格名");
          return;
        }
        for (let j = 0; j < o.specList.length; j++) {
          if (!o.specList[j].specValue) {
            this.$message.error("请完善商品规格列表中的规格值");
            return;
          }
        }
      }
      // 验证列表中的数据
      let sepcArrNew: any[] = [];
      this.specData.forEach((e) => {
        e.children.forEach((item: any) => {
          sepcArrNew.push(item);
        });
      });
      let specErrArr = sepcArrNew.filter(
        (item) => item.inventory == undefined || !item.salePrice || !item.unit
      );
      if (specErrArr.length > 0) {
        this.$message.error("请完善商品规格中的必填值");
        return;
      }
      let specErrArr1 = sepcArrNew.filter(
        (item) => item.linePrice && item.linePrice <= item.salePrice
      );
      if (specErrArr1.length > 0) {
        this.$message.error("规格中的划线价应大于销售价");
        return;
      }
      this.ruleForm.productSkuList = this.specData;
      this.ruleForm.specArr = this.specArr;
    }
    // 参数
    if (this.parameter.length != 0) {
      let errArr = this.parameter.filter(
        (e: { key: any; value: any }) => !e.key || !e.value
      );
      if (errArr.length > 0) {
        this.$message.error("请完善填写参数");
        return;
      } else {
        this.ruleForm.parameter = this.parameter;
      }
    }
    // 富文本

    // 物流信息
    if (!this.ruleForm.isCompanyType && !this.ruleForm.isSelffetchType) {
      this.$message.error("请选择物流信息");
      return;
    }
    this.ruleForm.isCompany = this.ruleForm.isCompanyType ? "1" : "0";
    this.ruleForm.isSelffetch = this.ruleForm.isSelffetchType ? "1" : "0";
    if (this.ruleForm.isCompanyType) {
      if (
        this.ruleForm.isFreeShipping == 0 &&
        !this.ruleForm.freightTemplateId
      ) {
        this.$message.error("请选择运费模板");
        return;
      }
    }
    this.subLoading = true;
    let params = JSON.stringify(this.ruleForm);
  }
  // 点击添加参数
  addParameter() {
    this.parameter.push({ key: "", val: "" });
  }
  // 删除参数
  deleteParameter(i: any) {
    this.parameter.splice(i, 1);
  }
  // 删除图片
  deleteImg(i: any) {
    this.goodsImg.splice(i, 1);
  }
  showImgMaterialDia() {
    this.limitType = true;
    this.selectNum = this.goodsImg.length;
    this.imgMaterialType = "goodsImg";
    this.showImgMaterial = true;
  }
  // 规格值处调取图片库
  showSpecImgMaterialDia(index: any, imgIdx: any) {
    this.imgMaterialType = "specImg";
    this.showImgMaterial = true;
    this.currentSpecIdx = index;
    this.currentSpecChildIdx = imgIdx;
    console.log(this.currentSpecIdx, this.currentSpecChildIdx);
  }
  //删除规格对应的商品图片
  deletSkuImg(index: any, imgIdx: any) {
    this.specData[index].children[imgIdx].skuImageUrl = "";
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
    border-radius: 10px;
    .posItem {
      font-size: 12px;
      border-radius: 2px;
      min-height: 40px;
      line-height: 40px;
      position: relative;
      .btnGroup {
        position: absolute;
        right: 8px;
        top: 0;
      }
      &:hover {
        .edit {
          display: block;
        }
        .delete {
          display: block;
        }
      }
    }
    .spec_row_box {
      width: 100%;
      display: flex;
      flex-flow: column;
      .spec_name_box {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        .spec_name {
          // float: left;
          width: 80px;
          margin: 0;
          font-size: 12px;
          line-height: 40px;
          font-weight: 400;
          height: 40px;
          text-align: center;
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
          float: right;
          width: 18px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          margin-top: 6px;
          cursor: pointer;
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
          width: 80px;
          margin: 0;
          font-size: 12px;
          line-height: 40px;
          font-weight: 400;
          height: 40px;
          float: left;
          text-align: center;
        }
        .right_box {
          float: left;
          min-height: 40px;
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
          }
          .add_spec_value {
            float: left;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 12px;
            color: #3388ff;
            cursor: pointer;
            font-style: normal;
            margin-left: 10px;
          }
        }
      }
    }
    .title_box,
    .rows {
      width: 100%;
      min-height: 49px;
      line-height: 49px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      &:last-child {
        border-bottom: 0;
      }
      span,
      .td {
        margin: 0;
        display: block;
        height: 100%;
        font-size: 16px;
        color: #333;
        flex: 1;
        text-align: center;
        &.border {
          border-left: 1px solid #ccc;
        }
        .specNo_name,
        .flex2 {
          flex: 2;
        }
        .add_img {
          width: 90px;
          margin: 0;
          padding: 12px 10px;
        }
        .product_img_box {
          width: 106px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          .product_img {
            margin: 6px 6px 6px 0;
            width: 40px;
            height: 40px;
          }
          .el-icon-delete {
            font-size: 16px;
            color: #3a8ee6;
            cursor: pointer;
          }
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
  }
}
.set_box {
  width: 100%;
  display: flex;
  margin-top: 20px;
  .set_title {
    box-sizing: border-box;
    padding-right: 12px;
    width: 140px;
    text-align: right;
    font-weight: bold;
    font-size: 14px;
    color: #606266;
  }
  .spec_box {
    width: 60%;
    margin-left: 15px;
    border: 1px solid #dddddd;
    padding: 20px;
    box-sizing: border-box;
    .line {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      &:nth-of-type(2) {
        margin: 0;
      }
      .value_box {
        margin-right: 20px;
        .key {
          font-size: 14px;
          color: #657180;
        }
        input {
          margin-left: 15px;
          width: 200px;
          height: 30px;
          border-radius: 2px;
          border: 1px solid #ccc;
          outline: none;
          cursor: pointer;
          text-align: center;
          line-height: 30px;
        }
      }
    }
    .btn_box {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .btn {
        width: 80px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        margin-left: 12px;
        padding: 0px 5px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #09f;
        color: #fff;
        border-radius: 3px;
        border: 1px solid #d7dde4;
        font-size: 12px;
        &.cancel_btn {
          margin-right: 10px;
          background-color: #ff4444;
        }
      }
    }
  }
  .el-icon-delete {
    color: #00b54d;
  }
}

::v-deep .el-textarea__inner {
  background-color: #f0f0f0;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  height: 170px;
}
::v-deep .el-dialog {
  height: auto;
}
</style>
