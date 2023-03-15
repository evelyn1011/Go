import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/Layout'
import Login from '@/views/Login';
import Home from '@/views/Home';
// 产品管理
import GoodsManage from '@/views/GoodsManage';
import List from '@/views/GoodsManage/List';
import Category from '@/views/GoodsManage/Category';
import AddGoods from '@/views/GoodsManage/List/AddGoods';
// 订单管理
import OrderManage from '@/views/OrderManage';
import OrderList from '@/views/OrderManage/List';
import Collect from '@/views/OrderManage/Collect';
import Auditing from '@/views/OrderManage/Auditing';
// 广告分类
import Advert from '@/views/Advert';
import AdvertList from '@/views/Advert/List';
// 系统管理
import SysManage from '@/views/SysManage';
import Roles from '@/views/SysManage/Roles';
import Department from '@/views/SysManage/Department';
// 配置路由跳转
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(err => { })
};

Vue.use(VueRouter);

const menuRoute = [
  {
    path: '/goods',
    name: 'goods',
    component: GoodsManage,
    redirect: '/goods/list',
    meta: {
      title: '产品管理',
      icon: 'el-icon-goods'
    },
    children: [
      {
        path: 'list',
        name: 'list',
        component: List,
        meta: {
          title: '产品列表',
          icon: 'el-icon-tickets'
        }
      },
      {
        path: 'category',
        name: 'category',
        component: Category,
        meta: {
          title: '产品分类',
          icon: 'el-icon-files'

        }
      },
      {
        path: 'addgoods',
        name: 'addgoods',
        component: AddGoods,
        meta: {
          active: "/goods/addgoods",
          title: '添加商品',
          icon: 'el-icon-folder-add'
        }
      }
    ]
  }, {
    path: '/order',
    name: 'order',
    component: OrderManage,
    redirect: '/order/orderlist',
    meta: {
      title: '订单管理'
    },
    children: [
      {
        path: 'orderlist',
        name: 'orderlist',
        component: OrderList,
        meta: {
          title: '订单列表'
        }
      },
      {
        path: 'collect',
        name: 'collect',
        component: Collect,
        meta: {
          title: '汇总清单'
        }
      },
      {
        path: 'auditing',
        name: 'auditing',
        component: Auditing,
        meta: {
          title: '订单审核'
        }
      }
    ]
  },
  {
    path: '/advert',
    name: 'advert',
    component: Advert,
    meta: {
      title: '广告管理'
    },
    redirect: '/advert/advertlist',
    children: [
      {
        path: 'advertlist',
        name: 'advertlist',
        component: AdvertList,
        meta: {
          title: '广告列表'
        }
      }
    ]
  },
  {
    path: '/sysmanage',
    name: 'SysManage',
    component: SysManage,
    redirect: '/sysmanage/roles',
    meta: {
      title: '系统管理'
    },
    children: [
      {
        path: 'roles',
        name: 'roles',
        component: Roles,
        meta: {
          title: '角色管理'
        }
      }, {
        path: 'department',
        name: 'department',
        component: Department,
        meta: {
          title: '部门管理'
        }
      }
    ]
  }]

export const baseRoute = [
  {
    path: "/",
    component: Layout,
    meta: {
      title: '首页',
      isLogin: true,
      isShow: true
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
          isShow: true

        }
      }
    ]
  },
]

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  routes,
});

export default router;
