<template>
  <div class="container">
    <Breadcrumb></Breadcrumb>
    <!-- 表单 -->
    <div class="but">
      <el-form
        size="mini"
        label-position="right"
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item label="审批人">
          <el-input v-model="operator" placeholder="审批人"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table size="small" :data="tableData" style="width: 100%" max-height="350">
      <el-table-column fixed prop="orderNum" label="汇总单号" width="150"></el-table-column>
      <el-table-column prop="operator" label="汇总人" width="120"></el-table-column>
      <el-table-column prop="phone" label="联系方式" width="120"></el-table-column>
      <el-table-column prop="time" label="汇总时间">
        <template slot-scope="scope">
          <span>{{ dayjs(scope.row.time).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="汇总单价"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row)" type="text" size="small">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页组件 -->
    <Pagination :pagesize="pagesize" :total="total" @handleCurrentChange="handleCurrentChange"></Pagination>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { collect, cancel, getSearch } from '@/api/order' ;
import Pagination from '@/components/Pagination';

export default {
  data() {
    return { 
      // 表单
      operator: '',
      
      // 表格
      tableData: [],
      pagesize:10,
      total:0,
      curPage:1,
      // 搜索状态
      status:false,
    };
  },

  components: {
    Pagination
  },

  methods: {
    dayjs,
    // 提交表单
    onSubmit() {
      // console.log('submit');
      this.search(this.operator)

    },
    // 搜索
    async search(operator, page){
      this.status = true;
      let res = await getSearch({operator, page});
      // console.log(res,'搜索结果');
      if(res.data.status === 200){
        this.tableData = res.data.result;
        this.total = res.data.total;
        this.pagesize = res.data.pagesize;
        
      } else {
        this.tableData = [];
        this.total = 0;
      }
      
    },
    // 获取表单
    async getCollect(page){
      let res = await collect({page});
      if(res.data.status == 200){
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pagesize = res.data.pageSize;
      }
      console.log(res);
      
    },
    // 页码按钮
    handleCurrentChange(page){
      // this.curPage = val;
      if(this.status){
        // 搜索状态
        this.search(this.operator, page)
      } else {
        // 非搜索状态
        this.getCollect(page);
      }
    },
    // 撤销按钮
    async getCancel(id){
      let res = await cancel({id})
      // console.log(res,'撤销结果');
      if(res.data.status == 200) {
        this.$message({
          type:'success',
          message:'撤销成功'
        })
      }
      
    },
    // 撤销按钮
    deleteRow(row) {
      
      // console.log(row);
      this.$confirm('确定撤销该项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getCancel(row.id);
          this.getCollect();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      

      
    }
  },

  watch:{
    operator(val){
      if(val === ''){
        this.status = false;
        this.getCollect();
      } else {
        this.status = true;
      }
    }
  },

  created(){
    this.getCollect()
  }
};
</script>

<style scoped>
.container {
  margin: 5px;
  background: #fff;
  padding: 5px;
}

.but {
  padding: 10px;
  border: 1px solid #eee;
}
</style>
