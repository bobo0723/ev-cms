<template>
  <!-- 登录页面的整体盒子 -->
  <div class="login-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <!-- model: 用于汇总每一个表单项数据的一个对象 放在data中 -->
      <!-- rules: 用于指定表单校验规则的一个对象 放在data中 -->
      <!-- ref: 用于获取el-form这个表单的实例对象，通过它调用一些方法 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round class="login-btn" @click="login"
            >登录</el-button
          >
          <el-link type="info" @click="$router.push('/reg')"
            >去注册哈哈</el-link
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          //   { required: true, message: "", trigger: "blur" },
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            pattern: /^[A-Za-z0-9]{3,10}$/,
            message: "用户名必须是3-10位的字母数字",
            trigger: "blur",
          },
        ],
        password: [
          //   { required: true, message: "", trigger: "blur" },
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            pattern: /^\S{6,15}$/,
            message: "密码必须是6-15位的非空字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "/api/login",
          this.loginForm
        );
        console.log(res);
        // 登录成功
        if (res.code === 0) {
          // 提示消息
          this.$message({
            message: res.message,
            type: "success",
          });
          // 储存token
          localStorage.setItem("token", res.token);
          // 跳转后台主页
          this.$router.push("/");
          // 登录失败
        } else {
          this.$message.error(res.message);
          //   清除token
          localStorage.removeItem("token");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  background: url("../../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }
    .login-btn {
      width: 100%;
    }
  }
}
// 根元素可以直接拿到
.el-form-item__content .login-btn {
  background-color: #555;
  border-color: #fff;
}
// 样式穿透 √
.el-form-item__content .login-btn /deep/ span {
  color: #8fd;
}
// × 根元素里面的元素才需要穿透，下面的不对，改不了
// .el-form-item__content .login-btn span {
//   color: #8fd;
// }
</style>
