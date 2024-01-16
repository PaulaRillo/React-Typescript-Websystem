import { Box, Typography } from '@mui/material';
import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Switch } from 'shared/components/Switch';
import { PermissionKey, usePermission } from 'shared/modules/Permission';
import { useRoles } from '../../hooks/useRoles';
import * as styles from './styles';

type Props = {
  permissionId: PermissionKey;
  title: string;
  description: string;
};

export const Permission = ({ permissionId, title, description }: Props) => {
  const { matchAll } = usePermission();
  const hasPermissionToEdit = useMemo(
    () => matchAll([PermissionKey.MANAGE_ROLE]),
    [matchAll]
  ); //Today we are not using this feature, so we can use this hook to check if user has permission to edit roles.

  const { setData, activeRole, setActiveRole } = useRoles();
  const [checked, setChecked] = useState<boolean>(
    !!activeRole?.permissions[permissionId]
  );

  const handleSwitch = useCallback(
    (e: SyntheticEvent) => {
      const { checked: c } = e.target as HTMLInputElement;

      setData((prevState) =>
        prevState.map((role) => {
          if (role.id === activeRole?.id) {
            return {
              ...role,
              permissions: {
                ...role.permissions,
                [permissionId]: c
              }
            };
          }
          return role;
        })
      );

      setActiveRole((prevState) => {
        if (prevState?.id === permissionId) {
          return {
            ...prevState,
            permissions: {
              ...prevState.permissions,
              [permissionId]: c
            }
          };
        }
        return prevState;
      });

      setChecked(c);
    },
    [activeRole?.id, permissionId, setActiveRole, setData]
  );

  return (
    <Box sx={styles.container}>
      <Box>
        <Typography variant="body1" sx={styles.title}>
          {title}
        </Typography>
        <Typography variant="caption" sx={styles.description}>
          {description}
        </Typography>
      </Box>
      <Switch checked={checked} disabled onClick={handleSwitch} />
    </Box>
  );
};
