import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetCurrencies = () => {
  return useQuery('@currencies', () => core.setup.getCurrencies());
};
