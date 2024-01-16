import {
  InputQuery,
  VendorGatewayInterface
} from 'core.v2/adapters/gateways/vendor/vendor-gateway.interface';
import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { Vendor } from 'core.v2/domain/vendor/entity/vendor';
import { GatewayFactoryInterface } from '../../gateways/gateway-factory.interface';
import { VendorControllerInterface } from './vendor.controller.interface';

export class VendorController implements VendorControllerInterface {
  private readonly vendorGateway: VendorGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.vendorGateway = this.gatewayFactory.createVendorGateway();
  }

  query(query: InputQuery): Promise<OutputListGatewayDTO<Vendor>> {
    return this.vendorGateway.query(query);
  }

  async find(vendorVisualId: string): Promise<Vendor> {
    const vendor = await this.vendorGateway.find(vendorVisualId);
    return JSON.parse(JSON.stringify(vendor));
  }

  async list(
    skip: string,
    take: string
  ): Promise<OutputListGatewayDTO<Vendor>> {
    const vendorsList = await this.vendorGateway.list(skip, take);
    return JSON.parse(JSON.stringify(vendorsList));
  }
}
