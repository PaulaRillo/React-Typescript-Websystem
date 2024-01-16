import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetVendors = (skip?: string, take?: string) => {
  return useQuery(
    `@vendors-${skip}-${take}`,
    () => core.vendor.list(skip, take),
    {
      keepPreviousData: true
    }
  );
};
