<template>
  <div class="content">
    <div class="head">
      <!-- 面包屑 -->
      <Breadcrumb></Breadcrumb>
      <!-- 搜索表单 -->
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="产品名称">
            <el-input v-model="formInline.name" placeholder="产品名称"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">
              查询
              <i class="el-icon-search"></i>
            </el-button>
            <el-button type="primary" @click="onReset">
              重置
              <i class="el-icon-refresh-left"></i>
            </el-button>
            <el-button type="warning" @click="addGoods">
              添加商品
              <i class="el-icon-circle-plus-outline"></i>
            </el-button>
            <el-button type="danger" @click="deleteList">
              批量删除
              <i class="el-icon-delete"></i>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      @selection-change="handleSelectionChange"
      :data="tableData"
      border
      height="350"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="cid" label="商品ID" width="80" align="center"></el-table-column>
      <el-table-column prop="title" label="商品名称" width="100" align="center">
        <template slot-scope="scope">
          <span @click="checkInfo(scope.row)" style="color:#4066e1;">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="商品价格" align="center"></el-table-column>
      <el-table-column prop="category" label="商品类目" align="center"></el-table-column>
      <el-table-column prop="create_time" label="添加时间" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>

      <el-table-column prop="sellPoint" label="商品亮点" align="center"></el-table-column>
      <el-table-column prop="descs" label="商品描述" width="180" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{removeHTMLTag(scope.row.descs)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页组件 -->
    <Pagination :pagesize="pagesize" :total="total" @handleCurrentChange="handleCurrentChange"></Pagination>

    <!-- 抽屉 -->

    <el-drawer title="商品信息" :visible.sync="dialog" direction="rtl" size="60%">
      <!-- <span>我来啦!</span>
      -->
      <el-descriptions :column="2">
        <el-descriptions-item label="所属分类">{{currentInfo.category}}</el-descriptions-item>
        <el-descriptions-item label="商品名称">{{currentInfo.title}}</el-descriptions-item>
        <el-descriptions-item
          label="添加时间"
        >{{dayjs(currentInfo.create_time).format('YYYY-MM-DD HH:mm:ss')}}</el-descriptions-item>
        <el-descriptions-item label="价格">{{currentInfo.price}}</el-descriptions-item>
        <el-descriptions-item label="数量">{{currentInfo.num}}</el-descriptions-item>
        <el-descriptions-item label="商品卖点">{{currentInfo.sellPoint}}</el-descriptions-item>
        <el-descriptions-item :span="2" label="商品图片">
          <template>
            <span v-show="imgs.length == 0">无</span>
            <div class="demo-image__preview">
              <el-image
                v-for="(item,index) in imgs"
                :key="index"
                style="width: 100px; height: 100px"
                :src="item"
                :preview-src-list="[item]"
                @error="imgError"
              ></el-image>
            </div>
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="商品描述" :span="2">
          <template>
            <wang-editor :dialog="dialog" :editorData="editorData" ref="Editor"></wang-editor>
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Pagination from '@/components/Pagination';
import { mapMutations } from 'vuex';
import {removeHTMLTag} from '@/utils/index'
import WangEditor from './WangEditor'

export default {
  data() {
    return {
      formInline: {
        name: '',
        time: ''
      },
      tableData: [],
      pagesize:10,
      total:100,

      ids:'',

      dialog:false,
      currentInfo:{
        category:'',
        title:'',
        create_time:'',
        num:'',
        sellPoint:'',
        descs:'',
      },
      imgs:[],


       // 王编辑文本
      editorData:"",
    };
  },
  props:['currentPage'],

  components: {
    Pagination,
    WangEditor,

  },

  methods: {
    dayjs,
    ...mapMutations('goods',['changeTitle','changeGoods']),
    removeHTMLTag,
    // 获取商品列表
    async getGoodsList(page) {
      let res = this.$api.getGoodsList({page})
      res.then(res => {
        // console.log(res.data)
        if(res.status == 200) {
          this.tableData = res.data.data;
          this.pagesize = res.data.pagesize;
          this.total = res.data.total
        } else {
          // 没有就为空
          this.tableData = []
        }

      })
    },
    // 翻页按钮
    handleCurrentChange(page){
      // console.log(page);
      this.getGoodsList(page);
      
    },
    // 重置按钮
    onReset(){
      this.formInline.name = '';
      this.getGoodsList(1);
    },
    // 提交表单
    onSubmit() {
        // console.log(this.formInline.name);
        if(!this.formInline.name){
          // 提示输入信息
          this.$message({
            message: '请输入查询信息',
            type: 'warning'
          });
          return '';
        } else {
          // 请求数据
          this.$api.goodsSearch({search: this.formInline.name})
          .then(res=> {
            // console.log(res)
            if(res.status == 200) {
              // 请求成功
              if(res.data.status == 200) {
                // 含有数据
                this.tableData = res.data.result;
                this.total = res.data.result.length;
              } else {
                // 无数据
                this.tableData = [];
                this.total = 0;
              }
            } else {
              // 请求失败
              this.$message.error('出错了，请稍后再试');
            }
          });

        }

    },
    // 单个编辑
    handleEdit(index, row) {
      // console.log('handleEdit点击编辑，行列',index, row);
      this.changeTitle('编辑');
      this.changeGoods(row);
      this.$router.push('/goods/addGoods');
    },

    // 查看详情
    checkInfo(row){
      console.log(row);
      this.currentInfo = row;
      this.editorData =  this.currentInfo.descs;
      this.imgs = JSON.parse(this.currentInfo.image);
      
      this.dialog =true;

      // this.changeTitle('详情');
      // this.changeGoods(row);
      // this.$router.push('/goods/addGoods')
    },
    // 图片出错
    imgError(){},
    
    // 单个删除
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 确认删除
          this.$api.goodsDelete({id:row.id})
          .then(res => {

            if(res.status == 200) {
              // 请求成功
              if(res.data.status ==200) {
                this.getGoodsList(this.currentPage)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            } else {
              // 请求失败
              this.$message.error('出错了，请稍后再试');
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 批量删除
    async batchDelete(ids){
      let res = await this.$api.batchDelete({ids});
      // console.log(res,'删除结果');
      if(res.data.status == 200 ){
        this.$message({
          type:'success',
          message:'删除成功'
        })
      } else {
        this.$message({
          type:'error',
          message:'删除失败'
        })
      }
      
    },

    deleteList() {
      if(this.ids == ''){
        this.$message({
          message: '请选择删除项',
          type: 'warning'
        });
      } else {
        this.$confirm('此操作将永久删除文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 确认删除
          this.batchDelete(this.ids)
          this.getGoodsList(this.currentPage)
        }).catch(() => {
          // 取消删除
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }

    },
    // 多选开关
    handleSelectionChange(val) {
      
      console.log(val)

      if(!val.length){
        this.ids = ''
        return '';
      }else{
        let arr = []
        val.forEach(ele => {
          arr.push(ele.id);
        });
        this.ids = arr.join(',')
        
      }


    },
    // 添加商品
    addGoods() {
      this.$router.push('/goods/addgoods')
      this.changeTitle('添加');
      this.changeGoods({})
    },
  },

  watch:{
    dialog(val){
      if(!val) {
        this.editorData = '';
        this.currentInfo = {}
      }

    }
  },
  

  created() {
    this.getGoodsList(1);
  }
};
</script>

<style scoped>
.content {
  background: #eeeeee;
  padding: 5px;
}

.form {
  background: #fff;
  margin: 2px 0;
  height: 50px;
}
.el-form {
  padding: 5px 0 0 10px;
}
.content .head {
  background: #fff;
  padding: 5px;
}
.el-table {
  margin-top: 10px;
}
.el-descriptions {
  padding: 30px;
}
</style>
