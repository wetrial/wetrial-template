import { UnAuthorizedException } from '@/wetrial/exception';
import { notification } from 'antd';

export const dva = {
  config: {
    onError(err) {
      if(err instanceof UnAuthorizedException){
        const unAuthorizedErr=err as UnAuthorizedException;
        notification.info({
          message:unAuthorizedErr.message
        })
        console.log(unAuthorizedErr.message);
      }
      err.preventDefault();
    },
  },
};