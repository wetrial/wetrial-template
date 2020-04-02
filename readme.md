## 模块化开发

- 模块的所有代码都在 src/modules 文件夹下，一个模块一个子文件夹

比如，有 blog 和 project 模块

```bash
pages
modules
   |-blog
      |assets
      |dashboard
      |...
      |-index.ts
      |-package.json
   |-project
```

- 一个模块必须包含

  1. package.json 记录该模块需要额外安装的包
  2. index.ts 包含路由、权限的定义

- 开发注意
  - 模块内部相对路径引用(也可以用模块别名`@modules/xxx/xxxx`)
  - 如果引用外部的尽量使用别名`@/`形式
  - 如果模块安装了外部包，请相应的在 package.json 中手动添加记录，否则宿主中无法安装此包
  - 请勿修改非模块级的代码比如当前模块是 blog-->不能修改 src/modules/blog 文件夹以外的文件，打包的时候只会将模块文件夹打包(对应此处的 blog 文件夹)

## 宿主应用安装模块包

### 使用方式

- 添加模块包 如:`yarn add @wt/account`
- 运行模块安装脚本 `yarn run module`  
  将会吧对应的模块包安装到 modules 目录下
- 在 config/routes 中添加该模块的路由
- 在 access 中添加相应的权限
- 启动

### 注意事项

- 宿主应用中模块包文件夹会不会添加到 git 中，所以请勿对宿主中的模块代码做修改

## 宿主移除模块包

- 移除模块包 如：`yarn remove @wt/account`
- 在 config/routes 中移除模块的路由
- 删除 access 中使用的权限
