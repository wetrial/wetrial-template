import store from "store";

const preFix = 'WETRIAL';

const TokenName = `${preFix}.TOKEN`;
const PermisssName = `${preFix}.PERMISSIONs`


const storeWithExp = {
    set: (key: string, val: any, exp?: number) => {
        store.set(key, { val, exp, time: new Date().getTime() })
    },
    get: (key: string) => {
        const info = store.get(key)
        if (!info) { return null }
        if (new Date().getTime() - info.time > info.exp) { return null }
        return info.val
    },
    remove: (key: string) => {
        store.remove(key);
    },
    clear: () => {
        store.clearAll();
    }
}

/**
 * 存储token
 * @param {string} token 要存储的token值
 * @param {number} exp 过期时长 秒
 */
export const setToken = (token: string, exp?: number): void => {
    storeWithExp.set(TokenName, token, exp);
}

/**
 * 获取当前用户的token
 */
export const getToken = (): string => {
    return storeWithExp.get(TokenName);
}

/**
 * 清除当前用户的token
 */
export const clearToken = (): void => {
    storeWithExp.remove(TokenName);
}

/**
 * 获取当前用户的权限列表
 */
export const getPermissions = (): string[] => {
    return storeWithExp.get(PermisssName);
}

/**
 * 设置当前用户的权限列表
 */
export const setPermissions = (permissions: string[]): void => {
    storeWithExp.set(PermisssName, permissions);
}

export default storeWithExp;