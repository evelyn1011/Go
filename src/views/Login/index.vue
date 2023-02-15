<template>
  <div class="container">
    <!-- 表单 -->
    <div class="form">
      <div>登录页</div>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="user">
          <!-- <i class="el-icon-user"></i> -->
          <el-input v-model="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <!-- <i class="el-icon-lock"></i> -->
          <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="toLogin('ruleForm')">登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: '',
        pwd: '',
      },
      rules: {
        user: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pwd: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },

  components: {},

  methods: {
    ...mapMutations('login',['setUser']),
     toLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');

          this.login(this.ruleForm.user, this.ruleForm.pwd)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    async login(user, pwd){
      let res = await this.$api.login({user, pwd})
      console.log(res, '2222');
      if(res.data.status == 200){
        // console.log(res.data,'------login.data');
        
        this.setUser({user, token:res.data.token})
        this.$message({
          type:'success',
          message:'登陆成功'
        });

        this.$router.push('/')
      } else {
        
        this.$message({
          type:'error',
          message:'登陆失败'
        });
      }
      
    },
  },

  // 

  created(){
    console.log(this.$route,'====');
    
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background: #dde;
  display: flex;
}

.form {
  height: 200px;
  width: 400px;
  background: #fff;
  margin: auto;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-form {
  margin: 20px 25px 0 0;
}

.el-button {
  width: 380px;
  margin-left: 20px;

}
</style>
