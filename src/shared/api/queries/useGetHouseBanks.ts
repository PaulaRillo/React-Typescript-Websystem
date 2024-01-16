import { useQuery } from 'react-query';
import { getHouseBanks } from '../requests/getHouseBanks';

export const useGetHouseBanks = () => {
  return useQuery('@house-banks', getHouseBanks);
};
