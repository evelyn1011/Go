import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import './assets/css/reset.css';
import './assets/css/iconfont.css';
import api from "./api";
import echarts from '@/plugins/echarts';
import Breadcrumb from '@/components/Breadcrumb';
import JsonExcel from 'vue-json-excel';
import '@/router/router-permission';

Vue.config.productionTip = false;

// 挂在网络请求非方法
Vue.prototype.$api = api;
Vue.use(echarts);

Vue.component('Breadcrumb',Breadcrumb)
Vue.component('downloadExcel',JsonExcel)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
