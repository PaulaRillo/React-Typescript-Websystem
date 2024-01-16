import { IHttpClient } from 'core/domain/infra/httpClient/IHttpClient';
import { InvoiceComment } from 'core/domain/invoice/InvoiceComment';
import { InvoiceCommentDTO } from 'core/domain/invoice/InvoiceCommentDTO';

export class GetBillComments {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = '/ap-invoices';
  }

  async execute(invoiceId: string): Promise<InvoiceComment[]> {
    const response = await this._httpClient.get<InvoiceCommentDTO[]>(
      `${this._endpoint}/${invoiceId}/comment`
    );

    return response.map((comment) => new InvoiceComment(comment)) || [];
  }
}
