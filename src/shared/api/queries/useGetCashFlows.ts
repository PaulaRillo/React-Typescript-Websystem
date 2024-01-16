import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetCashFlows = () => {
  return useQuery('@cashFlows', () => core.tenant.getCashFlows());
};
