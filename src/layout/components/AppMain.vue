<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
    <!--<keep-alive>-->
        <router-view :routes="routes" />
    <!--</keep-alive>-->
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'AppMain',
  components: {}
})
export default class extends Vue {
  created() {
    // console.log(this.nowroute);
    // console.log(this.routes);
  }

  get routes() {
    // let routes: any = {
    //   children: (this.$router as any).options.routes
    // };
    // let route: any = this.$route.matched;
    // for (var i = 0; i < route.length - 1; i++) {
    //   console.log(route[i])
    //   routes = routes.children.find((e: any) => e.name == route[i].name);

    // }
    // return routes.children;
    return (this.$router as any).options.routes
  }

  get nowroute() {
    const route: any = this.$route

    return route
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  width: 100%;
  background: #f3f6f5;
  box-shadow: 0px 0px 16px 6px rgba(12, 44, 27, 0.05);
  border-radius: 18px;
  margin-top: -230px;
  // height:calc(100vh -120px);
  // height: 800px;
  min-height: calc(100vh - 140px);
}
</style>
