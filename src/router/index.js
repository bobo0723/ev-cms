import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Reg from "@/views/Reg/Reg.vue";
import Login from "@/views/Login/Login.vue";
import Main from "@/views/Main/Main.vue";
import Home from "@/views/menus/Home/Home.vue"

Vue.use(VueRouter);

// 把下面的代码粘贴到路由模块中对应的位置，即可防止路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 配置路由规则
const routes = [
  { path: "/reg", component: Reg },
  { path: "/login", component: Login },
  {
    path: "/",
    component: Main,
    redirect: "/home",
    children: [
      { path: "/home", component: Home }
    ]
  },
];

const router = new VueRouter({
  routes,
});

// 声明全局前置守卫，控制后台主页的访问权限
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    // 访问的是后台主页，需要判断是否登录
    // 获取本地的 token
    const token = localStorage.getItem("token")
    if (token) {
      // 已登录，直接放行
      next()
    } else {
      // 没登录，跳转到登录页
      next("/login")
    }
  } else {
    // 其他页面直接放行
    next()
  }
})

export default router;
