const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  rules: {
    ...fabric.stylelint.rules,
    'order/properties-order': null,
    'declaration-bang-space-before': null,
    'function-name-case': null,
  },
};
