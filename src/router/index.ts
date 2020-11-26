import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'


Vue.use(VueRouter)

/*
  注意:子菜单只在children.length>=1时出现
 细节见: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
  name:'router-name'             在使用时，name字段是必需的，它还应该匹配其组件的name属性
                                 细节见 : https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
  redirect:                      如果设置为“noredirect”，当单击面包屑时将不会触发重定向操作
  meta: {
    roles: ['admin', 'editor']   将控制页面角色(允许设置多个角色)
    title: 'title'               在子菜单和面包屑中显示的名称(推荐设置)
    icon: 'svg-name'             图标显示在侧边栏
    hidden: true                 如果为真，此路径将不会显示在侧边栏中(默认为假)
    alwaysShow: true             如果为真，将始终显示根菜单(默认为假)
                                 如果为false，则在子路由少于或等于一个时隐藏根菜单
    breadcrumb: false            如果为假，项目将隐藏在面包屑中(默认为真)
    noCache: true                如果为真，页面将不会被缓存(默认为false)
    affix: true                  如果为真，标签将附着在标签视图中
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
*/

/**
  ConstantRoutes
没有权限要求的基本页面
所有角色都可以访问
*/
export const constantRoutes: RouteConfig[] = [
  {
    name: 'index',
    path: '/index',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true, title: '首页' },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: { hidden: true, title: '登陆' },
  },
  {
    name: 'certification',
    path: '/certification',
    component: () => import('@/views/certification/index.vue'),
    meta: { hidden: true, title: '选择身份' },
  },
  {
    name: 'storesCertification',
    path: '/storesCertification',
    component: () => import('@/views/certification/storesCertification.vue'),
    meta: { hidden: true, title: '提交认证' },
  },
  {
    name: 'govCertification',
    path: '/govCertification',
    component: () => import('@/views/certification/govCertification.vue'),
    meta: { hidden: true, title: '提交认证' },
  },
  {
    name: 'auditCertification',
    path: '/auditCertification',
    component: () => import('@/views/certification/auditCertification.vue'),
    meta: { hidden: true, title: '平台审核' },
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true, title: '404' }
  },
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
*/
export const asyncRoutes: RouteConfig[] = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/directive',
  //   meta: {
  //     title: 'permission',
  //     icon: 'lock',
  //     roles: ['merchants', 'county', 'township', 'village'], // 你可以在根导航中设置角色  县-乡-村-商户
  //     alwaysShow: true // 将总是显示根菜单
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import(/* webpackChunkName: "permission-page" */ '@/views/permission/page.vue'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'pagePermission',
  //         roles: ['admin'] // 或者只能在sub - nav中设置角色
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import(/* webpackChunkName: "permission-directive" */ '@/views/permission/directive.vue'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'directivePermission'
  //         //如果不设置角色，则表示:此页面不需要权限
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import(/* webpackChunkName: "permission-role" */ '@/views/permission/role.vue'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'rolePermission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },
  //政府
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: { hidden: false, title: '数据中心', icon: 'el-icon-data-line', roles: ['county', 'township', 'village'] },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/government/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard'
          , roles: ['county', 'township', 'village']
        }
      }
    ]
  },
  {
    path: '/views',
    component: Layout,
    redirect: '/views/matter',
    meta: { hidden: false, title: '内容管理', icon: 'el-icon-document', roles: ['county', 'township', 'village'] },
    children: [
      {
        path: 'matter',
        component: () => import('@/views/government/matter/index.vue'),
        meta: {
          title: '内容管理',
          roles: ['county', 'township', 'village']
        }
      },
      {
        path: 'addColumn',
        component: () => import('@/views/government/matter/addColumn.vue'),
        meta: {
          title: '新增栏目',
          roles: ['county', 'township', 'village']
        }
      },
      {
        path: 'addContent',
        component: () => import('@/views/government/matter/addContent.vue'),
        meta: {
          title: '新增内容',
          roles: ['county', 'township', 'village']
        }
      }
    ]
  },
  {
    path: '/carousel',
    component: Layout,
    redirect: '/carousel/setter',
    meta: { hidden: false, title: '轮播管理', icon: 'el-icon-picture-outline', roles: ['county', 'township', 'village'] },
    children: [
      {
        path: 'setter',
        component: () => import('@/views/government/carousel/index.vue'),
        meta: {
          title: '轮播管理',
          icon: 'form'
          , roles: ['county', 'township', 'village']
        }
      },
      {
        path: 'addCarousel',
        component: () => import('@/views/government/carousel/addCarousel.vue'),
        meta: {
          title: '新增轮播',
          icon: 'form'
          , roles: ['county', 'township', 'village']
        }
      },
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/list',
    meta: { hidden: false, title: '消息中心', icon: 'el-icon-chat-line-square', roles: ['county', 'township', 'village'] },
    children: [
      {
        path: 'list',
        component: () => import('@/views/government/message/index.vue'),
        meta: { title: '消息中心', roles: ['county', 'township', 'village'] }
      },
      {
        path: 'info',
        component: () => import('@/views/government/message/info.vue'),
        meta: { title: '消息详情', roles: ['county', 'township', 'village'] }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/info',
    meta: { hidden: false, title: '账号设置', icon: 'el-icon-set-up', roles: ['county', 'township', 'village'] },
    children: [
      {
        path: 'info',
        component: () => import('@/views/setting/index.vue'),
        meta: { title: '账号设置', roles: ['county', 'township', 'village'] }
      }
    ]
  },

  //商家后台
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    redirect: '/dashboard',
    meta: { hidden: false, title: '数据中心', icon: 'el-icon-data-line', roles: ['merchants'] },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/shop/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'dashboard', roles: ['merchants']
        }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    meta: { hidden: false, title: '商品管理', icon: 'el-icon-shopping-bag-1', roles: ['merchants'] },
    children: [
      {
        path: 'list',
        component: () => import('@/views/shop/goods/index.vue'),
        meta: { title: '商品管理', roles: ['merchants'] }
      },
      {
        path: 'add',
        component: () => import('@/views/shop/goods/addGoods.vue'),
        meta: { title: '商品发布', roles: ['merchants'] }
      },
    ]
  },
  {
    path: '/material',
    component: Layout,
    redirect: '/material/library',
    meta: { hidden: false, title: '素材库', icon: 'el-icon-picture-outline', roles: ['merchants'] },
    children: [
      {
        path: 'library',
        component: () => import('@/views/shop/material/index.vue'),
        meta: { title: '素材库', roles: ['merchants'] }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/ment',
    meta: { hidden: false, title: '订单管理', icon: 'el-icon-document', roles: ['merchants'] },
    children: [
      {
        path: 'ment',
        component: () => import('@/views/shop/order/index.vue'),
        meta: { title: '订单管理', roles: ['merchants'] }
      },
      {
        path: 'details',
        component: () => import('@/views/shop/order/details.vue'),
        meta: { title: '订单详情', roles: ['merchants'] }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/list',
    meta: { hidden: false, title: '消息中心', icon: 'el-icon-chat-line-square', roles: ['merchants'] },
    children: [
      {
        path: 'list',
        component: () => import('@/views/government/message/index.vue'),
        meta: { title: '消息中心', roles: ['merchants'] }
      },
      {
        path: 'info',
        component: () => import('@/views/government/message/info.vue'),
        meta: { title: '消息详情', roles: ['merchants'] }
      }
    ]
  },
  {
    path: '/wallet',
    component: Layout,
    redirect: '/wallet/info',
    meta: { hidden: false, title: '账户总览', icon: 'el-icon-set-up', roles: ['merchants'] },
    children: [
      {
        path: 'info',
        component: () => import('@/views/shop/wallet/index.vue'),
        meta: { title: '账户总览', roles: ['merchants'] }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/info',
    meta: { hidden: false, title: '账号设置', icon: 'el-icon-set-up', roles: ['merchants'] },
    children: [
      {
        path: 'info',
        component: () => import('@/views/setting/index.vue'),
        meta: { title: '账号设置', roles: ['merchants'] }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  },
]

const createRouter = () => new VueRouter({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
