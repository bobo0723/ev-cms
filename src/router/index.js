import Vue from 'vue'
import VueRouter from 'vue-router'

// 静态引入组件
// import Reg from '@/views/Reg/Reg.vue'
// import Login from '@/views/Login/Login.vue'
// import Main from '@/views/Main/Main.vue'
// import Home from '@/views/menus/Home/Home.vue'
// import UserInfo from '@/views/menus/Users/UserInfo.vue'
// import UserAvatar from '@/views/menus/Users/UserAvatar.vue'
// import UserPwd from '@/views/menus/Users/UserPwd.vue'
// import ArtCate from '@/views/menus/Article/ArtCate.vue'
// import ArtList from '@/views/menus/Article/ArtList.vue'

// 动态引入（魔法注释）
const Reg = () => import(/* webpackChunkName: "Reg" */ '@/views/Reg/Reg.vue')
const Login = () =>
  import(/* webpackChunkName: "Login" */ '@/views/Login/Login.vue')
const Main = () =>
  import(/* webpackChunkName: "Main" */ '@/views/Main/Main.vue')
const Home = () =>
  import(/* webpackChunkName: "Home" */ '@/views/menus/Home/Home.vue')
const UserInfo = () =>
  import(/* webpackChunkName: "UserInfo" */ '@/views/menus/Users/UserInfo.vue')
const UserAvatar = () =>
  import(
    /* webpackChunkName: "UserAvatar" */ '@/views/menus/Users/UserAvatar.vue'
  )
const UserPwd = () =>
  import(/* webpackChunkName: "UserPwd" */ '@/views/menus/Users/UserPwd.vue')
const ArtCate = () =>
  import(/* webpackChunkName: "ArtCate" */ '@/views/menus/Article/ArtCate.vue')
const ArtList = () =>
  import(/* webpackChunkName: "ArtList" */ '@/views/menus/Article/ArtList.vue')

Vue.use(VueRouter)

// 把下面的代码粘贴到路由模块中对应的位置，即可防止路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// 配置路由规则
const routes = [
  { path: '/reg', component: Reg },
  { path: '/login', component: Login },
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      // 首页 子路由
      { path: '/home', component: Home },
      // 基本资料 子路由
      { path: '/user-info', component: UserInfo },
      // 更换头像 子路由
      { path: '/user-avatar', component: UserAvatar },
      // 重置密码
      { path: '/user-pwd', component: UserPwd },
      // 文章分类 子路由规则
      { path: '/art-cate', component: ArtCate },
      // 文章列表 子路由规则
      { path: '/art-list', component: ArtList }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 声明全局前置守卫，控制后台主页的访问权限
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    // 访问的是后台主页，需要判断是否登录
    // 获取本地的 token
    const token = localStorage.getItem('token')
    if (token) {
      // 已登录，直接放行
      next()
    } else {
      // 没登录，跳转到登录页
      next('/login')
    }
  } else {
    // 其他页面直接放行
    next()
  }
})

export default router
