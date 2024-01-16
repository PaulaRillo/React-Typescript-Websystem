import { AWSHttpClient } from './../../../core/infra/httpClient/AWSHttpClient';
import { apiName } from 'shared/constants/apiName/apiName';
import { ChangeRole } from 'core/application/roles/ChangeRole';

type Input = {
  userId: string;
  roleId: string;
};

export const changeRole = async ({ userId, roleId }: Input): Promise<void> => {
  const httpClient = new AWSHttpClient(apiName.SHAREDSERVICES);
  const changeRole = new ChangeRole(httpClient);
  return await changeRole.execute({ userId, roleId });
};
