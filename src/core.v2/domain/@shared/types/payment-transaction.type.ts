export type PaymentTransactionType = {
  id: string;
  description: string;
  processorId: string;
  amount: number;
  paymentMethodId: string;
  paymentMethodType: string;
  status: string;
  currency: string;
  ipAddress: string;
  settledAt: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};
