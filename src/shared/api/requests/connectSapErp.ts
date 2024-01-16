import { AWSHttpClient } from 'core/infra/httpClient/AWSHttpClient';
import { ConnectSapErp } from 'core/infra/service/settings/ConnectSapErp/ConnectSapErp';
import { ConnectSapErpOutputDTO } from 'core/infra/service/settings/ConnectSapErp/ConnectSapErpOutputDTO';
import { apiName } from 'shared/constants/apiName/apiName';
import { ConnectSapErpInputDTO } from './../../../core/infra/service/settings/ConnectSapErp/ConnectSapErpInputDTO';

type Input = ConnectSapErpInputDTO;
type Output = ConnectSapErpOutputDTO;

export const connectSapErp = async (input: Input): Promise<Output> => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const testErpConnection = new ConnectSapErp(httpClient);
  return await testErpConnection.execute(input);
};
