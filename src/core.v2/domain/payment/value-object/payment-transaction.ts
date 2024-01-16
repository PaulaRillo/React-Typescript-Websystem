export class PaymentTransaction {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly processorId: string,
    public readonly amount: number,
    public readonly paymentMethodId: string,
    public readonly paymentMethodType: string,
    public readonly status: string,
    public readonly currency: string,
    public readonly ipAddress: string,
    public readonly settledAt: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly createdBy: string,
    public readonly updatedBy: string
  ) { }
}
