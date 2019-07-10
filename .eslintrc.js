const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/class-name-casing': 0,
    "@typescript-eslint/prefer-interface":0,
    "@typescript-eslint/no-explicit-any":0,
    "space-infix-ops":0,
    "eslint-comments/no-unlimited-disable":0,
    "space-infix-ops":0,
    "no-useless-return":0,
    "comma-spacing":0,
    "import/no-extraneous-dependencies":0,
    "comma-dangle":0,
    "no-trailing-spaces":0,
    "object-curly-spacing":0,
    "no-plusplus":0,
    "no-else-return":0,
    "arrow-body-style":0,
    "eol-last":0,
    "import/no-unresolved": [
      "error",
      {
        "ignore": ['@config/','@/','@wetrial']
      }
    ],
    "key-spacing":0,
    "space-before-blocks":0,
    "semi":0,
    "keyword-spacing":0,
    "arrow-spacing":0,
    "brace-style":0
  },
  globals: {
    page: true,
  },
};