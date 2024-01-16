import { useQuery } from 'react-query';
import { getCashFlow } from 'shared/api/requests/getCashFlow';

export const useGetCashFlow = () => {
  return useQuery(`cash-flows`, () => getCashFlow(), {
    keepPreviousData: true
  });
};
