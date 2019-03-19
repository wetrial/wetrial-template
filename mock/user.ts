import responseWrapper,{errorWrapper} from './base';
import { delay } from 'roadhog-api-doc';

function getCurrentUser(_, res) {
  const current={
    name: 'XXG',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
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
  res.json(responseWrapper(current));
}

// 用户登录
function login(req, res) {
  const { username, password } = req.body;
  if (username === 'admin' || password === 'Abcd1234') {
    const loginResult={}
    res.json(responseWrapper({loginResult}));
  } else {
    res.status(500).send(errorWrapper({},'用户名或者密码错误!'));
  }
}

function logout(_, res) {
  res.json(responseWrapper({}));
}


// 调用 delay 函数，统一处理
export default delay({
  'GET /api/user/getCurrent': getCurrentUser,
  'POST /api/user/login': login,
  'GET /api/user/logout': logout
}, 1000);
