<template>
  <div class="sidebar">
    <div class="menu u_f_ac">
      <div v-for="route in routes" :key="route.path">
        <div
          class="menu_item u_f_ajc"
          :class="route.redirect == $route.path ? 'router-link-active ' : ''"
          v-if="!route.meta || !route.meta.hidden"
          @click="menu_item(route.path)"
        >
          <i :class="route.meta.icon"></i>
          <span>{{ route.meta.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
@Component({
  name: 'SideBar'
})
export default class extends Vue {
  created() {
  }

  get routes() {
    // console.log((this.$router as any).options.routes)
    // return (this.$router as any).options.routes;
    return PermissionModule.routes
  }

  menu_item(url: any) {
    this.$router.push(url)
  }
}
</script>

<style lang="scss" scoped>
.menu {
  margin-top: 37px;
  flex-wrap: wrap;
  padding-left: 35px;
  width: 280px;
  .menu_item {
    width: 98px;
    height: 98px;
    border-radius: 16px;
    font-size: 16px;
    color: #5E5E5E;
    margin-bottom: 28px;
    margin-right: 23px;
    overflow: hidden;
    flex-direction: column;
    cursor: pointer;
    transition: .3s;
    &:nth-child(2n) {
      margin-right: 26px;
    }
    i {
      font-size: 28px;
      margin-bottom: 8px;
    }
    &:hover{
      background: #00B54D;
      color: #fff;
    }
  }
  .router-link-active {
    background: #00B54D;
    box-shadow: 0px 18px 37px 0px rgba(0, 126, 25, 0.19);
    color: #fff;
  }
}
</style>
