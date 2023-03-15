<template>
  <div class="content">
    <Breadcrumb></Breadcrumb>
    <el-button type="primary" size="small" @click="addCategory" plain>添加一级类目</el-button>
    <!-- tree -->
    <div class="box">
      <el-tree  ref="tree" :data="data" node-key="id" :expand-on-click-node="false" :props="defaultProps">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <!-- v-if="node.data.type != 1 " -->
            <el-button type="text" size="mini" @click="() => append(data,node)">
              <i class="el-icon-plus"></i>
            </el-button>
            <el-button type="text" @click="() => remove(node, data)">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button type="text" @click="() => edit(node, data)">
              <i class="el-icon-edit"></i>
            </el-button>
          </span>
        </span>
      </el-tree>

      <!-- 添加/修改 页面 -->
      <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="类目名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
    // const data = ;
    return {
      defaultProps: {
        id: 'id',
        children: 'children',
        label: 'name'
      },
      data :[],

      // 添加
      dialogVisible: false,
      form:{name:""},
      title:'',

      nodeData:{},
      node:{},

      rules: {
          name: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
      } 

      
    };
  },

  components: {},

  methods: {
    // tree
    append(data,node) {
      console.log(data,'+-------');
      this.title = '添加子类目';
      this.nodeData = data;
      this.node = node;
      this.dialogVisible = true;
   

    },
    remove(node, data) {

      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.node = node;
        this.nodeData = data;
        this.deleteContent(data.id);

        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });


      
    },
    edit(node, data){
      // console.log(data,'---当前节点');
      // const parent = node.parent;

      this.title = '修改类目';
      this.form.name = data.name;
      this.nodeData = data;

      this.dialogVisible = true;
      console.log(data,this.nodeData,'data数据-----');
      
    },
    
    // 生成树
    setTree(arrLay,result){
      arrLay.forEach(e => {
        let arr = result.filter(ele => {
          return ele.type == e.cid
        })
        if(arr.length == 0){
          return
        } else {
          e.children = arr;
          this.setTree(e.children,result)
        }
      })

      return arrLay;
    },



    // 添加按钮
    addCategory(){
      this.title = '添加类目';
      this.dialogVisible = true;
    },
    // 提交内容
    submit(){
      if(this.title == '添加类目'){
        this.insertCategory(this.form.name)
        this.dialogVisible = false;
        this.getitemCategory();
        this.form.name = ''

      }
      if(this.title == '修改类目'){
        this.updateCategory(this.nodeData.id, this.form.name)
        this.dialogVisible = false;

      }
      if(this.title == '添加子类目'){
        this.insertItemCategor(this.node, this.form.name);
        this.dialogVisible = false;

      }




    },



    // 获取类目
    getitemCategory(){
      this.$api.itemCategory()
        .then(res => {
          console.log(res,'所有分类--------');
          if(res.data.status == 200) {
            let result = res.data.result;
            // 筛出第一层
            let layer1 = result.filter(ele => {
              return ele.type == 1
            })
            // console.log(layer1,'第一层');
            // 筛出结果
            this.data = this.setTree(layer1,result);
            // console.log(this.data,'函数结果');
          }
      })
      
    },
    // 插入一级请求
    async insertCategory(name){
      let res = await this.$api.insertCategory({name})
      console.log(res,'插入结果');
      if(res.data.status == 200){
        this.$message({
          type:'success',
          message:'添加成功'
          })  
        } else {
          this.$message({
            type:'error',
            message:'添加失败'
          })
      }
      
    },
    // 修改请求 
    async updateCategory(id, name){
      let res = await this.$api.updateCategory({id, name})
      console.log(res,'sss---------');
      
      if (res.data.status == 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        this.nodeData.name = this.form.name;
        this.form.name = '';

      } else {
        this.$message({
          type: 'error',
          message: '修改失败'
        });
      }
    },
    // 删除导航
    async deleteContent(id){
      let res = await this.$api.deleteContent({id});
      // console.log(res,'-----');
      
      if (res.data.status == 200) {

        const parent = this.node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === this.nodeData.id);
        // console.log(parent, children, index,data,'-------');
        children.splice(index, 1);


        this.$message({
          type: 'success',
          message: '删除成功'
        });

        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
        });
      }
    },
    // 增加子导航
    async insertItemCategor(node, name){
      let cid = node.data.cid;
      let res = await this.$api.insertItemCategor({cid, name})
      // console.log(res,'-----');

      if(res.data.status == 200){

        this.getitemCategory();

        // const newChild = { id: id++, name, children: [] };
        // if (!this.nodeData.children) {
        //   this.$set(this.nodeData, 'children', []);
        // }
        // this.nodeData.children.push(newChild);
        // this.form.name = '';

        this.$message({
          type:'success',
          message:'添加成功'
        })  


      } else {

        this.$message({
          type:'error',
          message:'添加失败'
        })
      }
    }

  },



  created(){
      this.getitemCategory();
    
    
  }
};
</script>

<style scoped>
.content {
  padding: 5px;
  margin: 5px;
  background: #fff;
}
.box {
  padding: 10px;
  border: 1px solid #eee;
  margin-top: 5px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

/* .el-button {
  margin: 8px 10px;
}

.el-dialog {
  width: 40%;
}

.el-form {
  width: 450px;
} */
</style>
