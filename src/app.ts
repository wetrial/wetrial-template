import { UnAuthorizedException } from '@wetrial/core/exception';
import { configIconUrl } from '@/components/IconFont';
import defaultSettings from '@config/defaultSettings';
import { notification } from 'antd';

configIconUrl(defaultSettings.iconfontUrl);

export const dva = {
  config: {
    onError(err) {
      if (err instanceof UnAuthorizedException) {
        const unAuthorizedErr = err as UnAuthorizedException;
        notification.info({
          message: unAuthorizedErr.message,
        });

        // eslint-disable-next-line no-console
        console.log(unAuthorizedErr.message);
      } else {
        // eslint-disable-next-line no-console
        console.error(err);
      }
      err.preventDefault();
    },
  },
};

export function render(oldRender) {
  oldRender();
}
