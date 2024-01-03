<template>
  <div>
    <div class="bgnew" v-show="isAtFrontPage"
         style=" background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);"></div>
    <div class="sticky">
      <el-menu default-active="0" style="border: 0; :hover{}" class="el-menu-demo" text-color="#ffffff"
               active-text-color="#ffffff"
               :background-color="backgroundColor" mode="horizontal">
        <el-menu-item index="0" @click="jump('')" style="font-size: 20px; font-family: 'PingFang SC',Arial,sans-serif ">
          河北工程大学在线评测系统
        </el-menu-item>
        <el-menu-item index="1" @click="jump('problems')">题库</el-menu-item>
        <el-menu-item v-if="user != null && user.userType === 'a'" index="2" @click="jump('teacher')">教师端</el-menu-item>
        <el-menu-item index="3" @click="jump('homeworks')">作业</el-menu-item>
        <el-menu-item style="float: right">
          <router-link :to="whereToGo">
            <el-avatar v-if="icoUrl === '' " :size="50" alt="登录"></el-avatar>
            <el-avatar v-else :size="50" :src="icoUrl" alt="登录"></el-avatar>
          </router-link>
          <el-dropdown v-if="icoUrl !== ''" :hide-on-click="false">
  <span class="el-dropdown-link">
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="exitLog">
                <button @click="exitLog">
                退出登录
                </button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TopSafariBar",
  data() {
    return {
      color: "#00eeaa",
      user: null,
      // isAtFrontPage: false,
      localhostPath: ''
    }
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
    jump(a) {
      this.$router.push("/" + a)
    },
    exitLog()
    {
      console.log("114514")
      localStorage.removeItem('user')
      this.$message.success("退出成功")
      location.reload()
    }
  },
  computed: {
    ...mapState(['isAtFrontPage', 'sum']),
    backgroundColor: {
      get() {
        return this.$store.state.isAtFrontPage === false ? "#3f3f3f" : "#ffffff00"
      }
    },
    icoUrl() {
      if (localStorage.getItem("user") != null) {
        console.log(this.localhostPath + "/getIco?id=" + JSON.parse(localStorage.getItem("user")).userId)
        return this.localhostPath + "/getIco?id=" + JSON.parse(localStorage.getItem("user")).userId
      } else {
        return "";
      }
    },
    whereToGo() {
      if (this.icoUrl === "") return "/login";
      else return "/user/" + JSON.parse(localStorage.getItem("user")).userId
    }
  },
  beforeCreate() {
    /*setTimeout(() => {
       this.$store.commit("GET_USER")
     }, 1)
     setInterval( () => {
       this.$store.commit("GET_USER")
     }, 1000 * 60 * 30)*/
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
</script>

<style>
#title {
  font-size: 50px;
}

div.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1999;
}

.el-menu-item:hover {
  background-color: #ffffffaa !important;
}

.bgnew {
  z-index: -1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
