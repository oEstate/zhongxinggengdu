import request from '@/utils/request'
//订单列表
export const getOrderList = (data: any) =>
    request({
        url: '/orderController/getOrderList',
        method: 'post',
        data
    })
//商品列表查询
export const getRefunt = (data: any) =>
    request({
        url: '/orderController/getRefunt',
        method: 'post',
        data
    })
//评价中心
export const getcommentList = (data: any) =>
    request({
        url: '/orderController/getcommentList',
        method: 'post',
        data
    })
