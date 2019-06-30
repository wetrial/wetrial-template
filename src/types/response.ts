/**
 * 约定后台返回的方法的内容体
 */
export interface IResponse {
  error: any;
  result: object;
  success: boolean;
  targetUrl: any;
  unAuthorizedRequest: boolean;
}
