import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import {
  HistoryInputQuery,
  InputQuery,
  InvoiceGatewayInterface
} from 'core.v2/domain/invoice/gateway/invoice-gateway.interface';
import { Invoice } from '../../../../core.v2/domain/invoice/entity/invoice';
import type { GatewayFactoryInterface } from '../../gateways/gateway-factory.interface';
import type { InvoiceControllerInterface } from './invoice-controller.interface';

export class InvoiceController implements InvoiceControllerInterface {
  private readonly invoiceGateway: InvoiceGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.invoiceGateway = this.gatewayFactory.createInvoiceGateway();
  }

  async history(query: HistoryInputQuery): Promise<any> {
    return await this.invoiceGateway.history(query);
  }

  async query(query: InputQuery): Promise<OutputListGatewayDTO<Invoice>> {
    return await this.invoiceGateway.query(query);
  }

  async find(invoiceId: string): Promise<Invoice> {
    return await this.invoiceGateway.find(invoiceId);
  }

  async list(skip?: number, take?: number): Promise<ListOutput> {
    return await this.invoiceGateway.list(skip, take);
  }

  async listByVendor(
    vendorId: string,
    skip?: number,
    take?: number
  ): Promise<ListOutput> {
    return this.invoiceGateway.listByVendor(vendorId, skip, take);
  }
}

type ListOutput = OutputListGatewayDTO<Invoice>;
