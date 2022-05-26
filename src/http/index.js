// 引入 axios
import router from "@/router";
import axios from "axios";
// 为响应拦截器引入 router 使用 push

// 为请求设置根路径
axios.defaults.baseURL = "http://www.liulongbin.top:3008";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
    // console.log(config);
    // url是一个字符串
    // 字符串中有一个方法是startsWith来判断这个字符串是以什么开头的，是返回true
    if (config.url.startsWith("/my")) {
      // 在haeders中添加 需要请求的请求头 Authorization
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 请求成功时（状态码为 200），触发的回调函数，response 是“成功的结果”
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 请求失败时（状态码不是 200），触发的回调函数，error 是“失败的结果”
    // 对响应错误做点什么
    // 处理 token 失效的操作
    if (error.response.status === 401) {
      // 清空 token
      localStorage.removeItem("token");
      // 跳转到登录页
      router.push("/login");
    }
    return Promise.reject(error);
  }
);
// 导出 axios
export default axios;
