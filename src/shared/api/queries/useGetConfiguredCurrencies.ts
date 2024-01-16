import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetConfiguredCurrencies = () => {
  return useQuery(
    '@configured-currencies',
    () => core.setup.getConfiguredCurrencies(),
    { staleTime: 60 * 1000 }
  );
};
