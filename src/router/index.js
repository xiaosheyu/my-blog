import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login, 
    }, 
    // {
    //   path: '/home',
    //   component: Home,
    //   name: '文章管理',
    //   iconCls: 'fa fa-file-text-o',
    //   children: [
    //     {
    //       path: '/articleList',
    //       name: '文章列表',
    //       component: ArticleList,
    //       meta: {
    //         keepAlive: true
    //       }
    //     }, {
    //       path: '/postArticle',
    //       name: '发表文章',
    //       component: PostArticle,
    //       meta: {
    //         keepAlive: false
    //       }
    //     }, {
    //       path: '/blogDetail',
    //       name: '博客详情',
    //       component: BlogDetail,
    //       hidden: true,
    //       meta: {
    //         keepAlive: false
    //       }
    //     }, {
    //       path: '/editBlog',
    //       name: '编辑博客',
    //       component: PostArticle,
    //       hidden: true,
    //       meta: {
    //         keepAlive: false
    //       }
    //     }
    //   ]
    // }
  ]
})
