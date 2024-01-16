import { Button, Stack } from '@mui/material';
import { useAppLocation } from 'shared/hooks/useAppLocation';
import { useNav } from 'shared/hooks/useNav';
import { Permission, PermissionKey } from 'shared/modules/Permission';
import * as styles from './styles';

type NavItem = {
  icon: React.ReactElement;
  label: string;
  path: string;
  permissions?: PermissionKey[];
};

type Props = {
  rootPath: string;
  items: NavItem[];
};

export const ButtonNav = ({ rootPath, items }: Props) => {
  const { isActive } = useAppLocation();
  const handleNavigate = useNav('data-path');

  return (
    <Stack component="nav" spacing={1} sx={{ minWidth: 200, p: 2, pr: 0 }}>
      {items.map(({ icon, label, path, permissions }, idx) => (
        <Permission key={`${idx}-${path}`} matchAll={permissions}>
          <Button
            startIcon={icon}
            data-path={path}
            sx={
              isActive(`${rootPath}/${path}`)
                ? styles.activeButton
                : styles.button
            }
            size="large"
            onClick={handleNavigate}
          >
            {label}
          </Button>
        </Permission>
      ))}
    </Stack>
  );
};
