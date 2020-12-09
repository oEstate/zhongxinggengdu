import request from '@/utils/request'
//商品发布
export const goodsPush = (data: any) =>
    request({
        url: '/goodsController/goodsPush',
        method: 'post',
        data
    })
//商品列表查询
export const getGoodsList = (data: any) =>
    request({
        url: '/goodsController/getGoodsList',
        method: 'post',
        data
    })
//上下架
export const batchLoadingAndUnloading = (data: any) =>
    request({
        url: '/goodsController/batchLoadingAndUnloading',
        method: 'post',
        data
    })
//获取商品详情
export const getGoodsById = (data: any) =>
    request({
        url: '/goodsController/getGoodsById',
        method: 'post',
        data
    })
//商品编辑发布
export const upGoodsById = (data: any) =>
    request({
        url: '/goodsController/upGoodsById',
        method: 'post',
        data
    })
