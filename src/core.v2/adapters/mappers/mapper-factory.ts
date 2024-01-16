import { DestinationAccountMapper } from './destination-account/destination-account-mapper';
import { DestinationAccountMapperInterface } from './destination-account/destination-account-mapper.interface';
import { InvoiceHistoryMapper } from './invoice/invoice-history-mapper';
import { InvoiceHistoryMapperInterface } from './invoice/invoice-history-mapper.interface';
import { InvoiceMapper } from './invoice/invoice-mapper';
import type { InvoiceMapperInterface } from './invoice/invoice-mapper.interface';
import { LoggedUserMapper } from './logged-user/logged-user-mapper';
import { LoggedUserMapperInterface } from './logged-user/logged-user-mapper.interface';
import { MapperFactoryInterface } from './mapper-factory.interface';
import { OriginAccountMapperInterface } from './origin-account/origin-account-mapper.interface';
import { OriginAccountMapper } from './origin-account/origin-account.mapper';
import { PaymentLineMapper } from './payment/payment-line-mapper';
import { PaymentLineMapperInterface } from './payment/payment-line-mapper.interface';
import { SubmitPaymentRequestGroupMapper } from './payment/submit-payment-request-group-mapper';
import { SubmitPaymentRequestGroupMapperInterface } from './payment/submit-payment-request-group-mapper.interface';
import { CashFlowMapper } from './tenant/cash-flow-mapper';
import { CashFlowMapperInterface } from './tenant/cash-flow-mapper.interface';
import { TenantSettingsMapper } from './tenant/tenant-settings-mapper';
import type { TenantSettingsMapperInterface } from './tenant/tenant-settings-mapper.interface';
import { UserMapper } from './user/user-mapper';
import type { UserMapperInterface } from './user/user-mapper.interface';
import { VendorMapper } from './vendor/vendor-mapper';
import type { VendorMapperInterface } from './vendor/vendor-mapper.interface';
import { CurrencyMapperInterface } from './currency/currency-mapper.interface';
import { CurrencyMapper } from './currency/currency-mapper';

export class MapperFactory implements MapperFactoryInterface {
  createLoggedUserMapper(): LoggedUserMapperInterface {
    return new LoggedUserMapper();
  }
  createSubmitPaymentRequestGroupMapper(): SubmitPaymentRequestGroupMapperInterface {
    return new SubmitPaymentRequestGroupMapper();
  }
  createCashFlowMapper(): CashFlowMapperInterface {
    return new CashFlowMapper();
  }
  createDestinationAccountMapper(): DestinationAccountMapperInterface {
    return new DestinationAccountMapper();
  }
  createOriginAccountMapper(): OriginAccountMapperInterface {
    return new OriginAccountMapper();
  }
  createInvoiceMapper(): InvoiceMapperInterface {
    return new InvoiceMapper();
  }
  createInvoiceHistoryMapper(): InvoiceHistoryMapperInterface {
    return new InvoiceHistoryMapper();
  }
  createVendorMapper(): VendorMapperInterface {
    return new VendorMapper();
  }
  createTenantSettingsMapper(): TenantSettingsMapperInterface {
    return new TenantSettingsMapper();
  }
  createUserMapper(): UserMapperInterface {
    return new UserMapper();
  }
  createPaymentLineMapper(): PaymentLineMapperInterface {
    return new PaymentLineMapper();
  }
  createCurrencyMapper(): CurrencyMapperInterface {
    return new CurrencyMapper();
  }
}
