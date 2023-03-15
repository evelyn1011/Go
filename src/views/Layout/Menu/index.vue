<template>
  <div>
    <el-menu
      :default-active="activeMane()"
      class="el-menu-vertical-demo" 
      router
      background-color="#2a2b4c"
      text-color="#fff"
      :collapse="isCollapse"

    >
    <menu-item :menuList="menuList" :isCollapse="isCollapse"></menu-item>
    
    </el-menu>
  </div>
</template>

<script>
import MenuItem from './MenuItem'
import { mapState } from 'vuex';
export default {
  data() {
    return {
      
    };
  },

  components: {
    MenuItem
  },

  methods: {
    activeMane() {
      // console.log(this.$route,'this.$route  -----')
      let route = this.$route
      let {meta, name} = route;
      if(meta.active) {
        return meta.active
      }
      return name;
    }
  },

  computed:{
    ...mapState('menu',['menuList'])
  },
  props:['isCollapse'],

  created(){
    console.log('菜单列表',this.menuList);
    
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border-right: 0;
}

.el-menu-item.is-active {
   background-color: #375a7b !important;
}
</style>
