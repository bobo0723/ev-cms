<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <!-- 默认空白头像 -->
      <img
        src="../../../assets/images/avatar.jpg"
        alt=""
        class="preview"
        v-if="avatar === ''"
      />
      <!-- 用户选择的头像 -->
      <img :src="avatar" alt="" class="preview" v-else />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input
          type="file"
          ref="fileRef"
          style="display: none"
          accept="image/*"
          @change="fileChange"
        />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg"
          >选择图片</el-button
        >
        <el-button
          type="success"
          icon="el-icon-upload"
          :disabled="avatar === ''"
          @click="uploadImg"
          >上传头像</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'UserAvatar',
  data() {
    return {
      avatar: ''
    }
  },
  methods: {
    // 选择图片点击事件
    chooseImg() {
      this.$refs.fileRef.click()
    },
    // 选择图片
    fileChange(e) {
      // console.log(e.target.files)
      const files = e.target.files
      if (files.length === 0) {
        // console.log('没有选择图片')
        return
      } else {
        // console.log('选择了图片')
        // console.log(files[0])
        // 把选中的图片转换成 base64 的格式
        const fr = new FileReader()
        fr.readAsDataURL(files[0]) // 异步的转换成base64位的格式
        //需要用 fr.onload 回调函数异步拿到转换后的文件
        fr.onload = (e) => {
          // console.log(e.target.result)
          this.avatar = e.target.result
        }
      }
    },
    // 上传头像
    async uploadImg() {
      const { data: res } = await this.$http.patch('/my/update/avatar', {
        avatar: this.avatar
      })
      // console.log(res.message)
      if (res.code === 0) {
        // 上传头像成功 // 提示成功
        this.$message.success(res.message)
        // 重新调用 全局获取用户信息接口
        this.$store.dispatch('getUserInfo')
      } else {
        // 上传失败 // 提示失败
        this.$message.error(res.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  width: 350px;
  height: 350px;
  object-fit: cover;
}
</style>
