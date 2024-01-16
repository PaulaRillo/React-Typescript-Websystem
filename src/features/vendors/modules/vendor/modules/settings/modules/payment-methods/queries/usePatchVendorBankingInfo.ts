import { API } from 'aws-amplify';
import { apiName } from 'shared/constants/apiName/apiName';
import { IVendorBankingInfo } from '../../../../../../../../../core/domain/vendor/IVendorBankingInfo';

export async function usePatchVendorBankingInfo(params: IVendorBankingInfo) {
  if (!params.id || !params) {
    throw new Error('Invalid update parameters.');
  }

  const init = {
    body: {
      currency_id: params.currencyId
    }
  };

  const response = await API.patch(
    apiName.BILLTALLY,
    `/vendors/${params?.vendorId}/banking-information/${params?.id}`,
    init
  );
  return response;
}
