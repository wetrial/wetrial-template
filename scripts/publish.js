// 拷贝src/pages/Blogs文件夹
const fs = require('fs');
const path = require('path');

const package = require('../package.json');
const packageName = package.name.split('/').reverse()[0];

// npm包发布目录
const distABSPath = path.resolve('dist');
if (fs.existsSync(distABSPath)) {
  rimraf(distABSPath);
}

// 模块文件夹，modules里面的模块文件夹名
const modulesABSPath = path.resolve(`./src/modules/${packageName}`);

copyFolderRecursiveSync(modulesABSPath, distABSPath, false);

/**
 * 删除指定文件夹
 * @param {string} dir_path 要删除的目录
 */
function rimraf(dir_path) {
  if (fs.existsSync(dir_path)) {
    fs.readdirSync(dir_path).forEach(function(entry) {
      var entry_path = path.join(dir_path, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        rimraf(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(dir_path);
  }
}

/**
 * 复制文件
 * @param {要复制的文件路径} source
 * @param {目标路径} target
 */
function copyFileSync(source, target) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }
  mkdirsSync(target);

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

/**
 *复制文件夹
 * @param {string} source 要复制的路径
 * @param {string} target 存放的路径
 * @param {boolean} createFolder 是否保留文件名称,比如 c:/list==>c:/project 如果保留则会变成 c:/project/list
 */
function copyFolderRecursiveSync(source, target, createFolder) {
  let targetFolder = target;
  if (createFolder) {
    targetFolder = path.join(target, path.basename(source));
  }
  //check if folder needs to be created or integrated

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach(file => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder, true);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

/**
 * 创建文件
 * @param {string} dirname 路径
 */
function mkdirsSync(dirname) {
  //console.log(dirname);
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
