import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAtFrontPage: false,
    sum: 0,
    user: null
  },
  getters: {

  },
  mutations: {
    CHANGE_IS_AT_FRONT_PAGE(a, b) {
      this.state.isAtFrontPage = b;
    },
    JIA(state, value) {
      state.sum += value
    },
    GET_USER(state, a) {
      console.log(a)
      let wPath = window.document.location.href;
      // 获取当前页面主机地址之后的目录，如：/admin/index
      let pathName =  this.$route.path;
      let pos = wPath.indexOf(pathName);
      // 获取主机地址，如：http://localhost:8080
      let localhostPath = wPath.substring(0, pos);
      axios.post(
          localhostPath + "/checkCookie",
      ).then((data) => {
        console.log("11451411")
        console.log(data.data)
        state.user = data.data;
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  actions: {
    jia(context, value){
      context.commit('JIA', value)
    }
  },
  modules: {
  }
})
