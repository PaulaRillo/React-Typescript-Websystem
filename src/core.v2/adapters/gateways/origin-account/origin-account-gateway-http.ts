import { MapperFactoryInterface } from 'core.v2/adapters/mappers/mapper-factory.interface';
import { OriginAccountMapperInterface } from 'core.v2/adapters/mappers/origin-account/origin-account-mapper.interface';
import { OriginAccountGatewayInterface } from 'core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { HttpClientFactoryInterface } from 'core.v2/drivers/httpClient/http-client-factory.interface';
import { AwsApiName } from '../../../../core.v2/domain/@shared/settings/constants.enum';
import { OriginAccount } from '../../../domain/origin-account/entity/origin-account';
import { OriginAccountFactory } from '../../../domain/origin-account/factory/origin-account-factory';
import { HttpClientInterface } from './../../../domain/@shared/infra/http-client.interface';

export class OriginAccountGatewayHttp implements OriginAccountGatewayInterface {
  private readonly httpClient: HttpClientInterface;
  private readonly originAccountMapper: OriginAccountMapperInterface;

  constructor(
    private readonly httpClientFactory: HttpClientFactoryInterface,
    private readonly mapperFactory: MapperFactoryInterface
  ) {
    this.originAccountMapper = this.mapperFactory.createOriginAccountMapper();
    this.httpClient = this.httpClientFactory.createHttpClient(AwsApiName.BILLTALLY); //prettier-ignore
  }

  async list(): Promise<OriginAccount[]> {
    const endpoint = `/house-bank-accounts/payment-origins`;
    const data = await this.httpClient.get<any[]>(endpoint);

    const mappedOriginAccountList = data.map((dto) => {
      return this.originAccountMapper.toDomain(dto);
    });

    return mappedOriginAccountList.map((item) => {
      return OriginAccountFactory.create(item);
    });
  }
}
