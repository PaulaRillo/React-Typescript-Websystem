export interface IHttpClient {
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string, body?: any): Promise<T>;
  put<T>(endpoint: string, body?: any): Promise<T>;
  patch<T>(endpoint: string, body?: any): Promise<T>;
}
