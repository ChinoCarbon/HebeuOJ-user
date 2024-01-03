<template>
<div class="user-box">
  <el-skeleton v-if="user === null" :rows="6" animated />
  <el-container v-else>
    <el-header class="el-header">
      <div class="header-box">
        <el-container>
          <el-aside class="header-aside" width="100px">
            <div class="avatartar-box"><el-avatar :size="80" :src="this.localhostPath + '/getIco?id=' + user.userId" :error="haha"></el-avatar><br/></div>
          </el-aside>
          <el-main class="header-main">
            <div class="name"><span>{{user.userName}}</span></div>
            <div class="signature"><span>{{user.userSignature}}</span></div>
          </el-main>
        </el-container>
      </div>
    </el-header>
    <el-main class="el-main">
      <div class="main-box">
        <div class="userDescriptions-box">
          <el-descriptions class="margin-top" :column="2" size="medium" border>
              <template slot="title" >
                  <i class="el-icon-user">用户信息</i>
              </template>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-place"></i>
                用户ID
              </template>
              {{user.userId}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                用户名
              </template>
              {{user.userName}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-promotion"></i>
                邮箱
              </template>
              {{user.userEmail}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                提交
              </template>
              {{user.userSubmission}}次
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-check"></i>
                通过
              </template>
              {{user.userPassed}}次
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-check"></i>
                注册时间
              </template>
              {{user.userRegisterTime.split("T")[0]}}
            </el-descriptions-item>
          </el-descriptions>

        </div>
      </div>
    </el-main>
  </el-container>
</div>
</template>

<script>

import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  data() {
    return {
      Auser: null,
      localhostPath: ''
    }
  },
  computed:{
    user() {
      return this.Auser;
    }
  },
  methods: {
    haha(e)
    {
      console.log(e)
      console.log("114514")
    }
  }, mounted() {
    axios.post(this.localhostPath + "/selectUserById", {
      "userId": this.$route.params.id
    }).then((data) => {
      this.Auser = data.data;
    })
  }, deactivated() {
    this.$destroy();
  },
  created() {
    let wPath = window.document.location.href;
    // 获取当前页面主机地址之后的目录，如：/admin/index
    let pathName =  this.$route.path;
    let pos = wPath.indexOf(pathName);
    // 获取主机地址，如：http://localhost:8080
    this.localhostPath = wPath.substring(0, pos);
  },
}
</script>

<style scoped>
.header-box{
  width: 80%;
  height: 180px;
  background-color: #606266;
  /*边框设置*/
  border: 1px solid #DCDFE6;
  /*标签位置*/
  margin: 0px auto;
  /*内部边距*/
  padding: 0px 0px 0px 0px;
  /*边框弧度*/
  border-radius: 2px;
  /*阴影设置*/
  box-shadow: 0px 0px 2px #DCDFE6;
}
.main-box{
  width: 80%;
  height: 300px;
  /*边框设置*/
  border: 1px solid #DCDFE6;
  /*标签位置*/
  margin: 120px auto;
  /*内部边距*/
  padding: 0px 0px 0px 0px;
  /*边框弧度*/
  border-radius: 2px;
  /*阴影设置*/
  box-shadow: 0px 0px 2px #DCDFE6;
}
.el-header{
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 10px;
}
.avatartar-box{
  /*标签位置*/
  margin: 90px auto;

}
.userDescriptions-box{
  width: 80%;
  height: 100%;
  /*边框设置*/
  /*border: 1px solid #DCDFE6;*/
  /*标签位置*/
  margin: 30px auto;
  /*内部边距*/
  padding: 0px 0px 0px 0px;
  /*边框弧度*/
  /*border-radius: 5px;*/
  /*阴影设置*/
  box-shadow: 0px 0px 1px #DCDFE6;
}
.name{
  text-align: left;
  /*标签位置*/
  margin: 95px auto;
  font-size: 22px;
  font-family: Arial;
  font-weight: bold;
  line-height: 0px;
  color: #FFFFFF;
}
.signature{
  text-align: left;
  /*标签位置*/
  margin: -65px auto;
  line-height: 0px;
  font-size: 18px;
  font-family: Calibri;
  color: #FFFFFF;
}
.header-aside{
  width: 20%;
}
.header-main{
  line-height: 0px;
}
</style>
