import request from '@/utils/request'

export const getUserInfo = (data: any) =>
  request({
    url: '/czManagerUserController/phoneLogin',
    method: 'post',
    data
  })
// export const getUserInfo = (data: any) =>
//   request({
//     url: '/permissions2',
//     method: 'post',
//     data
//   })


export const getUserRole = () =>
  request({
    url: '/czManagerUserController/getRole',
    method: 'get',
  })
// export const getUserRole = (params: any) =>
//   request({
//     url: '/zhengfu',
//     method: 'get',
// params
//   })
export const login = (data: any) =>
  request({
    url: '/czManagerUserController/phoneLogin',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/czManagerUserController/signOut',
    method: 'get'
  })
export const getUserPhoneCode = (params: any) =>
  request({
    url: '/verificationCode/getPhoneVerificationCode',
    method: 'get',
    params
  })