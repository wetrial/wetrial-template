/**
 * 构造mock数据，用于外层包装
 * @param result 响应的记过数据
 * @param success 是否成功
 * @param unAuthorizedRequest 是否未授权
 */
export default function responseWrapper(
  result: any,
  success = true,
  unAuthorizedRequest = false,
  error = null,
) {
  return {
    error,
    result,
    success,
    targetUrl: null,
    unAuthorizedRequest,
  };
}

/**
 * 服务器错误返回
 * @param result 结果
 * @param error 错误消息
 */
export function errorWrapper(result: any, unAuthorizedRequest = false, error) {
  return {
    error,
    result,
    success: false,
    targetUrl: null,
    unAuthorizedRequest,
  };
}

/**
 * 验证拦截器，检测是否登录
 * @param opt {request,response}
 * @param dataFunc 数据api
 */
export function authorizeIntercept(opt, dataFunc) {
  const { request, response } = opt;
  // request.get api参考 express@4 http://expressjs.com/zh-cn/api.html#req.get
  if (request && request.get('Authorization') && request.get('Authorization') !== 'null') {
    return dataFunc(opt);
  } else {
    return response.json(responseWrapper({}, false, true, '登录已过期！'));
  }
}
