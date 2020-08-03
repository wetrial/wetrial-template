import { notification, Progress } from 'antd';
import { get, post } from './request';
import React from 'react';

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
export const downloadFile = ({
  url,
  data,
  name,
  method = 'get',
  ext = getExtension(url),
  onDownloadProgress,
}) => {
  const req = method === 'get' ? get : post;
  return req(url, {
    successTip: false,
    responseType: 'arraybuffer',
    onDownloadProgress,
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

/**
 * 下载报告
 * @param {object} report 报告信息
 * @param {string} report.Id 报告Id
 * @param {string} report.SerialNo 报告编号
 */
export const downloadWithProgress = ({
  url,
  data,
  name,
  ext = getExtension(url),
  method = 'get',
  downloadTipKey = 'downloadTipKey',
}) => {
  notification.open({
    duration: null,
    key: downloadTipKey,
    message: '下载进度',
    description: <Progress width={40} type="line" percent={0} />,
  });

  downloadFile({
    url,
    data,
    name,
    ext,
    method,
    onDownloadProgress: (progressEvent) => {
      const maxSize = progressEvent.srcElement.getResponseHeader('size');
      const percent = Math.floor((progressEvent.loaded / maxSize) * 100 * 100) / 100;
      notification.open({
        duration: null,
        key: downloadTipKey,
        message: '下载进度',
        description: <Progress width={40} type="line" percent={percent} />,
      });
    },
  }).then(() => {
    notification.close(downloadTipKey);
  });
};
