import core from 'core.v2';
import { useInfiniteQuery } from 'react-query';

type Props = {
  skip?: number;
  take?: number;
};

export const useGetInfiniteBills = ({ skip = 0, take = 20 }: Props) => {
  return useInfiniteQuery({
    queryKey: ['@invoices', skip, take],
    queryFn: () => core.invoice.list(skip, take),
    getNextPageParam: () => {
      return skip + take;
    }
  });
};
