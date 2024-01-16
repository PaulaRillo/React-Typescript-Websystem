import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetOrigins = () => {
  return useQuery('@OriginAccount', () => core.originAccount.list());
};
