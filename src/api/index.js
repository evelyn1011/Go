import base from './base';
import axios from '@/request/request';
import myaxios from 'axios'

const api = {

  getHomeCount() {
    return axios.get(base.homeCount)
  },
  // 图表信息
  getFormat() {
    return axios.get(base.homeFormat)
  },
  // 获取订单信息
  getOrderInfo() {
    return axios.get(base.orderInfo)
  },
  // 订单列表
  getGoodsList(params) {
    return axios.get(base.goodsList, { params })
  },
  // 商品搜索
  goodsSearch(params) {
    return axios.get(base.goodsSearch, { params })
  },
  // 单个商品删除
  goodsDelete(params) {
    return axios.get(base.goodsDelete, { params })
  },
  // 商品类目
  getItemCategory(params) {
    return axios.get(base.goodsItemCategory, { params })
  },
  // 添加商品
  goodsInsert(params) {
    return axios.get(base.goodsInsert, { params })
  },
  // 修改商品
  updateGoods(params) {
    return axios.get(base.updateGoods, { params })
  },
  // 上传图片
  batchUpload(params) {
    return myaxios.post(base.batchUpload, params)
  },
  // 批量删除
  batchDelete(params) {
    return axios.get(base.batchDelete, { params })
  },
  // 所有分类
  itemCategory() {
    return axios.get(base.itemCategory)
  },
  // 一级类目插入
  insertCategory(params){
    return axios.get(base.insertCategory,{params})
  },
  // 类目管理 修改导航类目
  updateCategory(params){
    return axios.get(base.updateCategory,{params})
  },
  // 删除导航
  deleteContent(params){
    return axios.get(base.deleteContent,{params})
  },
  // 增加子导航
  insertItemCategor(params){
    return axios.get(base.insertItemCategor,{params})
  },

  // 登录
  login(params){
    return axios.post(base.login, params)
  },
  // 权限
  permission(params){
    return axios.get(base.permission, {params})
  }
}
export function permission(params){
  return axios.get(base.permission, {params})
};

export default api;