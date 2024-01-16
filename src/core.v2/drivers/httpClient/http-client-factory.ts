import { AwsApiName } from 'core.v2/domain/@shared/settings/constants.enum';
import { AwsHttpClient } from './aws/aws-http-client';
import { HttpClientFactoryInterface } from './http-client-factory.interface';
import { HttpClientInterface } from '../../domain/@shared/infra/http-client.interface';

export class HttpClientFactory implements HttpClientFactoryInterface {
  createHttpClient(apiName: AwsApiName): HttpClientInterface {
    return new AwsHttpClient(apiName);
  }
}
