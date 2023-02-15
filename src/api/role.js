import axios from '@/request/request';

export const roletRoute = {
  list:"/api/role/list",
  listDelete:"/api/role/list/delete",
  listSearch:"/api/role/list/search",
  updateItem:"/api/role/list/updateItem",
}

function roleList(params){
  return axios.get(roletRoute.list, {params});
}

function listDelete(params){
  return axios.delete(roletRoute.listDelete,{params})
}

function listSearch(params){
  return axios.get(roletRoute.listSearch,{params})
}

function updateItem(params){
  return axios.put(roletRoute.updateItem,{params})
}

export {
  roleList,
  listDelete,
  listSearch,
  updateItem,
}