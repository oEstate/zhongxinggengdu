import request from '@/utils/request'

export const getUserInfo = (data: any) =>
  request({
    url: '/permissions1',
    method: 'post',
    data
  })
// export const getUserInfo = (data: any) =>
//   request({
//     url: '/permissions2',
//     method: 'post',
//     data
//   })
export const login = (data: any) =>
  request({
    url: '/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/logout',
    method: 'post'
  })
