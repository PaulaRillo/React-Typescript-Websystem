import { MapperFactoryInterface } from '../../../../../src/core.v2/adapters/mappers/mapper-factory.interface';
import type { HttpClientInterface } from '../../../../../src/core.v2/domain/@shared/infra/http-client.interface';
import { AwsApiName } from '../../../../../src/core.v2/domain/@shared/settings/constants.enum';
import { HttpClientFactory } from '../../../../../src/core.v2/drivers/httpClient/http-client-factory';
import { SubmitGroupPaymentRequestDTO } from './payment-gateway-dto';
import { PaymentGatewayInterface } from './payment-gateway.interface';

export class PaymentGatewayHttp implements PaymentGatewayInterface {
  private readonly httpClient: HttpClientInterface;

  constructor(
    private readonly httpFactory: HttpClientFactory,
    private readonly mapperFactory: MapperFactoryInterface
  ) {
    this.httpClient = this.httpFactory.createHttpClient(AwsApiName.BILLTALLY);
  }

  async submitPaymentRequestGroup(input: SubmitGroupPaymentRequestDTO) {
    const mapper = this.mapperFactory.createSubmitPaymentRequestGroupMapper();
    const mappedDto = mapper.toDto(input);
    await this.httpClient.post('/ap-invoices/pay', mappedDto);
  }
}
