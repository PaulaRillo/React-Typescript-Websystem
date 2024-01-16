import core from 'core.v2';
import { useQuery } from 'react-query';

export const useGetOpenApInvoicesDashboard = () => {
  return useQuery('@OpenApInvoiceDashboard', () =>
    core.api.getDashboardOpenApInvoices()
  );
};
