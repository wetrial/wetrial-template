const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  rules: {
    ...fabric.stylelint.rules,
    'order/properties-alphabetical-order': null,
    'order/properties-order':null
  },
};
