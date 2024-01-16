import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';

export interface PaymentLineControllerInterface {
  list(
    skip?: string,
    take?: string,
    vendor?: string,
    bill?: string
  ): Promise<OutputListGatewayDTO<any>>;
}
