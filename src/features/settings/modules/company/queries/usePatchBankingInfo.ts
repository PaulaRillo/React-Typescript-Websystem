import { API } from 'aws-amplify';
import { apiName } from 'shared/constants/apiName/apiName';
import { tenant_banking_info } from 'core/domain/company/tenant_banking_info';

export async function usePatchBankingInfo(params: tenant_banking_info) {
  if (!params.id || !params) {
    throw new Error('Invalid update parameters.');
  }

  const init = {
    body: {
      currency_id: params.currency_id
    }
  };

  const response = await API.patch(
    apiName.BILLTALLY,
    `/house-bank-accounts/${params.id}`,
    init
  );
  return response;
}
