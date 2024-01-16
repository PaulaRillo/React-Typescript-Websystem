import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';

type VendorQueryInput = {
  startDate: string;
  endDate: string;
};
export interface ReportsGatewayInterface {
  vendorQuery(input: VendorQueryInput): Promise<OutputListGatewayDTO<any>>;
}
