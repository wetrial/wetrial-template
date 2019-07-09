import { delay } from 'roadhog-api-doc';
import Permissions from '../config/permissions';
import { deepGetValue } from '../src/utils';
import responseWrapper, { errorWrapper, authorizeIntercept } from './base';

function getCurrentUser({ response }) {
  const current = {
    name: 'XXG',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '码农',
    group: '湖南微试云-前端技术团队-XXG',
    tags: [
      { key: '0', label: '很有想法的' },
      { key: '1', label: '专注前后端' },
      { key: '2', label: '海纳百川' },
    ],
  };
  response.json(responseWrapper(current));
}

// 用户登录
function login({ request, response }) {
  const { username, password } = request.body;
  if (username === 'admin' || password === 'Abcd1234') {
    const loginResult = {
      token: '0000000000000',
      permissions: deepGetValue(Permissions),
    };
    response.json(responseWrapper(loginResult));
  } else {
    response.status(500).send(errorWrapper({}, false, '用户名或者密码错误!'));
  }
}

// 注销登录
function loginout({ response }) {
  response.json(responseWrapper({}));
}

// 获取用户权限列表
function getCurrentPermissions({response}){
  const permissions=deepGetValue(Permissions);
  response.json(responseWrapper(permissions));
}

// 调用 delay 函数，统一处理
export default delay(
  {
    'GET /api/user/getCurrent': (req, res) =>authorizeIntercept({ request: req, response: res }, getCurrentUser),
    'POST /api/user/login': (req, res) =>login({ request: req, response: res }),
    'GET /api/user/logout': (req, res) => loginout({ response: res }),
    'GET /api/user/getCurrentPermissions': (req, res) =>authorizeIntercept({ request: req, response: res }, getCurrentPermissions),
  },
  1500,
);
