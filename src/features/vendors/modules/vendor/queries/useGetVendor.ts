import core from 'core.v2';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export const useGetVendor = (vendorVisualId?: string) => {
  const { id: visualIdParam } = useParams();
  const visualId = vendorVisualId || visualIdParam || '';
  return useQuery(`@vendor${visualId}`, () => core.vendor.find(visualId), {
    staleTime: 1000 * 60 * 60 * 6 //  6 hours
  });
};
