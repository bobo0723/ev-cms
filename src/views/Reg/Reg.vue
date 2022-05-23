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
      <el-form :model="regForm" :rules="regRules" ref="regRef">
        <!-- prop: 指的是在校验规则时用哪个值去验证 -->
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="regForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="regForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="repassword">
          <el-input
            v-model="regForm.repassword"
            type="password"
            placeholder="请确认密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 注册按钮 -->
          <el-button type="primary" class="reg-btn" @click="reg"
            >注册</el-button
          >
          <!-- 去登录按钮 -->
          <el-link type="info" @click="$router.push('/login')"
            >去登录嘿嘿</el-link
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reg",
  data() {
    // 定义自定义校验规则，必须写在return上面
    const samePwdBlur = (rule, value, callback) => {
      // rule: 基本没用
      // value: 要验证的那个表单元素的值
      // 自定义校验 callback 必须被调用
      if (value === this.regForm.password) {
        // 验证通过，则直接调用 callback 即可
        callback();
      } else {
        // 验证不通过，也调用 callback，并传进去一个错误对象 new Error('错误信息')
        callback(new Error("两次输入的密码不一致!"));
      }
    };
    const samePwdChange = (rule, value, callback) => {
      if (value === this.regForm.password) {
        callback();
      } else {
        callback(new Error("两次输入的密码不一致!"));
      }
    };
    return {
      // 表单数据对象
      regForm: {
        username: "",
        password: "",
        repassword: "",
      },
      // 校验规则的对象
      regRules: {
        // 要验证的那个表单项绑定的数据: [ { "校验规则1" }, { "校验规则2" } ]
        username: [
          // 必填项的校验规则
          // required: 是否必填
          // message: 触发时的提示消息
          // trigger: 触发校验的事件
          { required: true, message: "用户名不能为空", trigger: "blur" },
          // 格式上的校验规则。
          {
            // pattern: 使用正则对表单做格式上的校验
            pattern: /^[A-Za-z0-9]{3,10}$/,
            // pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
            message: "用户名必须是1-10位的字母数字",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            //   \S是非空字符  \s是空字符
            pattern: /^\S{6,15}$/,
            message: "密码必须是6-15位的非空字符",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "密码必须是6-15位的非空字符",
            trigger: "blur",
          },
          { validator: samePwdBlur, trigger: "blur" },
          { validator: samePwdChange, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    reg() {
      // 1. 表单预校验
      // 使用el-form下的自带方法validate，通过this.$refs.ref的名字.validate来使用方法
      // validate方法中的参数接收的是一个回调函数
      this.$refs.regRef.validate(async (valid) => {
        // valid 是 true 则表示验证 通过
        // valid 是 false 则表示一条及以上的验证 不通过
        if (!valid) return; // 验证不通过
        // 验证通过
        // 2. 发起请求
        const { data: res } = await this.$http.post("/api/reg", this.regForm);
        console.log(res);
        if (res.code === 0) {
          // 注册成功
          //   消息提示
          this.$message({
            showClose: true,
            message: res.message,
            type: "success",
          });
          //   跳转到登录页
          this.$router.push("/login");
        } else {
          // 注册失败
          this.$message({
            showClose: true,
            message: res.message,
            type: "error",
          });
          return;
        }
      });
    },
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
