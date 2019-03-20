import responseWrapper from './base';
import Mock from 'mockjs';
import { delay } from 'roadhog-api-doc';

function generateTodos(){
  const todos = Mock.mock({
    totalCount: 10,
    "items|10": [
      {
        "id": '@guid',
        "avatar|+1": [
          "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
          "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png"
        ],
        "title": '@csentence(5,30)',
        "datetime": '@datetime("yyyy-MM-dd")',
        "type": 'todo',
        "read": false
      }
    ]
  });
  return todos;
}

function generateMessages(){
  const messages = Mock.mock({
    totalCount: 10,
    "items|10": [
      {
        "id": '@guid',
        "avatar|+1": [
          "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
          "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png"
        ],
        "title": '@csentence(5,30)',
        "description":'@csentence(10,40)',
        "datetime": '@datetime("yyyy-MM-dd")',
        "type": 'message',
        "clickClose":'@boolean'
      }
    ]
  })
  return messages;
}

function  generateNotifys(){
  const notify = Mock.mock({
    totalCount: 10,
    "items|10": [
      {
        "id": '@guid',
        "avatar|+1": [
          "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
          "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
          "https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png",
          "https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png"
        ],
        "title": '@csentence(5,30)',
        "description":'@csentence(10,40)',
        "extra|+1":[
          '进行中','马上到期','已耗时 8 天','未开始'
        ],
        "status|+1":[
          'processing','urgent','doing','todo'
        ],
        "datetime": '@datetime("yyyy-MM-dd")',
        "type": 'message',
        "clickClose":'@boolean'
      }
    ]
  })
  return notify;
}



const getTodos=(req,res)=>{
  res.json(responseWrapper(generateTodos()));
}

const getMessages=(req,res)=>{
  res.json(responseWrapper(generateMessages()));
}

const getNotifys=(req,res)=>{
  res.json(responseWrapper(generateNotifys()));
}

const getAll = (req, res) => {
  const todos=generateTodos();
  const messages=generateMessages();
  const notifys=generateNotifys();

  res.json(responseWrapper({
    todos,
    messages,
    notifys
  }));
}

// 调用 delay 函数，统一处理
export default delay({
  'GET /api/message/getAll': getAll,
  'GET /api/message/getMessages':getMessages,
  'GET /api/message/getTodos':getTodos,
  'GET /api/message/getNotifys':getNotifys,
}, 1000);
