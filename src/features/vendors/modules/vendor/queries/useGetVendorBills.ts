import core from 'core.v2';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export const useGetVendorBills = (skip?: number, take?: number) => {
  const { id: paramId } = useParams();
  const id = paramId || '';
  return useQuery(
    `@vendor_bills_${id}_${take}_${skip}`,
    () => core.invoice.listByVendor(id, skip, take),
    {
      staleTime: 1000 * 60 * 60 * 6, //  6 hours
      keepPreviousData: true
    }
  );
};
