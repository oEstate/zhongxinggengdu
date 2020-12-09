<template>
  <div class="container">
    <back :icon="icon" titleTxt="商品管理" backTxt="商品编辑" bt="30px" />
    <el-scrollbar :style="{ height: clientHeight - 288 + 'px' }">
      <ul class="from">
        <li class="ag">
          <div class="from-itrm-l">商品类型</div>
          <div class="phone">
            <el-select
              class="select"
              @change="goodsType"
              v-model="goodsData.goodsType"
              placeholder="请选择"
            >
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
            <selectClassify @getClassify="getClassify" />
          </div>
        </li>

        <li class="ag">
          <div class="from-itrm-l">商品标题</div>
          <div class="phone">
            <el-input
              v-model="goodsData.goodsTitle"
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
              v-model="goodsData.goodsDescribe"
              class="textareaInfo"
              maxlength="50"
            >
            </el-input>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">商品视频</div>
          <el-button
            type="success"
            v-if="videoForm.length == 0"
            plain
            @click="showVideoMaterialDia"
            >添加视频</el-button
          >
          <div class="pr">
            <img
              style="width: 100px; height: 100px"
              v-if="videoForm.length != 0"
              :src="videoForm[0].imgUrl"
              alt=""
              class="preview"
            />
            <div class="dec_" @click="deleteImg">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </li>
        <li class="ag">
          <div class="from-itrm-l">商品封面</div>
          <el-button
            type="success"
            v-if="goodsImg.length == 0"
            plain
            @click="showImgMaterialDia()"
            >添加图片</el-button
          >
          <div class="pr">
            <img
              style="width: 100px; height: 100px"
              v-if="goodsImg.length != 0"
              :src="goodsImg[0].imgUrl"
              alt=""
              class="preview"
            />
            <div class="dec_" @click="deleteImg">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </li>

        <li class="ag">
          <div class="from-itrm-l">商品轮播</div>
          <div class="pr" v-for="(item, index) in goodsImg1" :key="index">
            <img
              style="width: 100px; height: 100px; margin-right: 10px"
              :src="item.imgUrl"
              alt=""
              class="preview"
            />
            <div
              class="dec_"
              @click="deleteImg1(index)"
              style="margin-right: 10px"
            >
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <el-button
            type="success"
            v-if="goodsImg1.length < 5"
            plain
            @click="openGallery()"
            >添加图片</el-button
          >
        </li>
        <li
          class="ag"
          v-if="goodsData.goodsType !== '0' && goodsData.goodsType !== '3'"
        >
          <div class="from-itrm-l">商品定金</div>
          <div class="phone">
            <el-select
              v-if="goodsData.goodsType == '2'"
              class="select"
              v-model="deposit"
              placeholder="请选择"
            >
              <el-option
                v-for="item in depositRate"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-if="goodsData.goodsType == '1'"
              class="select"
              v-model="deposit1"
              placeholder="请选择"
            >
              <el-option
                v-for="item in depositRate1"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </li>
        <li class="ag" v-if="goodsData.goodsType == '2'">
          <div class="from-itrm-l">预定截止</div>
          <div class="phone">
            <el-date-picker
              v-model="goodsData.stopBooking"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </li>
        <li class="ag" v-if="goodsData.goodsType == '1'">
          <div class="from-itrm-l">认领截止</div>
          <div class="phone">
            <el-date-picker
              v-model="goodsData.stopBooking"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </li>
        <li
          class="ag"
          v-if="goodsData.goodsType !== '0' && goodsData.goodsType !== '3'"
        >
          <div class="from-itrm-l">预计发货时间</div>
          <div class="phone">
            <el-date-picker
              v-model="goodsData.estimatedDelivery"
              type="date"
              placeholder="选择日期"
            >
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

                <span class="sale_price_name"> 售价</span>
                <span class="line_price_name" v-if="goodsData.goodsType == '3'"
                  >原价</span
                >
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
                <p class="td" v-if="goodsData.goodsType == '3'">
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
            <tinymce v-model="goodsData.goodsDetails" :height="400" />
          </div>
        </li>
        <li class="ags">
          <el-button
            type="success"
            @click="$router.push({ path: '/goods/list' })"
            plain
            >取消</el-button
          >
          <el-button type="success" :loading="subLoading" @click="submitForm"
            >发布</el-button
          >
        </li>
      </ul>
    </el-scrollbar>

    <materialImg
      @onlyclose="isShow = false"
      @subMit="subMit"
      :multiple="true"
      :totalNum="totalNum"
      :showImgMaterial="isShow"
      :selectNum="selectNum"
    />
    <materialVideo
      :limitType="true"
      :showVideoMaterial="showVideoMaterial"
      :multiple="false"
      :totalNum="1"
      :selectNum="0"
      @onlyclose="showVideoMaterial = false"
      @subMit="subMitVideo"
    />
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
import materialImg from "@/components/gallery/materialImg.vue";
import materialVideo from "@/components/gallery/materialVideo.vue";
import { mixins } from "vue-class-component";
import ResizeMixin1 from "@/layout/mixin/resize1";
import selectClassify from "@/components/common/selectClassify.vue";
import { getGoodsById, upGoodsById } from "@/api/goods";

