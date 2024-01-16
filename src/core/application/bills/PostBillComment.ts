import { IHttpClient } from 'core/domain/infra/httpClient/IHttpClient';
import { InvoiceCommentDTO } from 'core/domain/invoice/InvoiceCommentDTO';

export class PostBillComment {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = '/ap-invoices';
  }

  async execute(invoiceId: string, content: string): Promise<void> {
    await this._httpClient.post<InvoiceCommentDTO>(
      `${this._endpoint}/${invoiceId}/comment`,
      { content }
    );
  }
}
