import { IHttpClient } from 'core/domain/infra/httpClient/IHttpClient';

type Input = {
  userId: string;
  roleId: string;
};

export class ChangeRole {
  private readonly _httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
  }

  async execute({ userId, roleId }: Input): Promise<any> {
    const endpoint = `/users/${userId}/roles`;
    const input = await this._httpClient.post<any>(endpoint, {
      software_id: 'BILLTALLY',
      role: {
        id: roleId,
        is_system_managed: true
      }
    });
    return input;
  }
}
