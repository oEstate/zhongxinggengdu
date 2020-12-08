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
//上传图片
export const addPhotos = (params: any) =>
    request({
        url: '/photoController/addPhotos',
        method: 'get',
        params
    })
//删除素材库图片
export const delPhotos = (data: any) =>
    request({
        url: '/photoController/delPhotos',
        method: 'post',
        data
    })
//查询素材库图片
export const selectCzMaterialLibraryClassification = (data: any) =>
    request({
        url: '/photoController/selectCzMaterialLibraryClassification',
        method: 'post',
        data
    })

//上传素材库图片
export const upPhotos = (data: any) =>
    request({
        url: '/photoController/upPhotos',
        method: 'post',
        data
    })

//上传图片


export const searchPhoto = (data: any) =>
    request({
        url: '/photoController/searchPhoto',
        method: 'post',
        data
    })