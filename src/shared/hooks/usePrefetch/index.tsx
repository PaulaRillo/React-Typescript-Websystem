/* eslint-disable @typescript-eslint/no-explicit-any */
import { queryClient } from 'app/providers';
import nprogress from 'nprogress';
import { useCallback } from 'react';
import { FetchQueryOptions, QueryFunction } from 'react-query';

type Prefetch = (
  queryKey: string,
  queryFn: QueryFunction<any, string>,
  options?: FetchQueryOptions<any, unknown, any, string> | undefined
) => Promise<void>;

export const usePrefetch = () => {
  const prefetch = useCallback<Prefetch>(async (queryKey, queryFn, options) => {
    try {
      nprogress.start();
      await queryClient.prefetchQuery(queryKey, queryFn, options);
    } catch (err) {
      console.error(err);
    } finally {
      nprogress.done();
    }
  }, []);

  return { prefetch };
};

//example: prefetch('@vendors', () => getVendors());
