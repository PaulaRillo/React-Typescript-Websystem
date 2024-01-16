import { GatewayFactoryInterface } from '../adapters/gateways/gateway-factory.interface';
import { PaymentRequest } from '../domain/payment-request/entity/payment-request';

export class SubmitPaymentRequestGroupUsecase {
  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {}

  public async execute(): Promise<void> {
    const paymentRequest = PaymentRequest.getInstance();
    const paymentGateway = this.gatewayFactory.createPaymentGateway();

    if (!paymentRequest.isPayable()) {
      console.error('Payment request is not payable');
      return;
    }

    if (!paymentRequest.originAccount) {
      return;
    }

    if (!paymentRequest.cashFlow) {
      return;
    }

    await paymentGateway.submitPaymentRequestGroup({
      originAccount: {
        paymentMethodId: paymentRequest.originAccount.paymentMethodId,
        processorId: paymentRequest.originAccount.processorId,
        currencyId: paymentRequest.originAccount.currencyCode
      },
      cashFlowId: paymentRequest.cashFlow.id,
      invoices: paymentRequest.invoices.map((invoice: any) => ({
        vendorId: invoice.invoiceFrom.id,
        invoiceId: invoice.id,
        visualId: invoice.visualId,
        vendorName: invoice.invoiceFrom.name,
        referenceNumberExternal: invoice.referenceNumberExternal,
        currencyIso4217Alpha3: invoice.currency.iso4217Alpha3,
        paymentAmount: invoice.paymentAmount,
        description: '',
        destinationAccount: {
          vaultId: invoice.destinationAccount.vaultId,
          vaultPaymentMethodId: invoice.destinationAccount.vaultPaymentMethodId,
          vaultPaymentMethodType: invoice.destinationAccount.vaultPaymentMethodType // prettier-ignore
        }
      })),
      mfaCode: paymentRequest?.mfaCode,
    });
  }
}
