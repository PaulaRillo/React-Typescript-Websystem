import { TenantBankingInfo } from 'core/domain/company/TenantBankingInfo';
import { apiName } from '../../constants/apiName/apiName';
import { AWSHttpClient } from '../../../core/infra/httpClient/AWSHttpClient';
import { GetHouseBanks } from 'core/application/house-banks/GetHouseBanks';

export const getHouseBanks = async (): Promise<TenantBankingInfo[]> => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const get = new GetHouseBanks(httpClient);
  return await get.execute();
};
