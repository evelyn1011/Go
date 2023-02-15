<template>
  <div>
    <el-tree
      node-key="pid"
      :props="props"
      lazy
      :load="loadNode"
      ref="tree"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span v-if="node.label == '广告分类'">{{ node.label }}</span>
        <el-link :underline="false" v-else @click="() => check(node, data)">
          <span>{{ node.label }}</span>
        </el-link>
        <span>
          
          <el-button type="text" size="mini" @click="() => append(node, data)">
            <i class="el-icon-plus"></i>
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button type="text" size="mini" @click="() => edit(node, data)">
            <i class="el-icon-edit-outline"></i>
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>

import { selectCategory, insertCategory, updateCategory, deleteCategory } from '@/api/advert';

export default {
  data() {
    return {
      dataList:[],

      props: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
    };
  },

  components: {},

  methods: {
    // tree
    append(node, data) {
      console.log("添加-----", node,data);
      this.messageBox(0,data, node);
        
    },

    remove(node, data) {
      // console.log("删除-----",node,data);
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getDeleteCategory(data.pid, data.name);
          
          const parent = node.parent;
          const children = parent.childNodes || parent.data;
          const index = children.findIndex(d => d.data.pid === data.pid);
          children.splice(index, 1);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      
    },

    edit(node, data) {
      console.log("编辑-----",node, data);
      this.messageBox(1,data); 
    
    },

    messageBox(type, data, node){             
      let arr = [{
        item:'添加广告',
        value:''
      },{
        item:'修改广告',
        value:data.name
      }]
      this.$prompt('请输入标题', arr[type].item, {
        inputValue: arr[type].value,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 添加
        if(type == 0){
          console.log('通知栏获取的node',node);
          
          this.getInsertCategory(data.pid, value, node);

        } else if(type == 1){
          // 修改
          this.getUpdateCategory(data.pid, value, data);
          
        }

      }).catch(err => {
        this.$message({
          type: 'info',
          message: '已取消'
        });       
        
      });
    },


    async loadNode(node, resolve) {
      if (node.level === 0) {
        let res = await this.getSelectCategory()
        return resolve(res);
      }
      if (node.level >= 1) {
        if(node.data.pid == undefined){
          return resolve([])
        } else {
          let res = await this.getSelectCategory(node.data.pid)
          return resolve(res);

        }
      }

    },

    check(node, data){
      console.log("点击文字",node, data);
      this.$emit('textLink', data)
      
    },





    // 请求
    // 删除
    async getDeleteCategory(pid, name){
      let res = await deleteCategory({pid, name});
      console.log('--删除请求res--',res);
      if(res.data.status === 200){
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
    // 修改
    async getUpdateCategory(pid, name, data){
      let res = await updateCategory({pid, name});
      console.log('--更新请求res--',res);
      if(res.data.status === 200){
        data.name = name;
        this.$message({
          type: 'success',
          message: '修改成功'
        });

      } else {
        this.$message({
          type: 'error',
          message: '修改失败'
        });
      }
    },
    // 获取
    async getSelectCategory(id){
      let res = await selectCategory({id});
      console.log('---菜单请求结果--',res);
      if(res.data.status === 200){
        return res.data.result;
      } else {
        return []
      }
    },
    // 添加
    async getInsertCategory(pid, name, node){
      let res = await insertCategory({pid, name});
      // console.log("添加子菜单",res);
      if(res.data.status === 200){
      
        // 添加子目
        this.getSelectCategory(node.data.pid)
        .then(res => {
          // console.log('获取列表结果',res);
          // console.log(node.data.pid);
          this.$refs.tree.updateKeyChildren(node.data.pid, res)
          this.$message({
            type: 'success',
            message: '添加成功'
          });
          
        })        
      } else {
        this.$message({
          type: 'error',
          message: '添加失败'
        });
      }
      
    },





  },

};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-tree{
  padding:10px;
  padding-top: 20px;
}
</style>
