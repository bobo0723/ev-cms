import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Reg from "@/views/Reg/Reg.vue";
import Login from "@/views/Login/Login.vue";

Vue.use(VueRouter);

// 配置路由规则
const routes = [
  { path: "/reg", component: Reg },
  { path: "/login", component: Login },
];

const router = new VueRouter({
  routes,
});

export default router;
