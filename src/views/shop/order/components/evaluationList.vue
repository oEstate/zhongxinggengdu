<template>
  <el-scrollbar style="height: 636px">
    <ul>
      <li v-for="(item, index) in tableData" :key="index">
        <div class="u_f_ajs">
          <div class="u_f_ac">
            <div class="user-img">
              <img src="http://dwz.date/dp5k" alt="" />
            </div>
            <div>
              <div class="user-name">李先生</div>
              <div>
                <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  disabled-void-color="#ccc"
                  score-template="{value}"
                >
                </el-rate>
              </div>
            </div>
          </div>
          <div class="time">2020-10-09 20：12：34</div>
        </div>
        <p class="evaluation-txt">
          苹果大小均匀个头挺大的不错，肉厚皮薄多汁口感很好的，品尝了一个很好吃，水分很多，口感很好，拿回来两天就被吃完了，肉厚皮薄多汁口感很好的，品尝了一个很好吃，水分很多
        </p>
        <div class="evaluation-img">
          <el-image class="img" :src="url" :preview-src-list="[url]">
          </el-image>
          <el-image class="img" :src="url" :preview-src-list="[url]">
          </el-image>
        </div>
        <p class="goods">红富士苹果</p>
      </li>
    </ul>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'evaluationList',
  components: {
  }
})
export default class extends Vue {
  private url = 'http://dwz.date/dp5k';
  private value = 3.5;
  private tableData = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ];

  created() {}
  addColumn() {
    this.$router.push({ path: '/views/addColumn' })
  }
}
</script>

<style lang="scss" scoped>
ul {
  li {
    border-bottom: 2px solid #e8efec;
    box-sizing: border-box;
    padding: 20px 0 13px 0;
    .user-img {
      width: 56px;
      height: 56px;
      margin-right: 14px;
      flex-shrink: 0;
      img {
        width: 56px;
        height: 56px;
        border-radius: 56px;
      }
    }
    .user-name {
      height: 22px;
      font-size: 16px;
      color: #333333;
      line-height: 22px;
      margin-bottom: 6px;
    }
    .time {
      font-size: 14px;
      color: #666666;
    }
    .evaluation-txt {
      font-size: 16px;
      color: #333333;
      line-height: 28px;
      margin-top: 17px;
      margin-bottom: 10px;
    }
    .evaluation-img {
      margin-bottom: 8px;
      .img {
        width: 186px;
        height: 129px;
        margin-right: 18px;
      }
    }
    .goods {
      font-size: 14px;
      color: #666666;
    }
  }
}
</style>
