import { GetCashFlow } from 'core/application/payment/cashflow/getCashFlow';
import { CashFlow } from 'core/domain/cashflow/CashFlow';
import { AWSHttpClient } from 'core/infra/httpClient/AWSHttpClient';
import { apiName } from 'shared/constants/apiName/apiName';

export const getCashFlow = async (): Promise<any> => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const cashFlowInstance = new GetCashFlow(httpClient);

  const serverResponse: any[] = await cashFlowInstance.execute();
  const dataFrontend = serverResponse.map((item) => {
    return new CashFlow(item);
  });
  return dataFrontend;
};
