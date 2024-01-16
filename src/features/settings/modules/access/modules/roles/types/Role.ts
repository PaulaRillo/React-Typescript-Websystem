import { PermissionKey } from 'shared/modules/Permission';

export type Role = {
  created_at: string;
  is_system_managed: boolean;
  sk: string;
  description: string;
  pk: string;
  id: string;
  name: string;
  granted_set: number;
  permissions: {
    [key in PermissionKey]: boolean;
  };
};
