<template>
  <div class="addgoods">
    <!-- <Breadcrumb></Breadcrumb> -->

    <el-row :gutter="20">
      <!-- 树形控件 -->
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <div class="head">产品类型列表</div>
          <div class="list">
            <tree-list @changetree="changetree"></tree-list>
          </div>
        </div>
      </el-col>
      <!-- 表单 -->
      <el-col :span="19">
        <div class="grid-content bg-purple">
          <div class="tab_type">{{ title }}</div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="所属分类" prop="category">{{ ruleForm.category }}</el-form-item>

            <el-form-item label="商品名称" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item label="商品价格" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>

            <el-form-item label="商品数量" prop="num">
              <el-input v-model="ruleForm.num"></el-input>
            </el-form-item>

            <el-form-item label="商品图片" prop="image">
              <goods-Upload @sendIamge="sendIamge" @removeImage="removeImage" :fileList="fileList"></goods-Upload>
            </el-form-item>

            <el-form-item label="商品描述" prop="desc">
              <wang-editor
                @sendEditor="sendEditor"
                :editorData="editorData"
                :dialog="dialog"
                ref="Editor"
              ></wang-editor>
            </el-form-item>

            <el-form-item>
              <el-button v-if="title !== '详情'" type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button v-show="title == '添加'" @click="resetForm('ruleForm')">重置</el-button>
              <el-button @click="backList">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TreeList from './TreeList'
import GoodsUpload from './GoodsUpload'
import WangEditor from './WangEditor'
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      // 表单
      ruleForm: {
        cid:'',
        category:'',
        title: '',
        num: '',
        price: '',
        image: [],
        sellPoint: '',
        descs: '',
        create_time: '',
        barcode:'',
        status:'',
      },
      rules: {
        category: [
          { required: true, message: '请确认所属分类', trigger: 'blur' },
        ],
        title: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        num: [
          {  required: true, message: '请输入数量', trigger: 'blur' },
          {  pattern: /^[+]{0,1}(\d+)$/, message: '格式不正确', trigger: 'blur' },
          
        ],
        barcode: [
          {  required: true, message: '请输商品条码', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          {  pattern: /^((0{1}.\d{1,2})|([1-9]\d.{1}\d{1,2})|([1-9]+\d)|0)$/, message: '请输入正确格式', trigger: 'blur' },

        ],
        image: [
        ],
        sellPoint: [
          // { message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          // { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],

      },

      // 上传图列表
      fileList:[],
      // 王编辑文本
      editorData:"",
      dialog:false,
    

    };
  },

  components: {
    TreeList,
    GoodsUpload,
    WangEditor,
  },
  computed: {
    ...mapState('goods',['title','goodsData'])
  },

  methods: {
    ...mapMutations('goods',['changeTitle','changeGoods']),
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // title cid  category sellPoint price num descs paramsInfo image
          let {id, title, cid,  category, sellPoint, price,num,descs, image,barcode,status} = this.ruleForm;
          if(this.title == '编辑'){
            // 修改商品
            this.updateGoods({id, title, cid,  category, sellPoint, price,num,descs,barcode,status, image:JSON.stringify(image) ,paramsInfo:"" })
            
          } else {
            // 添加商品
            this.goodsInsert({
              title, cid, category,barcode,sellPoint, price,num,descs,status,
              image:JSON.stringify(image)
              ,paramsInfo:""})
 
          }
        } else {
            this.$message({
              message: '请输入完整信息',
              type: 'warning'
            })
          return false;
        }
      });
    },
    // 添加商品
    async goodsInsert(params){
      let res = await this.$api.goodsInsert(params)
      if(res.data.status == 200) {
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.$router.push('/goods/list')
      } else {
        this.$message({
          message: '添加失败',
          type: 'error'
        })
      }
    },
    // 修改商品
    async updateGoods(params) {
      let res = await this.$api.updateGoods(params)
      // return res;
      // console.log(res);
      
      if(res.data.status == 200 ){
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.$router.push('/goods/list');
      } else {
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      }
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
      // console.log(this.$refs.Editor,'编辑器');
      this.$refs.Editor.clear();
      
    },
    // 清单树
    changetree(data) {
      // console.log(data);
      this.ruleForm.category = data.name;
      this.ruleForm.cid = data.cid;
      
    },
    // 编辑器
    sendEditor(val){
      this.ruleForm.descs = val;
    },
    // 图片列表添加图片
    sendIamge(url){
      // console.log('组件传输url',url);
      // console.log('组件传输url',this.ruleForm.image);
      
      this.ruleForm.image.push(url)
    },
    removeImage(url){
      let arr = this.ruleForm.image
      let index = arr.indexOf(url);
      this.ruleForm.image = [...arr.slice(0,index),...arr.slice(index+1,arr.length)]
      // console.log(arr.slice(0,index),'表单图片列表');
      // console.log(arr.slice(index+1,arr.length),'表单图片列表');
      
    },
    // 返回
    backList(){
      console.log('-----------------------------------------');
      this.changeTitle('添加');
      this.changeGoods({});
      this.$router.push('/goods/list');
      
      
    }
  },

  mounted() {
    // 设置编辑项
    if(this.title == '编辑') {
      // 获取mudules数据
      this.ruleForm = this.goodsData;
      // 图像数据转换
      let imgs = JSON.parse(this.goodsData.image)      
      this.ruleForm.image = imgs;
      // 图片存入列表，传组件
      let arr = [];
      imgs.forEach(ele => {
        arr.push({url:ele})
      });
      // console.log(arr,'arr')
 
      this.fileList = arr;    

      this.editorData = this.goodsData.descs

      // console.log(this.fileList,'fileList数据');
      
    } else {
      
    }
  }


};
</script>

<style lang="less" scoped>
.addgoods {
  padding: 10px;
}
.head {
  background: skyblue;
  height: 30px;
  line-height: 30px;
  padding: 10px;
  font-size: 16px;
}
.list {
  height: 430px;
  padding: 10px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #fff;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #fff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #fff;
}
.el-form {
  padding: 20px 10px;
}
.tab_type {
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  padding: 5px 15px;
  background: skyblue;
}
</style>
