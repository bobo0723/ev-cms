<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <!-- model: 用于汇总每一个表单项数据的一个对象 -->
      <!-- rules: 用于指定表单校验规则的对象 -->
      <el-form :model="regForm" :rules="regRules" ref="regForm">
        <!-- prop: 指的是在校验规则时用哪个值去验证 -->
        <el-form-item prop="username">
          <el-input
            v-model="regForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="regForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="regForm.repassword"
            placeholder="请确认密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="reg-btn">注册</el-button>
          <el-link type="info">去登录嘿嘿</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reg",
  data() {
    return {
      regForm: {
        username: "",
        password: "",
        repassword: "",
      },
      regRules: {},
    };
  },
};
</script>

<style lang="less" scoped>
.reg-container {
  background: url("../../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;
  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
    .title-box {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }
    .reg-btn {
      width: 100%;
    }
  }
}
</style>
