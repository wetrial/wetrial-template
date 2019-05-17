/**
 * 未登录异常
 */
export class UnAuthorizedException extends Error {}

/**
 * 后台抛出的异常信息
 */
export class UserFriendlyException extends Error{
    code:string;
    details:string;
    message:string;
    validationErrors:string;
}