@Component({
  name: "addGoods",
  components: {
    back,
    Tinymce,
    materialImg,
    materialVideo,
    selectClassify,
  },
})
export default class extends mixins(ResizeMixin1) {
  private goodsData: any = {
    goodsType: "0", // 默认商品类型
    categoryCode: "", //商品分类id,
    goodsTitle: "", // "商品标题",
    goodsDescribe: "", //"商品简介"
    goodsCover: "", //"商品封面url"
    goodsRotationChart: "", //商品轮播图
    czGoodsSpecificationsFirstList: [], //规格
    bookingPrice: "", //预售价格百分比
    stopBooking: "", //截止时间
    estimatedDelivery: "", //发货时间
    goodsDetails: "", //商品详情
    specArr: "",
  };
  private echoData: any = {};
  private totalNum = 1;
  // 商品类型
  private options = [
    {
      value: "0",
      label: "普通商品",
    },
    {
      value: "1",
      label: "认领商品", //50-90
    },
    {
      value: "2", //10-30
      label: "预定商品",
    },
    {
      value: "3", //10-30
      label: "特价商品",
    },
  ];

  //定金比例 认领商品 50-90 预定商品 10-30
  //认领商品
  private depositRate = [
    {
      value: "50%",
    },
    {
      value: "60%",
    },
    {
      value: "70%",
    },
    {
      value: "80%",
    },
    {
      value: "90%",
    },
  ];
  //预定商品
  private depositRate1 = [
    {
      value: "10%",
    },
    {
      value: "20%",
    },
    {
      value: "30%",
    },
  ];
  // 定金
  private deposit = "50%";
  private deposit1 = "10%";
  /*********/
  //商品标题

  private icon = require("@/assets/header-icon/goods.png");
  private isShow = false;
  private subLoading = false;
  private showVideoMaterial = false;
  private videoForm: Array<any> = [];
  private specArr: Array<any> = [
    {
      specName: "",
      specList: [],
    },
  ]; // 规格名与规格值

  private specData: Array<any> = []; // 规格明细数据
  private showAddSpec = true; // 是否禁用添加规格按钮
  private specNameShow = false;
  private specNameForm: any = {
    fatherIndex: 0,
    specName: "",
  };
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
  private goodsImg1: Array<any> = [];
  private skuType0: any = {
    unit: "件",
  };

  private parameter: Array<any> = [];
  private limitType = false;
  private selectNum = 0;

