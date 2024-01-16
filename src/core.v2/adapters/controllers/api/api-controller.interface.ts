import { OpenApInvoiceDashboardDomain } from 'core.v2/adapters/mappers/dashboard/open-ap-invoice-mapper.interface';
import { OutgoingPaymentDashboardDomain } from 'core.v2/adapters/mappers/dashboard/outgoing-payment-mapper.interface';

export interface ApiControllerInterface {
  getDashboardOpenApInvoices(): Promise<OpenApInvoiceDashboardDomain>;
  getDashboardOutgoingPayments(): Promise<OutgoingPaymentDashboardDomain>;
}
