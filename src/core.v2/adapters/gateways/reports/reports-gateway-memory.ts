import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import type { MapperFactoryInterface } from '../../mappers/mapper-factory.interface';
import type { VendorMapperInterface } from '../../mappers/vendor/vendor-mapper.interface';
import { ReportsGatewayInterface } from './reports-gateway.interface';

type VendorQueryInput = {
  startDate: string;
  endDate: string;
};

export class ReportsGatewayMemory implements ReportsGatewayInterface {
  private readonly vendorMapper: VendorMapperInterface;

  constructor(private readonly mapperFactory: MapperFactoryInterface) {
    this.vendorMapper = this.mapperFactory.createVendorMapper();
  }

  async vendorQuery(
    query: VendorQueryInput
  ): Promise<OutputListGatewayDTO<any>> {
    const vendorList: any[] = [];
    const pagination: any = {};

    return {
      data: vendorList,
      pagination,
      totalRecords: 2
    };
  }
}
