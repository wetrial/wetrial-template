const fs = require('fs');

/**
 * 根据配置生成页面
 * @param {object} option 配置项
 * @param {string} option.pageName 名称
 * @param {string} option.pagePath 页面路径
 */
function generate(option) {
  const { pageName, pagePath } = option;
  let modelNamespace = pageName;
  if (pagePath) {
    modelNamespace = `${pagePath.replace('/', '_')}_${pageName}`;
  }
  // 处理首字母小写的问题
  modelNamespace = modelNamespace
    .split('_')
    .map(item => item.substring(0, 1).toLocaleLowerCase() + item.substring(1))
    .join('_');

  const PascalPageName = pageName.substring(0, 1).toUpperCase() + pageName.substr(1);

  const pageTemplate = `
import React from 'react';
import {PureComponent} from 'wetrial';

import { I${PascalPageName}Props, I${PascalPageName}State } from './props'
import styles from './index.less'

class ${PascalPageName} extends PureComponent<I${PascalPageName}Props,I${PascalPageName}State > {
    render(){
        return <div className={styles.container}>${PascalPageName}</div>
    }
}
export default ${PascalPageName}
`;

  // scss 模板
  const lessTemplate = `@import '~themes/index.less';   
.container{

}`;

  // 属性模板
  const interfaceTemplate = `
/**
 * ${pageName} state 参数类型
 */
export interface I${PascalPageName}State {

}

/**
 * ${pageName} props 参数类型
 */
export interface I${PascalPageName}Props{

}`;

  const ParcalPath = pagePath
    .split('/')
    .map(item => item.substring(0, 1).toUpperCase() + item.substr(1))
    .join('/');
  // 检测目录、文件是否存在,存在跳过生成
  const folderFullPath = `./src/components/${pagePath ? ParcalPath + '/' : ''}${PascalPageName}`;
  const utils = require('./utils');
  const exists = utils.checkExists(
    `${folderFullPath}/index.tsx`,
    `${folderFullPath}/index.less`,
    `${folderFullPath}/props.ts`,
  );
  if (exists) {
    console.log('检测到已经存在部分文件，生成操作已经取消....');
    process.exit(0);
  }

  fs.mkdirSync(folderFullPath, { recursive: true }); // mkdir $1
  process.chdir(folderFullPath); // cd $1

  fs.writeFileSync(`index.tsx`, pageTemplate); //tsx
  fs.writeFileSync(`index.less`, lessTemplate); // scss
  fs.writeFileSync(`props.ts`, interfaceTemplate); // interface
  process.exit(0);
}

module.exports = {
  generate: generate,
};
