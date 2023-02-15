<template>
  <div class="pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
     currentPage: 1,
    };
  },
  props:{
    pagesize:{
      type:Number,
      default:10
    },
    total:{
      type:Number,
      default:100
    }
  },

  components: {},

  methods: {
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange',val)
    }
  },


};
</script>

<style scoped>
.pagination {
  background: #fff;
}
</style>
