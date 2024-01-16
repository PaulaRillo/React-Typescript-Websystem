import { SubmitGroupPaymentRequestDTO } from 'core.v2/adapters/gateways/payment/payment-gateway-dto';
import { SubmitPaymentRequestGroupMapperInterface } from './submit-payment-request-group-mapper.interface';

export class SubmitPaymentRequestGroupMapper
  implements SubmitPaymentRequestGroupMapperInterface
{
  toDto(input: SubmitGroupPaymentRequestDTO): any {
    return {
      payment_origin: {
        payment_method_id: input.originAccount.paymentMethodId,
        processor_id: input.originAccount.processorId,
        currency_id: input.originAccount.currencyId
      },
      payments: input.invoices.map((invoice) => {
        return {
          invoice_id: invoice.invoiceId,
          visual_id: invoice.visualId,
          vendor_id: invoice.vendorId,
          vendor_name: invoice.vendorName,
          cash_flow_id: input.cashFlowId,
          reference_number: invoice.referenceNumberExternal,
          currency_iso4217_alpha3: invoice.currencyIso4217Alpha3,
          amount: invoice.paymentAmount.toString(),
          description: invoice.description || 'some description',
          payment_method: {
            vault_id: invoice.destinationAccount.vaultId,
            vault_payment_method_id: invoice.destinationAccount.vaultPaymentMethodId, //prettier-ignore
            vault_payment_method_type: invoice.destinationAccount.vaultPaymentMethodType //prettier-ignore
          }
        };
      }),
      mfa_code: input.mfaCode
    };
  }
}
