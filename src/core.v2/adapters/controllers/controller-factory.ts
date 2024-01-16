import type { GatewayFactoryInterface } from 'core.v2/adapters/gateways/gateway-factory.interface';
import { ApiController } from './api/api-controller';
import type { ApiControllerInterface } from './api/api-controller.interface';
import type { ControllerFactoryInterface } from './controller-factory.interface';
import { DestinationAccountController } from './destination-account/destination-account-controller';
import { DestinationAccountControllerInterface } from './destination-account/destination-account-controller.interface';
import { InvoiceController } from './invoice/invoice-controller';
import type { InvoiceControllerInterface } from './invoice/invoice-controller.interface';
import { MfaController } from './mfa/mfa-controller';
import type { MfaControllerInterface } from './mfa/mfa-controller.interface';
import { OriginAccountController } from './origin-account/origin-account-controller';
import { OriginAccountControllerInterface } from './origin-account/origin-account-controller.interface';
import { PaymentController } from './payment/payment-controller';
import { PaymentControllerInterface } from './payment/payment-controller.interface';
import { PaymentLineController } from './payment/payment-line-controller';
import { PaymentLineControllerInterface } from './payment/payment-line-controller.interface';
import { ReportsController } from './reports/reports-controller';
import { ReportsControllerInterface } from './reports/reports-controller.interface';
import { SetupController } from './setup/setup-controller';
import { SetupControllerInterface } from './setup/setup-controller.interface';
import { TenantController } from './tenant/tenant-controller';
import type { TenantControllerInterface } from './tenant/tenant-controller.interface';
import { UserController } from './user/user-controller';
import type { UserControllerInterface } from './user/user-controller.interface';
import { VendorController } from './vendor/vendor.controller';
import type { VendorControllerInterface } from './vendor/vendor.controller.interface';

export class ControllerFactory implements ControllerFactoryInterface {
  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {}

  createApiController(): ApiControllerInterface {
    return new ApiController(this.gatewayFactory);
  }

  createSetupController(): SetupControllerInterface {
    return new SetupController(this.gatewayFactory);
  }

  createReportsController(): ReportsControllerInterface {
    return new ReportsController(this.gatewayFactory);
  }

  createUserController(): UserControllerInterface {
    return new UserController(this.gatewayFactory);
  }

  createPaymentController(): PaymentControllerInterface {
    return new PaymentController(this.gatewayFactory);
  }

  createPaymentLineController(): PaymentLineControllerInterface {
    return new PaymentLineController(this.gatewayFactory);
  }

  createDestinationAccountController(): DestinationAccountControllerInterface {
    return new DestinationAccountController(this.gatewayFactory);
  }

  createInvoiceController(): InvoiceControllerInterface {
    return new InvoiceController(this.gatewayFactory);
  }

  createOriginAccountController(): OriginAccountControllerInterface {
    return new OriginAccountController(this.gatewayFactory);
  }

  createVendorController(): VendorControllerInterface {
    return new VendorController(this.gatewayFactory);
  }

  createTenantController(): TenantControllerInterface {
    return new TenantController(this.gatewayFactory);
  }

  createMfaController(): MfaControllerInterface {
    return new MfaController(this.gatewayFactory);
  }
}
