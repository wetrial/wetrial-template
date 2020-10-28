import * as dictService from '@/services/dict';
import { useRequest } from 'ahooks';
import { useCallback } from 'react';

export default function useAuthModel() {
  const { data, loading, run } = useRequest(dictService.getCountrys, {
    refreshDeps: [],
  });

  const getCountrys = useCallback(() => {
    run();
  }, []);

  return {
    countrys: data,
    loading,
    getCountrys,
  };
}
