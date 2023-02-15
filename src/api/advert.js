import axios from '@/request/request';

export const advertRoute = {
  // 导航
  selectCategory:'/api/advert/content/selectContentCategoryByParentId',
  // 增加子导航
  insertCategory:'/api/advert/content/insertContentCategory',
  // 修改子导航
  updateCategory:'/api/advert/content/updateContentCategory',
  // 删除子导航
  deleteCategory:"/api/advert/content/deleteContentCategoryById",

  // 内容增加
  insertTbContent:"/api/advert/content/insertTbContent",
  // 内容删除
  deleteContent:"/api/advert/content/deleteContentByIds",
  // 内容查询
  selectTbContentAll:"/api/advert/content/selectTbContentAllByCategoryId"

}

function selectCategory(params){
  return axios.get(advertRoute.selectCategory, {params})
}
function insertCategory(params){
  return axios.get(advertRoute.insertCategory, {params})
}
function updateCategory(params){
  return axios.get(advertRoute.updateCategory, {params})
}
function deleteCategory(params){
  return axios.get(advertRoute.deleteCategory, {params})
}
function insertTbContent(params){
  return axios.get(advertRoute.insertTbContent, {params})
}
function deleteContent(params){
  return axios.get(advertRoute.deleteContent, {params})
}
function selectTbContentAll(params){
  return axios.get(advertRoute.selectTbContentAll, {params})
}


export {
  selectCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  insertTbContent,
  deleteContent,
  selectTbContentAll,
  
}
