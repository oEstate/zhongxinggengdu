import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { RouteConfig } from 'vue-router'
import { constantRoutes } from '@/router'
import { getUserRole } from '@/api/users'
import store from '@/store'
import Layout from '@/layout/index.vue'


export const filterAsyncRoutes = (routes: any) => {
  console.log(routes)
  routes.filter((router: any) => {
    if (router.component) {
      if (router.component === 'Layout') {
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRoutes(router.children)
    }
  })
  return routes
}
export const loadView = (view: any) => {
  return () => import(`@/views/${view}`)
}
export interface IPermissionState {
  routes: RouteConfig[]
  dynamicRoutes: RouteConfig[]
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []
  public dynamicRoutes: RouteConfig[] = []

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes)
    this.routes.push({
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    })
    this.dynamicRoutes = routes
    // console.log(this.dynamicRoutes)
  }

  //请求接口获取用户路由
  @Action({rawError: true})
  public async GetMenus() {
    let accessedRoutes
    const { data } = await getUserRole();
    console.log(data)
    accessedRoutes = filterAsyncRoutes(data);
    this.SET_ROUTES(accessedRoutes)
  }
}

export const PermissionModule = getModule(Permission)
