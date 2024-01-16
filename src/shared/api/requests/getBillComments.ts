import { apiName } from '../../constants/apiName/apiName';
import { AWSHttpClient } from '../../../core/infra/httpClient/AWSHttpClient';
import { GetBillComments } from '../../../core/application/bills/GetBillComments';

export const getBillComments = async (billId: string) => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const getBill = new GetBillComments(httpClient);
  return await getBill.execute(billId);
};