  private imgMaterialType: any = "";
  private showImgMaterial = false;
  private currentSpecIdx = 0;
  private currentSpecChildIdx = 0;
  private specShow = false;
  private loading = false;
  created() {
    this.init(this.$route.query.id);
  }
  async init(id: any) {
    this.loading = true;
    const { data } = await getGoodsById({ id });
    console.log(data);

    this.goodsImg = [{ imgUrl: data.goodsCover }];
    let arr = data.goodsRotationChart.split(",");
    let arr1: any = [];
    arr.map((item: any) => {
      arr1.push({ imgUrl: item });
    });
    this.goodsImg1 = arr1;
    this.specData = data.children;
    this.specArr = data.specArr;
    // console.log(this.goodsImg);
    let obj = {
      goodsType: data.goodsType, // 默认商品类型
      categoryCode: "", //商品分类id,
      goodsTitle: data.goodsTitle, // "商品标题",
      goodsDescribe: data.goodsDescribe, //"商品简介"
      goodsCover: "", //"商品封面url"
      goodsRotationChart: "", //商品轮播图
      czGoodsSpecificationsFirstList: [], //规格
      bookingPrice: data.bookingPrice, //预售价格百分比
      stopBooking: data.stopBooking, //截止时间
      estimatedDelivery: data.estimatedDelivery, //发货时间
      goodsDetails: data.goodsDetails, //商品详情
      specArr: data.specArr,
    };
    this.goodsData = obj;
    this.loading = false;
  }
  //获取选中的商品分类
  getClassify(classify: any) {
    console.log(classify);
    let endArr = classify.slice(-1);
    // console.log(endArr[0].categoryCode)
    this.goodsData.categoryCode = endArr[0].categoryCode;
  }
  //获取商品类型
  goodsType(e: any) {
    console.log(e);
  }
  /**
   *
   * 规格值操作
   *
   */
  // 添加规格项行
  addSpecRow() {
    // 新增规格行 = specArr
    const specArrObj = {
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
  subMitVideo(e: any) {
    this.showVideoMaterial = false;
    this.videoForm = e;
  }
  // 规格名弹出框 确定操作
  addSpecName() {
    const i = this.specNameForm.fatherIndex;
    const n = this.specNameForm.specName;
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
          const specData: Array<any> = [];
          this.specArr.splice(i, 1);
          this.specArr[0].specList.forEach((e: { specValue: any }) => {
            const obj = {
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
    const i = this.specForm.fatherIndex;
    // 新增
    if (this.specForm.type == "new") {
      // specArr 数据整理
      this.specArr[i].specList.push({ specValue: this.specForm.specValue });
      // specData 数据整理
      // 规格名1中添加规格值
      if (i == 0) {
        // 新增属性条 = specData
        // 先判断2是否存在 存在的话循环生成新的children
        const children = [];
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
      const i2 = this.specForm.selfIndex;
      this.specArr[i].specList[i2].specValue = this.specForm.specValue;
      if (i == 0) this.specData[i2].specValue = this.specForm.specValue;
      if (i == 1) {
        this.specData.forEach(
          (e) => (e.children[i2].specValue = this.specForm.specValue)
        );
      }
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
    // console.log(this.goodsData);
    if (!this.goodsData.categoryCode) {
      this.$message.error("请选择商品分类");
      return;
    }
    if (!this.goodsData.goodsTitle) {
      this.$message.error("请填写商品标题");
      return;
    }
    if (!this.goodsData.goodsDescribe) {
      this.$message.error("请填写商品简介");
      return;
    }
    if (this.goodsImg.length == 0) {
      this.$message.error("请上传封面图");
      return;
    }
    if (this.goodsImg1.length == 0) {
      this.$message.error("请上传商品轮播图");
      return;
    }

    if (this.goodsData.goodsType == "2" && !this.goodsData.stopBooking) {
      this.$message.error("请选择预定截止时间");
      return;
    }
    if (this.goodsData.goodsType == "1" && !this.goodsData.stopBooking) {
      this.$message.error("请选择认领截止时间");
      return;
    }
    if (
      this.goodsData.goodsType !== "0" &&
      this.goodsData.goodsType !== "3" &&
      !this.goodsData.estimatedDelivery
    ) {
      this.$message.error("请选择预计发货时间");
      return;
    }
    if (this.specData.length == 0) {
      this.$message.error("请添加商品规格");
      return;
    }
    //
    for (let i = 0; i < this.specArr.length; i++) {
      const o = this.specArr[i];
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
      // 验证列表中的数据
      const sepcArrNew: any[] = [];
      this.specData.forEach((e) => {
        e.children.forEach((item: any) => {
          sepcArrNew.push(item);
        });
      });
      const specErrArr = sepcArrNew.filter(
        (item) => item.inventory == undefined || !item.salePrice || !item.unit
      );
      if (specErrArr.length > 0) {
        this.$message.error("请完善商品规格中的必填值");
        return;
      }
      const specErrArr1 = sepcArrNew.filter(
        (item) => item.linePrice && item.linePrice <= item.salePrice
      );
      if (specErrArr1.length > 0) {
        this.$message.error("规格中的原价应大于售价");
        return;
      }
      this.goodsData.productSkuList = this.specData;
      this.goodsData.specArr = this.specArr;
    }
    // 参数
    if (this.parameter.length != 0) {
      const errArr = this.parameter.filter(
        (e: { key: any; value: any }) => !e.key || !e.value
      );
      if (errArr.length > 0) {
        this.$message.error("请完善填写参数");
        return;
      } else {
        this.ruleForm.parameter = this.parameter;
      }
    }
    if (!this.goodsData.goodsDetails) {
      this.$message.error("请完善商品详情");
      return;
    }
    let arr: Array<any> = [];
    let arr1: Array<any> = [];
    this.goodsImg.map((item: any) => {
      arr.push(item.imgUrl);
    });
    this.goodsImg1.map((item: any) => {
      arr1.push(item.imgUrl);
    });
    this.goodsData.goodsCover = arr.join(",");
    this.goodsData.goodsRotationChart = arr1.join(",");
    this.goodsData.czGoodsSpecificationsFirstList = this.specData;
    if (this.goodsData.goodsType == "1") {
      this.goodsData.bookingPrice = this.deposit1;
    }
    if (this.goodsData.goodsType == "2") {
      this.goodsData.bookingPrice = this.deposit;
    }
    this.subLoading = true;
    getGoodsById(this.goodsData).then((res: any) => {
      console.log("发布商品", res);
      if (res.code == 200) {
        this.$message({
          message: "发布成功",
          type: "success",
        });
        setTimeout(() => {
          this.$router.replace({
            path: "/goods/list",
          });
        }, 1000);
      } else {
        this.subLoading = false;
        this.$message.error(res.message);
      }
    });
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
  // 删除图片
  deleteImg1(i: any) {
    this.goodsImg1.splice(i, 1);
  }

  showImgMaterialDia() {
    this.totalNum = 1;
    this.imgMaterialType = "goodsImg";
    this.selectNum = this.goodsImg.length;
    this.isShow = true;
  }
  //打开图片库
  openGallery() {
    this.totalNum = 5;
    this.imgMaterialType = "goodsImg1";
    this.selectNum = this.goodsImg1.length;
    this.isShow = true;
  }
  // 规格值处调取图片库
  showSpecImgMaterialDia(index: any, imgIdx: any) {
    this.totalNum = 1;
    this.imgMaterialType = "specImg";
    this.isShow = true;
    this.currentSpecIdx = index;
    this.currentSpecChildIdx = imgIdx;
    console.log(this.currentSpecIdx, this.currentSpecChildIdx);
  }

  // 删除规格对应的商品图片
  deletSkuImg(index: any, imgIdx: any) {
    this.specData[index].children[imgIdx].skuImageUrl = "";
  }
  // 图片库确定
  subMit(e: any) {
    console.log(e);
    this.isShow = false;
    console.log(this.imgMaterialType);
    if (this.imgMaterialType == "goodsImg")
      e.forEach((item: any) => this.goodsImg.push(item));
    if (this.imgMaterialType == "goodsImg1")
      e.forEach((item: any) => this.goodsImg1.push(item));
    if (this.imgMaterialType == "specImg")
      this.specData[this.currentSpecIdx].children[
        this.currentSpecChildIdx
      ].skuImageUrl = e[0].imgUrl;
    console.log(this.specData);
  }
  showVideoMaterialDia() {
    this.showVideoMaterial = true;
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
ul li .spec_con .spec_box .rows .td .product_img_box .el-icon-delete {
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
      // width: 67px;
      margin-left: 5px;
      // text-align: right;
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
.pr {
  height: 100px;
  &:hover {
    .dec_ {
      display: block;
      cursor: pointer;
    }
  }
}

.dec_ {
  position: absolute;
  display: none;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  .el-icon-delete {
    font-size: 30px;
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
