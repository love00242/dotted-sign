/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:tailwindcss/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "vue/multi-word-component-names": "off",
    "indent": ["error", 2, { "SwitchCase": 1 }]
  },
};
