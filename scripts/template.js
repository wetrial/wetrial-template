/**
 * pages 页面快速生成脚本
 * yarn page '文件名‘
 * example yarn page order/index
 */
const fs = require('fs');
// 获取用户输入的路径
const inputPath = process.argv[2];
// 生成的页面类型
const type = process.argv[3] || '-p';

// 处理help的情况
if (inputPath === '-h' || inputPath === '--help') {
  console.log('yarn new [path] [option]');
  console.log('用法1,生成页面：yarn new order/sales -p');
  console.log('用法2,生成页面(edit)：yarn new order/sales -p -e');
  console.log('用法3,生成组件：yarn new order/sales -c');
  console.log('用法4,生成业务组件：yarn new order/sales -bc');
  process.exit(0);
}

let pagePath = '';
let pageName = inputPath;
if (inputPath.indexOf('/') !== -1) {
  var lastSplitIndex = inputPath.lastIndexOf('/');
  pagePath = inputPath.substr(0, lastSplitIndex);
  pageName = inputPath.substr(lastSplitIndex + 1);
}

if (!pageName) {
  console.log('文件名不能为空');
  console.log('用法1,生成页面：yarn new order/sales -p');
  console.log('用法2,生成页面(edit)：yarn new order/sales -p -e');
  console.log('用法3,生成组件：yarn new order/sales -c');
  console.log('用法4,生成业务组件：yarn new order/sales -bc');
  process.exit(0);
}
// 兼容 \路径的写法
pagePath = pagePath.replace('\\', '/');
const supportTypes = ['-p', '-pe', '-c', '-bc'];

if (!supportTypes.includes(type)) {
  console.log(`option仅支持:${supportTypes.join(',')}`);
  process.exit(0);
}
if (type === '-p') {
  const pageType = process.argv[4] || '-l';
  // 编辑
  if (pageType === '-e') {
    require('./page-edit').generate({ pageName, pagePath });
  }
  // 列表
  else if (pageType === '-l') {
    require('./page').generate({ pageName, pagePath });
  }
} else if (type === '-c') {
  require('./component').generate({ pageName, pagePath });
} else {
  require('./bcomponent').generate({ pageName, pagePath });
}
// const componentName = pageName.substring(0, 1).toUpperCase() + pageName.substring(1);
