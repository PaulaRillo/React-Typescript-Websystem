export type BillType = {
  id: string;
  visualId: string;
  externalId: string;
  externalApInvoiceNumber: string;
  referenceNumberExternal: string;
  transactionContentType: number;
  invoiceType: number;
  postingDate: string;
  dueDate: string;
  invoiceTotal: number;
  invoiceAuthorizationStatusId: number;
  invoiceStatusId: number;
};
