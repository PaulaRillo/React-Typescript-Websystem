import { DestinationAccountMapperInterface } from './destination-account/destination-account-mapper.interface';
import { InvoiceHistoryMapperInterface } from './invoice/invoice-history-mapper.interface';
import { InvoiceMapperInterface } from './invoice/invoice-mapper.interface';
import { LoggedUserMapperInterface } from './logged-user/logged-user-mapper.interface';
import { OriginAccountMapperInterface } from './origin-account/origin-account-mapper.interface';
import { PaymentLineMapperInterface } from './payment/payment-line-mapper.interface';
import { SubmitPaymentRequestGroupMapperInterface } from './payment/submit-payment-request-group-mapper.interface';
import { CashFlowMapperInterface } from './tenant/cash-flow-mapper.interface';
import { TenantSettingsMapperInterface } from './tenant/tenant-settings-mapper.interface';
import { UserMapperInterface } from './user/user-mapper.interface';
import { VendorMapperInterface } from './vendor/vendor-mapper.interface';
import { CurrencyMapperInterface } from './currency/currency-mapper.interface';

export interface MapperFactoryInterface {
  createLoggedUserMapper(): LoggedUserMapperInterface;
  createSubmitPaymentRequestGroupMapper(): SubmitPaymentRequestGroupMapperInterface;
  createOriginAccountMapper(): OriginAccountMapperInterface;
  createDestinationAccountMapper(): DestinationAccountMapperInterface;
  createInvoiceMapper(): InvoiceMapperInterface;
  createInvoiceHistoryMapper(): InvoiceHistoryMapperInterface;
  createTenantSettingsMapper(): TenantSettingsMapperInterface;
  createCashFlowMapper(): CashFlowMapperInterface;
  createVendorMapper(): VendorMapperInterface;
  createUserMapper(): UserMapperInterface;
  createPaymentLineMapper(): PaymentLineMapperInterface;
  createCurrencyMapper(): CurrencyMapperInterface;
}
