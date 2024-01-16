export class Bill {
  constructor(
    public readonly id: string,
    public readonly visualId: string,
    public readonly externalId: string,
    public readonly externalApInvoiceNumber: string,
    public readonly referenceNumberExternal: string,
    public readonly transactionContentType: number,
    public readonly invoiceType: number,
    public readonly postingDate: string,
    public readonly dueDate: string,
    public readonly invoiceTotal: number,
    public readonly invoiceAuthorizationStatusId: number,
    public readonly invoiceStatusId: number
  ) { }
}
