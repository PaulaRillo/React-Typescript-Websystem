import core from '../../../../../../../core.v2';
import { useQuery } from 'react-query';

export const useGetSystemManagedCurrencies = () => {
  return useQuery(
    '@system-managed-currencies',
    () => core.setup.getSystemManagedCurrencies(),
    { staleTime: 60 * 1000 }
  );
};
