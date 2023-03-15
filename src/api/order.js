import axios from '@/request/request';

export const orderRoute = {
  orderlist:'/api/order/list',
  changeStatus:'/api/order/changeStatus',
  orderDetail:'api/order/list/detail',
  collect:'/api/order/collect',
  cancel:'/api/order/cancel',
  search:'/api/order/search',
};


function orderlist(params){
  return axios.get(orderRoute.orderlist, {params})
}

function changeStatus(params) {
  return axios.get(orderRoute.changeStatus, {params})
}

function orderDetail(params) {
  return axios.get(orderRoute.orderDetail, {params})
}

function collect(params){
  return axios.get(orderRoute.collect, {params})
}

function cancel(params){
  return axios.get(orderRoute.cancel, {params})
}

function getSearch(params){
  return axios.get(orderRoute.search, {params})
}

export {
  orderlist,
  changeStatus,
  orderDetail,
  collect,
  cancel,
  getSearch
}