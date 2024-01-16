type OriginAccountSubmitDTO = {
  paymentMethodId: string;
  processorId: string;
  currencyId: string;
};

type DestinationAccountSubmitDTO = {
  vaultId: string;
  vaultPaymentMethodId: string;
  vaultPaymentMethodType: string;
};

type InvoiceSubmitDTO = {
  invoiceId: string;
  visualId: string;
  vendorId: string;
  vendorName: string;
  referenceNumberExternal: string;
  currencyIso4217Alpha3: string;
  paymentAmount: number;
  description: string;
  destinationAccount: DestinationAccountSubmitDTO;
};

export type SubmitGroupPaymentRequestDTO = {
  originAccount: OriginAccountSubmitDTO;
  cashFlowId: string;
  invoices: InvoiceSubmitDTO[];
  mfaCode: string;
};
