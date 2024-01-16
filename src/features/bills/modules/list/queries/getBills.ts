import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetBills = (skip?: number, take?: number) => {
  return useQuery(
    `@bills-${skip}-${take}`,
    () => core.invoice.list(skip, take),
    {
      keepPreviousData: true
    }
  );
};
