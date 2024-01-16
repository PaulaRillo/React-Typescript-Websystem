import { StatusEnum } from './StatusEnum';

export type ConnectionDetailsInput = {
  status: StatusEnum;
  accounting_software?: string | null;
  last_sync_at?: string | null;
  username?: string;
  erp_name?: string;
  database_name?: string;
  api_endpoint?: string;
};
