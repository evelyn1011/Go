<template>
  <div class="container">
    <Breadcrumb></Breadcrumb>

    <!-- 按钮 -->
    <div class="but">
      <el-button size="small" type="warning" @click="cllect">订单汇总</el-button>
      <download-excel
        class="export-excel-wrapper"
        :data="exportFrom"
        :fields="json_fields"
        :header="exportTitle"
        :name="excelName"
        style="display:inline-block; margin-left:10px"
      >
        <el-button :inline="true" size="small" type="warning" @click="exportData">导出</el-button>
      </download-excel>
    </div>
    <!-- 数据表格 -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="tableData"
      border
      style="width: 100%"
      height="350"
    >
      <el-table-column type="selection" width="55" :selectable="selectTable" align="center"></el-table-column>
      <el-table-column sortable prop="code" label="编号" width="180"  align="center">
        <template slot-scope="scope" @click="toDetail">
          
        <el-link :underline="false" @click="toDetail(scope.row.id)">

          <span>{{ scope.row.code }}</span>
        </el-link>

        </template>
      </el-table-column>
      <el-table-column prop="ordername" label="订单名" width="100"  align="center"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"  align="center"></el-table-column>
      <el-table-column prop="yudingTime" label="预定时间" width="180"  align="center">
        <template slot-scope="scope">
          <span>{{ dayjs(scope.row.yudingTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话"  align="center"></el-table-column>
      <el-table-column prop="company" label="公司"  align="center"></el-table-column>
      <el-table-column prop="huizongStatus" label="汇总状态"  align="center">
        <template slot-scope="scope">
          <span  style="color:red" v-if="scope.row.huizongStatus == 1">未汇总</span>
          <span  style="color:#4dd569" v-else>已汇总</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页组件 -->
    <Pagination :pagesize="pagesize" :total="total" @handleCurrentChange="handleCurrentChange"></Pagination>
    <order-detail :Visible="Visible" :Info="Info" @changeShow="changeShow"></order-detail>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Pagination from '@/components/Pagination';
import { orderlist, changeStatus, orderDetail } from '@/api/order';
import OrderDetail from './OrderDetail';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      tableData: [],
      pagesize:10,
      total:0,
      multipleSelection:[],
      selectedId:[],

      Info:{},
      Visible:false,

      exportFrom:[],
      json_fields:{
        "编号":'code',
        "订单名":'ordername',
        "价格":'price',
        "预定时间":'yudingTime',
        "订单名":'ordername', 
        "联系电话":'phone',
        "公司":'company',
        "汇总状态":'huizongStatus',
      },//表头
      excelName:'汇总清单.xls',
      exportTitle:"汇总列表"
    };
  },

  components: {
    Pagination,
    OrderDetail,
  },

  methods: {
    dayjs,
    // 选框返回数组
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val,'selectchange');
      let arr = [];
      this.multipleSelection.forEach(ele => {
        arr.push(ele.id)
      });
      this.selectedId = arr;     
       
    },
    // 页码按钮
    handleCurrentChange(page){
      this.getOrderlist(page);
    },
    // 获取列表
    async getOrderlist(page) {
      
      let res = await orderlist({page});
      if(res.status == 200 ){
        // console.log('获取成功',res);
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.pageSize = res.data.pagesize;
        
      }
    },
    // 设置可选项
    selectTable(row,index){
      // console.log(row,index,'勾选框');
      if(row.huizongStatus == 1){
        return true
      }
      return false
    },
    // 汇总按钮
    cllect(){
      if (this.multipleSelection.length < 2){
        this.$message({
          type:'warning',
          message:'至少选中两条数据'
        });
        this.setChangeStatus()
      } else {
        this.$confirm('确认将已选内容汇总?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          let id = this.selectedId.join(',')
          let operator = this.userInfo.user;
          this.setChangeStatus(id,operator);
          this.getOrderlist();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消汇总'
          });          
        });
      }
    },
    // 获取状态
    async setChangeStatus(ids,operator){
      let res = await changeStatus({ids,operator})
      console.log(res,'修改状态');
      if(res.data.status ==200){
        this.$message({
          type: 'ssuccess',
          message: '操作成功！'
        })
      } else {
        this.$message({
          type: 'error',
          message: '操作失败！'
        })
      }
      
    },
    // 获取详情页信息
    async getOrderDetail(id){
      let res = await orderDetail({id})
      if(res.data.status == 200 ){
        console.log(res.data.result,'点击获取数据');
        this.Info = res.data.result;
      }
      
    },
    // 转到详情
    toDetail(id){
      this.getOrderDetail(id);
      this.Visible = true;
      
      
    },
    changeShow(){
      this.Visible = false;
    },

    // 导出数据
    exportData(){
      let arr = this.tableData;
      arr.forEach(ele =>{
        ele.yudingTime = dayjs(ele.yudingTime).format('YYYY-MM-DD HH:mm:ss');
        ele.huizongStatus = ele.huizongStatus == 1? "未汇总" :"已汇总"

      })
      this.exportFrom = arr;
    }


    



          
  },
  computed:{
    ...mapState('login',['userInfo'])
  },
  

  created(){
    this.getOrderlist();
    
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
