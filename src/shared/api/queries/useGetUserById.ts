import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetUserById = (id: string) => {
  return useQuery('@userById', () => core.user.find(id));
};
