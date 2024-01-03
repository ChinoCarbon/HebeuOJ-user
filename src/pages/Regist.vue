<template>
  <div class="login-box">
    <el-form  :model="registForm" ref="registForm"  :rules="rules"  label-width="80px" >
      <h1 class="login-title">注册</h1>
      <el-form-item label="用户名" size="medium" prop="username">
        <el-input v-model="registForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" size="medium" prop="password">
        <el-input v-model="registForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" size="medium" prop="checkPass">
        <el-input type="password" v-model="registForm.checkPass" placeholder="请再次确认密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" size="medium" prop="email">
        <el-input v-model="registForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="验证码" size="medium" prop="verification">
        <el-input v-model="registForm.verification" placeholder="请输入验证码" style="width: 215px"></el-input>
        <img :src="checkCodeSrc" style="width: 100px; height: 35px; margin-left: 5px; vertical-align: top"
             @click="getVerification" alt="点击获取验证码">
      </el-form-item>

      <el-form-item size="medium" align="center">
        <el-button class="submit" type="primary" size="medium" @click="submit('registForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Regist",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      checkCodeSrc:'',
      registForm: {
        username:'',//用户名
        password:'',//密码
        checkPass:'',//检查密码
        email:'',//邮箱
        verification:'',//用户输入的验证码
        verification_real:'',//验证码
        status:''//表明用户名是否存在（存在：）
      },
      localhostPath :'',
          //表单验证规则
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 50, message: '用户名的长度在1到50个字符', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9\u4e00-\u9fa5-_]{2,10}$/,message: '用户名在2-10位，可以由汉字，数字，英文字母，_，-组成', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码的长度在6到12个字符', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{6,16}$/,message: '密码在6-16位，可以由数字，英文字母组成', trigger: 'blur' }
        ],
        checkPass: [
          { required:true, validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 12, message: '', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/,message: '邮箱的格式为xxx@xxx.com', trigger: 'blur' }
        ],
        verification:[
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码是四位数字与字母组成的字符串', trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName =  this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
  },
  methods: {
    //获取验证码
    getVerification(){
      this.checkCodeSrc = this.localhostPath + "/checkCode?checkCodeType=2&ff=" + new Date();
    },
    //注册
    submit(formName) {
      console.log(this)
      //前端规则验证+注册Axios
      this.$refs[formName].validate((valid) => {
         if(valid){
          //合法,执行注册Axios
          this.doAxios();
        }
        else {
          //不合法
          this.$message.error('用户名、邮箱、或密码格式错误');
          this.registForm.username="";
          this.registForm.password="";
          this.registForm.email="";
          return false;
        }
      });
    },
    //注册Axios请求
    doAxios(){
      axios.post(
          this.localhostPath + '/checkRegister',
        {
            userName:this.registForm.username,//用户名
            userPassword:this.registForm.password,//密码
            userEmail:this.registForm.email,//邮箱
            checkCode:this.registForm.verification
          }
      ).then((response) => {
        console.log(response.data)
        if(response.data === "SUCCESS") {
          this.$message.success("注册成功，请登录")
          this.$router.push("/login")
        } else if(response.data === "USERNAME_EXIST")
        {
          this.$message.error("用户名已经存在")
        } else if(response.data === "EMAIL_EXIST")
        {
          this.$message.error("邮箱已经存在")
        } else if(response.data === "WRONG_CHECK_CODE")
        {
          this.$message.error("验证码错误")
        } else
        {
          this.$message.error("未知错误")
        }

        this.getVerification();
      })
    },
    //查询用户名是否存在
  },
  //钩子，在组件加载之前执行
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      //获取验证码
      vm.getVerification();
    });
  },
}
</script>

<style scoped>
.login-box{
  width: 400px;
  height: 450px;
  /*边框设置*/
  border: 1px solid #DCDFE6;
  /*标签位置*/
  margin: 110px auto;
  /*内部边距*/
  padding: 20px 50px 20px 30px;
  /*边框弧度*/
  border-radius: 20px;
  /*阴影设置*/
  box-shadow: 0px 0px 20px #DCDFE6;
}
.login-title{
  /*文本布局*/
  text-align: center;
  /*底部间距*/
  margin-bottom: 40px;
}
.submit{
  margin-right: 80px;
}
.verfication{
  font-size: 26px;
  font-family: Gabriola;
  border: none;
  color: white;
  width: 100px;
  height: 40px;
  background: chocolate;
}
</style>
