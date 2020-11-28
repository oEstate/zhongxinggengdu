<template>
  <div>
    <div class="header u_f_ac">
      <img
        class="header-icon"
        src="@/assets/header-icon/message.png"
        alt=""
      />
      <span>账号设置</span>
    </div>
    <div class="dashboard-container">
      <tabs :tabsData="tabsData" :tabsActive="tabsActive" @getPath="getPath">
        <component :is="isComponent" @changeShop="changeShop"></component>
      </tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import tabs from '@/components/common/tabs.vue'
import basic from './components/basic.vue'
import basicAlter from './components/basicAlter.vue'
import certification from './components/certification.vue'
import binding from './components/binding.vue'
import bindingPhone from './components/bindingPhone.vue'
import bindingPhoneValidation from './components/bindingPhoneValidation.vue'
@Component({
  name: 'Dashboard',
  components: {
    tabs,
    basic,
    basicAlter,
    certification,
    binding,
    bindingPhone,
    bindingPhoneValidation
  }
})
export default class extends Vue {
  private tabsActive = '0';
  private isComponent = 'basic';
  private tabsData = [
    {
      label: '基本信息',
      name: '0',
      path: 'basic'
    },
    {
      label: '实名认证',
      name: '1',
      path: 'certification'
    },
    {
      label: '账号绑定',
      name: '2',
      path: 'binding'
    }
  ];

  created() {}

  getPath(e: any) {
    // alert(2)
    console.log(e)
    this.isComponent = e
  }

  changeShop(e: any) {
    this.isComponent = e
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 70px;
  background: #e8efec;
  line-height: 70px;
  font-size: 18px;
  color: #444444;
  padding-left: 33px;
  i {
    margin-right: 13px;
  }
}
::v-deep .el-tabs__item {
  font-size: 18px;
  height: 61px;
  line-height: 61px;
}
::v-deep .el-tabs__item.is-active {
  color: #00b54d;
}
::v-deep .el-tabs__active-bar {
  background-color: #00b54d;
}
::v-deep .el-tabs__item:hover {
  color: #00b54d;
}
.dashboard {
  &-container {
    margin: 18px 32px 0 32px;
    .report {
      border-bottom: 2px solid #e8efec;
      box-sizing: border-box;
      padding: 26px 36px 18px 37px;
      .icon-k {
        width: 6px;
        height: 6px;
        background: #00b54d;
        margin-right: 14px;
        display: inline-block;
      }
      .title {
        font-size: 20px;
        font-weight: 500;
        color: #444444;
      }
      .report-title {
        font-size: 16px;
        color: #777777;
      }
      .ic {
        color: #00b54d;
      }
    }

    .statistical {
      margin: 39px;
      &-n {
        height: 70px;
        font-size: 50px;
        font-weight: 600;
        color: #00b54d;
        line-height: 70px;
        letter-spacing: 1px;
        margin-bottom: 6px;
      }
      &-t {
        height: 22px;
        font-size: 16px;
        color: #444444;
        line-height: 22px;
      }
    }
  }
}
</style>
