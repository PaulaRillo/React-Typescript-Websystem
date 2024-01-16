import { AwsApiName } from 'core.v2/domain/@shared/settings/constants.enum';
import { HttpClientInterface } from '../../domain/@shared/infra/http-client.interface';

export interface HttpClientFactoryInterface {
  createHttpClient(apiName: AwsApiName): HttpClientInterface;
}
