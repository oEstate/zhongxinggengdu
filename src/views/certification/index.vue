<template>
  <div class="">
    <grayHeader />
    <div class="container">
      <steps ref="steps" :activeNumber="active" lastName="4、审核通过" />
      <div>
        <ul>
          <li
            class="user-type"
            :class="defaultActive == index ? 'is-select-type' : ''"
            @click="selectUserType(index)"
            v-for="(item, index) in authenticationData"
            :key="index"
          >
            <div class="user-type-h1">{{ item.typeName }}</div>
            <div class="user-type-h2">{{ item.typeTitle }}</div>
            <div class="user-type-h3">
              {{ item.typeInfo }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="next-btn">
      <el-button type="success" @click="next">下一步</el-button>
    </div>
    <grayFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import grayHeader from "@/components/header/index.vue";
import grayFooter from "@/components/footer/gray.vue";
import steps from "@/components/common/steps.vue";
@Component({
  name: "certification",
  components: {
    grayHeader,
    grayFooter,
    steps,
  },
})
export default class extends Vue {
  private active = 1;
  private defaultActive = 0;
  private authenticationData = [
    {
      typeName: "商家",
      typeTitle: "商家",
      typeInfo: "商家身份主要 编辑商品，查看订单 商品发货等需求",
    },
    {
      typeName: "村/居",
      typeTitle: "村委居委",
      typeInfo: "村委居委云平台管理 编辑村委居委概况 发布本地资讯等",
    },
    {
      typeName: "乡镇",
      typeTitle: "乡镇街道",
      typeInfo: "乡镇街道云平台管理 编辑乡镇街道概况 发布本地资讯等",
    },
    {
      typeName: "区县",
      typeTitle: "区县",
      typeInfo: "区县平台管理 编辑区县概况 发布本地资讯等",
    },
  ];
  jump() {
    this.$router.push({ path: "/login" });
  }
  next() {
    (this.$refs.steps as any).next();
  }
  selectUserType(index: any) {
    this.defaultActive = index;
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 139px;
  li {
    list-style: none;
  }
}
.container {
  margin-top: 130px;
}
.user-type {
  width: 150px;
  text-align: center;
  margin-right: 100px;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
  .user-type-h1 {
    width: 112px;
    height: 112px;
    border-radius: 70px;
    border: 14px solid #bbbbbb;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 12px;
    font-weight: 600;
    color: #bbbbbb;
  }
  .user-type-h2 {
    font-size: 20px;
    font-weight: 500;
    color: #666666;
    margin-bottom: 5px;
  }
  .user-type-h3 {
    font-size: 16px;
    color: #666666;
    line-height: 28px;
  }
}
.is-select-type {
  .user-type-h1 {
    border-color: #00b54d;
    color: #00b54d;
  }
  .user-type-h2 {
    color: #00b54d;
  }
}
.next-btn {
  margin-top: 76px;
  text-align: center;
  margin-bottom: 170px;
}
</style>
