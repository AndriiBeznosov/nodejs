module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['eslint-plugin-prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 'no-console': 'error',
    'no-unused-vars': 'of',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
