import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { Vendor } from 'core.v2/domain/vendor/entity/vendor';

export type InputQuery = {
  skip?: number;
  take?: number;
  name?: string;
  visualId?: string;
  externalId?: string;
  sortColumn?: string;
  sortDirection?: string;
};
export interface VendorGatewayInterface {
  find(invoiceId: string): Promise<Vendor>;
  list(skip?: string, take?: string): Promise<OutputListGatewayDTO<Vendor>>;
  query(query: InputQuery): Promise<OutputListGatewayDTO<Vendor>>;
}
