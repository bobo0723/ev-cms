<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <!-- 表单 -->
    <el-form
      :model="userForm"
      :rules="userRules"
      ref="userRef"
      label-width="100px"
    >
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="userForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="userForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交修改</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserInfo',
  data() {
    return {
      // 表单数据对象
      userForm: {
        username: '',
        nickname: '',
        email: ''
      },
      // 表单验证规则对象
      userRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '昵称必须是1-10位的非空字符串',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //   提交修改
    submit() {
      // 表单预校验
      this.$refs.userRef.validate(async (valid) => {
        //   失败
        if (!valid) return
        //   成功以后发起请求
        const { data: res } = await this.$http.put(
          '/my/userinfo',
          this.userForm
        )
        if (res.code === 0) {
          // 请求成功 //提示用户
          this.$message.success(res.message)
          //   重新调用一下 全局获取用户信息的接口
          this.$store.dispatch('getUserInfo')
        } else {
          // 请求失败 //提示用户
          this.$message.error(res.message)
        }
      })
    },

    //   重置
    reset() {
      //   resetFields 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.userRef.resetFields() // 这里重置以后边空了
      //   重新赋值
      this.userForm = Object.assign({}, this.userInfo)
    }
  },
  created() {
    // nicknamenicknamenickname

    // this.userForm.username = this.userInfo.username
    // this.userForm.nickname = this.userInfo.nickname
    // this.userForm.email = this.userInfo.email
    // 直接这样就指向一个地方了, 复杂类型不能这样, 不然直接就能从组件修改全局的值了
    // this.userForm = this.userInfo
    // 使用浅拷贝解决此问题
    this.userForm = Object.assign({}, this.userInfo)
  },
  //   监听当前页面的数据变化
  watch: {
    //   刷新页面时接口是异步的，后执行，所以created里面的浅拷贝会先执行，拿不到数据，在这监听接口数据拿到后，再做一次拷贝
    userInfo() {
      this.userForm = Object.assign({}, this.userInfo)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
