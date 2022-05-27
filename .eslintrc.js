module.exports = {
  // 表示当前目录即为根目录，ESLint规则被应用到该目录下
  root: true,
  // env 表示启用 ESLint 检测的环境
  env: {
    // 在node环境下启动EsLint检测
    node: true
  },
  // EsLint 中基础配置需要继承的配置
  extends: ['plugin:vue/essential', '@vue/standard'],
  // 解析器
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  // 需要修改的启用规则及其各自的错误级别
  /*
    错误级别分为三种：
    "off" 或 0 - 关闭规则
    "warn" 或 1 - 开启规则，使用警告级别的错误，warn（不会导致程序退出）
    "error" 或 2 - 开启规则，使用错误级别的错误：error（当被触发的时候，程序会报错)
  */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 去掉函数名后面要加一个空格的规则
    'space-before-function-paren': 'off',
    // 去掉 vue 组件名称必须是多个单词组成的规则
    'vue/multi-word-component-names': 'off'
  }
}
