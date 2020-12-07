import request from '@/utils/request'
//查询素材库
export const selectCzMaterialLibrary = (data: any) =>
    request({
        url: '/photoController/selectCzMaterialLibrary',
        method: 'post',
        data
    })
//新增素材库
export const addCzMaterialLibraryClassification = (data: any) =>
    request({
        url: '/photoController/addCzMaterialLibraryClassification',
        method: 'post',
        data
    })
//编辑素材库
export const upCzMaterialLibraryClassification = (data: any) =>
    request({
        url: '/photoController/upCzMaterialLibraryClassification',
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