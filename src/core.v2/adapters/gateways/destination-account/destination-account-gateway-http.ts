import { DestinationAccountMapperInterface } from 'core.v2/adapters/mappers/destination-account/destination-account-mapper.interface';
import { MapperFactoryInterface } from 'core.v2/adapters/mappers/mapper-factory.interface';
import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { DestinationAccountGatewayInterface } from 'core.v2/domain/destination-account/gateway/destination-account-gateway.interface';
import { HttpClientFactoryInterface } from 'core.v2/drivers/httpClient/http-client-factory.interface';
import { AwsApiName } from '../../../../../src/core.v2/domain/@shared/settings/constants.enum';
import { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
//prettier-ignore
export class DestinationAccountGatewayHttp implements DestinationAccountGatewayInterface {
  private readonly httpClient: HttpClientInterface;
  private readonly destinationAccountMapper: DestinationAccountMapperInterface;

  constructor(
    private readonly httpClientFactory: HttpClientFactoryInterface,
    private readonly mapperFactory: MapperFactoryInterface
  ) {
    this.destinationAccountMapper = this.mapperFactory.createDestinationAccountMapper(); //prettier-ignore
    this.httpClient = this.httpClientFactory.createHttpClient(AwsApiName.BILLTALLY); //prettier-ignore
  }

  async list(vendorId: string): Promise<DestinationAccountType[]> {
    const endpoint = `/vendors/${vendorId}/payment-destinations`;
    const data = await this.httpClient.get<any[]>(endpoint);
    return data.map((dto) => {
      return this.destinationAccountMapper.toDomain(dto);
    });
  }
}
