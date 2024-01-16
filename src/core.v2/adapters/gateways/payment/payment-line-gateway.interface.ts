export interface PaymentLineGatewayInterface {
  list(
    skip?: string,
    take?: string,
    vendor?: string,
    bill?: string
  ): Promise<any>;
}
