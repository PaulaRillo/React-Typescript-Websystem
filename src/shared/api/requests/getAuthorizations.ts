import { GetAuthorizations } from '../../../core/application/roles/GetAuthorizations';
import { AWSHttpClient } from '../../../core/infra/httpClient/AWSHttpClient';
import { apiName } from '../../constants/apiName/apiName';

export const getAuthorizations = async (userId: string) => {
  const httpClient = new AWSHttpClient(apiName.SHAREDSERVICES);
  const getAuthorizations = new GetAuthorizations(httpClient);
  return await getAuthorizations.execute(userId);
};
