import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetDestinationAccounts = (vendorId: string, options?: any) => {
  return useQuery(
    ['@destinationAccount', vendorId],
    () => core.destinationAccount.list(vendorId),
    options
  );
};
