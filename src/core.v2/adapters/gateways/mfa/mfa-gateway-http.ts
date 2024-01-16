import type { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
import { HttpClientFactoryInterface } from '../../../drivers/httpClient/http-client-factory.interface';
import { AwsApiName } from '../../../domain/@shared/settings/constants.enum';
import { MfaGatewayInterface } from './mfa-gateway.interface';
import { MfaRequestDataType } from 'core.v2/domain/@shared/types/mfa.type';

export class MfaGatewayHttp implements MfaGatewayInterface {
  private readonly endpoint: string;
  private readonly httpClientBillTally: HttpClientInterface;

  constructor(private readonly httpClientFactory: HttpClientFactoryInterface) {
    this.endpoint = '/mfa';
    this.httpClientBillTally = this.httpClientFactory.createHttpClient(AwsApiName.SHARED_SERVICES); //prettier-ignore
  }

  async sendMfa(data: MfaRequestDataType): Promise<any> {
    return await this.httpClientBillTally.post(
      `${this.endpoint}/send-code`,
      data
    );
  }

  async validateMfa(data: MfaRequestDataType): Promise<any> {
    return await this.httpClientBillTally.post(
      `${this.endpoint}/validate-code`,
      data
    );
  }
}
