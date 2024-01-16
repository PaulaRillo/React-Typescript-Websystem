import { AWSHttpClient } from './../../../core/infra/httpClient/AWSHttpClient';
import { apiName } from 'shared/constants/apiName/apiName';
import { PostBillComment } from 'core/application/bills/PostBillComment';

export const postBillComment = async (
  billId: string,
  content: string
): Promise<void> => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const postBillComment = new PostBillComment(httpClient);
  await postBillComment.execute(billId, content);
};
