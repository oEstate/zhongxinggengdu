<template>
  <div>
    <div class="header u_f_ac">
      <img
        class="header-icon"
        src="@/assets/header-icon/carousel.png"
        alt=""
      />
      <span>轮播管理</span>
    </div>
    <div class="container">
      <carouselSetter />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import carouselSetter from './components/carouselSetter.vue'
@Component({
  name: 'carousel',
  components: {
    carouselSetter
  }
})
export default class extends Vue {
  created() {}
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
.container {
  box-sizing: border-box;
  padding: 20px 32px 36px 32px;
}
</style>
