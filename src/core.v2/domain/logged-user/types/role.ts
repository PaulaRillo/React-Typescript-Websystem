type Permissions = {
  [key: string]: boolean;
};

export type Role = {
  id: string;
  name: string;
  granted_set: number;
  permissions: Permissions;
};
