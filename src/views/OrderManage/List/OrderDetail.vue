<template>
  <div>
    <el-dialog title="订单详情" :visible.sync="isShow" width="70%" @close="close()">
      <!-- 显示数据 -->
      <el-descriptions>
        <el-descriptions-item label="编码">{{ Info.code }}</el-descriptions-item>
        <el-descriptions-item label="审核人">{{ Info.shenhename}}</el-descriptions-item>
        <el-descriptions-item label="是否通过">{{ Info.pass?'是':'否' }}</el-descriptions-item>
        <el-descriptions-item label="添加时间">{{ Info.created }}</el-descriptions-item>
        <el-descriptions-item label="预定时间">{{ Info.yudingTime }}</el-descriptions-item>
        <el-descriptions-item label="通过时间">{{ Info.time }}</el-descriptions-item>
      </el-descriptions>
      <hr>
      <!-- 展示表格 -->
      <el-table :data="Info.list">
        <el-table-column property="guige" label="规格" width="150"></el-table-column>
        <el-table-column property="title" label="名字"></el-table-column>
        <el-table-column property="price" label="单价"></el-table-column>
        <el-table-column property="num" label="数量" width="200"></el-table-column>
        <el-table-column property="sum" label="总和"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow:false
    };
  },
  props:['Info', 'Visible'],

  components: {},

  methods: {
    close(){   
      this.$emit('changeShow')
      
    }
  },

  watch:{
    Visible(){
      this.isShow = !this.isShow;  
    }
  },


};
</script>

<style scoped>
</style>
