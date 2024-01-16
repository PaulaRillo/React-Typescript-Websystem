import { useQuery } from 'react-query';
import { getConnectionStatus } from '../../../../../../../api/requests/getConnectionStatus';

export const useGetConnectionStatus = () => {
  return useQuery(`@connection-status`, getConnectionStatus, {
    staleTime: 2000
  });
};
