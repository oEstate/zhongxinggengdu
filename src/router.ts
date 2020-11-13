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
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
      meta: { roles: ['admin', 'editor'], hidden: true, title: '404' }
    },
    {
      path: '/',
      name: 'dashboard',
      component: Layout,
      redirect: '/dashboard',
      meta: { hidden: false, title: '数据中心' },
      children: [
        {
          path: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
          meta: {
            title: '首页',
            icon: 'dashboard'
          }
        }
      ]
    },
    {
      path: '/example',
      component: Layout,
      redirect: '/example/tree',
      meta: { hidden: false, title: '内容管理'},
      children: [
        {
          path: 'tree',
          component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
          meta: {
            title: 'Tree',
            icon: 'tree', 
          }
        }
      ]
    },
    {
      path: '/form',
      component: Layout,
      meta: { hidden: false, title: '轮播管理'},
      children: [
        {
          path: 'index',
          component: () => import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
          meta: {
            title: 'Form',
            icon: 'form'
          }
        }
      ]
    },
    {
      path: '/nested',
      component: Layout,
      redirect: '/nested/menu1',
      meta: { hidden: false, title: '消息中心' },
      children: [
        {
          path: 'menu2',
          component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
          meta: { title: 'Menu2' }
        }
      ]
    },
    {
      path: 'external-link',
      component: Layout,
      meta: { hidden: false, title: '账号设置'},
      children: [
        {
          path: 'https://github.com/Armour/vue-typescript-admin-template',
          meta: {
            title: 'External Link',
            icon: 'link'
          }
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