import { ApiControllerInterface } from './adapters/controllers/api/api-controller.interface';
import type { ControllerFactoryInterface } from './adapters/controllers/controller-factory.interface';
import type { DestinationAccountControllerInterface } from './adapters/controllers/destination-account/destination-account-controller.interface';
import type { InvoiceControllerInterface } from './adapters/controllers/invoice/invoice-controller.interface';
import type { MfaControllerInterface } from './adapters/controllers/mfa/mfa-controller.interface';
import type { OriginAccountControllerInterface } from './adapters/controllers/origin-account/origin-account-controller.interface';
import type { PaymentControllerInterface } from './adapters/controllers/payment/payment-controller.interface';
import type { PaymentLineControllerInterface } from './adapters/controllers/payment/payment-line-controller.interface';
import { ReportsControllerInterface } from './adapters/controllers/reports/reports-controller.interface';
import { SetupControllerInterface } from './adapters/controllers/setup/setup-controller.interface';
import type { TenantControllerInterface } from './adapters/controllers/tenant/tenant-controller.interface';
import type { UserControllerInterface } from './adapters/controllers/user/user-controller.interface';
import type { VendorControllerInterface } from './adapters/controllers/vendor/vendor.controller.interface';
import { AmplifyAuth } from './drivers/auth/amplify-auth';
import type { TranslateInterface } from './drivers/translate/translate.interface';
import { Store } from './drivers/utils/Store/store';
import type { UtilsFactoryInterface } from './drivers/utils/utils-factory.interface';

export class Core {
  public readonly setup: SetupControllerInterface;
  public readonly payment: PaymentControllerInterface;
  public readonly paymentLine: PaymentLineControllerInterface;
  public readonly vendor: VendorControllerInterface;
  public readonly tenant: TenantControllerInterface;
  public readonly invoice: InvoiceControllerInterface;
  public readonly user: UserControllerInterface;
  public readonly originAccount: OriginAccountControllerInterface;
  public readonly destinationAccount: DestinationAccountControllerInterface;
  public readonly mfa: MfaControllerInterface;
  public readonly reports: ReportsControllerInterface;
  public readonly api: ApiControllerInterface;

  constructor(
    public readonly store: Store,
    public readonly auth: AmplifyAuth,
    public readonly utils: UtilsFactoryInterface,
    public readonly translate: TranslateInterface,
    private readonly controllerFactory: ControllerFactoryInterface
  ) {
    this.setup = this.controllerFactory.createSetupController();
    this.user = this.controllerFactory.createUserController();
    this.payment = this.controllerFactory.createPaymentController();
    this.paymentLine = this.controllerFactory.createPaymentLineController();
    this.vendor = this.controllerFactory.createVendorController();
    this.tenant = this.controllerFactory.createTenantController();
    this.invoice = this.controllerFactory.createInvoiceController();
    this.originAccount = this.controllerFactory.createOriginAccountController();
    this.reports = this.controllerFactory.createReportsController();
    this.destinationAccount = this.controllerFactory.createDestinationAccountController(); //prettier-ignore
    this.user = this.controllerFactory.createUserController();
    this.mfa = this.controllerFactory.createMfaController();
    this.api = this.controllerFactory.createApiController();
  }

  public async stop(): Promise<void> {
    this.store.paymentRequest.clearHandlers();
    this.store.paymentRequest.reset();
    this.utils.createAppStorage().clear();
    this.store.loggedUser?.reset();
    await this.auth.signOut();
  }
}
