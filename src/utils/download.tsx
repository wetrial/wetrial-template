import { notification, Progress } from 'antd';
import React from 'react';
import { get, post } from './request';

/**
 * 根据文件名获取后缀名称
 * @param {string} fileName 文件名
 */
export const getExtension = (fileName = '') => {
  const lastDot = fileName.lastIndexOf('.');
  if (lastDot === -1) {
    return '';
  }
  return fileName.substring(lastDot);
};

export const getIconType = (extension) => {
  let iconType = 'icon-file';
  switch (extension) {
    case '.zip':
    case '.rar':
    case '.7z':
      iconType = 'icon-yasuowenjian';
      break;
    case '.png':
    case '.jpg':
      iconType = 'icon-image';
      break;
    case '.txt':
      iconType = 'icon-txt';
      break;
    case '.md':
      iconType = 'icon-markdown';
      break;
    case '.xml':
      iconType = 'icon-xml';
      break;
    case '.pdf':
      iconType = 'icon-pdf';
      break;
    case '.doc':
    case '.docx':
      iconType = 'icon-word';
      break;
    case '.xls':
    case '.xlsx':
      iconType = 'icon-excel';
      break;
    case '.ppt':
    case '.pptx':
      iconType = 'icon-ppt';
      break;
    default:
      break;
  }
  return iconType;
};

//   export const downloadFileUseForm = ({ url, data }) => {
//     const fileContainer = document.getElementById('____tempDownLoadFile');
//     ReactDOM.render(
//       <form action={url} method={data ? 'post' : 'get'} target="_blank">
//         {data && Object.keys(data).map(key => <input name={key} value={data[key]} />)}
//       </form>,
//       fileContainer
//     );

//     /* eslint-disable */
//     ReactDOM.findDOMNode(fileContainer)
//       .querySelector('form')
//       .submit();
//     ReactDOM.unmountComponentAtNode(fileContainer);
//   };

export interface IDownLoad {
  url: string;
  data?: any;
  name: string;
  method?: 'GET' | 'POST';
  ext?: string;
  key?: string | false;
}

function downloadTip(key, message, description?) {
  if (key) {
    notification.open({
      duration: null,
      key,
      message,
      description,
    });
  }
}

/**
 * 下载
 */
const download = ({
  url,
  data,
  name,
  method = 'GET',
  ext = getExtension(url),
  key = '__downloadTipKey',
}: IDownLoad) => {
  downloadTip(key, '正在处理...');

  const req = method === 'POST' ? post : get;
  return req(url, {
    successTip: false,
    responseType: 'arraybuffer',
    onDownloadProgress: (progressEvent) => {
      const maxSize = progressEvent.total;
      const percent = Math.floor((progressEvent.loaded / maxSize) * 100 * 100) / 100;
      downloadTip(key, '下载进度', <Progress width={40} type="line" percent={percent} />);
    },
    maxContentLength: 2048000,
    data,
  })
    .then((res) => {
      if (res.headers['content-type'].startsWith('application/json')) {
        let responseJson;
        if ('TextDecoder' in window) {
          // Decode as UTF-8
          const dataView = new DataView(res.data);
          const decoder = new TextDecoder('utf8');
          responseJson = JSON.parse(decoder.decode(dataView));
        } else {
          // Fallback decode as ASCII
          // @ts-ignore
          const decodedString = String.fromCharCode.apply(null, new Uint8Array(res.data));
          responseJson = JSON.parse(decodedString);
        }
        notification.warn({
          message: '警告',
          description: responseJson.Message,
        });
      } else {
        return res.data;
      }
    })
    .then((arrayBuffer) => {
      if (arrayBuffer) {
        const saveName = `${name}${ext}`;
        // IE11
        if ('msSaveOrOpenBlob' in window.navigator) {
          const blob = new Blob([arrayBuffer]);
          window.navigator.msSaveOrOpenBlob(blob, saveName);
        } else {
          const dataView = new DataView(arrayBuffer);
          const blob = new Blob([dataView]);
          const a = document.createElement('a');
          a.href = window.URL.createObjectURL(blob);
          a.download = saveName;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      }
    });
};

export default download;
