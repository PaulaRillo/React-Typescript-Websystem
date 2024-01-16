import core from 'core.v2';
import { useCallback } from 'react';
import { PermissionKey } from '../../enums/PermissionKey';

export const usePermission = () => {
  const permissions = core.store.loggedUser?.role?.permissions;

  const matchAll = useCallback(
    (permissionKeys: PermissionKey[]): boolean => {
      if (!permissions) return false;
      return permissionKeys.every((k) => permissions[k]);
    },
    [permissions]
  );

  const matchOne = useCallback(
    (permissionKeys: PermissionKey[]): boolean => {
      if (!permissions) return false;
      return permissionKeys.some((k) => permissions[k]);
    },
    [permissions]
  );

  return { matchAll, matchOne };
};
