import { SubmitGroupPaymentRequestDTO } from './payment-gateway-dto';

export interface PaymentGatewayInterface {
  submitPaymentRequestGroup(input: SubmitGroupPaymentRequestDTO): Promise<void>;
}
