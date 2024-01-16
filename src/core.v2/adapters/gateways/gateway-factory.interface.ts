import { UserGatewayInterface } from 'core.v2/adapters/gateways/user/user-gateway.interface';
import { DestinationAccountGatewayInterface } from 'core.v2/domain/destination-account/gateway/destination-account-gateway.interface';
import { InvoiceGatewayInterface } from 'core.v2/domain/invoice/gateway/invoice-gateway.interface';
import { OriginAccountGatewayInterface } from 'core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { ApiGatewayInterface } from './api/api-gateway.interface';
import { MfaGatewayInterface } from './mfa/mfa-gateway.interface';
import { PaymentGatewayInterface } from './payment/payment-gateway.interface';
import { PaymentLineGatewayInterface } from './payment/payment-line-gateway.interface';
import { ReportsGatewayInterface } from './reports/reports-gateway.interface';
import { SetupGatewayInterface } from './setup/setup-gateway.interface';
import { TenantGatewayInterface } from './tenant/tenant-gateway.interface';
import { VendorGatewayInterface } from './vendor/vendor-gateway.interface';

export interface GatewayFactoryInterface {
  createSetupGateway(): SetupGatewayInterface;
  createUserGateway(): UserGatewayInterface;
  createPaymentGateway(): PaymentGatewayInterface;
  createPaymentLineGateway(): PaymentLineGatewayInterface;
  createDestinationAccountGateway(): DestinationAccountGatewayInterface;
  createOriginAccountGateway(): OriginAccountGatewayInterface;
  createInvoiceGateway(): InvoiceGatewayInterface;
  createVendorGateway(): VendorGatewayInterface;
  createTenantGateway(): TenantGatewayInterface;
  createMfaGateway(): MfaGatewayInterface;
  createReportsGateway(): ReportsGatewayInterface;
  createApiGateway(): ApiGatewayInterface;
}
