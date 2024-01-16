import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';

type VendorQueryInput = {
  startDate: string;
  endDate: string;
};

export interface ReportsControllerInterface {
  vendorQuery(input: VendorQueryInput): Promise<OutputListGatewayDTO<any>>;
}
