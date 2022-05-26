<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img
              :src="userInfo.user_pic"
              alt=""
              class="avatar"
              v-if="userInfo.user_pic"
            />
            <img src="../../assets/logo.png" alt="" class="avatar" v-else />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1">
            <i class="el-icon-s-operation"></i>基本资料
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-camera"></i>更换头像
          </el-menu-item>
          <el-menu-item index="1-3">
            <i class="el-icon-key"></i>重置密码
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="out">
          <i class="el-icon-switch-button"></i>退出
        </el-menu-item>
      </el-menu>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div style="color: #fff; margin-top: 20px"></div>
        <!-- 用户信息区域 -->
        <div class="user-box">
          <img :src="userInfo.user_pic" alt="" v-if="userInfo.user_pic" />
          <img src="../../assets/logo.png" alt="" v-else />
          <span>欢迎 {{ userInfo.username }}</span>
        </div>
        <!-- 侧边栏导航区域 -->
        <!-- default-active：默认哪个菜单被激活, 哪个index的菜单会高亮
        background-color：侧边栏导航背景颜色
        text-color：文字颜色
        active-text-color：被激活菜单的文字颜色
        unique-opened：只允许展开一个二级菜单 -->
        <el-menu
          default-active="/home"
          class="el-menu-vertical-demo"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <template v-for="item in menus">
            <!-- 不包含子菜单的“一级菜单” -->
            <el-menu-item
              :index="item.indexPath"
              :key="item.indexPath"
              v-if="item.children === null"
            >
              <i :class="item.icon"></i>
              {{ item.title }}
            </el-menu-item>
            <!-- 包含子菜单的“一级菜单” -->
            <el-submenu :index="item.indexPath" :key="item.indexPath" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <!-- 循环渲染“二级菜单” -->
              <el-menu-item
                v-for="subItem in item.children"
                :index="subItem.indexPath"
                :key="subItem.indexPath"
              >
                <i :class="subItem.icon"></i>
                {{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <!-- 右侧区域 -->
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Main',
  data() {
    return {
      menus: []
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 退出用户点击事件
    out() {
      // 1. 点击退出询问用户
      this.$confirm('您确认退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 当用户点击确定时走 then
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          // 2. 清除token
          localStorage.removeItem('token')
          // 3. 跳转到登录页
          this.$router.push('/login')
        })
        .catch(() => {
          // 当用户点击取消时走 catch
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    },
    // 定义一个请求获取左侧菜单列表的方法
    async getMenus() {
      const { data: res } = await this.$http.get('/my/menus', {
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      })
      if (res.code === 0) {
        this.menus = res.data
        // console.log(this.menus)
      }
    }
  },
  created() {
    // 使用this.$store.dispatch调用vuex中的actions
    this.$store.dispatch('getUserInfo')
    // 调用获取左侧菜单列表方法
    this.getMenus()
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-box {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    user-select: none;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      margin-right: 15px;
      object-fit: cover;
    }
    span {
      color: white;
      font-size: 12px;
    }
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
