// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './utils/filter_utils.js'
import { get } from './utils/api'
import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */

// http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       console.log('axios:' + error.response.status);
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           store.commit('LOG_OUT');
//           router.replace({
//             path: 'login',
//             query: {redirect: router.currentRoute.fullPath}
//           });
//       }
//     }
//     return Promise.reject(error.response.data);   // 返回接口返回的错误信息
//   });

Vue.prototype.$http = axios;

router.beforeEach((to, from, next) =>{
  if(!!!sessionStorage.user) {
    var query = 'token=' + (to.query.token ? to.query.token : '');
    get("/api/v1/user/info?" + query, null).then(resp =>{
      if(resp.data.data) {
        sessionStorage.setItem("user", resp.data.data.userAuthentication.details.name);
        sessionStorage.setItem("avatar", resp.data.data.userAuthentication.details.avatar_url)
      }
    })
  }

  setTimeout(function (){
    console.log('因为异步，等待请求完成...');
    var user = sessionStorage.getItem('user');
    if(!!!user && to.name !== "Login") {
      next({path:'/login'})
    }
    next()
  }, 1000);
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
