import { useQuery } from 'react-query';
import { getRoles } from 'shared/api/requests/getRoles';

export const useGetRoles = () => {
  return useQuery(`@roles`, getRoles);
};
