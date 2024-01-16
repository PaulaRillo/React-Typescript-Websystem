import { IHttpClient } from 'core/domain/infra/httpClient/IHttpClient';
import { User } from 'core/domain/user/User';
import { UserDTO } from 'core/domain/user/UserDTO';

export class GetUsers {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = `/users`;
  }

  async execute(): Promise<User[]> {
    const response = await this._httpClient.get<{ data: UserDTO[] }>(
      this._endpoint
    );

    return response.data?.map((user) => new User(user)) || [];
  }
}
