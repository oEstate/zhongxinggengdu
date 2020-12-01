import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/index', '/certification', '/storesCertification', '/govCertification', '/auditCertification']

router.beforeEach(async(to: Route, _: Route, next: any) => {
  // if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === 'index') {
  //   //path:不兼容组件所在路由
  //   alert('组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看, 浏览器不兼容通知')
  // } else {
  //   next();
  // }

  // Sart progress bar
  NProgress.start()
  // console.log(UserModule.token)
  // console.log(to.path)
  // 确定用户是否已经登录并且 是否已经认证
  if (UserModule.token) {
    if (to.path === '/login') {
      // 已经认证
      // 如果已登录并且已经认证，则重定向到主页
      next({ path: '/' })
      // 没有认证从定向到认证页
      NProgress.done()
    } else {
      // 检查用户是否已获得其权限角色
      if (UserModule.roles.length === 0) {
        try {
          // 获取用户信息，包括角色
          await UserModule.GetUserInfo()
          // 设置replace: true，这样导航将不会留下历史记录
          // 根据角色生成可访问路线图
          await PermissionModule.GetMenus()
          // 动态添加可访问路由
          console.log(PermissionModule.dynamicRoutes)
          router.addRoutes(PermissionModule.dynamicRoutes)
          next({ ...to, replace: true })
        } catch (err) {
          // 删除令牌并重定向到登录页面
          UserModule.ResetToken()
          Message.error(err || 'Has Error')
          next(`/index?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // 没有令牌token
    // console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接访问
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面。
      next('/index')
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done()

  // set page title
  document.title = to.meta.title
})
