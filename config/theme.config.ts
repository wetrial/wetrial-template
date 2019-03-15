const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

const themePath = path.resolve(__dirname, '../src/styles/theme.less')
const theme = lessToJs(fs.readFileSync(themePath, 'utf8'));

export default theme;