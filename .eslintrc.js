module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    'prettier',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
