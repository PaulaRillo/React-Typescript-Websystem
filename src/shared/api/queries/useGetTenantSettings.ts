import core from 'core.v2';
import { TenantSettingsType } from 'core.v2/domain/@shared/types/tenant-settings.type';
import { useQuery, UseQueryOptions } from 'react-query';

type Options = Omit<
  UseQueryOptions<any, any, TenantSettingsType, any>,
  'queryKey' | 'queryFn'
>;

export const useGetTenantSettings = (options?: Options) => {
  return useQuery(
    '@tenant-settings',
    () => core.tenant.getSettings(),
    options || {
      retry: 3,
      retryDelay: 5000
    }
  );
};
