const base = {
  host:'http://localhost:8089', //顶部统计
  homeCount:'/api/home/dataCount',  //折线数据
  homeFormat:'/api/home/format',  //今日数据
  // 订单
  orderInfo:'/api/home/orderinfo',
  goodsList:'/api/goods/projectList',
  goodsSearch:'/api/goods/search',
  goodsDelete:'/api/goods/deleteItemById',
  goodsItemCategory:'/api/goods/itemCategory/selectItemCategoryByParentId',
  goodsInsert:'/api/goods/item/insertTbItem',
  updateGoods:'/api/goods/item/updateTbItem',
  batchUpload:'/api/batchUpload',
  batchDelete:'/api/goods/batchDelete',
  itemCategory:'/api/itemCategory',
  insertCategory:'/api/itemCategory/insertCategory',
  updateCategory:'/api/itemCategory/updateCategory',
  deleteContent:'/api/content/deleteContentCategoryById',
  insertItemCategor:'/api/itemCategory/insertItemCategory',
  login:'/api/login',
  permission:'/api/permission',

}


export const host='http://localhost:8089';
export const upload='/api/upload'

export default base