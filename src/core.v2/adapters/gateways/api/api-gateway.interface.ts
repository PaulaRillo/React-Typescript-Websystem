import { OpenApInvoiceDashboardRaw } from 'core.v2/adapters/mappers/dashboard/open-ap-invoice-mapper.interface';
import { OutgoingPaymentDashboardRaw } from 'core.v2/adapters/mappers/dashboard/outgoing-payment-mapper.interface';

export interface ApiGatewayInterface {
  getDashboardOpenApInvoices(): Promise<OpenApInvoiceDashboardRaw>;
  getDashboardOutgoingPayments(): Promise<OutgoingPaymentDashboardRaw>;
}
