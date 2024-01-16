import core from 'core.v2';
import { useQuery } from 'react-query';
import { InputQuery } from '../../../core.v2/domain/invoice/gateway/invoice-gateway.interface';

export const useGetInvoiceQuery = (query: InputQuery) => {
  return useQuery(['@invoices', JSON.stringify(query)], () =>
    core.invoice.query(query)
  );
};
