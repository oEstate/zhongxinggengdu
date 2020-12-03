import request from '@/utils/request'

export const getCity = (params: any) =>
  request({
    url: '/areaController/getAreaByPcode',
    method: 'get',
    params
  })
  export const getClassify = (params: any) =>
  request({
    url: '/czCategoryController/getCategoryByPcode',
    method: 'get',
    params
  })