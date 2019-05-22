---
title: PagedQuery
subtitle: 分页、搜索、排序列表
order: 1
cols: 1
---

带记录的分页、搜索、排序列表页面。用户刷新页面任然可以保持刷新之前的搜索条件、页码、排序列，同时支持从子页面返回(浏览器回退、调用方法返回上级)任然保持记录状态

## API

### PagedQuery

| 参数               | 说明       | 类型                                 | 默认值       |
| ---------------- | -------- | ---------------------------------- | --------- |
| type             | dispatch的action     | string | - |
| page        | 默认显示第几页 | number                             | 1         |
| pageSize | 每页显示的条数  | number                      | 15         |
| record | 离开页面时候是否记录页面状态到sessionStorage  | boolean                      | true         |

### backRouter
#### 如果调用PagedQuery高阶组件的时候record为true，则可以通过调用次方法获取跳转的路由地址(会自动带上之前的查询状态)

| 参数   | 说明     | 类型        | 默认值 |
| ---- | ------ | --------- | --- |
| pathname | 要跳转的路径 | string | -   |
| newQuery  | 附带的查询参数 | object    | -   |
