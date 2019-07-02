
import { delay } from 'roadhog-api-doc';
import Mock from 'mockjs';
import responseWrapper, { authorizeIntercept } from './base';

const List = [];

for (let i = 0; i < 8; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      title: '@ctitle',
      content: '@cparagraph(3, 5)',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      updateTime: '@date("yyyy-MM-dd HH:mm:ss")',
      star: 123,
      like: 220,
      message: 450,
    }),
  );
}

function getList({ response }) {
  response.json(responseWrapper(List));
}

// 调用 delay 函数，统一处理
export default delay(
  {
    'GET /api/article/list': (req, res) =>
      authorizeIntercept({ request: req, response: res }, getList),
  },
  1000,
);
