import { PaymentLineMapperInterface } from '../../../../core.v2/adapters/mappers/payment/payment-line-mapper.interface';
import { PaymentLineFactory } from '../../../../core.v2/domain/payment/factory/payment-line-factory';
import { PaymentLineFactoryProps } from '../../../../core.v2/domain/payment/factory/payment-line-factory.props';
import type { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
import { AwsApiName } from '../../../domain/@shared/settings/constants.enum';
import { HttpClientFactory } from '../../../drivers/httpClient/http-client-factory';
import { MapperFactoryInterface } from '../../mappers/mapper-factory.interface';
import { PaymentLineGatewayInterface } from './payment-line-gateway.interface';

export class PaymentLineGatewayHttp implements PaymentLineGatewayInterface {
  private readonly endpoint: string;
  private readonly httpClient: HttpClientInterface;
  private readonly paymentMapper: PaymentLineMapperInterface;

  constructor(
    private readonly httpFactory: HttpClientFactory,
    private readonly mapperFactory: MapperFactoryInterface
  ) {
    this.httpClient = this.httpFactory.createHttpClient(AwsApiName.BILLTALLY);
    this.endpoint = '/outgoing-payments';
    this.paymentMapper = this.mapperFactory.createPaymentLineMapper();
  }

  async list(skip = '0', take = '20', vendor?: string, bill?: string) {
    const vendorFilter = vendor ? `&vendor=${vendor}` : '';
    const billFilter = bill ? `&bill=${bill}` : '';

    const response = await this.httpClient.get<any>(
      `${this.endpoint}?take=${take}&skip=${skip}${vendorFilter}${billFilter}`
    );

    const paymentMappedList: PaymentLineFactoryProps[] = response?.data?.map(
      (payment: any) => this.paymentMapper.toDomain(payment)
    );

    const paymentList = paymentMappedList.map((payment) => {
      return PaymentLineFactory.create(payment);
    });

    return {
      data: paymentList,
      pagination: response?.pagination,
      totalRecords: response?.totalRecords
    };
  }
}
