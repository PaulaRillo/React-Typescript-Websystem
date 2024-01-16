import { InputQuery } from 'core.v2/adapters/gateways/vendor/vendor-gateway.interface';
import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { Vendor } from 'core.v2/domain/vendor/entity/vendor';

export interface VendorControllerInterface {
  find(vendorVisualId: string): Promise<Vendor>;
  list(skip?: string, take?: string): Promise<OutputListGatewayDTO<Vendor>>;
  query(query: InputQuery): Promise<OutputListGatewayDTO<Vendor>>;
}
