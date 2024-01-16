import { UserGatewayInterface } from 'core.v2/adapters/gateways/user/user-gateway.interface';
import { DestinationAccountGatewayInterface } from 'core.v2/domain/destination-account/gateway/destination-account-gateway.interface';
import type { InvoiceGatewayInterface } from 'core.v2/domain/invoice/gateway/invoice-gateway.interface';
import { OriginAccountGatewayInterface } from 'core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { Store } from 'core.v2/drivers/utils/Store/store';
import type { MapperFactoryInterface } from '../mappers/mapper-factory.interface';
import { ApiGatewayInterface } from './api/api-gateway.interface';
import { DestinationAccountGatewayMemory } from './destination-account/destination-account-gateway-memory';
import type { GatewayFactoryInterface } from './gateway-factory.interface';
import { InvoiceGatewayMemory } from './invoice/invoice-gateway-memory';
import { MfaGatewayMemory } from './mfa/mfa-gateway-memory';
import type { MfaGatewayInterface } from './mfa/mfa-gateway.interface';
import { OriginAccountGatewayMemory } from './origin-account/origin-account-gateway-memory';
import { PaymentGatewayMemory } from './payment/payment-gateway-memory';
import { PaymentGatewayInterface } from './payment/payment-gateway.interface';
import { PaymentLineGatewayMemory } from './payment/payment-line-gateway-memory';
import { PaymentLineGatewayInterface } from './payment/payment-line-gateway.interface';
import { ReportsGatewayMemory } from './reports/reports-gateway-memory';
import { ReportsGatewayInterface } from './reports/reports-gateway.interface';
import { SetupGatewayInterface } from './setup/setup-gateway.interface';
import { TenantGatewayMemory } from './tenant/tenant-gateway-memory';
import type { TenantGatewayInterface } from './tenant/tenant-gateway.interface';
import { UserGatewayMemory } from './user/user-gateway-memory';
import { VendorGatewayMemory } from './vendor/vendor-gateway-memory';
import type { VendorGatewayInterface } from './vendor/vendor-gateway.interface';

export class GatewayFactoryMemory implements GatewayFactoryInterface {
  constructor(
    private readonly mapperFactory: MapperFactoryInterface,
    private readonly store: Store
  ) {}

  createApiGateway(): ApiGatewayInterface {
    throw new Error('Method not implemented.');
  }
  createReportsGateway(): ReportsGatewayInterface {
    return new ReportsGatewayMemory(this.mapperFactory);
  }

  createUserGateway(): UserGatewayInterface {
    return new UserGatewayMemory(this.mapperFactory, this.store);
  }

  createPaymentGateway(): PaymentGatewayInterface {
    return new PaymentGatewayMemory(this.mapperFactory);
  }

  createDestinationAccountGateway(): DestinationAccountGatewayInterface {
    return new DestinationAccountGatewayMemory(this.mapperFactory);
  }

  createOriginAccountGateway(): OriginAccountGatewayInterface {
    return new OriginAccountGatewayMemory(this.mapperFactory);
  }

  createInvoiceGateway(): InvoiceGatewayInterface {
    return new InvoiceGatewayMemory(this.mapperFactory, this);
  }

  createVendorGateway(): VendorGatewayInterface {
    return new VendorGatewayMemory(this.mapperFactory);
  }

  createTenantGateway(): TenantGatewayInterface {
    return new TenantGatewayMemory(this.mapperFactory);
  }

  createMfaGateway(): MfaGatewayInterface {
    return new MfaGatewayMemory();
  }

  createPaymentLineGateway(): PaymentLineGatewayInterface {
    return new PaymentLineGatewayMemory(this.mapperFactory);
  }

  createSetupGateway(): SetupGatewayInterface {
    // TODO
    throw new Error('Method not implemented');
  }
}
