<template>
  <div>
    <el-dialog title="角色修改" :visible.sync="isVisible" @close="close">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="ID" prop="id">{{ ruleForm.id }}</el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="所属部门"  prop="apartment">
          <el-input v-model="ruleForm.apartment"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <template>
            <div class="switch">
              <div>{{ ruleForm.status ? '启用':'停用'}}</div>
              <el-switch v-model="ruleForm.status" inactive-color="#ff4949"></el-switch>
            </div>
            <!-- <el-input v-model="ruleForm.status"></el-input> -->
          </template>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100px;">立即创建</el-button>
          <el-button @click="isVisible = false" style="width:100px;">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible:false,
       rules: {
          email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        apartment: [
          { required: true, message: '请输入所属部门', trigger: 'blur' },
        ],
        status : [
          { required: true, trigger: 'blur' },
        ],
            
        }

    };
  },
  props:['ruleForm','Visible'],


  components: {},

  methods: {

  
    close(){
      this.$emit('isShow')

    },
    



    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.ruleForm = this.ruleForm? 1:0;
          // this.updateItemInfo(this.ruleForm)
          this.$emit('submitForm')
        } else {
          return false;
        }
      });
    },

  },

  watch:{
    Visible(val){
      
      if(val) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }

    }
  }
};
</script>

<style scoped>
.el-input {
  width: 70%;
}
.switch {
  width: 60%;
  display: flex;
  justify-content: space-between;
}
</style>
