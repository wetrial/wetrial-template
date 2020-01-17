// 拷贝src/pages/Blogs文件夹
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const package = require('../package.json');
const packageName = package.name.split('/').reverse()[0];

const esABSPath = path.resolve('./npms/dist');
if (fs.existsSync(esABSPath)) {
  rimraf(esABSPath);
}

// 模块文件夹，pages里面的模块文件夹名
const pagesABSPath = path.join(esABSPath, `pages/${packageName}`);
if (!fs.existsSync(pagesABSPath)) {
  mkdirsSync(pagesABSPath);
}
const moduleFolder = path.join(esABSPath, `config/modules`);
if (!fs.existsSync(moduleFolder)) {
  mkdirsSync(moduleFolder);
}
copyFolderRecursiveSync(path.resolve(`./src/pages/${packageName}`), pagesABSPath);
// 配置文件,对应config/modules/[模块文件名]
fs.copyFileSync(
  path.resolve(`./config/modules/${packageName}.ts`),
  path.join(esABSPath, `config/modules/${packageName}.ts`),
);

delete package['devDependencies'];
delete package['optionalDependencies'];
delete package['scripts'];
// peerDependencies为需要合并到主应用的包
package.peerDependencies = package.dependencies;
delete package['dependencies'];
fs.writeFileSync(
  path.resolve(esABSPath, '../package.json'),
  prettier.format(JSON.stringify(package), {
    parser: 'json',
  }),
);

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

function copyFileSync(source, target) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function(file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

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
