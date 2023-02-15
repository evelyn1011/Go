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

export const menuRoute = [
  {
    path: '/goods',
    name: 'goods',
    component: GoodsManage,
    redirect: '/goods/list',
    meta: {
      title: '产品管理',
      icon: 'el-icon-goods',
      isShow: true

    },
    children: [
      {
        path: 'list',
        name: 'list',
        component: List,
        meta: {
          title: '产品列表',
          icon: 'el-icon-tickets',
          isShow: true


        }
      },
      {
        path: 'category',
        name: 'category',
        component: Category,
        meta: {
          title: '产品分类',
          icon: 'el-icon-files',
          isShow: true

        }
      },
      {
        path: 'addgoods',
        name: 'addgoods',
        component: AddGoods,
        meta: {
          active: "/goods/addgoods",
          title: '添加商品',
          icon: 'el-icon-folder-add',
          isShow: false
        }
      }
    ]
  }, {
    path: '/order',
    name: 'order',
    component: OrderManage,
    redirect: '/order/orderlist',
    meta: {
      title: '订单管理',
      icon: 'el-icon-s-order',
      isShow: true

    },
    children: [
      {
        path: 'orderlist',
        name: 'orderlist',
        component: OrderList,
        meta: {
          title: '订单列表',
          icon: 'el-icon-tickets',
          isShow: true

        }
      },
      {
        path: 'collect',
        name: 'collect',
        component: Collect,
        meta: {
          title: '汇总清单',
          icon: 'el-icon-folder-opened',
          isShow: true

        }
      },
      {
        path: 'auditing',
        name: 'auditing',
        component: Auditing,
        meta: {
          title: '订单审核',
          icon: 'el-icon-s-claim',
          isShow: true

        }
      }
    ]
  },
  {
    path: '/advert',
    name: 'advert',
    component: Advert,
    meta: {
      title: '广告分类',
      icon: 'el-icon-data-board',
      isShow: true

    },
    redirect: '/advert/advertlist',
    children: [
      {
        path: 'advertlist',
        name: 'advertlist',
        component: AdvertList,
        meta: {
          title: '广告列表',
          icon: 'el-icon-tickets',
          isShow: true

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
      title: '系统管理',
      icon: 'el-icon-s-help',
      isShow: true

    },
    children: [
      {
        path: 'roles',
        name: 'roles',
        component: Roles,
        meta: {
          title: '角色管理',
          icon: 'el-icon-user-solid',
          isShow: true

        }
      }, {
        path: 'department',
        name: 'department',
        component: Department,
        meta: {
          title: '部门管理',
          icon: 'el-icon-s-grid',
          isShow: true

        }
      }
    ]
  }]