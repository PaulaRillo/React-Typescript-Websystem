import { PaginationType } from '../types/pagination.type';

export type OutputListGatewayDTO<T> = {
  data: T[];
  pagination: PaginationType;
  totalRecords: number;
};
