<template>
  <div class="">
    <grayHeader />
    <div class="container">
      <steps ref="steps" :activeNumber="active" />
      <ul class="type1" v-if="false">
        <li class="icon">
          <img src="@/assets/common/audit.png" alt="" />
        </li>
        <li class="title">信息审核中</li>
        <li class="info">您的身份认证信息已提交</li>
        <li class="info">平台会在24小时内审核完成</li>
        <li class="info">审核结果将以站内信及短信通知您，请耐心等待</li>
      </ul>

      <ul class="type2" v-if="false">
        <li class="icon">
          <img src="@/assets/common/auditsuccess.png" alt="" />
        </li>
        <li class="title">审核通过</li>
        <li class="info">恭喜您，身份认证已通过</li>
        <li><el-button type="success" @click="next">个人中心</el-button></li>
      </ul>

      <ul class="type3" v-if="true">
        <li class="icon">
          <img src="@/assets/common/auditerror.png" alt="" />
        </li>
        <li class="title">审核失败</li>
        <li class="info">很抱歉，您的身份认证未通过</li>
        <li class="info infoerr">原因：身份证照片不清晰</li>
        <li><el-button type="success" @click="jump">重新认证</el-button></li>
      </ul>
    </div>
    <grayFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import grayHeader from '@/components/header/index.vue'
import grayFooter from '@/components/footer/gray.vue'
import steps from '@/components/common/steps.vue'
@Component({
  name: 'auditCertification',
  components: {
    grayHeader,
    grayFooter,
    steps
  }
})
export default class extends Vue {
  private active = 3;
  jump() {
    this.$router.push({ path: '/certification' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 130px;
}
ul {
  margin-top: 219px;
  margin-bottom: 224px;
  li {
    list-style: none;
    text-align: center;
  }
}
.type1 {
  .icon {
  }
}
.type2 {
  .icon {
  }
  .info {
    margin-bottom: 33px;
  }
}
.type3 {
  .icon {
  }
  .infoerr {
    margin-bottom: 38px;
    color: #f55340;
  }
}
.title {
  height: 28px;
  font-size: 20px;
  font-weight: 500;
  color: #666;
  line-height: 28px;
  margin: 13px 0 7px 0;
}
.info {
  font-size: 18px;
  color: #666666;
  line-height: 31px;
}
</style>
