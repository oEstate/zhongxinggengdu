import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/index']

router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start()
  console.log(UserModule.token)
  console.log(to.path)
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
    console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接访问
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/index`)
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
