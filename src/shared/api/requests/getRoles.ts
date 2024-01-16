import { apiName } from 'shared/constants/apiName/apiName';
import { AWSHttpClient } from 'core/infra/httpClient/AWSHttpClient';
import { GetRoles } from 'core/application/roles/GetRoles';

export const getRoles = async () => {
  const httpClient = new AWSHttpClient(apiName.SHAREDSERVICES);
  const getRoles = new GetRoles(httpClient);
  return await getRoles.execute();
};
