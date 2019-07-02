import { UnAuthorizedException } from 'wetrial/exception';
import { notification } from 'antd';

const a='';

export const dva = {
  config: {
    onError(err) {
      if (err instanceof UnAuthorizedException) {
        const unAuthorizedErr = err as UnAuthorizedException;
        notification.info({
          message: unAuthorizedErr.message,
        });
        // tslint:disable-next-line:no-console
        console.log(unAuthorizedErr.message);
      }
      err.preventDefault();
    },
  },
};

export function render(oldRender) {
  oldRender();
}
