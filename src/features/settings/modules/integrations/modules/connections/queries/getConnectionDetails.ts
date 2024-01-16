import { useQuery } from 'react-query';
import { getConnectionDetails } from '../../../../../../../shared/api/requests/getConnectionDetails';

export const useGetConnectionDetails = () => {
  return useQuery(`@connection-details`, () => getConnectionDetails(), {
    keepPreviousData: true
  });
};
