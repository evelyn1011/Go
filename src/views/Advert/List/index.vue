<template>
  <div class="container">
    <div class="bar">
      <Breadcrumb></Breadcrumb>
    </div>

    <!-- 内容 -->
    <div class="content">
      <!-- tree -->
      <div class="tree">
        <advert-tree @textLink="textLink"></advert-tree>
      </div>
      <!-- table -->

      <div class="table">
        <div class="btns">
          <el-button type="primary" plain size="small" @click="addContent">添加</el-button>
          <div class="title">
            <span>{{ targetAd.name }}</span>
          </div>
        </div>
        <el-table  height="410" :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="编号" width="70" align="center"></el-table-column>
          <el-table-column prop="name" label="名称" width="150" align="center"></el-table-column>
          <el-table-column prop="url" label="链接" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="image" label="图片" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData, scope.row)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- draw -->
    <el-drawer
      title="添加广告"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="60%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="归属" :label-width="formLabelWidth">
            <span style="font-weight:bold">{{ targetAd.name }}</span>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width:60%;"></el-input>
          </el-form-item>
          <el-form-item label="链接地址" :label-width="formLabelWidth">
            <el-input v-model="form.url" autocomplete="off" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
            <template>
              <up-load
                style="width:80%;"
                :imageList="imageList"
                @sendIamge="sendIamge"
                @removeImage="removeImage"
              ></up-load>
            </template>
            <!-- <el-input v-model="form.url" autocomplete="off"></el-input> -->
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button
            type="primary"
            @click="handleClose"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          <el-button @click="cancelForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { insertTbContent,deleteContent, selectTbContentAll } from '@/api/advert';

import AdvertTree from './AdvertTree'
import UpLoad from './UpLoad'
export default {
  data() {
    return {
      tableData:[],
      multipleSelection:[],

      form:{
        name:'',
        url:'',
        image:''
      },
      formLabelWidth: '100px',
      timer: null,
      dialog: false,
      loading: false,

      targetAd:{},

      imageList:[],

    };
  },

  components: {
    AdvertTree,
    UpLoad
  },

  methods: {

    // 添加内容
    async insertContent(form){
      let {name, url, image} = form;
      let pid = this.targetAd.pid;
      let res = await insertTbContent({pid, name, url, image});
      console.log('--添加内容---', res);
      return res;
      
    },
    // 删除内容
    async deleteContent(id){
      let res = await deleteContent({id});
      console.log('--删除内容---', res);
      if(res.data.status ===200){
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
    // 获取内容
    async selectContentAll(pid){
      let res = await selectTbContentAll({pid});
      console.log('--获取内容---', res);
      if(res.data.status === 200){
        this.tableData = res.data.result;
      } else {
        this.tableData = []
      }
      
    },


    // 添加按钮
    addContent(){
      this.dialog = true;
    },
    // 删除按钮
    deleteRow(index, rows, row) {
      this.$confirm('是否确认删除该项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

          rows.splice(index, 1);
          // console.log('删除按钮',index, rows, row);
          this.deleteContent(row.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    // 点击文字
    textLink(data){
      this.targetAd = data;
      this.selectContentAll(data.pid);

    },
    // 多选触发
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
      
    // },



    // 关闭提交按钮
    handleClose() {
      // console.log(1111111111);
      this.loading = true;
      this.form.image = JSON.stringify(this.imageList)
      this.insertContent(this.form)
      .then(res => {
        // console.log(res,'77777777777');
        
        if(res.data.status ===200){
          this.$message({
            type:'success',
            message:'添加成功'
          })
          this.selectContentAll(this.targetAd.pid)
          
        } else {
          this.$message({
            type:'error',
            message:'添加失败'
          })
        }
        this.loading =false;
        this.dialog = false;
        this.form = {};
        this.imageList = [];
      })
      
    },
    // 关闭敞口
    cancelForm() {
      this.loading = false;
      this.dialog = false;
    },
    // 传图
    sendIamge(imgUrl){
      this.imageList.push(imgUrl)
    },
    // 减少图片
    removeImage(url){
      let arr = this.imageList
      let index = arr.indexOf(url);
      this.imageList = [...arr.slice(0,index),...arr.slice(index+1,arr.length)]
    }




  },





  

 
};
</script>

<style scoped lang="less">
.container {
  padding: 5px;
}

.bar {
  padding: 5px;
  background: #fff;
  border-bottom: 1px #eee solid;
}

.btns {
  background: #fff;
  height: 50px;
  line-height: 50px;
  position: relative;
}
.btns .el-button {
  margin-left: 5px;
}
.title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.content {
  display: flex;
  background: #fff;
  // border: 1px #eee solid;
  padding: 5px;
  height: 460px;
}

.tree {
  width: 30%;
  border: 1px #ddd solid;
}
.table {
  width: 70%;
  padding: 0 20px;
}

/* element */

.demo-drawer__footer {
  margin: 0 100px 0 100px;
  display: flex;
  justify-content: space-between;
}
.demo-drawer__footer > .el-button {
  width: 100%;
}
</style>
