import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetTenantConfigurations = () => {
  return useQuery(
    '@tenant-configurations',
    () => core.setup.getTenantConfigurations(),
    { staleTime: 60 * 1000 }
  );
};
