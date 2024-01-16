import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetTenantSyncStatus = () => {
  return useQuery('@sync-status', () => core.tenant.getSyncStatus(), {
    staleTime: 1000,
    refetchOnWindowFocus: true
  });
};
