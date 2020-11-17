import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Enable this if you need.

  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'index',
      path: '/index',
      component: () => import('@/views/login/index.vue'),
      meta: { roles: ['admin', 'editor'], hidden: true, title: '首页' },
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/login.vue'),
      meta: { roles: ['admin', 'editor'], hidden: true, title: '登陆' },
    },
    {
      name: 'certification',
      path: '/certification',
      component: () => import('@/views/certification/index.vue'),
      meta: { roles: ['admin', 'editor'], hidden: true, title: '选择身份' },
    },
    {
      name: 'storesCertification',
      path: '/storesCertification',
      component: () => import('@/views/certification/storesCertification.vue'),
      meta: { roles: ['admin', 'editor'], hidden: true, title: '提交认证' },
    },
    {
      name: 'govCertification',
      path: '/govCertification',
      component: () => import('@/views/certification/govCertification.vue'),
      meta: { roles: ['admin', 'editor'], hidden: true, title: '提交认证' },
    },
    {
      name: 'auditCertification',
      path: '/auditCertification',
      component: () => import('@/views/certification/auditCertification.vue'),
      meta: { roles: ['admin', 'editor'], hidden: true, title: '平台审核' },
    },

    {
      name: '404',
      path: '/404',
      component: () => import('@/views/404.vue'),
      meta: { roles: ['admin', 'editor'], hidden: true, title: '404' }
    },
    {
      path: '/',
      name: 'dashboard',
      component: Layout,
      redirect: '/dashboard',
      meta: { hidden: false, title: '数据中心',icon: 'el-icon-data-line' },
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/government/dashboard/index.vue'),
          meta: {
            title: '首页',
            icon: 'dashboard'
          }
        }
      ]
    },
    {
      path: '/views',
      component: Layout,
      redirect: '/views/matter',
      meta: { hidden: false, title: '内容管理',icon: 'el-icon-document' },
      children: [
        {
          path: 'matter',
          component: () => import('@/views/government/matter/index.vue'),
          meta: {
            title: '内容管理',
          }
        },
        {
          path: 'addColumn',
          component: () => import('@/views/government/matter/addColumn.vue'),
          meta: {
            title: '新增栏目',
          }
        },
        {
          path: 'addContent',
          component: () => import('@/views/government/matter/addContent.vue'),
          meta: {
            title: '新增内容',
          }
        }
      ]
    },
    {
      path: '/carousel',
      component: Layout,
      redirect: '/carousel/setter',
      meta: { hidden: false, title: '轮播管理',icon: 'el-icon-picture-outline'},
      children: [
        {
          path: 'setter',
          component: () => import('@/views/government/carousel/index.vue'),
          meta: {
            title: '轮播管理',
            icon: 'form'
          }
        },
        {
          path: 'addCarousel',
          component: () => import('@/views/government/carousel/addCarousel.vue'),
          meta: {
            title: '新增轮播',
            icon: 'form'
          }
        },
      ]
    },
    {
      path: '/message',
      component: Layout,
      redirect: '/message/list',
      meta: { hidden: false, title: '消息中心',icon: 'el-icon-chat-line-square' },
      children: [
        {
          path: 'list',
          component: () => import('@/views/government/message/index.vue'),
          meta: { title: '消息中心' }
        }
      ]
    },
    {
      path: '/setting',
      component: Layout,
      redirect: '/setting/info',
      meta: { hidden: false, title: '账号设置',icon: 'el-icon-set-up' },
      children: [
        {
          path: 'info',
          component: () => import('@/views/setting/index.vue'),
          meta: { title: '账号设置' }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
})
