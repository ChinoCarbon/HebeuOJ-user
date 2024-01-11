import Vue from "vue";
//引入App
import App from './App';
//引入store
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import router from "./router";
import axios from "axios";

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

//import VueCodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
//Vue.use(VueCodeMirror)

Vue.use(mavonEditor)
//关闭Vue的生产提示
Vue.config.productionTip = false;
Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  axios,
  store,
  router,
  render: h => h(App),
});