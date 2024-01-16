import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetQuotas = () => {
  return useQuery('@quotas', () => core.tenant.getQuotas());
};
