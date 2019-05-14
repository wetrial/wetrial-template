### 常用知识
#### lodash 库
| 方法 | 说明 |案例
|--|--| --|
|map|可以遍历数组、可以遍历对象|map({name:'zs'}, (itemKey, itemValue) => ({ Id: itemKey, Name: itemValue }))==>[{Id:'name',Name:'zs'}];
|omit|获取剔除某个属性的对象| omit({age:23,name:'zs'}, 'name') ==>{age:23};
|values| 提取object中的值变成数组| values({name:'aa',age:23}) ==> ['aa',23]
|get| 从object中获取值，支持嵌套| get({name:{name1:'33'},age:23},'name.name1') ==> '33'
|find|查找符合条件的第一条数据、还有findLast |find([{age:23},{age:30}], item => item.value === 23)==>{age:23};
|reduce|将数组转换为json对象|reduce([{label:'001',value:'v'}],(result, param) => {result[param.value] = param.label;return result;},{});==>{v:'001'}
|assign|对象&&数组合并| assign(obj, {value: 123}) ==> obj里面会增加value
|compact|返回数组中移除false(null、undefined、'')的值| compact([0,1])==>[1]
|Debounce|使用lodash-decorators/debounce 提供延时功能 推荐以注解形式使用|
|Bind| 使用lodash-decorators/bind 配合Debounce使用|
|isEqual| 判断两个对象是否相等 深比较| isEqual({a:2},{a:2})==>true



### 更新
yarn global add npm-check-updates
ncu --upgrade --upgradeAll && yarn upgrade
