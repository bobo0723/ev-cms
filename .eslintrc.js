module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 去掉函数名后面要加一个空格的规则
    'space-before-function-paren': 'off',
    // 去掉 vue 组件名称必须是多个单词组成的规则
    'vue/multi-word-component-names': 'off'
  }
}
