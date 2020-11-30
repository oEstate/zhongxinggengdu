<template>
  <div>
    <div class="header u_f_ajs">
      <div class="u_f_ac">
        <img
          class="header-icon"
          src="@/assets/header-icon/dashboard.png"
          alt=""
        />
        <span>数据中心</span>
      </div>
      <div class="header_r">
        <i class="el-icon-download"></i>
        下载详细报表
      </div>
    </div>
    <el-scrollbar :style="{height: clientHeight - 194 + 'px'}">
      <div class="dashboard-container">
        <div class="u_f_ajs report">
          <div class="u_f_ac">
            <span class="icon-k"></span>
            <span class="title">全县营收情况</span>
          </div>
          <div>
            <span class="report-title">查看详细报表</span>
            <i class="el-icon-arrow-right ic"></i>
          </div>
        </div>
        <ul class="statistical u_f_ajsv1">
          <li>
            <div class="statistical-n">
              <count-to
                :start-val="0"
                :end-val="1799"
                :duration="2000"
                separator=''
                class="card-panel-num"
              />
            </div>
            <div class="statistical-t">今日订单成交量</div>
          </li>
          <li>
            <div class="statistical-n">
              <count-to
                :start-val="0"
                :end-val="884.34"
                :duration="2000"
                :decimals="2"
                separator=''
                class="card-panel-num"
              />
            </div>
            <div class="statistical-t">今日总营业额(万元)</div>
          </li>
          <li>
            <div class="statistical-n">
              <count-to
                :start-val="0"
                :end-val="11345.12"
                :duration="2000"
                :decimals="2"
                separator=''
                class="card-panel-num"
              />
            </div>
            <div class="statistical-t">本周总营业额(万元)</div>
          </li>
          <li>
            <div class="statistical-n">
              <count-to
                :start-val="0"
                :end-val="45872.14"
                :duration="2000"
                :decimals="2"
                separator=''
                class="card-panel-num"
              />
            </div>
            <div class="statistical-t">本月总营业额(万元)</div>
          </li>
        </ul>
        <div class="u_f_ajs report">
          <div class="u_f_ac">
            <span class="icon-k"></span>
            <span class="title">全县营收情况</span>
          </div>
          <div>
            <span class="report-title">查看详细报表</span>
            <i class="el-icon-arrow-right ic"></i>
          </div>
        </div>
        <ul class="dist u_f_ajs">
          <li class="dist-item">
            <div class="dist-item-title u_f_ac">
              <span class="dist-item-icon"></span>
              <span class="dist-item-txt">全县店铺总量分布</span>
            </div>
            <div class="pie-chart">
              <pie-chart />
              <ul class="pie-chart-list">
                <li class="pie-chart-list-item">
                  <span class="w55">乡镇街道</span>
                  <span class="w25">总量</span>
                  <span class="w20">占比</span>
                </li>
                <li class="pie-chart-list-item1 u_f">
                  <div class="u_f_ac w55">
                    <span class="pie-chart-item-icon icon-color1"></span>
                    <span>定南县老城镇</span>
                  </div>
                  <div class="w25">1900</div>
                  <div class="w20">28%</div>
                </li>
                <li class="pie-chart-list-item1 u_f">
                  <div class="u_f_ac w55">
                    <span class="pie-chart-item-icon icon-color2"></span>
                    <span>定南县老城镇</span>
                  </div>
                  <div class="w25">1900</div>
                  <div class="w20">28%</div>
                </li>
                <li class="pie-chart-list-item1 u_f">
                  <div class="u_f_ac w55">
                    <span class="pie-chart-item-icon icon-color3"></span>
                    <span>定南县老城镇</span>
                  </div>
                  <div class="w25">1900</div>
                  <div class="w20">28%</div>
                </li>
              </ul>
            </div>
          </li>
          <li class="dist-item">
            <div class="dist-item-title u_f_ac">
              <span class="dist-item-icon"></span>
              <span class="dist-item-txt">全县商品总类分布</span>
            </div>
            <div class="pie-chart">
              <pie-chart />
              <ul class="pie-chart-list">
                <li class="pie-chart-list-item">
                  <span class="w55">乡镇街道</span>
                  <span class="w25">总量</span>
                  <span class="w20">占比</span>
                </li>
                <li class="pie-chart-list-item1 u_f">
                  <div class="u_f_ac w55">
                    <span class="pie-chart-item-icon icon-color1"></span>
                    <span>定南县老城镇</span>
                  </div>
                  <div class="w25">1900</div>
                  <div class="w20">28%</div>
                </li>
                <li class="pie-chart-list-item1 u_f">
                  <div class="u_f_ac w55">
                    <span class="pie-chart-item-icon icon-color2"></span>
                    <span>定南县老城镇</span>
                  </div>
                  <div class="w25">1900</div>
                  <div class="w20">28%</div>
                </li>
                <li class="pie-chart-list-item1 u_f">
                  <div class="u_f_ac w55">
                    <span class="pie-chart-item-icon icon-color3"></span>
                    <span>定南县老城镇</span>
                  </div>
                  <div class="w25">1900</div>
                  <div class="w20">28%</div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import PieChart from './components/PieChart.vue'
import { mixins } from 'vue-class-component'
import ResizeMixin1 from '@/layout/mixin/resize1'
import CountTo from 'vue-count-to'

@Component({
  name: 'Dashboard',
  components: {
    PieChart,
    CountTo
  }
})
export default class extends mixins(ResizeMixin1) {
  @Prop() routes!: any;
  created() {
    console.log(this.routes)
    console.log(this.clientHeight)
  }

  get name() {
    return UserModule.name
  }

  get roles() {
    return UserModule.roles
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
  .el-input__icon {
    margin-right: 13px;
  }
  .header_r {
    cursor: pointer;
    i {
      color: #00b54d;
      font-size: 18px;
      font-weight: 700;
      position: relative;
      top: 2px;
    }
    font-size: 16px;
    color: #777777;
    margin-right: 36px;
  }
}

.dashboard {
  &-container {
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

.dist {
  margin: 32px 38px;
  .dist-item {
    .dist-item-title {
      margin-bottom: 20px;
      .dist-item-icon {
        width: 3px;
        height: 16px;
        background: #00b54d;
        margin-right: 10px;
        display: inline-block;
      }
      .dist-item-txt {
        font-size: 18px;
        color: #444;
      }
    }
    .pie-chart {
      width: 460px;
      height: 466px;
      background: #e8efec;
      border-radius: 18px;

      .pie-chart-list {
        .w55 {
          width: 55%;
        }
        .w25 {
          width: 25%;
        }
        .w20 {
          width: 20%;
        }
        .pie-chart-list-item {
          margin-bottom: 16px;
          span {
            font-size: 18px;
            font-weight: 500;
            color: #444;
            display: inline-block;
          }
        }
        .pie-chart-list-item1 {
          font-size: 16px;
          color: #444444;
          .pie-chart-item-icon {
            width: 18px;
            height: 18px;
            border-radius: 6px;
            display: inline-block;
            margin-right: 7px;
          }
          .icon-color1 {
            background: #33c4af;
          }
          .icon-color2 {
            background: #fe8fa5;
          }
          .icon-color3 {
            background: #968efb;
          }
          span {
            margin-bottom: 14px;
          }
        }
        li {
          margin-left: 58px;
        }
      }
    }
  }
}
</style>
