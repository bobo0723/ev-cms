<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form
      :model="pwdForm"
      :rules="pwdRules"
      ref="pwdRef"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPwd">修改密码</el-button>
        <el-button @click="$refs.pwdRef.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'UserPwd',
  data() {
    //   新旧密码不能相同的自定义校验函数
    const diffPwd = (rule, value, cb) => {
      if (value === this.pwdForm.old_pwd) {
        //   两值相等校验不通过
        cb(new Error('新旧密码不能相同'))
      } else {
        //   校验通过
        cb()
      }
    }
    //   新密码和确认新密码必须相同
    const samePwd = (rule, value, cb) => {
      if (value === this.pwdForm.new_pwd) {
        // 校验通过
        cb()
      } else {
        // 校验不通过
        cb(new Error('新密码和确认新密码必须相同'))
      }
    }

    return {
      // 表单数据对象
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      // 表单验证规则对象
      pwdRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
          }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
          },
          {
            //   自定义校验规则需要在data中的return上面定义
            validator: diffPwd,
            trigger: 'blur'
          }
        ],
        re_pwd: [
          { required: true, message: '请输入确认新密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15位的非空字符串',
            trigger: 'blur'
          },
          {
            validator: samePwd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //   修改密码
    submitPwd() {
      // 表单预校验
      this.$refs.pwdRef.validate(async (valid) => {
        // 验证不通过
        if (!valid) return
        // 验证通过后发起修改密码请求
        const { data: res } = await this.$http.patch(
          '/my/updatepwd',
          this.pwdForm
        )
        if (res.code === 0) {
          // 请求修改密码成功
          // 提示用户成功信息
          this.$message.success(res.message)
          // 清除 token
          localStorage.removeItem('token')
          // 跳转 login 登录页
          this.$router.push('/login')
        } else {
          // 提示用户失败信息
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
