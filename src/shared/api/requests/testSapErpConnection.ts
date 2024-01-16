import { AWSHttpClient } from 'core/infra/httpClient/AWSHttpClient';
import { TestSapErpConnection } from 'core/infra/service/settings/TestSapErpConnection/TestSapErpConnection';
import { TestSapErpConnectionInputDTO } from 'core/infra/service/settings/TestSapErpConnection/TestSapErpConnectionInputDTO';
import { TestSapErpConnectionOutputDTO } from 'core/infra/service/settings/TestSapErpConnection/TestSapErpConnectionOutputDTO';
import { apiName } from 'shared/constants/apiName/apiName';

type Input = TestSapErpConnectionInputDTO;
type Output = TestSapErpConnectionOutputDTO;

export const testSapErpConnection = async (input: Input): Promise<Output> => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const testErpConnection = new TestSapErpConnection(httpClient);
  return await testErpConnection.execute(input);
};
