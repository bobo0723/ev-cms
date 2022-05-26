import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: {},
  },
  getters: {},
  // 只能用mutations来修改全局数据state中的值
  mutations: {
    // 修改用户信息
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    // 获取用户信息 - 异步
    getUserInfo(ctx) {
      // 发起请求
      axios
        .get("/my/userinfo", {
          // headers: {
          //   Authorization: localStorage.getItem("token"),
          // },
        })
        .then(({ data: res }) => {
          // console.log(res);
          if (res.code === 0) {
            // 使用ctx.commit调用mutations中的方法
            ctx.commit("updateUserInfo", res.data);
          }
        })
        .catch(() => {});
    },
  },
  modules: {},
});
