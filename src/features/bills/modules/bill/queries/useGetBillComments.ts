import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getBillComments } from 'shared/api/requests/getBillComments';

export const useGetBillComments = () => {
  const { id } = useParams();
  const billId = id || '';

  return useQuery(`@bill-${id}-comments`, () => getBillComments(billId));
};
