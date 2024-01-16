import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { Invoice } from 'core.v2/domain/invoice/entity/invoice';
import {
  HistoryInputQuery,
  InputQuery
} from './../../../domain/invoice/gateway/invoice-gateway.interface';

export interface InvoiceControllerInterface {
  find(invoiceId: string): Promise<Invoice>;
  list(skip?: number, take?: number): Promise<OutputListGatewayDTO<Invoice>>;
  listByVendor(vendorId: string, skip?: number, take?: number): Promise<OutputListGatewayDTO<Invoice>>; // prettier-ignore
  query(query: InputQuery): Promise<OutputListGatewayDTO<Invoice>>;
  history(query: HistoryInputQuery): Promise<any>;
}
