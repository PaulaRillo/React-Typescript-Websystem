import { useQuery } from 'react-query';
import { getAuthorizations } from '../requests/getAuthorizations';

export const useGetAuthorizations = (userId: string) => {
  return useQuery(['@authorizations', userId], () => getAuthorizations(userId));
};
