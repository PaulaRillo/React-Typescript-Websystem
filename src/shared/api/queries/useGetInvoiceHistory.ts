import core from 'core.v2';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

type Props = {
  year: string;
};

export const useGetInvoiceHistory = ({ year }: Props) => {
  const { id } = useParams();
  if (!id) throw new Error('You must specify an invoice id');
  return useQuery(['@invoiceHistory', `${id}-${year}`], () =>
    core.invoice.history({
      invoiceId: id,
      year
    })
  );
};
