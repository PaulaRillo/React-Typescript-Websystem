import core from 'core.v2';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export const useGetInvoice = () => {
  const { id } = useParams();
  const invoiceId = id || '';
  return useQuery(['@invoices', invoiceId], () => core.invoice.find(invoiceId));
};
