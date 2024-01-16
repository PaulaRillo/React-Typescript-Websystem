import core from 'core.v2';
import { useQuery } from 'react-query';

type obj = {
  skip?: string;
  take?: string;
  vendor?: string;
  bill?: string;
};

export const useGetPayments = ({ skip, take, vendor, bill }: obj) => {
  const vendorKey = vendor ? `-${vendor}` : '';
  const billKey = bill ? `-${bill}` : '';

  return useQuery(
    `@payments-${skip}-${take}${vendorKey}${billKey}`,
    () => core.paymentLine.list(skip, take, vendor, bill),
    {
      keepPreviousData: true
    }
  );
};
