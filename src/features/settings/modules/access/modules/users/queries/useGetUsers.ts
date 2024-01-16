import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetUsers = () => {
  return useQuery('@users', () => core.user.list());
};
