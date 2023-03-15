<template>
  <div>
         <!-- 首页 -->
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 产品管理 -->
      <el-submenu index="/goods">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goods/list">产品列表</el-menu-item>
          <el-menu-item index="/goods/category">产品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 订单管理 -->
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/orderlist">订单列表</el-menu-item>
          <el-menu-item index="/order/collect">汇总清单</el-menu-item>
          <el-menu-item index="/order/auditing">订单审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 广告管理 -->
      <el-submenu index="/advert">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advert/advertlist">广告列表</el-menu-item>
          <el-menu-item index="/advert/advertcategory">分类管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 系统管理 -->
      <el-submenu index="/sysmanage">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sysmanage/roles">角色管理</el-menu-item>
          <el-menu-item index="/sysmanage/department">部门管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {},
};
</script>

<style scoped></style>
