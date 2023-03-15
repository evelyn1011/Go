<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in navData" :key="item.path" :to="{path:item.path}">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {},
  created(){
    console.log(this.$route.matched);
    
  },
  computed: {
    navData(){
      let matched = this.$route.matched
      
      matched[0].path = '/'
      return matched;
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  padding: 10px;
  background: #fff;
}
</style>
