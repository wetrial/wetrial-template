### 改成脚手架项目需要修改的地方
1. wetrial别名
删除.umirc.ts文件 alias中wetrial别名  
删除tsconfig.json中paths的wetrial  
修改tsconfig中rootDir:"./"

2. 样式合并问题
删除.umirc.ts中的context.resourcePath.includes('example')