module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {},
  'import/resolver': {
    alias: {
      map: [['~', './src/']],
      extensions: ['.ts', '.js', '.tsx']
    }
  }
}
