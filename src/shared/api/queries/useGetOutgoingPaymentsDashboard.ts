import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetOutgoingPaymentsDashboard = () => {
  return useQuery('@OutgoingPaymentLinesDashboard', () =>
    core.api.getDashboardOutgoingPayments()
  );
};
