<template>
  <el-form :rules="rules" :model='loginForm' ref='loginForm' class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <div class='github' style="background-image:url(../../../static/img/github.png);" @click="githubLogin">
    </div>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick('loginForm')" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import { post, get } from '../utils/api'
  import { valid } from 'semver';
  export default{
    data(){
      return {
        rules: {
          username: [{required: true, message: '请输入账号', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        },
        checked: true,
        loginForm: {
          username: 'administrator',
          password: 'qazwsx'
        },
        loading: false
      }
    },
    methods: {
      githubLogin: () => {
        window.location.href = '/v1/login/github'
      },
      submitClick: function (formName) {
        var _this = this;
        _this.$refs[formName].validate(valid => {
          if(!valid) {
            return;
          }  
          this.loading = true;
          post('/v1/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          }).then(resp=> {
            _this.loading = false;
            if (resp.status == 200) {
              //成功
              var json = resp.data;
              if (json.status == 'success') {
                sessionStorage.setItem('user_name', json.data)
                _this.$router.replace({path: '/home'});
              } else {
                _this.$alert('登录失败!', resp.message);
              }
            } else {
              //失败
              _this.$alert('登录失败!', '失败!');
            }
          }, resp=> {
            _this.loading = false;
            _this.$alert('找不到服务器了!', '失败');
          });
        });
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }

  .github {
    width: 35px;
    height:35px; 
    margin-left: 156px;
    margin-bottom: 10px;
    background-repeat:no-repeat; 
    background-size:100% 100%;
    cursor: pointer;
  }
</style>