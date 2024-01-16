import { ReportsGatewayInterface } from 'core.v2/adapters/gateways/reports/reports-gateway.interface';
import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { GatewayFactoryInterface } from '../../gateways/gateway-factory.interface';
import { ReportsControllerInterface } from './reports-controller.interface';

type VendorQueryInput = {
  startDate: string;
  endDate: string;
};
export class ReportsController implements ReportsControllerInterface {
  private readonly reportsGateway: ReportsGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.reportsGateway = this.gatewayFactory.createReportsGateway();
  }

  vendorQuery(input: VendorQueryInput): Promise<OutputListGatewayDTO<any>> {
    return this.reportsGateway.vendorQuery(input);
  }
}
