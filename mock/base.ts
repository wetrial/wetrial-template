/**
 * 构造mock数据，用于外层包装
 * @param result 响应的记过数据
 * @param success 是否成功
 * @param unAuthorizedRequest 是否未授权
 */
export default function responseWrapper(result: any, success = true, unAuthorizedRequest = false,error=null) {
    return {
        error,
        result,
        success: true,
        targetUrl: null,
        unAuthorizedRequest: false
    }
}


/**
 * 服务器错误返回
 * @param result 结果
 * @param error 错误消息
 */
export function errorWrapper(result:any,error){
    return {
        error,
        result,
        success: false,
        targetUrl: null,
        unAuthorizedRequest: false
    }
}