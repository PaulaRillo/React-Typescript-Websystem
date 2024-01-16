import { UserGatewayInterface } from 'core.v2/adapters/gateways/user/user-gateway.interface';
import type { MapperFactoryInterface } from 'core.v2/adapters/mappers/mapper-factory.interface';
import { HttpClientInterface } from 'core.v2/domain/@shared/infra/http-client.interface';
import { DestinationAccountGatewayInterface } from 'core.v2/domain/destination-account/gateway/destination-account-gateway.interface';
import type { InvoiceGatewayInterface } from 'core.v2/domain/invoice/gateway/invoice-gateway.interface';
import { OriginAccountGatewayInterface } from 'core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { AuthInterface } from 'core.v2/drivers/auth/auth.interface';
import { Store } from 'core.v2/drivers/utils/Store/store';
import { AwsApiName } from '../../domain/@shared/settings/constants.enum';
import type { HttpClientFactoryInterface } from '../../drivers/httpClient/http-client-factory.interface';
import { ApiGatewayHttp } from './api/api-gateway.http';
import { ApiGatewayInterface } from './api/api-gateway.interface';
import { DestinationAccountGatewayHttp } from './destination-account/destination-account-gateway-http';
import type { GatewayFactoryInterface } from './gateway-factory.interface';
import { InvoiceGatewayHttp } from './invoice/invoice-gateway-http';
import { MfaGatewayHttp } from './mfa/mfa-gateway-http';
import type { MfaGatewayInterface } from './mfa/mfa-gateway.interface';
import { OriginAccountGatewayHttp } from './origin-account/origin-account-gateway-http';
import { PaymentGatewayHttp } from './payment/payment-gateway-http';
import { PaymentGatewayInterface } from './payment/payment-gateway.interface';
import { PaymentLineGatewayHttp } from './payment/payment-line-gateway-http';
import { PaymentLineGatewayInterface } from './payment/payment-line-gateway.interface';
import { ReportsGatewayHttp } from './reports/reports-gateway-http';
import { ReportsGatewayInterface } from './reports/reports-gateway.interface';
import { SetupGatewayHttp } from './setup/setup-gateway-http';
import { SetupGatewayInterface } from './setup/setup-gateway.interface';
import { TenantGatewayHttp } from './tenant/tenant-gateway-http';
import type { TenantGatewayInterface } from './tenant/tenant-gateway.interface';
import { UserGatewayHttp } from './user/user-gateway-http';
import { VendorGatewayHttp } from './vendor/vendor-gateway-http';
import type { VendorGatewayInterface } from './vendor/vendor-gateway.interface';

export class GatewayFactoryHttp implements GatewayFactoryInterface {
  private readonly billTallyHttpClient: HttpClientInterface;

  constructor(
    private readonly auth: AuthInterface,
    private readonly httpClientFactory: HttpClientFactoryInterface,
    private readonly mapperFactory: MapperFactoryInterface,
    private readonly store: Store
  ) {
    this.billTallyHttpClient = this.httpClientFactory.createHttpClient(
      AwsApiName.BILLTALLY
    );
  }
  createApiGateway(): ApiGatewayInterface {
    return new ApiGatewayHttp(this.httpClientFactory);
  }

  createReportsGateway(): ReportsGatewayInterface {
    return new ReportsGatewayHttp(this.httpClientFactory, this.mapperFactory);
  }

  createUserGateway(): UserGatewayInterface {
    return new UserGatewayHttp(
      this.auth,
      this.mapperFactory,
      this.httpClientFactory,
      this.store
    );
  }

  createPaymentGateway(): PaymentGatewayInterface {
    return new PaymentGatewayHttp(this.httpClientFactory, this.mapperFactory);
  }

  createPaymentLineGateway(): PaymentLineGatewayInterface {
    return new PaymentLineGatewayHttp(
      this.httpClientFactory,
      this.mapperFactory
    );
  }

  createDestinationAccountGateway(): DestinationAccountGatewayInterface {
    return new DestinationAccountGatewayHttp(
      this.httpClientFactory,
      this.mapperFactory
    );
  }

  createOriginAccountGateway(): OriginAccountGatewayInterface {
    return new OriginAccountGatewayHttp(
      this.httpClientFactory,
      this.mapperFactory
    );
  }

  createInvoiceGateway(): InvoiceGatewayInterface {
    return new InvoiceGatewayHttp(
      this.httpClientFactory,
      this.mapperFactory,
      this
    );
  }

  createVendorGateway(): VendorGatewayInterface {
    return new VendorGatewayHttp(this.httpClientFactory, this.mapperFactory);
  }

  createTenantGateway(): TenantGatewayInterface {
    return new TenantGatewayHttp(this.httpClientFactory, this.mapperFactory);
  }

  createMfaGateway(): MfaGatewayInterface {
    return new MfaGatewayHttp(this.httpClientFactory);
  }

  createSetupGateway(): SetupGatewayInterface {
    return new SetupGatewayHttp(this.httpClientFactory, this.mapperFactory);
  }
}
