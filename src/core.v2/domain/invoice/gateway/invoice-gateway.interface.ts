import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { Invoice } from '../entity/invoice';

export type InputQuery = {
  skip?: number;
  take?: number;
  vendorName?: string;
  vendorExternalId?: string;
  invoiceExternalId?: string;
  externalApInvoiceNumber?: string;
  referenceNumberExternal?: string;
  currencyId?: string;
  dueDateStart?: string;
  dueDateEnd?: string;
  sortColumn?: string;
  sortDirection?: string;
};

export type HistoryInputQuery = {
  invoiceId: string;
  year: string;
  month?: string;
  day?: string;
};
export interface InvoiceGatewayInterface {
  find(id: string): Promise<Invoice>;
  list(skip?: number, take?: number): Promise<OutputListGatewayDTO<Invoice>>;
  listByVendor(vendorId: string, skip?: number, take?: number): Promise<OutputListGatewayDTO<Invoice>>; //prettier-ignore
  query(query: InputQuery): Promise<OutputListGatewayDTO<Invoice>>;
  history(query: HistoryInputQuery): Promise<any>;
}
