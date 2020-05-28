<template>
  <div class="login-container">
    <div class="login-logo-bysj">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <el-form ref="loginForm" :model="loginInfo" :rules="loginRules" auto-complete="off" class="login-form"
                   label-position="left">
            <el-form-item prop="username">
              <el-input v-model.trim="loginInfo.username"
                        v-focus
                        auto-complete="off"
                        placeholder="请输入用户名"
                        tabindex="1"
                        type="text">
              </el-input>
            </el-form-item>
            <el-form-item prop="password" class="login-form-pass">
              <el-input
                :key="passwordType"
                ref="password"
                v-model.trim="loginInfo.password"
                :type="passwordType"
                auto-complete="off"
                placeholder="请输入密码"
                tabindex="2"
                @keyup.enter.native="login"
              />
            </el-form-item>
            <el-button :loading="true" class="login-btn" type="primary" @click="login">
              登录
            </el-button>
            <el-button :loading="false" class="login-btn" type="danger" @click="login">
              注册
            </el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <hr/>
  </div>
</template>
<script>
  import {isPassword} from "../../utils/validate";

  export default {
    name: 'Login',
    directives:{
      focus:{
        inserted(el){
          el.querySelector("input").focus();
        }
      }
    },
    //这玩意是吧一个页面当成另一个页面的组件声明，然后再页面里使用
    data() {
      const validateUserName = (rule, value, callback)
      {
        if ("" == value) {
          callback(new Error("用户名不能为空"))
        } else {
          callback();
        }
      }
      const validatePassword = (rule, value, callback)
      {
        if (value == "") {
          callback(new Error("用户密码不能为空"));
        } else {
          if (!isPassword(value)) {
            callback(new Error("密码不能少于6位"));
          } else {
            callback();
          }
        }
      }
      return {
        loginInfo: {username: '', password: '', loginName: ''},
        loginRules: {
          username: [
            {
              required: true,
              trigger: "blur",
              validator: validateUserName
            }
          ],
          password: [
            {
              required: true,
              trigger: "blur",
              validator: validatePassword
            }
          ]
        },
        responseResult: [],
        passwordType: "password",
      }
    },
    methods: {
      login() {
        this.$axios
          .post('/login/login.json', {
            username: this.loginInfo.username,
            password: this.loginInfo.password
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data)
            if (successResponse.data.code == 200) {
              this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {

          })
      },
      register() {
        this.$axios
          .post('/login/register.json', {
            username: this.loginInfo.username,
            password: this.loginInfo.password,
            loginName: this.loginInfo.loginName
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data)
          })
          .catch(failResponse => {

          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    min-height: 600px;
    background: url("") center center fixed no-repeat;
    background-size: cover;

    .login-logo-bysj {
      position: absolute;
      top: 45px;
      left: 45px;

      img {
        width: 180px;
      }
    }

    .login-form {
      position: relative;
      max-width: 100%;
      margin: 22vh 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: #67c23a;
        }
      }
    }

  }
</style>
