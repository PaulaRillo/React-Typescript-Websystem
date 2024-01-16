import { GetUsers } from 'core/application/users/GetUsers';
import { AWSHttpClient } from 'core/infra/httpClient/AWSHttpClient';
import { apiName } from 'shared/constants/apiName/apiName';

export const getUsers = async () => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const getUsers = new GetUsers(httpClient);
  return await getUsers.execute();
};
