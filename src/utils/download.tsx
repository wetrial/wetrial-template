import { LoadingOutlined } from '@ant-design/icons';
import { notification, Progress, Spin } from 'antd';
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
  /**
   * 下载的url地址
   */
  url: string;
  /**
   * 发送的数据
   */
  data?: any;
  /**
   * 客户端提示保存的文件名(不需要后缀)
   */
  name: string;
  /**
   * 请求方式
   */
  method?: 'GET' | 'POST';
  /**
   * 文件扩展名,如:.exe
   */
  ext?: string;
  /**
   * 提示窗口的key
   */
  key?: string | false;
  /**
   * 启用后端处理过程中的温馨提示窗口
   */
  enableProcessTipe?: boolean;
}

interface IDownLoadTip {
  /**
   * 提示窗口唯一标识key
   */
  key?: boolean | string;
  /**
   * 下载进度
   */
  percent?: number;
  /**
   * 启用后端处理过程中的温馨提示窗口
   */
  enableProcessTipe?: boolean;
}

function downloadTip({ key, percent, enableProcessTipe }: IDownLoadTip) {
  if (key && typeof key === 'string') {
    if (percent === undefined && enableProcessTipe === true) {
      notification.open({
        duration: null,
        key,
        message: '正在处理...',
        icon: <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />,
        description: '正在拼了命的处理，请耐心等待(请勿关闭页面或者重复刷新页面)',
      });
    } else {
      notification.open({
        duration: null,
        key,
        message: '正在下载...',
        description: <Progress width={40} type="line" percent={percent} />,
      });
    }
    if (percent === 100) {
      notification.close(key);
    }
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
  enableProcessTipe,
}: IDownLoad) => {
  downloadTip({ key, enableProcessTipe });
  const req = method === 'POST' ? post : get;
  return req(url, {
    successTip: false,
    responseType: 'arraybuffer',
    onDownloadProgress: (progressEvent) => {
      const maxSize = progressEvent.total;
      const percent = Math.floor((progressEvent.loaded / maxSize) * 100 * 100) / 100;
      downloadTip({
        key,
        percent,
        enableProcessTipe,
      });
    },
    maxContentLength: Number.MAX_SAFE_INTEGER,
    data,
  })
    .then((res) => {
      if (res.headers && res.headers['content-type'].startsWith('application/json')) {
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
        return res;
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
