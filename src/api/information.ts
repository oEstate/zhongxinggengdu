import request from '@/utils/request'
//栏目的增
export const addColumn = (data: any) =>
    request({
        url: '/contentController/addColumn',
        method: 'post',
        data
    })
//内容模块的增
export const addContent = (data: any) =>
    request({
        url: '/contentController/addContent',
        method: 'post',
        data
    })
//栏目的删
export const delColumn = (data: any) =>
    request({
        url: '/contentController/delColumn',
        method: 'post',
        data
    })
//内容模块的删
export const delContent = (data: any) =>
    request({
        url: '/contentController/delContent',
        method: 'post',
        data
    })
//栏目的查
export const queryColumn = (data: any) =>
    request({
        url: '/contentController/queryColumn',
        method: 'post',
        data
    })
//内容模块的增删改查
export const queryContent = (data: any) =>
    request({
        url: '/contentController/queryContent',
        method: 'post',
        data
    })
//栏目的改
export const upColumn = (data: any) =>
    request({
        url: '/contentController/upColumn',
        method: 'post',
        data
    })
//内容模块的改
export const upContent = (data: any) =>
    request({
        url: '/contentController/upContent',
        method: 'post',
        data
    })