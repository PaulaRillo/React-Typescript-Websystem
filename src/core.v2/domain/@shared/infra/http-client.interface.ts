export interface HttpClientInterface {
  get<T>(endpoint: string, body?: any): Promise<T>;
  post<T>(endpoint: string, body?: any): Promise<T>;
  put<T>(endpoint: string, body?: any): Promise<T>;
  patch<T>(endpoint: string, body?: any): Promise<T>;
  delete<T>(endpoint: string, body?: any): Promise<T>;
}
