<template>
  <div>
    <div class="container">
      <!--  -->
      <div class="bar">
        <Breadcrumb></Breadcrumb>
      </div>

      <!-- table -->
      <div class="content">
        <div class="btn">
          <el-button type="danger" size="small" plain @click="del">
            删除
            <i class="el-icon-delete"></i>
          </el-button>
          <el-input v-model="search" size="small" placeholder="请输入内容" @change="searchName"></el-input>
        </div>

        <el-table
          @selection-change="handleSelectionChange"
          :data="tableData"
          border
          style="width: 100%"
          height="380"
          size="small"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column sortable prop="id" label="ID" width="70" align="center"></el-table-column>
          <el-table-column prop="username" label="姓名" width="120" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="apartment" label="部门" width="70" align="center"></el-table-column>
          <el-table-column prop="create_time" label="创建时间" align="center">
            <template
              slot-scope="scope"
            >{{ dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss')}}</template>
          </el-table-column>
          <el-table-column sortable prop="status" label="状态" width="80" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status" style="color:#4dd569">启用</span>
              <span v-else style="color:red">停用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="130">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :pagesize="pagesize" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>

        <!-- 编辑窗口 -->
        <edit-form
          :Visible="Visible"
          :ruleForm="ruleForm"
          @submitForm="submitForm"
          @isShow="isShow"
        ></edit-form>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import EditForm from './EditForm';
import { roleList, listDelete, listSearch, updateItem } from '@/api/role';
import dayjs from 'dayjs'
export default {
  data() {
    return {
      tableData:[],
      search:'',

      pagesize:0,
      total:0,
      curPage:1,

      multipleSelection:[],
      status:0,

      ruleForm:{},
      Visible:false,

  

    };
  },

  components: {
    Pagination,
    EditForm
  },

  methods: {
    dayjs,
 
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.ruleForm = structuredClone(row);
      this.ruleForm.status =  this.ruleForm.status? true: false;
      this.Visible = true;
      
   
    },
    // 提交
    submitForm(){
      this.ruleForm.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
      this.updateItemInfo(this.ruleForm)

    },
    // 窗口可视
    isShow(){
      if(this.status) {
        this.getListSearch(this.search,this.curPage)
      } else {

        this.getRoleList(this.curPage)
      }
      this.Visible = false;
    },
    // 翻页
    handleCurrentChange(val){
      if(this.status){
        // 1 搜索状态
        this.getListSearch(this.search, val);
        
      } else {
        // 2 非搜索
        // console.log(val);
        this.curPage = val;
        // this.tableData = this.tableAll.slice(this.pagesize*(val-1), this.pagesize*val)
        this.getRoleList(val);

      }

    },
    // 请求update
    async updateItemInfo(form){
      let res = await updateItem(form);
      if(res.data.status === 200){
        // 修改成功 
        this.$message({
          type:"success",
          message:'修改成功'
        })

      } else {
        // 修改失败 
          this.$message({
            type:"error",
            message:'修改失败'
          })

      }
      this.Visible = false;

    },
    // 请求页
    async getRoleList(page){
      let res = await roleList({page});
        // console.log(res);
      if(res.data.status === 200){
        this.tableData = res.data.data;
        this.pagesize = res.data.pagesize;
        this.total = res.data.total;
        
      } else {
        this.tableData = [];
      }
    },
    // 请求删
    async delList(id){
      let res = await listDelete({id});
      if(res.data.status === 200){
        this.getRoleList(this.curPage);
        // 删除成功 
        this.$message({
          type:"success",
          message:'删除成功'
        })
      } else {
        // 删除失败 
          this.$message({
            type:"error",
            message:'删除失败'
          })

      }
    },
    // 请求搜
    async getListSearch(search,page){
      if(search.includes('启用') || search.includes('停用')){
        console.log(4444);
        
        search = search
          .replaceAll('启用','1')
          .replaceAll('停用','0')
      }
      let res = await listSearch({search,page});
        console.log(res);
      if(res.data.status === 200){
        this.tableData = res.data.result;
        this.pagesize = res.data.pagesize;
        this.total = res.data.total;
      } else {
        this.tableData = [];
      }
    },
    // 查
    searchName(val){
      if(val){
        this.status = 1
        this.getListSearch(val);
      } else {
        this.status = 0;
        this.getRoleList()
      }
      // this.curPage = 1;
      console.log(val,'val');
      console.log(this.status,'status');
      
    },
    // 删除
    del(){
      if( this.multipleSelection.length ){

        // 提示
        this.$confirm('此操作将永久删除所选数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除
          let arr = [];
          this.multipleSelection.forEach(ele => {
            arr.push(ele.id);
          })
          let ids = arr.join(',')
          this.delList(ids);

        }).catch(() => {
          // 取消
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        }); 



      }
    },

  },



  created(){
    this.getRoleList()
  }
};
</script>

<style scoped>
.container {
  padding: 5px;
}

.bar {
  padding: 5px;
  background: #fff;
  /* border-bottom: 1px #eee solid; */
}

.el-table-column {
  height: 7px;
}
.content {
  padding: 5px;
  background: #fff;
  height: 460px;
}
.btn {
  padding: 5px 10px;
  background: #fff;
  border: solid 1px #eee;
  display: flex;
  justify-content: space-between;
}
.el-input {
  width: 200px;
  
}
</style>
