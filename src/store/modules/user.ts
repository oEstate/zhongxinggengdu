import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken, setUserType, removeUserType } from '@/utils/cookies'
import { PermissionModule } from '@/store/modules/permission'
import store from '@/store'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  userType: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public userType = ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(role: string[]) {
    this.roles = role
  }

  @Mutation
  private SET_USERTYPE(userType: any) {
    this.userType = userType
  }

  @Action({ rawError: true })
  public async Login(userInfo: { phone: string, verificode: string }) {
    let { phone, verificode } = userInfo
    phone = phone.trim()
    const { data } = await login({ phone, verificode })

    this.SET_NAME(data.userName)
    this.SET_AVATAR(data.userHeadUrl)
    this.SET_INTRODUCTION(data.verificode)
    this.SET_USERTYPE(data.role)
    this.SET_TOKEN(data.token)
    setUserType(data.role)
    setToken(data.token)
  }

  @Action
  public ResetToken() {
    removeToken()
    removeUserType()
    this.SET_TOKEN('')
    // this.SET_ROLES([])
    this.SET_USERTYPE('')
    PermissionModule.REMOVE_ROUTES()
  }

  @Action({ rawError: true })
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo({})
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { roles, name, avatar, introduction, id } = data.user
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(roles)
    this.SET_NAME(name)
    this.SET_AVATAR(avatar)
    this.SET_INTRODUCTION(introduction)
    this.SET_USERTYPE(id)
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('退出: token 不存在!')
    }
    await logout()
    removeToken()
    removeUserType()
    this.SET_TOKEN('')
    this.SET_USERTYPE('')
    PermissionModule.REMOVE_ROUTES()
    // this.SET_ROLES([])
    location.reload()
  }
}

export const UserModule = getModule(User)
