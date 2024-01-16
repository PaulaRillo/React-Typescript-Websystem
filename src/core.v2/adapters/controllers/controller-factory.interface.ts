import { ApiControllerInterface } from './api/api-controller.interface';
import { DestinationAccountControllerInterface } from './destination-account/destination-account-controller.interface';
import { InvoiceControllerInterface } from './invoice/invoice-controller.interface';
import { MfaControllerInterface } from './mfa/mfa-controller.interface';
import { OriginAccountControllerInterface } from './origin-account/origin-account-controller.interface';
import { PaymentControllerInterface } from './payment/payment-controller.interface';
import { PaymentLineControllerInterface } from './payment/payment-line-controller.interface';
import { ReportsControllerInterface } from './reports/reports-controller.interface';
import { SetupControllerInterface } from './setup/setup-controller.interface';
import { TenantControllerInterface } from './tenant/tenant-controller.interface';
import { UserControllerInterface } from './user/user-controller.interface';
import { VendorControllerInterface } from './vendor/vendor.controller.interface';

export interface ControllerFactoryInterface {
  createSetupController(): SetupControllerInterface;
  createUserController(): UserControllerInterface;
  createPaymentController(): PaymentControllerInterface;
  createPaymentLineController(): PaymentLineControllerInterface;
  createDestinationAccountController(): DestinationAccountControllerInterface;
  createOriginAccountController(): OriginAccountControllerInterface;
  createInvoiceController(): InvoiceControllerInterface;
  createVendorController(): VendorControllerInterface;
  createTenantController(): TenantControllerInterface;
  createMfaController(): MfaControllerInterface;
  createReportsController(): ReportsControllerInterface;
  createApiController(): ApiControllerInterface;
}
