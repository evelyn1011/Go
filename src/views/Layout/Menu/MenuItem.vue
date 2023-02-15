<template>
  <div>
    <template v-for="(item, index) in menuList">
      <!-- 有下拉框 -->
      <el-submenu
        @click="changeRoute(item.name)"
        :index="item.name"
        v-if="item.children && item.children.length>0"
        :key="index"
        text-color="#fff"

      
      >
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </template>
        <el-menu-item-group>
          <MenuItem :menuList="item.children"></MenuItem>
          <!-- <el-menu-item index="/goods/list">产品列表</el-menu-item>
          <el-menu-item index="/goods/category">产品分类</el-menu-item>-->
        </el-menu-item-group>
      </el-submenu>
      <!-- 无下拉框 -->
      <el-menu-item @click="changeRoute(item.name)" :index="item.name" v-else v-show="item.meta.isShow" :key="index">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name:'MenuItem',

  props:['menuList','isCollapse'],
  components: {},

  methods: {
    changeRoute(name){
      this.$router.push({name})
    }
  },


};
</script>

<style>
 /*隐藏文字*/
  .el-menu--collapse  .el-submenu__title span{
    display: none;
  }
  /*隐藏 > */
  .el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
    display: none;
  }
.el-menu-item.is-active {
   background-color: #18192f !important;
}
</style>
