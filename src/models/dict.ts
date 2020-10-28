import * as dictService from '@/services/dict';
import { useRequest } from 'ahooks';
import { useCallback, useState } from 'react';

export default function useAuthModel() {
  const [countrys, setCountrys] = useState(null);

  const { run } = useRequest(dictService.getCountrys, {
    manual: true,
  });

  const getCountrys = useCallback(() => {
    // signin implementation
    // setCountrys(user from signin API)
    run().then((result) => {
      setCountrys(result);
    });
  }, []);

  return {
    countrys,
    getCountrys,
  };
}
